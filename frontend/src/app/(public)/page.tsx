import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesGrid } from '@/components/landing/FeaturesGrid'
import { TargetAudience } from '@/components/landing/TargetAudience'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { PricingSection } from '@/components/landing/PricingSection'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesGrid />
      <TargetAudience />
      <HowItWorks />
      <PricingSection />
      <FAQ />
      <Footer />
    </main>
  )
}
