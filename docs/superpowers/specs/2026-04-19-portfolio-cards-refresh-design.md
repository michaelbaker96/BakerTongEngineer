<!-- 
  Avast! This here scroll details the plan for the "Visual-Forward" refresh 
  of our portfolio's treasure chest (the project cards). 
  It maps out the cinematic overhaul to make our screenshots the hero 
  while keeping the technical details in a glassmorphic sidebar.
-->

# Design Specification: Portfolio Project Cards Refresh (Visual-Forward)

- **Date:** 2026-04-19
- **Topic:** Porting the "Editorial" project cards to an "Immersive Hero" layout.
- **Status:** Approved by User

## 1. Overview
The current portfolio cards use a structured, metadata-heavy "editorial" layout. While clean, it doesn't emphasize the visual impact of the projects. This design refresh shifts the focus to a **Visual-Forward** approach, using full-width immersive hero images (the screenshots) and a sophisticated glassmorphic overlay for the project details.

## 2. Goals
- **Cinematic Scale:** Use project screenshots as high-impact hero backgrounds.
- **Technical Clarity:** Maintain the full depth of project information (Summary, Why it matters, Tech) but present it in a less cluttered way.
- **Modern Polish:** Introduce glassmorphism (backdrop-blur) and refined typography to elevate the "Premium" feel.
- **Responsiveness:** Ensure the design scales gracefully from massive desktop heroes to focused mobile cards.

## 3. Architecture & Components

### 3.1. `SelectedWorkSection` (`src/components/selected-work-section.tsx`)
- **Structure Change:** The `project-card` will be refactored to support a background-image layout.
- **Layout:** 
  - Desktop: A grid or flex container that stretches to a fixed height (e.g., `650px`).
  - Mobile: Stacks the content, potentially using the image as a smaller hero or background.
- **Overlay Panels:**
  - **Identity (Left):** Title, Primary Summary, and Action Buttons (GitHub, Live).
  - **Details (Right):** A `backdrop-filter: blur(20px)` sidebar containing the "Why it matters" and "Tech / approach" sections.

### 3.2. Styling (`src/app/globals.css`)
- **Backgrounds:** Use `background-image` with a semi-transparent gradient overlay to ensure text readability (`linear-gradient` to top/bottom).
- **Glassmorphism:** Define a class or utility for the blurred panel (`background: rgba(255, 255, 255, 0.05)`, `backdrop-filter: blur(20px)`, `border: 1px solid rgba(255, 255, 255, 0.1)`).
- **Typography:** Retain the serif headings but increase the scale for titles (`4rem` on desktop). Use high-contrast white text for immersive sections.
- **Cleanup:** Remove the existing `.project-card__layout` overrides that force stacking on large screens.

## 4. Technical Constraints
- **Accessibility:** Must ensure a high enough contrast ratio between the background image/gradients and the text. Use dark overlays at the bottom where text sits.
- **Performance:** Background images should be optimized (Next.js `Image` component preferred over CSS `background-image` for automatic sizing/WebP).
- **Browser Support:** Use `-webkit-backdrop-filter` for Safari support. Provide a solid background fallback for browsers that don't support `backdrop-filter`.

## 5. Testing Strategy
- **Visual Regression:** Verify the layout matches the approved mockup.
- **Responsive Check:** Test on Breakpoints (48rem/768px, 64rem/1024px, 80rem/1280px).
- **Contrast Verification:** Ensure text remains readable across different screenshot colors (potentially using a dark overlay by default).

## 6. Self-Review
1. **Placeholder scan:** No TBDs. Technical approach is defined.
2. **Internal consistency:** The architecture matches the component structure found in the research phase.
3. **Scope check:** This is a focused UI/UX refresh of a single section.
4. **Ambiguity check:** The "Glassmorphism" and "Immersive Hero" terms are explicitly defined through the visual mockup process.
