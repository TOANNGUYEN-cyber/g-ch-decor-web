import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const PromoBar = lazy(() => import("@/components/PromoBar"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const CollectionsSection = lazy(() => import("@/components/CollectionsSection"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const FullWidthBanner = lazy(() => import("@/components/FullWidthBanner"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      <HeroSection />
      <Suspense fallback={null}>
        <PromoBar />
        <ServicesSection />
        <CollectionsSection />
        <StatsSection />
        <AboutSection />
        <FullWidthBanner />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </div>
);

export default Index;
