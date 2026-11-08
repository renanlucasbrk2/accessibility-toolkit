---
name: vscode-workbench-accessibility
description: Aplica padrões e APIs internos de acessibilidade do repositório Visual Studio Code ao criar ou atualizar UI interativa do VS Code. Use somente em contribuições ao VS Code ou código que comprovadamente compartilha essas APIs.
---

# VS Code workbench accessibility

Skill especializada para contribuições de UI ao Visual Studio Code. Antes de usar nomes de API ou caminhos abaixo, confira-os no checkout e na versão atual do repositório.

## Use esta Skill quando

- A mudança estiver no repositório `microsoft/vscode`, em workbench/editor/extensions, ou em um projeto que realmente reutilize as APIs de acessibilidade do VS Code.
- Uma feature interativa nova ou existente estiver sendo criada ou alterada.

Não aplique os requisitos internos do VS Code a aplicações web genéricas, outras IDEs, extensões que não compartilham essas APIs ou a uma auditoria WCAG ampla. Para isso, use `accessibility-review` ou `wcag-audit-patterns`.

## Processo

1. Examine componentes análogos e a implementação existente na versão do checkout; prefira o padrão já usado pela área.
2. Para nova superfície interativa rica, verifique os mecanismos de ajuda acessível e Accessible View. Help text deve explicar função, comandos/atalhos e interação por leitor de tela. Accessible View deve expor conteúdo visual rico como texto e restaurar foco ao fechar.
3. Para a dica de como abrir ajuda acessível, siga a configuração de verbosity existente para a feature e a convenção da versão atual. Ao atualizar uma feature, atualize também sua ajuda quando comandos ou interações mudarem.
4. Para eventos e atualizações dinâmicas, verifique os sinais existentes. Reutilize um sinal apropriado; coordene a criação de novos sinais com os mantenedores responsáveis.
5. Use anúncio de estado educado para atualizações não urgentes e alerta assertivo só para conteúdo realmente urgente. Evite anunciar a mesma mudança por mais de um mecanismo.
6. Garanta operação por teclado, ordem lógica, foco visível, comportamento de Escape e retorno de foco. Siga padrões de teclado WAI-ARIA para componentes compostos.
7. Prefira controles HTML nativos. Para widgets customizados, confira nome acessível, papel, estado e relação com texto visível. Marque decoração para que seja ignorada pela árvore de acessibilidade.
8. Teste o comportamento no workbench e, quando disponível, com leitor de tela. Registre a superfície, os passos e as limitações observadas.

## Checklist para UI interativa nova ou alterada

- [ ] Ajuda acessível existente atualizada ou adicionada, conforme os padrões atuais do repositório.
- [ ] Accessible View considerada quando o conteúdo visual/rico não puder ser consumido diretamente.
- [ ] Dica de ajuda e configuração de verbosity consistentes com features análogas.
- [ ] Sinais e live regions apropriados, sem anúncios duplicados ou excessivos.
- [ ] Controles alcançáveis e operáveis por teclado, com foco visível e restauração de foco adequada.
- [ ] Nomes, papéis e estados corretos, com localização quando aplicável.
- [ ] Testes e limitações documentados.

Esta revisão da UI específica do VS Code complementa, mas não substitui, a auditoria WCAG geral quando essa auditoria fizer parte do escopo.

## Referência e origem

Esta Skill foi adaptada como orientação de escopo a partir da Skill de acessibilidade do repositório oficial Microsoft VS Code. Consulte a fonte atual e valide APIs antes de usá-las: <https://github.com/microsoft/vscode/blob/main/.github/skills/accessibility/SKILL.md>. A fonte consultada está no repositório licenciado sob MIT: <https://github.com/microsoft/vscode/blob/main/LICENSE.txt>.
