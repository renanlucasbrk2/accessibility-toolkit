---
name: cross-platform-accessibility
description: Gives implementation guidance for accessible Web, iOS, and Android interfaces, with WCAG 2.2 references, platform semantics, and manual validation. Use when designing or auditing a cross-platform UI component.
---

# Cross-platform accessibility

Use this Skill to translate an interaction's purpose into platform-native semantics and test steps. First identify whether the target is a web page, native app, or embedded web view. The same attribute names and conformance claims do not transfer automatically between platforms.

## Choose the right reference standard

- **Web content:** treat WCAG 2.2 success criteria as the normative requirements. Confirm the exact criterion text, level, exceptions, and scope before reporting a failure.
- **Native iOS/Android software:** use the platform's accessibility APIs and current platform design/developer guidance. WCAG2ICT offers informative guidance for applying WCAG 2 A/AA criteria to non-web software; it is not itself a normative standard and does not cover every platform-specific need.
- **Hybrid apps:** assess web content and native shell interactions in their actual contexts; document which reference applies to each finding.

## Implementation workflow

1. Describe the component's user task, inputs, output, states, and errors.
2. Choose the most semantic native control available. On the web, prefer HTML elements such as `<button>`, `<a>`, and `<label>` before adding ARIA. In SwiftUI and Jetpack Compose, preserve built-in accessibility semantics and add modifiers only when they supply missing information.
3. Check the accessible name, role, value/state, instructions, focus behavior, and any dynamic updates. Names should describe purpose; do not add redundant labels that cause repeated announcements.
4. Check visual and pointer requirements using the actual platform and applicable exceptions. Keep WCAG thresholds separate from platform recommendations.
5. Test complete interactions with keyboard/switch and relevant assistive technology. A code pattern or automated rule alone does not establish usability or conformance.
6. Report evidence, platform/version, state tested, criterion or platform guidance, uncertainty, suggested correction, and retest steps.

## Web: WCAG 2.2 details to apply carefully

- **Contrast:** SC 1.4.3 requires 4.5:1 for normal text and 3:1 for large text, with specified exceptions. SC 1.4.11 separately applies 3:1 to visual information needed to identify UI components and states and to meaningful graphical objects, with exceptions. Do not collapse these checks into one generic “UI contrast” rule.
- **Reflow:** SC 1.4.10 tests content at a width equivalent to 320 CSS pixels for vertically scrolling content, and a height equivalent to 256 CSS pixels for horizontally scrolling content, without loss of information/functionality or two-dimensional scrolling except for parts whose usage or meaning requires it. 320 CSS px commonly corresponds to 400% zoom from a 1280 CSS px viewport; “zoom to 400%” alone is not the success criterion.
- **Target size:** SC 2.5.8 is about pointer targets of at least 24 by 24 CSS pixels, with spacing, equivalent-control, inline, and user-agent exceptions. Check the exact exception before reporting a failure.
- **Keyboard focus:** SC 2.4.7 requires a visible keyboard focus indicator. SC 2.4.11 requires that a focused component is not entirely hidden by author-created content. These are different checks.
- **Keyboard trap and dialogs:** SC 2.1.2 requires that focus can be moved away using a keyboard interface and that a non-standard exit method is explained. It does not itself prescribe focus trapping. For a modal dialog, follow the WAI-ARIA APG dialog pattern, including keeping keyboard focus within the modal while it is open, Escape behavior, and restoring context on close where appropriate.
- **Forms and repeated input:** SC 3.3.3 asks for an error suggestion when one is known and can be provided. SC 3.3.7 addresses re-entering information already supplied in the same process, subject to its exceptions. Confirm the complete criterion before applying either rule.
- **Dynamic updates:** use a suitable native live region/status mechanism when an update needs to be programmatically determinable. Do not add `aria-live` to every dynamic element; announcements should be useful and not duplicated.

## Native platform semantics

- **SwiftUI:** use built-in control semantics first. Add `accessibilityLabel`, `accessibilityValue`, or `accessibilityHint` when VoiceOver otherwise lacks the necessary purpose, state, or action context. Verify the spoken result on supported OS versions.
- **Jetpack Compose:** prefer Material/Compose controls with their built-in semantics. Add `Modifier.semantics` or a content description when the default semantics do not convey the element's purpose or state. Avoid replacing useful visible text or native state with redundant `contentDescription` values.
- Platform target-size values such as Apple's 44 pt hit-region guidance or Android's 48 dp touch-target recommendation are platform design guidance, not the WCAG 2.5.8 web threshold. Apply the current guidance for the target platform and control type.

## Reporting template

```text
Platform/build:
User task and UI state:
Observed evidence and reproduction steps:
Reference: exact WCAG criterion or platform guidance (mark uncertain mappings as “to confirm”)
User impact:
Suggested correction:
Retest method and assistive technology:
Unassessed states / limitations:
```

Do not issue a global conformance claim from component review, source inspection, or automated scans. Distinguish a verified failure, a manual-review question, and an untested condition.

## References

- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- WCAG2ICT 2.2 informative guidance: <https://www.w3.org/TR/wcag2ict-22/>
- WAI-ARIA Authoring Practices: <https://www.w3.org/WAI/ARIA/apg/>
- Apple SwiftUI accessibility: <https://developer.apple.com/documentation/swiftui/view-accessibility>
- Apple accessibility design guidance: <https://developer.apple.com/design/human-interface-guidelines/accessibility>
- Android Compose semantics: <https://developer.android.com/develop/ui/compose/accessibility/semantics>
- Android accessibility recommendations: <https://developer.android.com/guide/topics/ui/accessibility/apps>
