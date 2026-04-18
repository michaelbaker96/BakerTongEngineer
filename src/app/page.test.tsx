import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import { contact, selectedWork, sourceCatalog } from "@/content/portfolio";

describe("Home", () => {
  it("renders the recruiter-facing hero with only approved calls to action", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Michael Baker-Tong" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Senior Software Engineer")
    ).toBeInTheDocument();

    const heroActions = screen.getByRole("navigation", {
      name: "Hero calls to action",
    });
    const ctaLinks = within(heroActions).getAllByRole("link");

    expect(ctaLinks).toHaveLength(3);

    for (const link of contact.links) {
      expect(
        within(heroActions).getByRole("link", { name: link.label })
      ).toHaveAttribute("href", link.href);
    }

    expect(screen.queryByText("0410966572")).not.toBeInTheDocument();
    expect(screen.queryByText("0410 966 572")).not.toBeInTheDocument();
    expect(
      within(heroActions).queryByRole("link", { name: "Resume" })
    ).not.toBeInTheDocument();
  });

  it("renders exactly two featured project cards in the required order with verified links only", () => {
    render(<Home />);

    const featuredProjects = screen.getByRole("list", {
      name: "Featured projects",
    });
    const featuredProjectCards = within(featuredProjects).getAllByRole("article");

    expect(featuredProjectCards).toHaveLength(2);
    expect(
      within(featuredProjects)
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent)
    ).toEqual(["Letterboxd Trivia Battle", "Aus Export Tracker"]);

    const letterboxdCard = screen.getByRole("article", {
      name: selectedWork[0].title,
    });
    const ausExportTrackerCard = screen.getByRole("article", {
      name: selectedWork[1].title,
    });

    expect(within(letterboxdCard).getByText("Why it matters")).toBeInTheDocument();
    expect(within(letterboxdCard).getByText(selectedWork[0].summary.text)).toBeInTheDocument();
    expect(
      within(letterboxdCard).getByRole("link", { name: "GitHub" })
    ).toHaveAttribute("href", sourceCatalog.letterboxdRepo.href);

    expect(within(ausExportTrackerCard).getByText("Why it matters")).toBeInTheDocument();
    expect(
      within(ausExportTrackerCard).getByRole("link", { name: "GitHub" })
    ).toHaveAttribute("href", sourceCatalog.ausExportTrackerRepo.href);
    expect(
      within(ausExportTrackerCard).getByRole("link", { name: "Live" })
    ).toHaveAttribute("href", sourceCatalog.ausExportTrackerLive.href);

    expect(featuredProjects.querySelectorAll("img, video")).toHaveLength(0);
    expect(featuredProjects).not.toHaveTextContent(/\b(users?|downloads?)\b|%/i);
  });
});
