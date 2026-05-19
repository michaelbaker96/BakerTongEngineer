import type { Metadata } from "next";

import {
  contact,
  education,
  hero,
  technicalSkills,
  workExperience,
} from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Résumé — Michael Baker-Tong",
  description:
    "Printable résumé for Michael Baker-Tong, Senior Software Engineer specialising in scalable cloud architecture, distributed systems, and AI-enabled data platforms.",
  robots: { index: false, follow: false },
};

const contactDisplay = contact.links.map((link) => ({
  id: link.id,
  label: link.label,
  href: link.href,
  value:
    link.id === "email"
      ? link.href.replace("mailto:", "")
      : link.href.replace(/^https?:\/\//, ""),
}));

export default function ResumePage() {
  return (
    <main className="resume">
      <div className="resume__sheet">
        <header className="resume__header">
          <div>
            <h1 className="resume__name">{hero.brand.text}</h1>
            <p className="resume__role">{hero.role.text}</p>
            <p className="resume__location">{hero.location}</p>
          </div>
          <ul className="resume__contact" aria-label="Contact details">
            {contactDisplay.map((item) => (
              <li key={item.id}>
                <span className="resume__contact-label">{item.label}</span>
                <a className="resume__contact-link" href={item.href}>
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <section className="resume__section" aria-labelledby="resume-summary">
          <h2 className="resume__section-title" id="resume-summary">
            Profile
          </h2>
          <p className="resume__summary">{hero.summary.text}</p>
        </section>

        <section className="resume__section" aria-labelledby="resume-skills">
          <h2 className="resume__section-title" id="resume-skills">
            Technical Skills
          </h2>
          <dl className="resume__skills">
            {technicalSkills.map((group) => (
              <div className="resume__skill-row" key={group.id}>
                <dt className="resume__skill-label">{group.label}</dt>
                <dd className="resume__skill-values">{group.skills.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="resume__section" aria-labelledby="resume-experience">
          <h2 className="resume__section-title" id="resume-experience">
            Experience
          </h2>
          <ol className="resume__experience" aria-label="Work experience">
            {workExperience.map((role) => (
              <li className="resume__role" key={role.id}>
                <div className="resume__role-head">
                  <h3 className="resume__role-title">
                    {role.title} — {role.company}
                  </h3>
                  <span className="resume__role-period">{role.period}</span>
                </div>
                <p className="resume__role-context">{role.context}</p>
                <p className="resume__role-summary">{role.summary.text}</p>
                <ul className="resume__bullets" aria-label={`${role.company} achievements`}>
                  {role.highlights.map((highlight) => (
                    <li key={highlight.id}>{highlight.text}</li>
                  ))}
                </ul>
                <p className="resume__role-stack">{role.stack.join(" · ")}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="resume__section" aria-labelledby="resume-education">
          <h2 className="resume__section-title" id="resume-education">
            Education
          </h2>
          <ul className="resume__education" aria-label="Education">
            {education.map((item) => (
              <li className="resume__education-row" key={item.id}>
                <span className="resume__education-institution">{item.institution}</span>
                <span className="resume__education-degree">{item.degree}</span>
                <span className="resume__education-period">{item.period}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="resume__print-hint" aria-hidden="true">
          Tip: use your browser&rsquo;s Print dialog and choose &ldquo;Save as PDF&rdquo;.
        </p>
      </div>
    </main>
  );
}
