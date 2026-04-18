import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Cormorant_Garamond: () => ({ variable: "--font-display" }),
  Public_Sans: () => ({ variable: "--font-body" }),
}));

import { metadata } from "@/app/layout";

const fallbackMetadataBaseUrl = "http://localhost:3000";
const expectedTitle = "Michael Baker-Tong | BakerTongEngineer";
const expectedDescription =
  "Recruiter-facing portfolio for Michael Baker-Tong, a senior software engineer delivering scalable cloud architecture, distributed systems, AI-enabled data platforms, and full-stack product work.";

const resolveMetadataBase = (value: string) => {
  try {
    return new URL(value);
  } catch {
    return new URL(fallbackMetadataBaseUrl);
  }
};

describe("RootLayout metadata", () => {
  it("exports recruiter-facing static metadata with canonical and social fields", () => {
    const expectedMetadataBase = resolveMetadataBase(
      process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? fallbackMetadataBaseUrl
    );

    expect(metadata.title).toBe(expectedTitle);
    expect(metadata.description).toBe(expectedDescription);
    expect(metadata.metadataBase?.toString()).toBe(expectedMetadataBase.toString());
    expect(metadata.alternates?.canonical).toBe("/");
    expect(metadata.openGraph).toMatchObject({
      title: expectedTitle,
      description: expectedDescription,
      siteName: "BakerTongEngineer",
      type: "website",
      url: "/",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary",
      title: expectedTitle,
      description: expectedDescription,
    });
  });
});
