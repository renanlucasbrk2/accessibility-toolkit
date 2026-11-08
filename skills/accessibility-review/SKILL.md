---
name: accessibility-review
description: Analisa páginas, componentes ou mudanças frontend em busca de barreiras de acessibilidade, organiza evidências e associa critérios WCAG 2.2 para confirmação.
---

# Accessibility review

Use em auditorias de páginas, componentes, pull requests ou relatórios de ferramentas.

## Procedimento

1. Delimite arquivos, URL, estados e tarefa avaliada. Para revisão de código, abra os componentes e estilos envolvidos; para comportamento, execute a página.
2. Se a aplicação estiver disponível, execute o scanner configurado e preserve regra, alvo, mensagem e URL da regra. Não descarte achados porque parecem redundantes sem examinar a evidência.
3. Inspecione semântica HTML, nome/papel/valor, hierarquia e propósito de títulos, nomes de controles, alternativas textuais, foco visível, operação por teclado, contraste, ampliação/reflow, mensagens e conteúdo dinâmico, conforme o escopo.
4. Associe um achado a um critério específico somente quando a evidência e a fonte W3C sustentarem a relação. Inclua nível e link de entendimento oficial; se houver dúvida, reporte a hipótese separadamente.
5. Separe fatos observados de interpretação. Registre estado testado, evidência, impacto, incerteza, proposta de correção e como confirmar a correção.
6. Faça uma seção de cobertura: o que foi executado, o que não foi executado e os testes manuais pendentes. Não transforme ausência de alertas em aprovação.

## Formato da resposta

Para cada achado, reporte:

- **Problema e evidência:** URL/arquivo, seletor/trecho, mensagem ou sequência para reproduzir.
- **Critério:** WCAG 2.2 e nível, com link direto; ou “relação a confirmar”.
- **Impacto e certeza:** barreira provável e o que falta confirmar.
- **Correção sugerida:** mudança específica que preserve semântica e padrões do projeto.
- **Validação:** repetição do scanner e/ou tarefa manual necessária.

Feche com escopo, estados cobertos, itens não testados e limites da avaliação. Nunca emita declaração de conformidade.
