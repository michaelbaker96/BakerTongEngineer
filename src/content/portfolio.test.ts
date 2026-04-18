import { describe, expect, it } from "vitest";

import {
  claimSourceMatrix,
  contact,
  education,
  engineeringHighlights,
  hero,
  portfolioContent,
  selectedWork,
  sourceCatalog,
  workExperience,
} from "@/content/portfolio";

describe("portfolio content", () => {
  it("exports the required public sections", () => {
    expect(hero.section).toBe("Hero");
    expect(hero.signals).toHaveLength(4);
    expect(portfolioContent.hero).toBe(hero);
    expect(portfolioContent.selectedWork).toBe(selectedWork);
    expect(portfolioContent.engineeringHighlights).toBe(engineeringHighlights);
    expect(portfolioContent.workExperience).toBe(workExperience);
    expect(portfolioContent.contact).toBe(contact);
  });

  it("keeps recruiter-facing hero content limited to approved public identity and signals", () => {
    expect(hero.brand.text).toBe("Michael Baker-Tong");
    expect(hero.role.text).toBe("Senior Software Engineer");
    expect(hero.summary.text).toContain("scalable cloud architecture");
    expect(hero.summary.text).toContain("distributed systems");
    expect(hero.summary.text).toContain("AI-enabled data platforms");
    expect(hero.summary.text).toContain("full-stack delivery");
    expect(hero.signals.map((signal) => signal.text)).toEqual([
      "Scalable cloud architecture",
      "Distributed systems",
      "AI-enabled data platforms",
      "Full-stack delivery",
    ]);
  });

  it("includes only GitHub, LinkedIn, and email in public contact links", () => {
    expect(contact.links).toHaveLength(3);
    expect(contact.links.map((link) => link.id)).toEqual(["github", "linkedin", "email"]);

    const publicContactOutput = JSON.stringify(contact);

    expect(publicContactOutput).not.toContain("0410966572");
    expect(publicContactOutput).not.toContain("0410 966 572");
    expect(publicContactOutput).not.toContain("phone");
  });

  it("keeps every public claim mapped to at least one known source", () => {
    expect(claimSourceMatrix.length).toBeGreaterThan(0);

    for (const entry of claimSourceMatrix) {
      expect(entry.claimId).toBeTruthy();
      expect(entry.text).toBeTruthy();
      expect(entry.sourceIds.length).toBeGreaterThan(0);

      for (const sourceId of entry.sourceIds) {
        expect(sourceCatalog[sourceId]).toBeDefined();
      }
    }
  });

  it("keeps project, role, and contact link sources traceable", () => {
    for (const project of selectedWork) {
      expect(project.summary.sourceIds.length).toBeGreaterThan(0);
      expect(project.whyItMatters.sourceIds.length).toBeGreaterThan(0);

      expect(project.approach.length).toBeGreaterThan(0);

      for (const item of project.approach) {
        expect(item.sourceIds.length).toBeGreaterThan(0);
      }

      for (const highlight of project.highlights) {
        expect(highlight.sourceIds.length).toBeGreaterThan(0);
      }

      for (const link of project.links) {
        expect(sourceCatalog[link.sourceId].href).toBe(link.href);
      }
    }

    for (const role of workExperience) {
      expect(role.summary.sourceIds.length).toBeGreaterThan(0);

      for (const highlight of role.highlights) {
        expect(highlight.sourceIds.length).toBeGreaterThan(0);
      }
    }

    for (const link of contact.links) {
      expect(sourceCatalog[link.sourceId].href).toBe(link.href);
    }
  });

  it("keeps selected work ordered and limited to the two approved featured projects", () => {
    expect(selectedWork).toHaveLength(2);
    expect(selectedWork.map((project) => project.title)).toEqual([
      "Letterboxd Trivia Battle",
      "Aus Export Tracker",
    ]);
  });

  it("keeps engineering highlights recruiter-facing, ordered, and source-traceable", () => {
    expect(engineeringHighlights).toHaveLength(5);
    expect(engineeringHighlights.map((highlight) => highlight.title)).toEqual([
      "Cloud & Distributed Systems",
      "Data & AI Platforms",
      "Full-Stack Product Delivery",
      "Reliability & Observability",
      "Technical Discovery & Cross-Functional Leadership",
    ]);

    for (const highlight of engineeringHighlights) {
      expect(highlight.description.sourceIds.length).toBeGreaterThan(0);
      expect(highlight.keywords.length).toBeGreaterThanOrEqual(2);
      expect(highlight.keywords.length).toBeLessThanOrEqual(4);

      const renderedBlock = [
        highlight.title,
        highlight.description.text,
        ...highlight.keywords.map((keyword) => keyword.text),
      ].join(" ");

      expect(
        highlight.description.text.match(/[^.!?]+[.!?]/g)?.length ?? 0
      ).toBe(1);
      expect(renderedBlock).not.toMatch(/Certification|Award|0410966572|0410 966 572/i);

      for (const keyword of highlight.keywords) {
        expect(keyword.sourceIds.length).toBeGreaterThan(0);
        expect(claimSourceMatrix).toContainEqual({
          claimId: keyword.id,
          section: "Engineering Highlights",
          text: keyword.text,
          sourceIds: keyword.sourceIds,
        });
      }
    }
  });

  it("keeps work experience titles, dates, order, and inline education source data exact", () => {
    expect(workExperience).toHaveLength(4);
    expect(
      workExperience.map((role) => `${role.title} — ${role.company} (${role.period})`)
    ).toEqual([
      "Senior Software Engineer — Faethm by Pearson (2022–2026)",
      "Software Engineer — Commonwealth Bank (2021)",
      "Software Engineer — Energy Action (2020–2021)",
      "Software Engineer — Pooled Energy (2018–2020)",
    ]);

    for (const role of workExperience) {
      expect(role.highlights.length).toBeGreaterThanOrEqual(2);
      expect(role.highlights.length).toBeLessThanOrEqual(3);
    }

    expect(education).toHaveLength(1);
    expect(education[0]).toMatchObject({
      institution: "Macquarie University",
      degree: "Bachelor of Information Technology (Software Technology)",
      period: "2014–2017",
    });
    expect(portfolioContent).not.toHaveProperty("educationSection");
  });
});
