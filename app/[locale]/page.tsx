import { unstable_setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PainToSolution from '@/components/PainToSolution';
import FeatureExplorer from '@/components/FeatureExplorer';
import CubeSection from '@/components/CubeSection';
import StatsCounter from '@/components/StatsCounter';
import SituationChecker from '@/components/SituationChecker';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

export default function WMSPage({
  params,
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  const locale = params.locale;

  return (
    <>
      <JsonLd locale={locale} />
      <Header />
      <main>
        <Hero />
        <PainToSolution />
        <FeatureExplorer />
        <CubeSection />
        <StatsCounter />
        <SituationChecker />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
