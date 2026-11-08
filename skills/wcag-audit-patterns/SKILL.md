---
name: wcag-audit-patterns
description: Conduz auditorias de acessibilidade WCAG 2.2 com testes automatizados, verificação manual, evidências e orientação de correção. Use ao auditar páginas web, corrigir possíveis violações WCAG ou implementar padrões acessíveis.
---

# WCAG Audit Patterns

Guia prático para avaliar conteúdo web conforme WCAG 2.2, documentar evidências e orientar correções revisáveis.

## Use esta Skill quando

- Conduzir uma auditoria de acessibilidade.
- Investigar ou corrigir possíveis problemas relacionados a critérios WCAG.
- Implementar ou revisar componentes acessíveis.
- Preparar evidências técnicas para processos internos de acessibilidade.

## Não use esta Skill quando

- A solicitação exigir aconselhamento jurídico, certificação formal ou opinião legal.
- A pessoa quiser somente uma varredura automatizada, sem revisão manual.
- Não houver acesso ao conteúdo necessário para a análise; nesse caso, delimite o que pode ser avaliado e peça a evidência que falta.

## Instruções

1. Registre o escopo: URLs, páginas, estados, jornadas, navegador, ambiente e tecnologias assistivas disponíveis.
2. Execute o scanner configurado (`npm run a11y:scan`) para coletar achados automatizados. Preserve regra, alvo, mensagem e referência da ferramenta.
3. Faça verificações manuais adequadas ao escopo, incluindo teclado, ordem e visibilidade do foco, zoom/reflow, conteúdo e fluxos com leitor de tela quando disponível.
4. Relacione cada achado ao critério WCAG 2.2 mais específico que a evidência sustentar. Cite a fonte W3C. Se o vínculo não estiver confirmado, registre-o como hipótese a confirmar.
5. Separe nível WCAG, impacto para a pessoa usuária, prioridade de correção e confiança do achado. Não use esses campos como equivalentes.
6. Para cada achado, descreva evidência reproduzível, barreira observada, sugestão de correção e como validar a correção. Mantenha alterações sujeitas à revisão do desenvolvedor.
7. Reexecute as verificações pertinentes após a correção e registre o resultado observado.
8. Informe páginas e estados cobertos, itens não testados, limitações e riscos residuais. Descreva somente o estado desta avaliação; não declare conformidade legal, certificação ou conformidade global.

Consulte `resources/implementation-playbook.md` para padrões, listas de verificação e modelos de registro.

## Segurança e limites

- Não alegue conformidade legal nem substitua especialistas em acessibilidade ou jurídicos.
- Guarde evidência suficiente para repetir os passos, sem incluir dados pessoais desnecessários.
- Um scanner automatizado detecta somente parte dos problemas e somente nos estados analisados.
- Ausência de violações automatizadas não prova conformidade WCAG.
