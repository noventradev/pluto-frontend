import { FaqSection } from './faq-section';
import { FeatureSection } from './feature-section';
import { HeroSection } from './hero-section';
import { HomeNavbar } from './landing-navbar';
import { ResourceSection } from './resources-section';
import { TestimonialSection } from './testimonials';

export default function Home() {
  return (
    <>
      <HomeNavbar />
      <HeroSection />
      <FeatureSection />
      <ResourceSection />
      <FaqSection />
      <TestimonialSection />
    </>
  );
}
