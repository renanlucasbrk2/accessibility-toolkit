import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

function optionValue(args, name, fallback) {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
}

function criterionIds(tags = []) {
  return [...new Set(tags.flatMap((tag) => {
    const match = /^wcag(\d)(\d)(\d)$/.exec(tag);
    return match ? [`${match[1]}.${match[2]}.${match[3]}`] : [];
  }))];
}

function summarizeNode(node) {
  return {
    target: node.target,
    html: node.html,
    failureSummary: node.failureSummary ?? null,
    any: node.any.map((item) => ({ id: item.id, message: item.message, data: item.data ?? null })),
    all: node.all.map((item) => ({ id: item.id, message: item.message, data: item.data ?? null })),
    none: node.none.map((item) => ({ id: item.id, message: item.message, data: item.data ?? null }))
  };
}

function normalizeResult(page, url, result) {
  return {
    page: page.label ?? page.path,
    url,
    scannedAt: new Date().toISOString(),
    engine: { name: 'axe-core', version: result.testEngine.version },
    violations: result.violations.map((item) => ({
      id: item.id,
      impact: item.impact ?? 'unknown',
      description: item.description,
      help: item.help,
      helpUrl: item.helpUrl,
      wcagCriteria: criterionIds(item.tags),
      tags: item.tags,
      nodes: item.nodes.map(summarizeNode)
    })),
    incomplete: result.incomplete.map((item) => ({
      id: item.id,
      impact: item.impact ?? 'unknown',
      help: item.help,
      helpUrl: item.helpUrl,
      wcagCriteria: criterionIds(item.tags),
      tags: item.tags,
      nodes: item.nodes.map(summarizeNode)
    })),
    passes: result.passes.map((item) => ({ id: item.id, help: item.help, nodes: item.nodes.length })),
    ruleCounts: { violations: result.violations.length, incomplete: result.incomplete.length, passes: result.passes.length }
  };
}

function markdownReport(report) {
  const lines = [
    '# Accessibility scan',
    '',
    `- Gerado: ${report.generatedAt}`,
    `- Scanner: axe-core ${report.engineVersion}`,
    '- Escopo: somente páginas/estados configurados e regras automatizadas selecionadas.',
    '- Este relatório não é uma declaração de conformidade WCAG.',
    '',
    '## Resumo',
    '',
    `- Páginas: ${report.pages.length}`,
    `- Violações: ${report.summary.violations}`,
    `- Revisão manual necessária: ${report.summary.incomplete}`,
    `- Falhas ao carregar/analisar: ${report.summary.errors}`,
    ''
  ];

  for (const page of report.pages) {
    lines.push(`## ${page.page}`, '', `URL: ${page.url}`, '');
    if (page.error) {
      lines.push(`**Análise inconclusiva:** ${page.error}`, '');
      continue;
    }
    if (!page.violations.length) lines.push('Nenhuma violação automatizada reportada nesta página/estado.', '');
    for (const finding of page.violations) {
      lines.push(`### ${finding.id} (${finding.impact})`, '', finding.help, '');
      lines.push(`- Critérios relacionados pelas tags axe: ${finding.wcagCriteria.length ? finding.wcagCriteria.join(', ') : 'não mapeados'}`);
      lines.push(`- Referência da regra: ${finding.helpUrl}`);
      for (const node of finding.nodes) {
        lines.push(`- Alvo: \`${node.target.join(' ')}\``);
        if (node.failureSummary) lines.push(`  - Evidência: ${node.failureSummary.replace(/\s+/g, ' ').trim()}`);
      }
      lines.push('');
    }
    if (page.incomplete.length) {
      lines.push('### Verificações que exigem revisão', '');
      for (const item of page.incomplete) lines.push(`- **${item.id}**: ${item.help} (${item.nodes.length} nó(s); [detalhes](${item.helpUrl}))`);
      lines.push('');
    }
  }

  lines.push('## Próxima etapa humana', '', 'Revisar os itens incompletos e seguir o roteiro manual do projeto. Confirmar propósito/conteúdo, teclado, ampliação/reflow, mensagens, fluxos completos e tecnologias assistivas conforme aplicável.');
  return `${lines.join('\n')}\n`;
}

async function main() {
  const args = process.argv.slice(2);
  const configPath = resolve(optionValue(args, '--config', 'a11y.config.json'));
  const jsonPath = resolve(optionValue(args, '--json', 'reports/a11y-report.json'));
  const markdownPath = resolve(optionValue(args, '--markdown', 'reports/a11y-report.md'));
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  if (!config.baseUrl || !Array.isArray(config.pages) || config.pages.length === 0) {
    throw new Error(`Configuração inválida em ${configPath}: informe baseUrl e uma lista pages não vazia.`);
  }

  const browser = await chromium.launch({ headless: true });
  const pages = [];
  let engineVersion = 'unknown';
  try {
    for (const pageConfig of config.pages) {
      const url = new URL(pageConfig.path, config.baseUrl).href;
      const context = await browser.newContext();
      const page = await context.newPage();
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: config.timeoutMs ?? 30000 });
        const result = await new AxeBuilder({ page }).withTags(config.wcagTags ?? ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        engineVersion = result.testEngine.version;
        pages.push(normalizeResult(pageConfig, url, result));
      } catch (error) {
        pages.push({ page: pageConfig.label ?? pageConfig.path, url, error: error.message, violations: [], incomplete: [], passes: [] });
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  const report = {
    schemaVersion: '0.1.0',
    generatedAt: new Date().toISOString(),
    engineVersion,
    config: { baseUrl: config.baseUrl, pageCount: config.pages.length, wcagTags: config.wcagTags ?? ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    summary: {
      violations: pages.reduce((sum, item) => sum + (item.violations?.length ?? 0), 0),
      incomplete: pages.reduce((sum, item) => sum + (item.incomplete?.length ?? 0), 0),
      errors: pages.filter((item) => item.error).length
    },
    pages
  };

  await mkdir(dirname(jsonPath), { recursive: true });
  await mkdir(dirname(markdownPath), { recursive: true });
  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  await writeFile(markdownPath, markdownReport(report), 'utf8');
  console.log(`A11y report written: ${markdownPath}`);
  console.log(`JSON report written: ${jsonPath}`);
  if (report.summary.errors) process.exitCode = 2;
  if (args.includes('--fail-on-violations') && report.summary.violations) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 2;
});
