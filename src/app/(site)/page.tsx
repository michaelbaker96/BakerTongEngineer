import { HeroSection } from "@/components/hero-section";
import { SelectedWorkSection } from "@/components/selected-work-section";

export default function Home() {
  return (
    <main className="editorial-frame work-page">
      <HeroSection />
      <SelectedWorkSection />
    </main>
  );
}
