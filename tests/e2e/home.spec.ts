import { expect, test, type Locator } from "@playwright/test";

const fallbackMetadataBaseUrl = "http://localhost:3000";

const resolveMetadataBase = (value: string) => {
  try {
    return new URL(value);
  } catch {
    return new URL(fallbackMetadataBaseUrl);
  }
};

test("homepage exports recruiter metadata, stable anchors, and a real contact section after build", async ({ page }) => {
  await page.goto("/");

  const expectedCanonicalHref = resolveMetadataBase(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? fallbackMetadataBaseUrl
  )
    .toString()
    .replace(/\/$/, "");

  const hero = page.locator("#work");
  const heroActions = page.getByRole("navigation", {
    name: "Hero calls to action",
  });
  const contactSection = page.locator("#contact");

  await expect(page).toHaveTitle("Michael Baker-Tong | BakerTongEngineer");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    expectedCanonicalHref
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Michael Baker-Tong" })
  ).toBeVisible();
  await expect(page.getByText("Senior Software Engineer", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "BakerTongEngineer" })
  ).toBeVisible();
  await expect(
    page.getByText(
      "Senior Software Engineer specialising in scalable cloud architecture, distributed systems, AI-enabled data platforms, and full-stack delivery."
    )
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Work" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Highlights" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Experience" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
  await expect(page.locator("#work")).toHaveCount(1);
  await expect(page.locator("#highlights")).toHaveCount(1);
  await expect(page.locator("#experience")).toHaveCount(1);
  await expect(page.locator("#contact")).toHaveCount(1);

  await expect(heroActions.getByRole("link")).toHaveCount(3);
  await expect(heroActions.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/michaelbaker96"
  );
  await expect(heroActions.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/michael-baker-tong-6a446a153/"
  );
  await expect(heroActions.getByRole("link", { name: "Email" })).toHaveAttribute(
    "href",
    "mailto:bakermichael96@gmail.com"
  );
  await expect(hero).not.toContainText("0410966572");
  await expect(hero).not.toContainText("0410 966 572");
  await expect(heroActions.getByRole("link", { name: "Resume" })).toHaveCount(0);

  await expect(contactSection).toBeVisible();
  await expect(contactSection.getByRole("link")).toHaveCount(3);
  await expect(
    contactSection.getByRole("link", { name: "GitHub profile for Michael Baker-Tong" })
  ).toHaveAttribute("href", "https://github.com/michaelbaker96");
  await expect(
    contactSection.getByRole("link", { name: "LinkedIn profile for Michael Baker-Tong" })
  ).toHaveAttribute("href", "https://www.linkedin.com/in/michael-baker-tong-6a446a153/");
  await expect(
    contactSection.getByRole("link", { name: "Email Michael Baker-Tong" })
  ).toHaveAttribute("href", "mailto:bakermichael96@gmail.com");
  await expect(page.getByRole("link", { name: "Education" })).toHaveCount(0);
});

test("keyboard focus states stay visible across nav, hero, project, and contact links", async ({ page }) => {
  await page.goto("/");

  const tabTo = async (locator: Locator, maxTabs = 32) => {
    for (let attempt = 0; attempt < maxTabs; attempt += 1) {
      await page.keyboard.press("Tab");

      const isFocused = await locator.evaluate(
        (element: Element) => element === element.ownerDocument.activeElement
      );

      if (isFocused) {
        return;
      }
    }

    throw new Error("Unable to move keyboard focus to the expected element.");
  };

  const expectVisibleFocusState = async (locator: Locator) => {
    await expect(locator).toBeFocused();

    const styles = await locator.evaluate((element: Element) => {
      const computed = window.getComputedStyle(element);

      return {
        outlineStyle: computed.outlineStyle,
        outlineWidth: computed.outlineWidth,
        textDecorationLine: computed.textDecorationLine,
      };
    });

    expect(styles.outlineStyle).not.toBe("none");
    expect(styles.outlineWidth).not.toBe("0px");
    expect(styles.textDecorationLine).toContain("underline");
  };

  const brandLink = page.getByRole("link", { name: "BakerTongEngineer" });
  const navWorkLink = page.getByRole("link", { name: "Work" });
  const heroGithubLink = page.getByRole("navigation", { name: "Hero calls to action" }).getByRole(
    "link",
    { name: "GitHub" }
  );
  const projectGithubLink = page
    .getByRole("article", { name: "Letterboxd Trivia Battle" })
    .getByRole("link", { name: "GitHub" });
  const contactGithubLink = page
    .locator("#contact")
    .getByRole("link", { name: "GitHub profile for Michael Baker-Tong" });

  await tabTo(brandLink);
  await expectVisibleFocusState(brandLink);

  await tabTo(navWorkLink);
  await expectVisibleFocusState(navWorkLink);

  await tabTo(heroGithubLink);
  await expectVisibleFocusState(heroGithubLink);

  await tabTo(projectGithubLink);
  await expectVisibleFocusState(projectGithubLink);

  await tabTo(contactGithubLink);
  await expectVisibleFocusState(contactGithubLink);
});

test("homepage shell stays within a narrow mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

  const headingBox = await page
    .getByRole("heading", { level: 1, name: "Michael Baker-Tong" })
    .boundingBox();

  expect(headingBox).not.toBeNull();
  expect(headingBox!.y).toBeLessThan(390);
});

test("selected work shows only the approved featured projects with verified links and no media creep", async ({ page }) => {
  await page.goto("/");

  const featuredProjects = page.getByRole("list", { name: "Featured projects" });

  await expect(page.getByRole("heading", { level: 2, name: "Selected Work" })).toBeVisible();
  await expect(featuredProjects).toBeVisible();
  await expect(featuredProjects.locator(":scope > li")).toHaveCount(2);
  await expect(featuredProjects.getByRole("heading", { level: 3 })).toHaveText([
    "Letterboxd Trivia Battle",
    "Aus Export Tracker",
  ]);

  const letterboxdCard = page.getByRole("article", { name: "Letterboxd Trivia Battle" });
  const ausExportTrackerCard = page.getByRole("article", { name: "Aus Export Tracker" });

  await expect(letterboxdCard.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/michaelbaker96/letterboxd-trivia-battle"
  );
  await expect(ausExportTrackerCard.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/michaelbaker96/aus-export-tracker"
  );
  await expect(ausExportTrackerCard.getByRole("link", { name: "Live" })).toHaveAttribute(
    "href",
    "https://aus-export-tracker.vercel.app"
  );

  await expect(featuredProjects.locator("img, video")).toHaveCount(0);

  const showcaseText = await featuredProjects.innerText();

  expect(showcaseText).not.toMatch(/\b(users?|downloads?|screenshots?)\b|%/i);
});

test("engineering highlights renders five ordered capability pillars without keyword sprawl", async ({ page }) => {
  await page.goto("/");

  const highlightsSection = page.locator("#highlights");
  const highlightsList = page.getByRole("list", { name: "Engineering highlights" });
  const highlightCards = highlightsList.getByRole("article");

  await expect(page.getByRole("heading", { level: 2, name: "Highlights" })).toBeVisible();
  await expect(highlightsList).toBeVisible();
  await expect(highlightCards).toHaveCount(5);
  await expect(highlightsList.getByRole("heading", { level: 3 })).toHaveText([
    "Cloud & Distributed Systems",
    "Data & AI Platforms",
    "Full-Stack Product Delivery",
    "Reliability & Observability",
    "Technical Discovery & Cross-Functional Leadership",
  ]);

  for (let index = 0; index < 5; index += 1) {
    const card = highlightCards.nth(index);
    const keywordItems = card.getByRole("listitem");
    const keywordCount = await keywordItems.count();

    await expect(card.locator(".highlights-card__summary")).toHaveCount(1);
    expect(keywordCount).toBeGreaterThanOrEqual(2);
    expect(keywordCount).toBeLessThanOrEqual(4);
    await expect(card).not.toContainText(/Certification|Award|0410966572|0410 966 572/i);
  }

  await expect(highlightsSection).not.toContainText("Certification");
  await expect(highlightsSection).not.toContainText("Award");
  await expect(highlightsSection).not.toContainText("0410966572");
  await expect(highlightsSection).not.toContainText("0410 966 572");
});

test("experience renders exact roles in order with inline education and no separate education section", async ({ page }) => {
  await page.goto("/");

  const experienceSection = page.locator("#experience");
  const experienceList = page.getByRole("list", { name: "Work experience" });
  const experienceCards = experienceList.getByRole("article");

  await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeVisible();
  await expect(experienceList).toBeVisible();
  await expect(experienceCards).toHaveCount(4);
  await expect(experienceList.getByRole("heading", { level: 3 })).toHaveText([
    "Senior Software Engineer — Faethm by Pearson (2022–2026)",
    "Software Engineer — Commonwealth Bank (2021)",
    "Software Engineer — Energy Action (2020–2021)",
    "Software Engineer — Pooled Energy (2018–2020)",
  ]);

  for (let index = 0; index < 4; index += 1) {
    const card = experienceCards.nth(index);
    const bulletCount = await card.getByRole("listitem").count();

    expect(bulletCount).toBeGreaterThanOrEqual(2);
    expect(bulletCount).toBeLessThanOrEqual(3);
  }

  await expect(experienceSection.getByText("Macquarie University", { exact: true })).toBeVisible();
  await expect(
    experienceSection.getByText("Bachelor of Information Technology (Software Technology)", {
      exact: true,
    })
  ).toBeVisible();
  await expect(experienceSection.getByText("2014–2017", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Education" })).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 2, name: "Education" })).toHaveCount(0);
});
