<!-- Ahoy! This scroll defines the Alternating Editorial layout for the portfolio cards, replacin' the immersive hero with a clean, high-contrast rhythm. -->

# Design Specification: Portfolio Project Cards Refresh (Alternating Editorial)

- **Date:** 2026-04-20
- **Topic:** Shifting from "Visual-Forward" overlays to an "Alternating Editorial" layout.
- **Status:** Approved by User

## 1. Overview
The previous "Visual-Forward" design placed text directly over immersive images, which led to readability issues and a cluttered aesthetic. This refresh implements an **Alternating Editorial** layout. By separating imagery and text into distinct columns and flipping their orientation as the user scrolls, we create a rhythmic, high-contrast, and premium "magazine" feel.

## 2. Goals
- **Guaranteed Readability:** All text sits on high-contrast backgrounds (light/dark surfaces), removing any competition with background images.
- **Visual Rhythm:** An alternating "Media | Content" and "Content | Media" pattern provides a natural flow that keeps the user engaged during scrolling.
- **Clear Information Hierarchy:** Metadata like "Tech / Approach" and "Why it matters" are elevated to primary sections rather than being tucked into overlays.
- **Mobile-First Flexibility:** The layout collapses into a clean vertical stack on smaller screens, ensuring the experience is robust across all devices.

## 3. Architecture & Components

### 3.1. `SelectedWorkSection` (`src/components/selected-work-section.tsx`)
- **Container:** A vertical list with significant spacing (e.g., `8rem` on desktop) between projects.
- **Project Item:** 
  - **Desktop:** A flex/grid container with two columns.
  - **Alternation:** Use `flex-direction: row-reverse` (or `grid-column` flipping) for every second item (`nth-child(even)`).
  - **Media Area (1.2 ratio):** A container that "frames" the screenshot with padding and a subtle background color to ensure the work stands out.
  - **Content Area (1 ratio):** A focused area for typography, including the project index, title, summary, and technical details.

### 3.2. Technical Details Component
- **Structure:** A grid or stack below the main summary.
- **Labels:** Small, uppercase, and accented (using the theme's bronze or gold) for "WHY IT MATTERS" and "TECH / APPROACH."
- **Typography:** Retain the project's signature serif headings for titles but use a clear sans-serif for body copy and technical lists.

### 3.3. Styling (`src/app/globals.css`)
- **Spacing:** Use fluid spacing (`clamp`) for margins and gaps to ensure the "Editorial" feel scales from tablet to large desktop.
- **Colors:** Use the project's `ink-strong` and `off-white` palette to create clear section boundaries.
- **Cleanup:** This implementation will involve a significant refactor of the `.project-card--visual-forward` styles and the removal of the previous immersive overlay logic.

## 4. Technical Constraints
- **Accessibility:** Must maintain WCAG AA/AAA contrast ratios for all body text.
- **Performance:** Ensure `next/image` is used with appropriate `sizes` and `priority` for the first visible item.
- **Responsive Breakpoint:** The "Side-by-side" layout should trigger at `48rem` (768px) or higher, with a vertical stack below that.

## 5. Testing Strategy
- **Manual Visual Review:** Confirm the alternating rhythm feels balanced and rhythmic.
- **Cross-Browser:** Verify the flex/grid reversal works across modern browsers (Chrome, Safari, Firefox).
- **Responsive Check:** Test the transition from stack to side-by-side at the defined breakpoints.

## 6. Self-Review
1. **Placeholder scan:** No TBDs. Layout logic is clearly defined.
2. **Internal consistency:** The design addresses the readability concerns that triggered the refresh.
3. **Scope check:** Focused on the `SelectedWorkSection` refactor.
4. **Ambiguity check:** The "Alternating" logic and column ratios are explicitly stated.
