import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SkillsSection } from "@/components/skills-section";
import { technicalSkills } from "@/content/portfolio";

describe("SkillsSection", () => {
  it("renders every skill group as a titled card with concrete, non-empty skills", () => {
    render(<SkillsSection />);

    const region = screen.getByRole("region", { name: "Skills" });

    expect(
      within(region).getByRole("heading", { level: 2, name: "Skills" })
    ).toBeInTheDocument();

    const list = within(region).getByRole("list", { name: "Technical skills" });
    const cards = within(list).getAllByRole("article");

    expect(cards).toHaveLength(technicalSkills.length);
    expect(
      within(list)
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent)
    ).toEqual(technicalSkills.map((group) => group.label));

    for (const [index, card] of cards.entries()) {
      const group = technicalSkills[index];
      const skillList = within(card).getByRole("list", {
        name: `${group.label} skills`,
      });
      const skillItems = within(skillList).getAllByRole("listitem");

      expect(skillItems).toHaveLength(group.skills.length);
      expect(skillItems.length).toBeGreaterThanOrEqual(4);

      for (const skill of group.skills) {
        expect(skill.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
