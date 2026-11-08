# Referências para VS Code

As APIs são específicas do repositório e podem mudar. Confirme os nomes e o uso no checkout e na versão do VS Code em questão.

- Skill original da Microsoft: <https://github.com/microsoft/vscode/blob/main/.github/skills/accessibility/SKILL.md>
- `AccessibleViewProviderId`, `AccessibleContentProvider` e registro de Accessible Views: `src/vs/platform/accessibility/browser/accessibleView.ts` e `src/vs/platform/accessibility/browser/accessibleViewRegistry.ts`
- Configurações de verbosity: `src/vs/workbench/contrib/accessibility/browser/accessibilityConfiguration.ts`
- Serviços e sinais de acessibilidade: `src/vs/platform/accessibilitySignal/browser/accessibilitySignalService.ts`
- `alert()` e `status()` para anúncios de região viva: `src/vs/base/browser/ui/aria/aria.ts`
- Licença do repositório de origem: <https://github.com/microsoft/vscode/blob/main/LICENSE.txt>

Não reutilize automaticamente essas APIs ou a exigência de diálogo/Accessible View/configuração de verbosity em aplicações fora do VS Code. Use padrões equivalentes do framework e verifique WCAG/WAI-ARIA para o contexto real.
