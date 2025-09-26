import SectionAnchor from "@/components/layout/SectionAnchor";
import HeroSection from "@/components/sections/HeroSection";
//import StatsSection from "@/components/sections/StatsSection";
import BusinessPainPointsSection from "@/components/sections/BusinessPainPointsSection";
import ChallengesSolutionSection from "@/components/sections/ChallengesSolutionSection";
import ERPPreviewSection from "@/components/sections/ERPPreviewSection";
import KeyFeaturesSection from "@/components/sections/KeyFeaturesSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import QuickCTASection from "@/components/sections/QuickCTASection";
import ContactInfo from "@/components/sections/ContactInfo";
import ImplementationTimelineSection from "@/components/sections/ImplementationTimelineSection";

export default function LandingPage() {
  return (
    <>
      <SectionAnchor id="gioi-thieu" />
      <HeroSection />
      
      <SectionAnchor id="dat-van-de" />
      <BusinessPainPointsSection />

      <SectionAnchor id="giai-phap" />
      <ChallengesSolutionSection />

      <SectionAnchor id="chuc-nang" />
      <ERPPreviewSection />

      <SectionAnchor id="tinh-nang" />
      <KeyFeaturesSection />

      <SectionAnchor id="loi-ich" />
      <BenefitsSection />

      <ImplementationTimelineSection />

      <SectionAnchor id="lien-he" />
      <QuickCTASection />

      {/* <ContactForm /> */}
      <ContactInfo />
    </>
  );
}
