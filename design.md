# Design — GnaryLex

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
modern-minimal

## Macrostructure family

- App pages (dashboard, learn, vocabulary, flashcards, practice, quiz, review, progress, favorites, profile, settings, help): **Workbench** — product function carries the page. Sidebar-driven navigation, content-first layout with generous whitespace and clean card surfaces.
- Auth pages (login, register, forgot-password): **Split Studio** — headline + brand panel on one side, form on the other. 5/7 columns.

## Theme

- `--color-paper`      oklch(98.5% 0.004 200)    /* cool off-white, barely tinted teal */
- `--color-paper-2`    oklch(96%   0.006 200)    /* card surfaces */
- `--color-paper-3`    oklch(93.5% 0.008 200)    /* hover / muted bg */
- `--color-ink`        oklch(18%   0.012 220)    /* near-black, cool-tinted */
- `--color-ink-2`      oklch(45%   0.010 220)    /* secondary text */
- `--color-ink-3`      oklch(62%   0.008 220)    /* muted / placeholder text */
- `--color-rule`       oklch(88%   0.006 200)    /* borders, dividers */
- `--color-accent`     oklch(52%   0.155 175)    /* teal — the signature accent */
- `--color-accent-hover` oklch(46% 0.145 175)    /* accent hover state */
- `--color-accent-ink` oklch(99%   0.005 175)    /* text on accent bg */
- `--color-focus`      oklch(58%   0.16  175)    /* focus ring */

### Status palette (OKLCH, low-saturation)

- `--color-success`    oklch(60%  0.16  145)
- `--color-warning`    oklch(72%  0.16   75)
- `--color-error`      oklch(55%  0.18   25)

### Dark mode

- `--color-paper`      oklch(14%  0.008  200)
- `--color-paper-2`    oklch(18%  0.010  200)
- `--color-paper-3`    oklch(22%  0.012  200)
- `--color-ink`        oklch(94%  0.006  200)
- `--color-ink-2`      oklch(72%  0.008  200)
- `--color-ink-3`      oklch(52%  0.006  200)
- `--color-rule`       oklch(26%  0.008  200)
- `--color-accent`     oklch(62%  0.14   175)
- `--color-accent-hover` oklch(68% 0.12  175)
- `--color-focus`      oklch(62%  0.14   175)

### Paper-band / display-style / accent-hue (diversification axes)

- Paper band: light (L > 85%)
- Display style: geometric-sans (Space Grotesk)
- Accent hue: cool (teal, 175°)

## Typography

- Display: Space Grotesk, weight 600–700, style normal
- Body:    Geist, weight 400
- Mono:    JetBrains Mono, weight 400–500
- Display tracking: -0.03em
- Type scale anchor: `--text-display` = clamp(2.25rem, 4vw + 0.5rem, 3.5rem)

### Scale (major third — 1.25)

- `--text-xs`:      0.75rem
- `--text-sm`:      0.875rem
- `--text-base`:    1rem
- `--text-md`:      1.125rem
- `--text-lg`:      1.375rem
- `--text-xl`:      1.75rem
- `--text-2xl`:     2.25rem
- `--text-3xl`:     2.75rem
- `--text-display`: clamp(2.25rem, 4vw + 0.5rem, 3.5rem)

## Spacing

4-point named scale. The values are in `tokens.css`. Pages must use named
tokens (`var(--space-md)`), never raw values.

## Motion

- Easings: `--ease-out` = cubic-bezier(0.16, 1, 0.3, 1)
- Reveal pattern: fade + subtle y-translate (8px), staggered by index
- Duration: micro 120ms, short 220ms, long 350ms
- framer-motion is the motion library for React-level animations
- Reduced-motion fallback: opacity-only, ≤ 150ms

## Microinteractions stance

- Silent success (no celebratory toasts — confirm inline)
- Hover delay 800ms · focus delay 0ms
- Button hover: subtle translateY(-1px) lift + bg shift
- Optimistic update + Undo over confirmation dialogs

## CTA voice

- Primary CTA: filled teal bg, white text, 6px radius, Space Grotesk 500 label
- Secondary CTA: outlined, 1px border, transparent bg, ink text, 6px radius
- Ghost CTA: no border, transparent, ink-2 text, hover bg-paper-3

## Per-page allowances

- Dashboard MAY use accent-coloured progress indicators and stat highlights
- Auth pages MAY use brand panel gradient (teal-based)
- All other app pages: functional surfaces only — no decorative gradients

## What pages MUST share

- The wordmark (Space Grotesk 700, paired with Lucide BookOpen icon)
- The accent colour (teal) and its placement (≤ 5% per viewport)
- The display + body fonts (Space Grotesk + Geist)
- The CTA voice (button shape, 6px radius, padding rhythm)
- Card surface treatment (paper-2 bg, 1px rule border, 10px radius)
- Sidebar navigation with active-state left-border indicator

## What pages MAY differ on

- Content layout within the main area (grid cols, card arrangements)
- Section heading size (h2 vs h3) based on content hierarchy
- Use of progress indicators / charts / interactive elements

## Exports

### tokens.css
See `tokens.css` at project root.
