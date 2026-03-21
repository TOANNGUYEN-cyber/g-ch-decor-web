import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";

const CTASection = lazy(() => import("@/components/CTASection"));
const FeaturedSection = lazy(() => import("@/components/FeaturedSection"));
const CollectionsCarousel = lazy(() => import("@/components/CollectionsCarousel"));
const CollectionsSection = lazy(() => import("@/components/CollectionsSection"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const FullWidthBanner = lazy(() => import("@/components/FullWidthBanner"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      <Suspense fallback={null}>
        <CTASection />
        <FeaturedSection />
        <CollectionsCarousel />
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
