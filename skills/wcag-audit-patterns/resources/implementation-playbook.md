# WCAG 2.2 audit implementation playbook

Este playbook apoia Skills de auditoria. Use a especificação WCAG 2.2 e os documentos oficiais W3C para confirmar requisitos e técnicas. Técnicas W3C são orientação informativa; não trate um exemplo de técnica como o próprio requisito normativo.

## 1. Definir o escopo

Antes de testar, registre:

- Aplicação, ambiente, versão/build e data.
- URL e rota, além do estado inicial e dos estados interativos testados.
- Tarefa ou jornada da pessoa usuária, por exemplo entrar em contato ou concluir uma compra.
- Navegador, sistema operacional, viewport, zoom e tecnologias assistivas usados.
- Componentes compartilhados incluídos e dependências de terceiros relevantes.
- Nível WCAG que está sendo avaliado como alvo de trabalho; mantenha A, AA e AAA identificados separadamente.

Uma captura isolada de tela ou uma única rota não representa todas as páginas e estados de uma aplicação. Considere também os requisitos de páginas completas e processos completos descritos na WCAG.

## 2. Executar automação

1. Inicie a aplicação no ambiente escolhido e percorra as rotas configuradas no `a11y.config.json`.
2. Execute `npm run a11y:scan` e preserve os relatórios JSON e Markdown gerados.
3. Para cada violação, inspecione o seletor/alvo e o HTML reportados no contexto real da página.
4. Leia a descrição e limitações da regra axe vinculada. A ferramenta pode produzir itens `incomplete` que exigem julgamento humano.
5. Não converta regras do scanner em critérios WCAG sem confirmar a associação nas tags e na documentação W3C.

Automação é útil para vários problemas verificáveis no DOM, mas não determina de modo geral intenção, qualidade semântica, adequação do texto, facilidade de uso ou funcionamento de uma jornada completa.

## 3. Executar verificações manuais

Selecione os passos relevantes ao conteúdo e aos componentes em avaliação. Registre exatamente o que foi tentado e observado.

### Teclado e foco

- Percorra controles interativos com Tab e Shift+Tab.
- Verifique operação com Enter, Espaço e setas quando esperado pelo padrão do componente.
- Confirme ordem de foco lógica, foco visível, ausência de armadilha e retorno de foco apropriado ao fechar diálogos.
- Confirme que conteúdo em foco não fica encoberto por barras fixas ou outros elementos.
- Teste alternativas para interações de arrastar quando aplicável.

### Semântica e tecnologia assistiva

- Confirme idioma da página e semântica de regiões, títulos, listas, tabelas e controles.
- Inspecione nomes acessíveis, papel e estado de controles, rótulos e instruções.
- Verifique mensagens de erro e estado dinâmico com uma tecnologia assistiva disponível.
- Avalie se alternativas textuais transmitem o propósito e se elementos decorativos são ignorados.

### Apresentação visual e ampliação

- Verifique contraste de texto e elementos gráficos relevantes; confirme manualmente valores e exceções.
- Amplie texto e viewport e verifique reflow sem perda de informação ou funcionalidade.
- Verifique espaçamento de texto, orientação aplicável, uso de cor e foco em estados visuais.
- Confira tamanho e espaçamento dos alvos de interação em contextos aplicáveis.

### Conteúdo e jornadas

- Confirme título de página, títulos e rótulos claros, instruções e identificação de erros.
- Verifique se o propósito de links e controles é compreensível no contexto.
- Complete jornadas importantes, incluindo autenticação, formulários, confirmação e recuperação de erro.
- Verifique limites de tempo, ajuda consistente e entrada redundante quando aplicável.
- Para mídia, gráficos e dados, confira alternativas pertinentes e equivalência da informação.

Essas tarefas não formam um atalho para declarar conformidade: adapte-as aos critérios pertinentes, conteúdo, tecnologia e exceções documentadas.

## 4. Registrar achados

Use um registro por problema observado:

| Campo | O que registrar |
| --- | --- |
| ID | Identificador estável do achado |
| Estado | Violação observada, precisa de revisão, passou neste passo, não testado, inconclusivo ou não aplicável com justificativa |
| Localização | URL, estado, arquivo/componente e seletor ou trecho, quando disponível |
| Evidência | Passos reproduzíveis, saída da ferramenta, observação ou captura referenciada |
| Barreira | O que impede ou dificulta a tarefa e em que condições |
| Critério | SC WCAG 2.2 e nível, somente quando a relação tiver suporte; caso contrário, “a confirmar” |
| Impacto | Efeito provável sobre a pessoa e a tarefa |
| Prioridade | Prioridade acordada pelo projeto, separada do nível WCAG |
| Confiança | Alta, média ou baixa, com motivo se não for alta |
| Correção | Mudança sugerida, preferindo HTML nativo e padrões existentes |
| Reteste | Passos necessários para confirmar o resultado após a correção |

## 5. Modelo de relatório

```markdown
# Auditoria de acessibilidade — [aplicação/versão]

## Escopo e ambiente
- Rotas, estados e jornadas:
- Navegador, viewport e tecnologia assistiva:
- Build e data:
- Nível-alvo desta avaliação:

## Resumo dos resultados observados
- Violações verificadas:
- Itens que precisam de revisão:
- Itens não testados ou inconclusivos:

## Achados
### [ID] [título curto]
- Estado:
- Localização e evidência:
- Critério WCAG relacionado e fonte:
- Impacto / prioridade / confiança:
- Correção sugerida:
- Reteste:

## Limitações e cobertura pendente
- [páginas, estados, jornadas ou tecnologias assistivas ainda não avaliadas]
```

## 6. Retestar e acompanhar

- Repita a mesma tarefa, estado, viewport e tecnologia assistiva quando possível.
- Rode novamente o scanner nas rotas afetadas.
- Registre se a barreira foi removida, se houve regressão ou se o resultado ainda é inconclusivo.
- Atualize cobertura por página, estado e jornada; não use um percentual agregado para sugerir conformidade.

## Referências oficiais

- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- Understanding WCAG 2.2: <https://www.w3.org/WAI/WCAG22/Understanding/>
- Techniques for WCAG 2.2: <https://www.w3.org/WAI/WCAG22/Techniques/>
- W3C evaluation resources: <https://www.w3.org/WAI/test-evaluate/>
