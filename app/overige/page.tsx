'use client'

import { useState } from 'react'

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
      { title: "Just for Pleasure", content: "Content for Just for Pleasure..." },
      { title: "Rodazand en rookgordijnen", content: "Content for Rodazand en rookgordijnen..." },
      { title: "MVV", content: "Content for MVV..." },
      { title: "Piep Piep", content: "Content for Piep Piep..." },
    ]
  },
  {
    name: "Columns A.N. Tipier",
    items: [
      { title: "Kick Off", content: "Content for Kick Off..." },
      { title: "Hoer van Hilversum", content: "Content for Hoer van Hilversum..." },
      { title: "D'r Joep en het Parkstadgevoel", content: "Content for Hoer van Hilversum..." },
      { title: "Best of the rest!", content: "Content for Hoer van Hilversum..." },
      { title: "Gadverdegadverdamme", content: "Content for Hoer van Hilversum..." },
      { title: "Het Zjwatse Loach (1)", content: "Content for Hoer van Hilversum..." },
      { title: "Het Zjwatse Loach (2)", content: "Content for Hoer van Hilversum..." },
      { title: "Het Zjwatse Loach (3)", content: "Content for Hoer van Hilversum..." },
      { title: "De Derby", content: "Content for Hoer van Hilversum..." },
      { title: "Roda On-line", content: "Content for Hoer van Hilversum..." },
      { title: "Forza Garba", content: "Content for Hoer van Hilversum..." },
      { title: "Koempelsjeng in Pierenland", content: "Content for Hoer van Hilversum..." },
      { title: "Chaos AD (1)", content: "Content for Hoer van Hilversum..." },
      { title: "Chaos AD (2)", content: "Content for Hoer van Hilversum..." },
      { title: "Chaos AD (3)", content: "Content for Hoer van Hilversum..." },
      { title: "Chaos AD (4)", content: "Content for Hoer van Hilversum..." },
      { title: "Chaos AD (5)", content: "Content for Hoer van Hilversum..." },
      { title: "Chaos AD (6)", content: "Content for Hoer van Hilversum..." },
      { title: "Chaos AD (7)", content: "Content for Hoer van Hilversum..." },
      { title: "De Derby", content: "Content for Hoer van Hilversum..." },
      { title: "Grijze Mario", content: "Content for Hoer van Hilversum..." },
      { title: "Maastrichtse Clubcard", content: "Content for Hoer van Hilversum..." },
    ]
  },
  // ... add other categories
]

export default function KPDOverige() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 border-r overflow-auto">
        {contentData.map((category, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-bold mb-2">{category.name}</h2>
            {category.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                className="w-full text-left px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1"
                onClick={() => setSelectedContent(item)}
              >
                {item.title}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4">
        {selectedContent ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{selectedContent.title}</h2>
            <p>{selectedContent.content}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">Select an item to view its content</p>
        )}
      </div>
    </div>
  )
}