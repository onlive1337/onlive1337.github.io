import { Navigation } from "@/components/layout/Navigation"
import { Hero } from "@/components/sections/Hero"
import { Technologies } from "@/components/sections/Technologies"
import { Socials } from "@/components/sections/Socials"
import { Portfolio } from "@/components/sections/Portfolio"
import { NowPlaying } from "@/components/sections/NowPlaying"
import { Gaming } from "@/components/sections/Gaming"
import { Analytics } from "@/components/sections/Analytics"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="will-change-scroll">
        <Hero />
        <Socials />
        <Technologies />
        <Portfolio />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <NowPlaying />
              <Gaming />
            </div>
          </div>
        </section>
        <Analytics />
      </main>
    </div>
  );
}