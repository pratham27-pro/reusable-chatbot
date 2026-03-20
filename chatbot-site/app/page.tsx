import { HeroSection } from "@/components/home/HeroSection";
import { OnePropSection } from "@/components/home/OnePropSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <OnePropSection />
      <HowItWorks />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
