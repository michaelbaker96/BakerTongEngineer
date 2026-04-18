import { selectedWork } from "@/content/portfolio";

export function SelectedWorkSection() {
  return (
    <section aria-labelledby="selected-work-heading" className="selected-work-section">
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
              <article aria-labelledby={titleId} className="project-card">
                <div className="project-card__meta">
                  <p className="project-card__index">{projectNumber}</p>
                  <p className="project-card__eyebrow">Featured project</p>
                </div>

                <div className="project-card__content">
                  <header className="project-card__header">
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

                    <div className="project-card__detail project-card__detail--full">
                      <p className="project-card__detail-label">Outbound links</p>
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
