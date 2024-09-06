'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import { latestNews, latestNewsType } from '@/lib/news';

const NewsPage: React.FC = () => {
    const pathName = usePathname();
    const [news, setNews] = React.useState<latestNewsType | null>(null);

    React.useEffect(() => {
        const findNews = () => {
            const matchedNews = latestNews.find((news: latestNewsType) => news.href === pathName);
            if (matchedNews) {
                setNews(matchedNews);
            }
        };

        findNews();
    }, [pathName]);

    return (
        <div className="flex flex-col items-center" style={{ height: 'calc(100vh - 266px)' }}>
            {news ? (
                <main className="flex-grow text-foreground flex items-center justify-center -translate-y-40 flex-col p-4 space-y-4 w-1/2 flex-wrap">
                    <h1 className='text-xl font-bold'>{news.title}</h1>
                    <p>{news.content}</p>
                    <p className='w-full text-right text-sm italic'>
                        {news.date.toLocaleDateString('nl-NL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }).replace(',', ' / ')}
                    </p>
                </main>
            ) : (
                <p>No news found for this path.</p>
            )}
        </div>
    );
};

export default NewsPage;
