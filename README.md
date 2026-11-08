# Accessibility Toolkit

Kit inicial para auditoria de acessibilidade de aplicações frontend usando navegador, axe-core e GitHub Copilot Skills.

## O que esta versão faz

- Abre as páginas configuradas em um Chromium controlado por Playwright.
- Executa regras automatizadas axe-core marcadas para WCAG 2.0/2.1/2.2 A e AA.
- Grava JSON para integração e Markdown para revisão por desenvolvedores.
- Mantém a execução informativa por padrão; `--fail-on-violations` permite ativar falha do processo quando houver violações.
- Inclui Skills de revisão e fundação em `.github/skills/`.

O scanner encontra apenas falhas que as regras selecionadas conseguem detectar no estado e nas rotas executadas. Ele não avalia sozinho todos os critérios WCAG, conteúdo e significado, jornadas completas, tecnologias assistivas ou conformidade. Leia o plano em `outputs/planejamento-tecnico-accessibility-toolkit.md`.

## Requisitos

- Node.js 20 ou superior
- Aplicação frontend executável e acessível por URL durante a análise
- Chromium instalado pelo Playwright

## Instalação e execução

```bash
npm install
npx playwright install chromium
npm run a11y:scan
```

Edite `a11y.config.json` para informar a URL e as páginas representativas. Rotas protegidas precisam estar acessíveis sem intervenção ou receber configuração de autenticação em uma evolução futura.

```bash
npm run a11y:scan -- --config a11y.config.json --json reports/a11y.json --markdown reports/a11y.md
```

Para transformar violações axe em código de saída diferente de zero:

```bash
npm run a11y:scan -- --fail-on-violations
```

## Skills do Copilot

No ambiente do GitHub Copilot, as Skills deste repositório ficam em `.github/skills/<skill>/SKILL.md`. As instruções gerais do repositório ficam em `.github/copilot-instructions.md`. A disponibilidade depende do produto e da versão do Copilot usados; valide que as Skills foram descobertas no editor da equipe.

`cross-platform-accessibility` também traz orientação para iOS e Android, mas o scanner deste MVP só executa axe-core em páginas Web. Aplicativos nativos precisam de configuração e ferramentas de teste próprias antes de serem analisados pelo kit.

O agente manual `accessibility-auditor` fica em `.github/agents/accessibility-auditor.agent.md`. No Copilot, selecione-o no menu de agentes. Ele tem ferramentas de leitura, busca e execução do scanner; não tem ferramenta de edição e não modifica o projeto.

## Interpretação do relatório

- `violations`: problemas reportados por axe-core na página e no estado executado.
- `incomplete`: casos que axe não concluiu automaticamente e exigem revisão.
- `passes`: verificações automatizadas que passaram naquele estado; não são aprovação do critério em todos os contextos.
- Critério WCAG relacionado: associação inferida pelas tags de critério fornecidas pela regra axe, quando disponíveis. Confirme a relação no W3C antes de tratá-la como conclusão normativa.

Não interprete ausência de violações como conformidade. Registre páginas, estados, jornadas e testes manuais avaliados.
