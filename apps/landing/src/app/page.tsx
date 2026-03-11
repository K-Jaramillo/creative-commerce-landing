import Hero from '@/components/Hero';
import EcommerceShift from '@/components/EcommerceShift';
import WhyBrandsFail from '@/components/WhyBrandsFail';
import OurSolution from '@/components/OurSolution';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Plans from '@/components/Plans';
import Studio from '@/components/Studio';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <EcommerceShift />
      <WhyBrandsFail />
      <OurSolution />
      <Services />
      <Process />
      <Plans />
      <Studio />
      <LeadForm />
      <Footer />
    </main>
  );
}
