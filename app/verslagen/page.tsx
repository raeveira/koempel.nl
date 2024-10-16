'use client'

import { useState, useEffect } from 'react'

type ContentItem = {
  title: string
  content: string
}

type ContentCategory = {
  name: string
  items: ContentItem[]
}

const contentData: ContentCategory[] = [
  {
    name: "1999/2000",
    items: [
      { title: "28 mei 2000 NEC tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "22 mei 2000 NEC tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "14 mei 2000 Roda JC tegen AZ", content: "Verslag van de wedstrijd..." },
      { title: "07 mei 2000 Fortuna Sittard tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "28 apr 2000 Roda JC tegen FC Twente", content: "Verslag van de wedstrijd..." },
      { title: "22 apr 2000 SC Heerenveen tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "15 apr 2000 Roda JC tegen Willem II", content: "Verslag van de wedstrijd..." },
      { title: "12 apr 2000 Vitesse tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "07 apr 2000 NEC tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "31 mrt 2000 Roda JC tegen Ajax", content: "Verslag van de wedstrijd..." },
      { title: "25 mrt 2000 Cambuur L. tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "19 mrt 2000 RKC tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "11 mrt 2000 Roda JC tegen Sparta", content: "Verslag van de wedstrijd..." },
      { title: "03 mrt 2000 Vitesse tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "29 feb 2000 Roda JC tegen Cambuur L.", content: "Verslag van de wedstrijd..." },
      { title: "25 feb 2000 Roda JC tegen PSV", content: "Verslag van de wedstrijd..." },
      { title: "19 feb 2000 FC Den Bosch tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "17 feb 2000 FC Utrecht tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "10 feb 2000 Roda JC tegen FC Utrecht", content: "Verslag van de wedstrijd..." },
      { title: "06 feb 2000 Feyenoord tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "01 feb 2000 MVV tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "28 jan 2000 Roda JC tegen Ajax", content: "Verslag van de wedstrijd..." },
      { title: "18 dec 1999 FC Twente tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "11 dec 1999 Roda JC tegen Graafschap", content: "Verslag van de wedstrijd..." },
      { title: "04 dec 1999 PSV tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "30 nov 1999 Roda JC tegen MVV", content: "Verslag van de wedstrijd..." },
      { title: "07 nov 1999 Roda JC tegen FC Den Bosch", content: "Verslag van de wedstrijd..." },
      { title: "29 okt 1999 Ajax tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "24 okt 1999 Roda JC tegen Vitesse", content: "Verslag van de wedstrijd..." },
      { title: "15 okt 1999 Roda JC tegen Feyenoord", content: "Verslag van de wedstrijd..." },
      { title: "11 okt 1999 Sparta tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "03 okt 1999 FC Utrecht tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "25 sep 1999 Roda JC tegen Fortuna Sittard", content: "Verslag van de wedstrijd..." },
      { title: "19 sep 1999 Roda JC tegen Heerenveen", content: "Verslag van de wedstrijd..." },
      { title: "10 sep 1999 AZ tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "28 aug 1999 Roda JC tegen Nec", content: "Verslag van de wedstrijd..." },
      { title: "21 aug 1999 Roda JC tegen RKC", content: "Verslag van de wedstrijd..." },
      { title: "14 aug 1999 De Graafschap tegen Roda JC", content: "Verslag van de wedstrijd..." },
    ]
  },
  {
    name: "2000/2001",
    items: [
      { title: "15 mei 2001 Roda JC tegen Feyenoord", content: "Verslag van de wedstrijd..." },
      { title: "10 mei 2001 Ajax tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "05 mei 2001 Roda JC tegen PSV", content: "Verslag van de wedstrijd..." },
      { title: "28 apr 2001 FC Utrecht tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "22 apr 2001 Roda JC tegen Vitesse", content: "Verslag van de wedstrijd..." },
    ]
  },
  {
    name: "2001/2002",
    items: [
      { title: "15 mei 2001 Roda JC tegen Feyenoord", content: "Verslag van de wedstrijd..." },
      { title: "10 mei 2001 Ajax tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "05 mei 2001 Roda JC tegen PSV", content: "Verslag van de wedstrijd..." },
      { title: "28 apr 2001 FC Utrecht tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "22 apr 2001 Roda JC tegen Vitesse", content: "Verslag van de wedstrijd..." },
    ]
  },
  {
    name: "2002/2003",
    items: [
      { title: "15 mei 2001 Roda JC tegen Feyenoord", content: "Verslag van de wedstrijd..." },
      { title: "10 mei 2001 Ajax tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "05 mei 2001 Roda JC tegen PSV", content: "Verslag van de wedstrijd..." },
      { title: "28 apr 2001 FC Utrecht tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "22 apr 2001 Roda JC tegen Vitesse", content: "Verslag van de wedstrijd..." },
    ]
  },
  {
    name: "2003/2004",
    items: [
      { title: "15 mei 2001 Roda JC tegen Feyenoord", content: "Verslag van de wedstrijd..." },
      { title: "10 mei 2001 Ajax tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "05 mei 2001 Roda JC tegen PSV", content: "Verslag van de wedstrijd..." },
      { title: "28 apr 2001 FC Utrecht tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "22 apr 2001 Roda JC tegen Vitesse", content: "Verslag van de wedstrijd..." },
    ]
  },
  {
    name: "2004/2005",
    items: [
      { title: "15 mei 2001 Roda JC tegen Feyenoord", content: "Verslag van de wedstrijd..." },
      { title: "10 mei 2001 Ajax tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "05 mei 2001 Roda JC tegen PSV", content: "Verslag van de wedstrijd..." },
      { title: "28 apr 2001 FC Utrecht tegen Roda JC", content: "Verslag van de wedstrijd..." },
      { title: "22 apr 2001 Roda JC tegen Vitesse", content: "Verslag van de wedstrijd..." },
    ]
  },

]

export default function KPDOverige() {
    const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
    const [contentHeight, setContentHeight] = useState('600px')
    const [selectedYear, setSelectedYear] = useState<string>(contentData[0].name) // Default to first year
  
    useEffect(() => {
      const updateHeight = () => {
        const navbarHeight = 110
        const footerHeight = 50
        const availableHeight = window.innerHeight - navbarHeight - footerHeight
        setContentHeight(`${availableHeight}px`)
      }
  
      updateHeight()
      window.addEventListener('resize', updateHeight)
      return () => window.removeEventListener('resize', updateHeight)
    }, [])
  
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(e.target.value)
      setSelectedContent(null) // Reset selected content when the year changes
    }
  
    return (
      <div className="flex bg-gray-100" style={{ height: contentHeight }}>
        <div className="w-1/3 p-4 border-r overflow-auto bg-white text-black custom-scrollbar">
          <h1 className="text-2xl font-bold mb-6 text-center">Roda JC Fan Zone</h1>
          
          {/* Dropdown to select year */}
          <div className="mb-6">
            <label htmlFor="year-select" className="block text-sm font-medium mb-2 text-black">
              Kies een jaar
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              className="w-full px-2 py-1 bg-white text-black border border-black rounded focus:outline-none focus:ring-2 focus:ring-black mb-4"
            >
              {contentData.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Display matches for the selected year */}
          {contentData
            .filter((category) => category.name === selectedYear)
            .map((category, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-lg font-bold mb-2 bg-white text-black py-1 px-2 rounded">{category.name}</h2>
                {category.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full text-left px-2 py-1 text-sm hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white mb-1 rounded transition duration-150 ease-in-out"
                    onClick={() => setSelectedContent(item)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            ))}
        </div>
  
        <div className="w-2/3 p-4 bg-white overflow-auto custom-scrollbar">
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
      </div>
    )
  }