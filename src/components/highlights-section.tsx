import { engineeringHighlights } from "@/content/portfolio";

export function HighlightsSection() {
  return (
    <section aria-labelledby="highlights-heading" className="editorial-section highlights-section" id="highlights">
      <div className="editorial-frame highlights-section__frame">
        <div className="highlights-section__intro">
          <p className="editorial-anchor__eyebrow">Engineering profile</p>
          <h2 className="editorial-anchor__title highlights-section__title" id="highlights-heading">
            Highlights
          </h2>
          <p className="highlights-section__lede">
            Recruiter-facing capability pillars grounded in the public resume and project record.
          </p>
        </div>

        <ol aria-label="Engineering highlights" className="highlights-section__list">
          {engineeringHighlights.map((highlight) => {
            const titleId = `${highlight.id}-title`;

            return (
              <li className="highlights-section__item" key={highlight.id}>
                <article aria-labelledby={titleId} className="highlights-card">
                  <div className="highlights-card__content">
                    <h3 className="highlights-card__title" id={titleId}>
                      {highlight.title}
                    </h3>
                    <p className="highlights-card__summary">{highlight.description.text}</p>
                  </div>

                  <div className="highlights-card__keywords-block">
                    <p className="project-card__detail-label">Verified keywords</p>
                    <ul aria-label={`${highlight.title} keywords`} className="highlights-card__keyword-list">
                      {highlight.keywords.map((keyword) => (
                        <li className="highlights-card__keyword" key={keyword.id}>
                          {keyword.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
