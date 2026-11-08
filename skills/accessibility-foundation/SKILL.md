---
name: accessibility-foundation
description: Direciona tarefas de acessibilidade frontend para análise, Skill especializada, scanner e revisão manual, com referências rastreáveis à WCAG 2.2.
---

# Accessibility foundation

Use esta Skill quando a tarefa envolver acessibilidade web, seleção de verificações ou interpretação de uma solicitação de auditoria.

1. Identifique framework, página/estado, interação, tarefa da pessoa usuária e ambiente de execução. Não invente contexto ausente; prossiga com limites explícitos.
2. Direcione por domínio: formulários para `forms`, operação e foco para `keyboard`, auditoria ampla para `accessibility-review`.
3. Quando a aplicação estiver em execução, use `npm run a11y:scan` nas rotas configuradas. Registre as rotas e estados realmente percorridos.
4. Preserve a evidência original do scanner. Confirme a regra e o critério relacionado no W3C antes de reportar uma violação WCAG.
5. Para aspectos não automatizáveis, forneça passos concretos de revisão manual e marque-os como não testados até haver resultado.
6. Se pedirem correção, proponha uma mudança pequena e semântica, explique a validação necessária e não alegue que a alteração garante conformidade global.

## Limites

Um resultado axe é evidência sobre uma regra num estado observado. Não avalia todos os critérios WCAG, o significado do conteúdo, todas as jornadas ou uma combinação de tecnologias assistivas. Um `pass` de scanner nunca equivale a conformidade da aplicação.
