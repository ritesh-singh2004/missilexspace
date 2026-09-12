---
name: polish
description: Frontend polish and refinement skill. Use when the user asks to "polish", "/polish", clean up, refine, or add high-craft finishing touches to UI, components, pages, or frontend code. Focuses on optical alignment, typography hierarchy, responsive finesse, interaction states, accessibility, and eliminating AI slop.
---

# Frontend Polish (/polish)

A surgical refinement skill inspired by Claude Code's `/polish` command and high-craft design engineering.

> **Principle**: Polish is refinement, never concealed redesign. It preserves existing structure, content, and brand intent while taking the execution from prototype to production-grade craft.

---

## 1. The Polish Checklist

When invoked to polish a component, page, or feature, execute these passes systematically:

### A. Visual Hierarchy & Optical Alignment
* **Optical over Mathematical**: Center icons and badges by visual weight, not just raw flexbox math (e.g. play triangles need a slight positive X offset).
* **Grid & Spacing Rhythm**: Snap inconsistent margins and paddings to a consistent 4px/8px scale (`gap-2`, `gap-4`, `gap-6`, `gap-8`). Eliminate awkward arbitrary pixels (`mt-[13px]`).
* **Content Grouping**: Group tightly related items (title + subtitle, label + input) with small gaps (`gap-1` or `gap-1.5`) and separate distinct sections generously (`py-12` to `py-20`).

### B. Typography & Text Rhythm
* **Hierarchy Contrast**: Ensure clear distinction between H1, H2, H3, body, and caption text. Avoid having 3 different font sizes that all look similar.
* **Line Height & Measure**:
  * Large headlines: tight leading (`leading-tight` or `leading-[1.1]`).
  * Body copy: comfortable line height (`leading-relaxed` or `leading-6`), capped at 65–75 characters per line (`max-w-prose` or `max-w-xl`).
* **Micro-Typography**: Proper typographic glyphs (use real em-dashes `—`, curly apostrophes where appropriate, and tabular numbers `tabular-nums` for timers, prices, and metrics).

### C. State Machine Completeness (All 7 States)
Ensure every interactive component cleanly handles all 7 UI states:
1. **Default**: Clear visual affordance.
2. **Hover**: Smooth, subtle feedback (`transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md`).
3. **Active/Pressed**: Tactile response (`active:scale-[0.98] active:translate-y-0`).
4. **Focus-Visible**: Accessible ring (`focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none`).
5. **Loading / Async**: Disabled pointer, spinner or skeleton shimmer, no layout jump.
6. **Disabled**: Muted opacity (`opacity-50 cursor-not-allowed pointer-events-none`).
7. **Empty / Error**: Human-readable error message positioned close to the origin, graceful empty state illustration or fallback.

### D. Anti-Slop Discipline
* **Kill Border Soup**: Don't put a border on every single container, card, inner badge, and button. Use subtle background tone shifts (`bg-slate-50` or `bg-neutral-900/40`) to create boundaries instead.
* **Tame Gradients**: Replace harsh multi-stop AI purple-to-blue gradients with subtle monochromatic radial glows or intentional solid brand accents.
* **Real Icons over Emojis**: Replace raw emojis in UI buttons or navigation with crisp SVG icons (Lucide, Heroicons, or Radix).

### E. Micro-Interactions & Animation
* **Restrained Duration**: Micro-interactions must be fast (`150ms–250ms`). Never make dropdowns, tabs, or modals feel sluggish with 500ms+ animations.
* **Natural Easing**: Use `ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances and `ease-in` for exits. Avoid linear animation on UI objects.
* **Respect Reduced Motion**: Always wrap motion with `@media (prefers-reduced-motion: reduce)` or `motion-reduce:transition-none`.

### F. Accessibility (WCAG AA Minimum)
* **Text Contrast**: Normal text minimum 4.5:1 ratio against its background.
* **Touch Targets**: Minimum 44x44px bounding box on mobile tap targets.
* **Icon Buttons**: Always have `aria-label` on icon-only buttons.

---

## 2. Review & Output Format

When polishing code, present changes clearly with:
1. **Identified Polish Opportunities**: Bulleted list of what was loose, inconsistent, or unpolished.
2. **The Refined Implementation**: Production-ready code with comments explaining non-obvious optical tweaks.
3. **Summary of Polish Applied**: Brief explanation of improvements in visual hierarchy, interaction states, and accessibility.
