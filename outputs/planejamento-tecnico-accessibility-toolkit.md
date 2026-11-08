# Accessibility Toolkit: plano técnico do MVP

## Objetivo

Criar um kit reutilizável para equipes de frontend que combina ferramentas determinísticas, Skills para GitHub Copilot e validação humana. O kit encontra problemas com evidência, relaciona achados a critérios WCAG 2.2 quando a relação é verificável e orienta como testar o que ferramentas não conseguem decidir.

O produto não declara conformidade WCAG automaticamente. A conformidade exige avaliação de páginas completas, processos completos e formas de uso suportadas; a automação cobre apenas parte das verificações.

## Princípios

- A recomendação deve apontar evidência observável, origem e versão da regra.
- Critério WCAG, impacto para a pessoa usuária, prioridade de correção e confiança do achado são campos distintos.
- Resultado de teste usa `violation`, `needs-review`, `pass`, `not-tested`, `inconclusive` ou `not-applicable`; ausência de achados automatizados não equivale a aprovação.
- Skills instruem o fluxo e explicam decisões. Scripts e ferramentas produzem resultados repetíveis.
- Correções sugeridas não são aplicadas sem revisão do desenvolvedor; testes manuais e com tecnologias assistivas permanecem no processo.
- O conteúdo normativo é referenciado, versionado e sincronizado de fontes W3C. Não copiar a documentação inteira para dentro do kit.

## Modelo técnico

### Camadas

1. **Registro de critérios e fontes**: índice versionado de critérios ativos WCAG 2.2, nível, texto/descrição curta, URL normativa e referências de compreensão/técnicas do W3C. Distingue requisitos normativos de orientação informativa. Registra critérios retirados ou alterados para evitar falsos alvos, incluindo 4.1.1 Parsing, removido da WCAG 2.2.
2. **Analisadores determinísticos**: primeiro axe-core em navegador contra URLs/componentes de um projeto configurado; depois regras de inspeção estática para padrões de código com sinais confiáveis. Cada regra declara critérios relacionados, limites e tipo de evidência.
3. **Plano de testes manuais**: tarefas por critério e jornada, com teclado, zoom/reflow, conteúdo, mensagens, temporização, leitor de tela e avaliação de significado visual. O plano registra páginas e processos cobertos.
4. **Normalização de achados**: formato JSON estável com identificador da regra, arquivo/URL/seletor, evidência, critério(s) relacionado(s), confiança, estado, orientação de correção e validação recomendada.
5. **Skills Copilot**: uma Skill de fundação/direcionamento e Skills focadas em revisão, formulários e teclado no piloto. A Skill orienta a execução do analisador e a interpretação dos limites; não inventa resultados.
6. **Saídas**: relatório Markdown para desenvolvedores e JSON para CI e futuro agente. CI começa informativa; bloqueios só entram depois de medir falsos positivos e acordar regras com a equipe.
7. **Avaliação**: repositório de exemplos acessíveis e inacessíveis, resultados esperados, casos inconclusivos e revisão humana de referência. Mede precisão, cobertura, falsos positivos, regressões, utilidade e rastreabilidade.

### Fluxo esperado

`configurar app e jornadas → executar scanner → revisar evidências e cobertura → executar testes manuais indicados → corrigir com revisão humana → reexecutar → registrar resultado`

## Limites da automação

Automação é adequada para problemas verificáveis no DOM/render, como nomes acessíveis ausentes, relações ARIA inválidas e várias falhas de contraste computáveis. Ela não consegue determinar de modo geral se o texto alternativo transmite o propósito da imagem, se a ordem e as instruções fazem sentido, se a navegação é previsível, se uma jornada completa é compreensível ou se o leitor de tela recebe uma experiência adequada. Esses casos devem gerar tarefas de revisão, nunca um `pass` inferido por ausência de alerta.

## MVP proposto

### Incluído

- Projeto central, documentação de instalação e configuração de URL/rotas e jornadas.
- Auditoria de páginas renderizadas com axe-core e normalização de resultados.
- Skill `accessibility-foundation` para direcionar solicitações, escolher verificações e preservar limites de certeza.
- Skill `accessibility-review` para análise baseada em evidência, explicação dos critérios e proposta de correção revisável.
- Skills `forms` e `keyboard` para os dois domínios iniciais do piloto.
- Roteiro manual associado aos critérios aplicáveis e relatório explícito de cobertura/não testado.
- Fixtures de avaliação pequenos, incluindo violações conhecidas e exemplos sem problemas.

### Fora do primeiro corte

- Declaração automática de conformidade WCAG.
- Agente que altera código ou abre tickets sem confirmação humana.
- Bloqueio de CI antes de linha de base de qualidade.
- Suporte declarado a qualquer framework antes de validar adaptadores e jornadas em aplicações reais.

## Sequência de implantação

1. **Inventário e decisões**: selecionar frontend(s), ambientes, framework/editor Copilot e 3 a 5 jornadas/componentes representativos; registrar fontes internas autorizadas.
2. **Base verificável**: criar estrutura do repositório, registro rastreável WCAG 2.2 e esquema de achados.
3. **Piloto de execução**: integrar axe-core às páginas reais, gerar JSON/Markdown e documentar lacunas do scanner.
4. **Skills e revisão**: publicar Skills do piloto em `.github/skills/<nome>/SKILL.md` e instruções gerais mínimas em `.github/copilot-instructions.md`; validar descoberta no ambiente Copilot escolhido.
5. **Evals e revisão manual**: executar exemplos conhecidos e comparar saídas com especialistas; revisar falso positivo e qualidade das correções.
6. **Expansão controlada**: incluir inspeção estática, novos domínios, saída CI informativa e, com evidência, regras bloqueantes.
7. **Agente futuro**: só depois de validar regras e processo, permitir que um agente consolide achados; aprovação humana permanece necessária para mudanças e conclusões de acessibilidade.

## Critério de pronto para o piloto

- Um desenvolvedor consegue configurar uma aplicação e executar uma auditoria repetível.
- Todo achado contém evidência que outra pessoa consegue localizar e revisar.
- O relatório separa violações confirmadas por ferramenta de perguntas que exigem decisão humana.
- Critérios relacionados apontam para fonte W3C específica e versão conhecida.
- Exemplos positivos e negativos verificam o comportamento das Skills e do scanner.
- A equipe entende o que não foi coberto e não interpreta ausência de alertas como conformidade.

## Decisões para iniciar a implementação

- Framework(s) e forma de iniciar/acessar a aplicação do piloto.
- Quais jornadas/componentes entram primeiro.
- Versão, editor e modo de uso do GitHub Copilot que serão validados.
- Nível-alvo do registro inicial (recomenda-se A e AA; AAA pode ser acompanhado sem misturar a meta de conformidade).
- Ferramentas internas de browser, CI e tecnologias assistivas autorizadas.

## Fontes normativas e de integração

- WCAG 2.2 Recommendation: <https://www.w3.org/TR/WCAG22/>
- W3C Understanding WCAG 2.2 e técnicas: <https://www.w3.org/WAI/WCAG22/Understanding/> e <https://www.w3.org/WAI/WCAG22/Techniques/>
- W3C avaliação: <https://www.w3.org/WAI/test-evaluate/>
- GitHub Copilot Agent Skills: <https://docs.github.com/en/copilot/concepts/customizations/agent-skills>
- GitHub Copilot instruções personalizadas: <https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions>

As opções de integração do Copilot e os caminhos suportados variam por produto/versão; validar a descoberta das Skills no ambiente alvo antes de distribuir.
