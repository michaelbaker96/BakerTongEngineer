# Portfolio Project Cards Refresh (Visual-Forward) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a "Visual-Forward" refresh for the portfolio project cards, featuring immersive hero screenshots with glassmorphic technical overlays.

**Architecture:** Refactor the `ProjectCard` component to use `next/image` for full-width background visuals. Project metadata will be presented in two distinct overlay panels: identity on the left and technical details in a glassmorphic sidebar on the right.

**Tech Stack:** Next.js (App Router), TypeScript, Vanilla CSS, Tailwind CSS (for base utilities).

---

### Task 1: Clean Up Stacking Overrides

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Remove the vertical stacking override**
Remove the block at the end of `globals.css` that forces the project card layout to stack on all screen sizes.

```css
/* DELETE THIS BLOCK */
.project-card__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}
.project-card__media {
  width: 100%;
  display: block;
}
```

- [ ] **Step 2: Verify desktop layout returns to grid**
Run the dev server or check the layout to ensure it uses the media query grid (`min-width: 48.0625rem`) defined earlier in the file.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: remove project card stacking override"
```

---

### Task 2: Implement Visual-Forward CSS

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add glassmorphism and immersive layout styles**
Add the following styles to the `globals.css` file, preferably near the other `.project-card` classes.

```css
.project-card--visual-forward {
  position: relative;
  min-height: 650px;
  overflow: hidden;
  padding: 0; /* Override base padding */
  border: none;
  background: var(--ink-strong); /* Fallback */
}

.project-card__bg-image {
  position: absolute;
  inset: 0;
  z-index: 0;
  object-fit: cover;
  object-position: center;
  filter: contrast(1.05) brightness(0.8);
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
}

.project-card__immersive-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(var(--space-8), 6vw, var(--space-16));
}

.project-card__main-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-12);
}

.project-card__identity {
  flex: 1;
}

.project-card__glass-panel {
  flex: 0 0 320px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-8);
  border-radius: var(--radius-panel);
  display: grid;
  gap: var(--space-6);
}

/* Typography updates for dark theme */
.project-card--visual-forward .project-card__title {
  color: white;
  font-size: clamp(2.5rem, 2rem + 2.5vw, 4.5rem);
  line-height: 0.95;
}

.project-card--visual-forward .project-card__summary {
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--text-lead);
  margin-top: var(--space-4);
}

.project-card--visual-forward .project-card__detail-label {
  color: var(--accent-bronze); /* Or a lighter variant for contrast */
}

.project-card--visual-forward .project-card__detail-copy {
  color: rgba(255, 255, 255, 0.85);
}

.project-card--visual-forward .project-card__link {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
}

.project-card--visual-forward .project-card__link:hover {
  background: white;
  color: var(--ink-strong);
  border-color: white;
}

@media (max-width: 64rem) {
  .project-card__main-layout {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-8);
  }
  
  .project-card__glass-panel {
    flex: none;
    width: 100%;
  }
}

@media (max-width: 48rem) {
  .project-card--visual-forward {
    min-height: auto;
  }
  
  .project-card__immersive-content {
    position: static;
    padding: var(--space-6);
  }
  
  .project-card__bg-image {
    position: relative;
    height: 250px;
    inset: auto;
  }
}
```

- [ ] **Step 2: Commit styles**

```bash
git add src/app/globals.css
git commit -m "style: add Visual-Forward and glassmorphism classes"
```

---

### Task 3: Refactor SelectedWorkSection Component

**Files:**
- Modify: `src/components/selected-work-section.tsx`

- [ ] **Step 1: Import `Image` and update structure**
Refactor the component to use the new "Visual-Forward" structure.

```tsx
import Image from "next/image";
import { selectedWork } from "@/content/portfolio";

export function SelectedWorkSection() {
  return (
    <section aria-labelledby="selected-work-heading" id="work" className="selected-work-section">
      <div className="selected-work-section__intro">
        <p className="selected-work-section__eyebrow">Case studies</p>
        <h2 className="selected-work-section__heading" id="selected-work-heading">
          Selected Work
        </h2>
      </div>

      <ol aria-label="Featured projects" className="selected-work-section__list">
        {selectedWork.map((project, index) => {
          const titleId = `${project.id}-title`;
          const projectNumber = String(index + 1).padStart(2, "0");

          return (
            <li className="selected-work-section__item" key={project.id}>
              <article 
                aria-labelledby={titleId} 
                className="project-card project-card--visual-forward"
              >
                {/* Immersive Background */}
                <Image
                  alt={project.screenshot.alt}
                  className="project-card__bg-image"
                  src={project.screenshot.src}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
                <div className="project-card__overlay" />

                {/* Content Overlay */}
                <div className="project-card__immersive-content">
                  <div className="project-card__main-layout">
                    
                    {/* Identity Panel */}
                    <div className="project-card__identity">
                      <header className="project-card__header">
                        <p className="project-card__eyebrow">
                          <span className="project-card__index">{projectNumber}</span>
                          {" • "}
                          Featured project
                        </p>
                        <h3 className="project-card__title" id={titleId}>
                          {project.title}
                        </h3>
                        <p className="project-card__summary">{project.summary.text}</p>
                      </header>

                      <div className="project-card__actions mt-8">
                        <ul aria-label={`${project.title} links`} className="project-card__link-list">
                          {project.links.map((link) => (
                            <li key={link.href}>
                              <a
                                className="project-card__link"
                                href={link.href}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <span>{link.label}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Technical Glass Panel */}
                    <aside className="project-card__glass-panel">
                      <div className="project-card__detail">
                        <p className="project-card__detail-label">Why it matters</p>
                        <p className="project-card__detail-copy">{project.whyItMatters.text}</p>
                      </div>

                      <div className="project-card__detail">
                        <p className="project-card__detail-label">Tech / approach</p>
                        <ul
                          aria-label={`${project.title} tech and approach`}
                          className="project-card__approach-list"
                        >
                          {project.approach.map((item) => (
                            <li className="project-card__approach-item" key={item.id}>
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </aside>

                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
```

- [ ] **Step 2: Verify component rendering**
Run Vitest to ensure functional requirements (headings, links, labels) are still met.

Run: `npm test src/app/page.test.tsx`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/selected-work-section.tsx
git commit -m "feat: refactor ProjectCard to Visual-Forward layout"
```

---

### Task 4: Final Polish and E2E Validation

**Files:**
- Modify: `src/app/globals.css` (if needed for tweaks)

- [ ] **Step 1: Run E2E tests**
Ensure focusing and basic visibility still work as expected.

Run: `npx playwright test tests/e2e/home.spec.ts`
Expected: PASS

- [ ] **Step 2: Manual Responsive Check**
Verify the mobile layout still feels cohesive even if it drops the immersive background for a simpler stack.

- [ ] **Step 3: Final Commit**

```bash
git add .
git commit -m "chore: final polish for portfolio card refresh"
```
