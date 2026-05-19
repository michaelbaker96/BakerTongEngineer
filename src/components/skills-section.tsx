import { technicalSkills } from "@/content/portfolio";

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="editorial-section skills-section" id="skills">
      <div className="editorial-frame skills-section__frame">
        <div className="skills-section__intro">
          <p className="editorial-anchor__eyebrow">Technical toolkit</p>
          <h2 className="editorial-anchor__title skills-section__title" id="skills-heading">
            Skills
          </h2>
          <p className="skills-section__lede">
            The languages, platforms, and practices I reach for when building and operating
            production data and AI systems.
          </p>
        </div>

        <ol aria-label="Technical skills" className="skills-section__list">
          {technicalSkills.map((group) => {
            const groupTitleId = `${group.id}-title`;

            return (
              <li className="skills-section__item" key={group.id}>
                <article aria-labelledby={groupTitleId} className="skills-card">
                  <div className="skills-card__heading">
                    <h3 className="skills-card__title" id={groupTitleId}>
                      {group.label}
                    </h3>
                    <p className="skills-card__caption">{group.caption}</p>
                  </div>

                  <ul aria-label={`${group.label} skills`} className="skills-card__list">
                    {group.skills.map((skill) => (
                      <li className="skills-card__skill" key={skill}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
