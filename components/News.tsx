import { latestNews } from '@/lib/news'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'


export default function NewsComponent() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Laatste nieuws</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((news, index) => (
            <>
              {news.title != '' && (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{news.shortContent}</p>
                    <Button className="mt-4" variant="outline"><Link href={news.href}>Read More</Link></Button>
                  </CardContent>
                </Card>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}