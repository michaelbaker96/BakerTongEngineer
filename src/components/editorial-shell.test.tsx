import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import { EditorialShell } from "@/components/editorial-shell";
import { contact, education, engineeringHighlights, workExperience } from "@/content/portfolio";

describe("EditorialShell", () => {
  it("renders the top anchor navigation around the homepage hero", () => {
    render(
      <EditorialShell>
        <Home />
      </EditorialShell>
    );

    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "#work"
    );
    expect(screen.getByRole("link", { name: "Highlights" })).toHaveAttribute(
      "href",
      "#highlights"
    );
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute(
      "href",
      "#experience"
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "#contact"
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Michael Baker-Tong" })
    ).toBeInTheDocument();
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Highlights" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Experience" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Contact" })
    ).toBeInTheDocument();
    expect(document.querySelector("#work")).toBeInTheDocument();
    expect(document.querySelector("#highlights")).toBeInTheDocument();
    expect(document.querySelector("#experience")).toBeInTheDocument();
    expect(document.querySelector("#contact")).toBeInTheDocument();
    expect(document.querySelector("#education")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Education" })).not.toBeInTheDocument();
  });

  it("renders the contact section with only the approved public links and explicit accessible names", () => {
    render(
      <EditorialShell>
        <Home />
      </EditorialShell>
    );

    const contactSection = screen.getByRole("region", { name: "Contact" });
    const contactLinks = within(contactSection).getAllByRole("link");

    expect(contactLinks).toHaveLength(3);
    expect(contactLinks.map((link) => link.textContent)).toEqual(contact.links.map((link) => link.label));
    expect(
      within(contactSection).getByRole("link", {
        name: "GitHub profile for Michael Baker-Tong",
      })
    ).toHaveAttribute("href", contact.links[0].href);
    expect(
      within(contactSection).getByRole("link", {
        name: "LinkedIn profile for Michael Baker-Tong",
      })
    ).toHaveAttribute("href", contact.links[1].href);
    expect(
      within(contactSection).getByRole("link", {
        name: "Email Michael Baker-Tong",
      })
    ).toHaveAttribute("href", contact.links[2].href);
    expect(within(contactSection).queryByRole("link", { name: "Resume" })).not.toBeInTheDocument();
  });

  it("renders the highlights anchor as five ordered capability pillars with bounded keywords", () => {
    render(
      <EditorialShell>
        <Home />
      </EditorialShell>
    );

    const highlightsSection = screen.getByRole("region", { name: "Highlights" });
    const highlightsList = within(highlightsSection).getByRole("list", {
      name: "Engineering highlights",
    });
    const highlightCards = within(highlightsList).getAllByRole("article");

    expect(highlightCards).toHaveLength(5);
    expect(
      within(highlightsList)
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent)
    ).toEqual(engineeringHighlights.map((highlight) => highlight.title));

    for (const [index, card] of highlightCards.entries()) {
      const content = engineeringHighlights[index];
      const keywordList = within(card).getByRole("list", {
        name: `${content.title} keywords`,
      });
      const keywordItems = within(keywordList).getAllByRole("listitem");

      expect(within(card).getByText(content.description.text)).toBeInTheDocument();
      expect(keywordItems.length).toBeGreaterThanOrEqual(2);
      expect(keywordItems.length).toBeLessThanOrEqual(4);
      expect(card).not.toHaveTextContent(/Certification|Award|0410966572|0410 966 572/i);
    }
  });

  it("renders work experience in exact reverse chronological order with inline education only", () => {
    render(
      <EditorialShell>
        <Home />
      </EditorialShell>
    );

    const experienceSection = screen.getByRole("region", { name: "Experience" });
    const experienceList = within(experienceSection).getByRole("list", {
      name: "Work experience",
    });
    const experienceCards = within(experienceList).getAllByRole("article");

    expect(experienceCards).toHaveLength(4);
    expect(
      within(experienceList)
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent)
    ).toEqual([
      "Senior Software Engineer — Faethm by Pearson (2022–2026)",
      "Software Engineer — Commonwealth Bank (2021)",
      "Software Engineer — Energy Action (2020–2021)",
      "Software Engineer — Pooled Energy (2018–2020)",
    ]);

    for (const [index, card] of experienceCards.entries()) {
      const role = workExperience[index];
      const bulletList = within(card).getByRole("list", {
        name: `${role.company} highlights`,
      });
      const bullets = within(bulletList).getAllByRole("listitem");

      expect(within(card).getByText(role.summary.text)).toBeInTheDocument();
      expect(bullets).toHaveLength(role.highlights.length);
      expect(bullets.length).toBeGreaterThanOrEqual(2);
      expect(bullets.length).toBeLessThanOrEqual(3);
    }

    expect(within(experienceSection).getByText(education[0].institution)).toBeInTheDocument();
    expect(within(experienceSection).getByText(education[0].degree)).toBeInTheDocument();
    expect(within(experienceSection).getByText(education[0].period)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "Education" })).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Education" })).not.toBeInTheDocument();
  });
});
