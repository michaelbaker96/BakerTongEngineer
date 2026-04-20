# Alternating Editorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio project cards to use a clean, alternating editorial layout for better readability and visual rhythm.

**Architecture:** Use flexbox with `flex-direction: row-reverse` on even items for the alternating effect. Separate media and content into two distinct columns (1.2:1 ratio). Frame screenshots with padding and a subtle background.

**Tech Stack:** Next.js (App Router), TypeScript, Vanilla CSS.

---

### Task 1: Clean Up Previous Refresh Styles

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Remove `project-card--visual-forward` and associated styles**
We are moving away from the immersive hero approach. Remove these classes to start fresh.

```css
/* DELETE THESE BLOCKS */
.project-card--visual-forward { ... }
.project-card__bg-image { ... }
.project-card__overlay { ... }
.project-card__immersive-content { ... }
.project-card__main-layout { ... }
.project-card__identity { ... }
.project-card__glass-panel { ... }
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: remove visual-forward portfolio card styles"
```

---

### Task 2: Implement Alternating Editorial CSS

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add the new editorial layout classes**
Add the following styles to `globals.css`.

```css
/* Editorial Layout */
.selected-work-section__list {
  display: flex;
  flex-direction: column;
  gap: clamp(4rem, 8vw, 10rem);
  padding: 0;
  list-style: none;
}

.project-card--editorial {
  display: flex;
  align-items: center;
  gap: clamp(2rem, 5vw, 6rem);
  border: none;
  padding: 0;
  background: transparent;
}

/* Alternating Logic */
.selected-work-section__item:nth-child(even) .project-card--editorial {
  flex-direction: row-reverse;
}

.project-card__media {
  flex: 1.2;
  background: var(--bg-surface-soft, #f0f0f2);
  aspect-ratio: 16/10;
  border-radius: var(--radius-lg, 12px);
  padding: clamp(1rem, 3vw, 3rem);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.project-card__media-inner {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border-radius: var(--radius-md, 6px);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.project-card__content {
  flex: 1;
}

.project-card__eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-2);
}

.project-card__title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem);
  line-height: 1.1;
  margin-bottom: var(--space-6);
  color: var(--ink-strong);
}

.project-card__summary {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
}

.project-card__details {
  display: grid;
  gap: var(--space-6);
  border-top: 1px solid var(--border);
  padding-top: var(--space-6);
}

.project-card__detail-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--accent-bronze);
  margin-bottom: var(--space-1);
}

.project-card__detail-copy {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.project-card__approach-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  padding: 0;
}

.project-card__approach-item {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: var(--bg-surface-soft);
  border-radius: 4px;
}

/* Responsive adjustments */
@media (max-width: 64rem) {
  .project-card--editorial {
    gap: var(--space-8);
  }
}

@media (max-width: 48rem) {
  .project-card--editorial,
  .selected-work-section__item:nth-child(even) .project-card--editorial {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .project-card__media {
    width: 100%;
    flex: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add alternating editorial layout classes"
```

---

### Task 3: Refactor SelectedWorkSection Component

**Files:**
- Modify: `src/components/selected-work-section.tsx`

- [ ] **Step 1: Update the component structure**
Implement the new "Editorial" structure in the TSX.

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
                className="project-card project-card--editorial"
              >
                {/* Framed Media Column */}
                <div className="project-card__media">
                  <div className="project-card__media-inner">
                    <Image
                      alt={project.screenshot.alt}
                      src={project.screenshot.src}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className="project-card__content">
                  <header className="project-card__header">
                    <p className="project-card__eyebrow">
                      {projectNumber} • Featured project
                    </p>
                    <h3 className="project-card__title" id={titleId}>
                      {project.title}
                    </h3>
                    <p className="project-card__summary">{project.summary.text}</p>
                  </header>

                  <div className="project-card__details">
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

                    <div className="project-card__actions mt-6">
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

- [ ] **Step 2: Verify tests**
Run existing tests to ensure all labels and links are still present.

Run: `npm test src/app/page.test.tsx`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/selected-work-section.tsx
git commit -m "feat: refactor SelectedWorkSection to alternating editorial layout"
```

---

### Task 4: Final Validation and Polish

**Files:**
- Modify: `src/app/globals.css` (for any final tweaks)

- [ ] **Step 1: Verify mobile layout**
Ensure the layout stacks correctly and padding is appropriate for smaller screens.

- [ ] **Step 2: Run E2E tests**
Run: `npx playwright test tests/e2e/home.spec.ts`
Expected: PASS

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "chore: final polish for alternating editorial layout"
```
