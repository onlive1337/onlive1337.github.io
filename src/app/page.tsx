import dynamic from 'next/dynamic'

const Navigation = dynamic(
  () => import('@/components/layout/Navigation').then(mod => mod.Navigation),
  { ssr: true }
);

const Hero = dynamic(
  () => import('@/components/sections/Hero').then(mod => mod.Hero),
  { ssr: true }
);

const ClientContent = dynamic(
  () => import('@/components/ClientContent').then(mod => mod.ClientContent)
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ClientContent />
      </main>
    </div>
  );
}