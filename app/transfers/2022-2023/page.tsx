import React from 'react'

type Transfer = {
  speler: string
  vorigeClub: string
  nieuweClub: string
  positie: string
}

const transfers: Transfer[] = [
  { speler: "Florian Mayer", vorigeClub: "Roda JC", nieuweClub: "1. FC Bocholt", positie: "Verdediger" },
  { speler: "Bryan Limbombe", vorigeClub: "Roda JC", nieuweClub: "SC Heracles", positie: "Aanvaller" },
  { speler: "Ted van de Pavert", vorigeClub: "Roda JC", nieuweClub: "", positie: "Verdediger" },
  { speler: "Ali Barak", vorigeClub: "Roda JC", nieuweClub: "1 FC Bocholt", positie: "Verdediger" },
  { speler: "Terrence Douglas", vorigeClub: "Roda JC", nieuweClub: "NK Istra", positie: "Verdediger" },
  { speler: "Lennard Hartjes", vorigeClub: "Roda JC (gehuurd van Feyenoord)", nieuweClub: "Excelsior", positie: "Middenvelder" },
  { speler: "Mohamed Mallahi", vorigeClub: "Roda JC (gehuurd van FC Utrecht)", nieuweClub: "FC Utrecht", positie: "Aanvaller" },
  { speler: "Moritz Nicolas", vorigeClub: "Roda JC (gehuurd van BMG)", nieuweClub: "Borussia Mönchengladbach", positie: "Doelman" },
  { speler: "Romano Postema", vorigeClub: "Roda JC (gehuurd van FC Groningen)", nieuweClub: "FC Groningen", positie: "Aanvaller" },
  { speler: "Dylan Vente", vorigeClub: "Roda JC", nieuweClub: "Hibernian FC", positie: "Aanvaller" },
  { speler: "Guus Joppen", vorigeClub: "Roda JC", nieuweClub: "De Treffers", positie: "Verdediger" },
  { speler: "Rody de Boer", vorigeClub: "Roda JC", nieuweClub: "Aalborg BK", positie: "Doelman" },
  { speler: "Jamil Takidine", vorigeClub: "Roda JC", nieuweClub: "Bocholt VV", positie: "Verdediger" },
  { speler: "Phil Sieben", vorigeClub: "Roda JC", nieuweClub: "RW Oberhausen", positie: "Middenvelder" },
  { speler: "Rodney Kongolo", vorigeClub: "Cosenza Calcio", nieuweClub: "Roda JC", positie: "Middenvelder" },
  { speler: "Wesley Spieringhs", vorigeClub: "Willem II", nieuweClub: "Roda JC", positie: "Middenvelder" },
  { speler: "Matisse Didden", vorigeClub: "KRC Genk", nieuweClub: "Roda JC", positie: "Verdediger" },
  { speler: "Walid Ould-Chikh", vorigeClub: "FC Volendam (huur)", nieuweClub: "Roda JC", positie: "Middenvelder" },
  { speler: "Brian Koglin", vorigeClub: "VVV", nieuweClub: "Roda JC", positie: "Verdediger" },
  { speler: "Jordy Steins", vorigeClub: "Jong FC Utrecht", nieuweClub: "Roda JC", positie: "Doelman" },
  { speler: "Enrique Pena Zauner", vorigeClub: "Eintracht Braunschweig", nieuweClub: "Roda JC", positie: "Aanvaller" },
  { speler: "Maximilian Schmid", vorigeClub: "1 FC Köln-2 (huur)", nieuweClub: "Roda JC (gehuurd van 1 FC Köln)", positie: "Aanvaller" },
  { speler: "Marvin Pourié", vorigeClub: "SV Meppen", nieuweClub: "Roda JC", positie: "Aanvaller" },
  { speler: "Marvin Pourié", vorigeClub: "Roda JC", nieuweClub: "VSG Altglienicke", positie: "Aanvaller" },
  { speler: "Koen Bucker", vorigeClub: "SC Heracles", nieuweClub: "Roda JC", positie: "Doelman" },
  { speler: "Laurit Krasniqi", vorigeClub: "Royal Antwerp FC (huur)", nieuweClub: "Roda JC", positie: "Verdediger" },
  { speler: "Saydou Bangura", vorigeClub: "Roda JC O21", nieuweClub: "Roda JC", positie: "Aanvaller" },
  { speler: "Orhan Džepar", vorigeClub: "MVV", nieuweClub: "Roda JC", positie: "Middenvelder" },
  { speler: "Beerten Lucas", vorigeClub: "KRC Genk", nieuweClub: "Roda JC", positie: "Verdediger" },
  { speler: "Calvin Raatsie", vorigeClub: "Jong FC Utrecht (huur)", nieuweClub: "Roda JC (gehuurd van JFCU)", positie: "Doelman" },
  { speler: "Vaclav Sejk", vorigeClub: "Sparta Praag", nieuweClub: "Roda JC (gehuurd van Sparta Praag)", positie: "Aanvaller" },
  { speler: "Joey Müller", vorigeClub: "Schalke 04", nieuweClub: "Roda JC", positie: "Verdediger" },
  { speler: "Metehan Güclü", vorigeClub: "FC Emmen", nieuweClub: "Roda JC", positie: "Aanvaller" }
]

export default function TransferPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voetbal Transfers 2022-2023</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Speler</th>
              <th className="py-2 px-4 border-b">Vorige club</th>
              <th className="py-2 px-4 border-b">Nieuwe club</th>
              <th className="py-2 px-4 border-b">Positie</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b">{transfer.speler}</td>
                <td className="py-2 px-4 border-b">{transfer.vorigeClub}</td>
                <td className="py-2 px-4 border-b">{transfer.nieuweClub || '-'}</td>
                <td className="py-2 px-4 border-b">{transfer.positie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}