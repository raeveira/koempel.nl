import { latestNews } from '@/lib/news'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Fragment } from 'react'


export default function NewsComponent() {
  const newsWithTitles = latestNews.filter(news => news.title !== '').length;

    return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Laatste nieuws</h2>
        <div className={`grid grid-cols-1 md:grid-cols-${newsWithTitles === 1 ? '1' : newsWithTitles === 2 ? '2' : '3'} gap-6`}>
          {latestNews.map((news, index) => (
            <Fragment key={index}>
              {news.title != '' && (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{news.shortContent}</p>
                    <Button className="mt-4" variant="outline"><Link href={news.href}>Lees meer</Link></Button>
                  </CardContent>
                </Card>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}