'use client'

import Header from '../layout/Header'
import Hero from '../sections/Hero'
import ProblemSolution from '../sections/ProblemSolution'
import ServicesShowcase from '../sections/ServicesShowcase'
import HowItWorks from '../sections/HowItWorks'
import SafetyCredentials from '../sections/SafetyCredentials'
import Testimonials from '../sections/Testimonials'
import ServiceAreas from '../sections/ServiceAreas'
import PricingInsurance from '../sections/PricingInsurance'
import FAQ from '../sections/FAQ'
import CallToAction from '../sections/CallToAction'
import Footer from '../layout/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <ProblemSolution />
        <ServicesShowcase />
        <HowItWorks />
        <SafetyCredentials />
        <Testimonials />
        <ServiceAreas />
        <PricingInsurance />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}