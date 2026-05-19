import { HighlightsSection } from "@/components/highlights-section";
import { SkillsSection } from "@/components/skills-section";
import { RESUME_PDF_PATH, contact, education, workExperience } from "@/content/portfolio";

const sectionLinks = [
  { href: "#work", label: "Work" },
  { href: "#highlights", label: "Highlights" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

type EditorialShellProps = {
  children: React.ReactNode;
};

const inlineEducation = education[0];

const contactAccessibleLabels = {
  github: "GitHub profile for Michael Baker-Tong",
  linkedin: "LinkedIn profile for Michael Baker-Tong",
  email: "Email Michael Baker-Tong",
} as const;

export function EditorialShell({ children }: EditorialShellProps) {
  return (
    <div className="editorial-shell">
      <header className="editorial-header">
        <div className="editorial-frame editorial-header__inner">
          <a className="editorial-brand" href="#work">
            BakerTongEngineer
          </a>

          <nav aria-label="Primary" className="editorial-nav">
            <ul className="editorial-nav__list">
              {sectionLinks.map((sectionLink) => (
                <li key={sectionLink.href}>
                  <a className="editorial-nav__link" href={sectionLink.href}>
                    {sectionLink.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  aria-label="Open the printable résumé for Michael Baker-Tong"
                  className="editorial-nav__resume"
                  href={RESUME_PDF_PATH}
                >
                  Résumé
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="editorial-main">
        <section aria-labelledby="work-heading" className="editorial-section editorial-work" id="work">
          <h2 className="sr-only" id="work-heading">
            Work
          </h2>
          {children}
        </section>

        <HighlightsSection />

        <SkillsSection />

        <section aria-labelledby="experience-heading" className="editorial-section experience-section" id="experience">
          <div className="editorial-frame experience-section__frame">
            <div className="experience-section__intro">
              <p className="editorial-anchor__eyebrow">Career history</p>
              <h2 className="editorial-anchor__title experience-section__title" id="experience-heading">
                Experience
              </h2>
              <p className="experience-section__lede">
                Recent roles across AI-enabled data platforms, regulated financial systems, and energy software delivery.
              </p>
            </div>

            <ol aria-label="Work experience" className="experience-section__list">
              {workExperience.map((role) => {
                const titleId = `${role.id}-title`;

                return (
                  <li className="experience-section__item" key={role.id}>
                    <article aria-labelledby={titleId} className="experience-card">
                      <div className="experience-card__content">
                        <div className="experience-card__heading-block">
                          <h3 className="experience-card__company" id={titleId}>
                            {role.title} — {role.company} ({role.period})
                          </h3>
                          <p className="experience-card__context">{role.context}</p>
                        </div>
                        <p className="experience-card__summary">{role.summary.text}</p>
                      </div>

                      <ul aria-label={`${role.company} highlights`} className="experience-card__bullets">
                        {role.highlights.map((highlight) => (
                          <li className="experience-card__bullet" key={highlight.id}>
                            {highlight.text}
                          </li>
                        ))}
                      </ul>

                      <div className="experience-card__stack">
                        <p className="project-card__detail-label">Tech stack</p>
                        <ul
                          aria-label={`${role.company} tech stack`}
                          className="experience-card__stack-list"
                        >
                          {role.stack.map((tech) => (
                            <li className="experience-card__stack-item" key={tech}>
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>

            {inlineEducation ? (
              <div className="experience-section__education">
                <p className="editorial-anchor__eyebrow">Education</p>
                <div className="experience-section__education-row">
                  <p className="experience-section__education-institution">{inlineEducation.institution}</p>
                  <p className="experience-section__education-degree">{inlineEducation.degree}</p>
                  <p className="experience-section__education-period">{inlineEducation.period}</p>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section aria-labelledby="contact-heading" className="editorial-section contact-section" id="contact">
          <div className="editorial-frame contact-section__frame">
            <div className="contact-section__intro">
              <p className="editorial-anchor__eyebrow">Direct contact</p>
              <h2 className="editorial-anchor__title contact-section__title" id="contact-heading">
                Contact
              </h2>
              <p className="contact-section__lede">
                GitHub, LinkedIn, and email for recruiter and hiring conversations.
              </p>
            </div>

            <ul aria-label="Contact links" className="contact-section__list">
              {contact.links.map((link) => (
                <li className="contact-section__item" key={link.id}>
                  <a
                    aria-label={contactAccessibleLabels[link.id]}
                    className="contact-section__link"
                    href={link.href}
                  >
                    <span className="contact-section__link-label">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div aria-hidden="true" className="editorial-anchor__rule" />
          </div>
        </section>
      </div>

      <footer className="editorial-footer">
        <div className="editorial-frame editorial-footer__inner">
          <p className="editorial-footer__brand">BakerTongEngineer</p>
          <p className="editorial-footer__copy">© 2026 Michael Baker-Tong</p>
        </div>
      </footer>
    </div>
  );
}
