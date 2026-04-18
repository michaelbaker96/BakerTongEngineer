import { contact, hero } from "@/content/portfolio";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="hero-section">
      <div className="hero-section__content">
        <p className="hero-section__role">{hero.role.text}</p>
        <h1 className="hero-section__heading" id="hero-heading">
          {hero.brand.text}
        </h1>
        <p className="hero-section__summary">{hero.summary.text}</p>

        <nav aria-label="Hero calls to action" className="hero-section__actions">
          <ul className="hero-section__action-list">
            {contact.links.map((link) => (
              <li key={link.id}>
                <a className="hero-section__action-link" href={link.href}>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <aside aria-label="Credibility signals" className="hero-section__signals">
        <p className="hero-section__signals-label">Core strengths</p>
        <ul className="hero-section__signal-list">
          {hero.signals.map((signal) => (
            <li className="hero-section__signal" key={signal.id}>
              <span aria-hidden="true" className="hero-section__signal-mark" />
              <span>{signal.text}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
