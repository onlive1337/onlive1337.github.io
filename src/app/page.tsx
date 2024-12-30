import { Navigation } from "@/components/layout/Navigation"
import { Hero } from "@/components/sections/Hero"
import { Technologies } from "@/components/sections/Technologies"
import { Socials } from "@/components/sections/Socials"
import { Portfolio } from "@/components/sections/Portfolio"
import { NowPlaying } from "@/components/sections/NowPlaying"
import { Gaming } from "@/components/sections/Gaming"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overscroll-none">
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
      </main>
    </>
  )
}