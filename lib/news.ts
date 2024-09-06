export type latestNewsType = {
    title: string,
    content: string
    shortContent: string
    href: string
    date: Date
}

export const latestNews: latestNewsType[] = [
    {
        title: "Het archief blijft beschikbaar",
        shortContent: "SHORTCONTENT",
        date: new Date(2024, 5, 25),
        content: "Met een overzicht van alle transfers seizoen 2024-2025 sluit Koempels Pleasure Dome na 25 jaar af. Via het menu zijn nagenoeg alle wedstrijdverslagen vanaf 1999 tot en met seizoen 2023-2024 in te zien. Veelal met beeldmateriaal. Er volgen geen updates meer. Koempels Pleasure Dome blijft echter voortbestaan als Roda-archief website.",
        href: "/news/1"
    },
    {
        title: "News 2",
        shortContent: "SHORTCONTENT",
        date: new Date(2024, 6, 25),
        content: "CONTENT",
        href: "/news/2"
    },
    {
        title: "News 3",
        shortContent: "SHORTCONTENT",
        date: new Date(2024, 6, 25),
        content: "CONTENT",
        href: "/news/3"
    }
]