import NewsComponent from "@/components/News"
import UpcomingMatches from "@/components/UpcomingMatches"
import Image from "next/image"

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">


      <main className="flex-grow">
        <section className="relative h-[50vh]">
          <Image
            src="/Thumbnail.png"
            alt="FC Roda Stadium"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Koempel Pleasure Dome</h1>
              <p className="text-xl mb-6">Fan-Site Roda JC Kerkrade</p>
            </div>
          </div>
        </section>

        <NewsComponent />
        <UpcomingMatches />

      </main>
    </div>
  )
}