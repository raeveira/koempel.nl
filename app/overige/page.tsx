'use client'

import { useState, useEffect } from 'react'

// Define the structure of our content
type ContentItem = {
  title: string
  content: string
}

type ContentCategory = {
  name: string
  items: ContentItem[]
}

// Sample data structure (you would replace this with your actual content)
const contentData: ContentCategory[] = [
  {
    name: "Columns Frank Booth",
    items: [
      { title: "Rodazand en rookgordijnen", content: `Er was eens... Een gezellige volksclub in het zuidelijkste deel van het land. Een club met uitstraling, reputatie en een duidelijke signatuur. Groot geworden in en dankzij de mijnwerkerscultuur waar hard werken vanzelfsprekend was en saamhorigheid de gelederen bijeen hield. Die club heette Roda JC en zetelde in het op maat gesneden sportpark Kaalheide waar bezoekers nog 'sportvrienden' waren en spelers, bestuurders en supporters gezamenlijk de polonaise liepen. Zelfs al was het voetbal soms niet om aan te zien, er was altijd het 'wij' gevoel. 'Wij' tegen die 'Hollendere', die 'van Mesjtreech' en het arrogante 'wasproduct' uit de hoofdstad. En zelfs bij de stoerste Rotterdamse dokwerkers knikten de knieën als zij de reis richting Kerkrade moesten aanvaarden. Immers 'Wie wordt op Kaalhei vermoord?' Roda leefde en de tegenstanders beefden.

Maar Roda wilde meer. De club had de zoete smaak van het succes even op de tong gehad dankzij heroïsche Europese veldslagen, een vice kampioenschap en een bekerwinst. En dus kwam er een modern nieuw stadion en werd duidelijk gesteld dat men de oude clubcultuur zou moeten loslaten. Nieuwe zakelijkheid was een must, wilde de club haar ambities blijven najagen en het publiek kon daar begrip voor opbrengen en vaarde blind op de woorden en gedrevenheid van de met een groot Roda-hart uitgeruste bestuurders Theo Pickée en Nol Hendriks. Laatstgenoemde had namelijk duidelijk gezegd dat het nieuwe stadion noodzakelijk was om qua begroting bij de subtop te kunnen aanklampen en dat het de club eindelijk in staat zou kunnen stellen om de beste spelers eens iets langer vast te houden. Bovendien beloofden de gelikte brochures ons niets minder dan 'Topvoetbal in een Topstadion!' Dientengevolge nam het publiek de vervelende zitplaatsen en dreigende cultuuromslag op de koop toe want met een tweede Amstelcup op zak, een nieuw Europees avontuur in het vooruitzicht en een record aantal seizoenskaarthouders en sponsoren was de toekomst aan Roda JC. Het zelf opgeplakte etiket 'De Trots Van Het Zuiden' was op dat moment dan ook meer dan terecht.

Frank Booth` },
      { title: "MVV", content: "Content voor MVV..." },
      { title: "Piep Piep", content: "Content voor Piep Piep..." },
    ]
  },
  {
    name: "Columns A.N. Tipier",
    items: [
      { title: "Kick Off", content: "Content voor Kick Off..." },
      { title: "Hoer van Hilversum", content: "Content voor Hoer van Hilversum..." },
      { title: "D'r Joep en het Parkstadgevoel", content: "Content voor D'r Joep en het Parkstadgevoel..." },
      { title: "Best of the rest!", content: "Content voor Best of the rest!..." },
      { title: "Gadverdegadverdamme", content: "Content voor Gadverdegadverdamme..." },
      { title: "Het Zjwatse Loach (1)", content: "Content voor Het Zjwatse Loach (1)..." },
      { title: "Het Zjwatse Loach (2)", content: "Content voor Het Zjwatse Loach (2)..." },
      { title: "Het Zjwatse Loach (3)", content: "Content voor Het Zjwatse Loach (3)..." },
      { title: "De Derby", content: "Content voor De Derby..." },
      { title: "Roda On-line", content: "Content voor Roda On-line..." },
      { title: "voorza Garba", content: "Content voor voorza Garba..." },
      { title: "Koempelsjeng in Pierenland", content: "Content voor Koempelsjeng in Pierenland..." },
      { title: "Chaos AD (1)", content: "Content voor Chaos AD (1)..." },
      { title: "Chaos AD (2)", content: "Content voor Chaos AD (2)..." },
      { title: "Chaos AD (3)", content: "Content voor Chaos AD (3)..." },
      { title: "Chaos AD (4)", content: "Content voor Chaos AD (4)..." },
      { title: "Chaos AD (5)", content: "Content voor Chaos AD (5)..." },
      { title: "Chaos AD (6)", content: "Content voor Chaos AD (6)..." },
      { title: "Chaos AD (7)", content: "Content voor Chaos AD (7)..." },
      { title: "De Derby", content: "Content voor De Derby..." },
      { title: "Grijze Mario", content: "Content voor Grijze Mario..." },
      { title: "Maastrichtse Clubcard", content: "Content voor Maastrichtse Clubcard..." },
    ]
  },
  {
    name: "Just for Pleasure",
    items: [
      { title: "Special Fifa 2001", content: "Content voor Special Fifa 2001..." },
      { title: "90 jaren Roda JC (CD-Rom)", content: "Content voor 90 jaren Roda JC (CD-Rom)..." },
      { title: "Winamp Skin Roda JC", content: "Content voor Winamp Skin Roda JC..." },
      { title: "Roda Logo op Nokia", content: "Content voor Roda Logo op Nokia..." },
    ]
  },
  {
    name: "Specials",
    items: [
      { title: "Bouw Parkstad Limburg Stadion", content: "Content voor Bouw Parkstad Limburg Stadion..." },
      { title: "IPL", content: "Content voor IPL..." },
      { title: "Special Bratislava", content: "Content voor Special Bratislava..." },
      { title: "Special Zaragoza", content: "Content voor Special Zaragoza..." },
      { title: "Bouwtekeningen", content: "Content voor Bouwtekeningen.." },
    ]
  },
  {
    name: "Overige",
    items: [
      { title: "Roda-kalender", content: "Content voor Roda-kalender..." },
    ]
  },
]

export default function KPDOverige() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [contentHeight, setContentHeight] = useState('600px')

  useEffect(() => {
    const updateHeight = () => {
      const navbarHeight = 110 // Height of your navbar
      const footerHeight = 50 // Approximate height of your footer, adjust as needed
      const availableHeight = window.innerHeight - navbarHeight - footerHeight
      setContentHeight(`${availableHeight}px`)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  return (
    <div className="flex bg-gray-100" style={{ height: contentHeight }}>
      <div className="w-1/3 p-4 border-r overflow-auto bg-black text-yellow-400 custom-scrollbar">
        <h1 className="text-2xl font-bold mb-6 text-center">Roda JC Fan Zone</h1>
        {contentData.map((category, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-bold mb-2 bg-yellow-400 text-black py-1 px-2 rounded">{category.name}</h2>
            {category.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                className="w-full text-left px-2 py-1 text-sm hover:bg-yellow-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-1 rounded transition duration-150 ease-in-out"
                onClick={() => setSelectedContent(item)}
              >
                {item.title}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4 bg-yellow-400 overflow-auto custom-scrollbar">
        {selectedContent ? (
          <div className="bg-white shadow-md rounded-lg p-6 border-4 border-black">
            <h2 className="text-xl font-bold mb-4 text-black">{selectedContent.title}</h2>
            <div className="text-gray-800 whitespace-pre-wrap text-sm">{selectedContent.content}</div>
          </div>
        ) : (
          <div className="text-center text-black mt-10">
            <svg className="mx-auto w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <p className="text-xl font-bold">Select an item to view its content</p>
            <p className="mt-2">Explore the Roda JC fan articles!</p>
          </div>
        )}
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
      `}</style>
    </div>
  )
}