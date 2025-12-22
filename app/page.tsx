import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import EngineeringDecisions from '@/components/EngineeringDecisions';
import Timeline from '@/components/Timeline';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <EngineeringDecisions />
      <Timeline />
      <Footer />
    </main>
  );
}
