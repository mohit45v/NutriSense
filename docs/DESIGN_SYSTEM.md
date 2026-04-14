# Design System Specification: The Hyper-Precision Lab

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Hyper-Precision Lab."** 

We are moving away from the friendly, rounded "SaaS-standard" look. This system treats health data as a high-performance instrument—think bioluminescent signals in a dark clinical environment. By blending the aggressive geometric nature of editorial typography with a "Whoop-inspired" dark-ops aesthetic, we create an interface that feels less like a website and more like a specialized medical HUD. 

To break the "template" feel, we employ **Intentional Asymmetry**. Large-scale display numbers are often offset or bleeding slightly into margins, creating a sense of motion. We eschew structural lines in favor of depth created by light—specifically, subtle glows and tonal stacking that mimic the way light interacts with high-end carbon fiber and frosted glass.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep obsidian tones, punctuated by high-frequency accents that signal biological status.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. They feel "boxy" and cheap. Boundaries must be established through:
1.  **Background Shifts:** A `surface-container-low` section sitting against a `surface` background.
2.  **Tonal Transitions:** Using different surface tiers to distinguish between navigation and content.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials.
*   **Level 0 (Background):** `surface` (#0e0e0e) – The base floor.
*   **Level 1 (Sections):** `surface-container-low` (#131313) – Large layout areas.
*   **Level 2 (Active Cards):** `surface-container` (#1a1919) – Standard interactive units.
*   **Level 3 (Popovers/Overlays):** `surface-container-highest` (#262626) – Elements closest to the user.

### The "Glass & Gradient" Rule
To prevent a "flat" appearance, primary actions and health-critical scores should utilize **Signature Textures**. Instead of a flat `#00ff88`, use a subtle linear gradient from `primary` (#a4ffb9) to `primary_container` (#00fd87). This adds "soul" and mimics the quality of a high-resolution display.

---

## 3. Typography
We use a high-contrast editorial scale to prioritize readability of critical biometrics.

*   **Display (Space Grotesk):** Geometric, wide, and authoritative. Used for primary health metrics (e.g., "98 BPM") and large hero headers. The goal is "data-as-art."
*   **Headline & Title (Space Grotesk):** Used for section titles. Keep tracking tight to maintain the "clinical HUD" look.
*   **Body (Manrope):** Our workhorse. Manrope offers a modern, tech-focused readability that bridges the gap between geometric headers and functional data.
*   **Labels (Inter):** Reserved for technical metadata, timestamps, and micro-copy. 

**Editorial Note:** Always pair a `display-lg` metric with a `label-sm` unit indicator. The massive size difference creates a premium, data-dense hierarchy found in professional medical equipment.

---

## 4. Elevation & Depth
Depth is not achieved through shadows, but through **Tonal Layering** and **Luminescence**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background to create a "recessed" look. This is more sophisticated than a drop shadow.
*   **Ambient Glows:** When an element needs to float or signify "Healthy" status, use a diffused glow. Instead of a black shadow, use a shadow color of `primary` (#a4ffb9) at 6% opacity with a 32px blur. It should look like the light from the screen is hitting the table below it.
*   **The Ghost Border:** If a container requires a border for accessibility, use the `outline-variant` token at 15% opacity. Never use 100% opacity.
*   **Glassmorphism:** For top navigation bars or modal overlays, use `surface_bright` with a 12px backdrop-blur. This allows the neon health data to bleed through as the user scrolls, creating an integrated, high-tech experience.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary_container` (#00fd87) with `on_primary_fixed` (#004621) text. Roundedness: `md` (0.375rem).
*   **Secondary:** Ghost variant. No fill, `outline-variant` (15% opacity) border, `primary` text.
*   **Tertiary:** Text only. `on_surface_variant` text that shifts to `primary` on hover.

### Progress Gauges (The Pulse)
*   **Track:** `surface-container-highest`.
*   **Indicator:** `primary` (#a4ffb9) with a 2px inner glow. For warning states, swap to `secondary` (#ff7442). For danger, use `error` (#ff716c).

### Input Fields
*   **Style:** Minimalist underline or low-contrast container. 
*   **State:** When focused, the `outline` should glow with `primary` at 20% opacity. Label shifts to `label-sm` in `primary` color.

### Cards & Lists
*   **Rule:** No divider lines. Separate items using `surface-container-low` backgrounds or consistent 16px/24px vertical spacing.
*   **Interaction:** On hover, a card should shift from `surface-container` to `surface_bright` and gain a `primary` ghost border (10% opacity).

### Health Score Badges
*   **Style:** Pill-shaped (`full` roundedness).
*   **Logic:** Small, high-contrast badges (e.g., "STABLE") using `tertiary_container` for background and `on_tertiary` for text to create a high-alert editorial look.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. Let a graph bleed off the right edge of a card to suggest continuity.
*   **Do** use extreme typographic contrast. A 56pt number next to a 10pt label is the key to this aesthetic.
*   **Do** use tonal stacking (Surface on Surface-Container-Low) to define hierarchy.

### Don't
*   **Don't** use standard #000000 shadows. They muddy the clinical feel.
*   **Don't** use 1px solid white or grey borders. They break the "bioluminescent" immersion.
*   **Don't** use generic icon sets. Stick to thin-stroke, geometric icons that match the `outline` token weight.
*   **Don't** crowd the data. Health tracking requires "breathing room" to avoid looking like a cluttered spreadsheet. Use the `xl` (0.75rem) spacing as your minimum margin.
