import React from 'react'

type Transfer = {
  speler: string
  vorigeClub: string
  nieuweClub: string
  positie: string
}

const transfers: Transfer[] = [
  { speler: "Matisse Didden", vorigeClub: "Roda JC", nieuweClub: "FC Utrecht", positie: "Verdediger" },
  { speler: "Walid Ould Chikh", vorigeClub: "Roda JC (gehuurd van FC Volendam)", nieuweClub: "", positie: "Middenvelder" },
  { speler: "Calvin Raatsie", vorigeClub: "Roda JC (gehuurd van Jong FC Utrecht)", nieuweClub: "SC Cambuur", positie: "Doelman" },
  { speler: "Sami Ouaissa", vorigeClub: "Roda JC", nieuweClub: "NEC", positie: "Middenvelder" },
  { speler: "Laurit Krasniqi", vorigeClub: "Roda JC", nieuweClub: "", positie: "Verdediger" },
  { speler: "Metehan Güclü", vorigeClub: "Roda JC", nieuweClub: "", positie: "Aanvaller" },
  { speler: "Loek Hamers", vorigeClub: "Roda JC", nieuweClub: "", positie: "Doelman" },
  { speler: "Boyd Reith", vorigeClub: "Roda JC", nieuweClub: "Sparta", positie: "Verdediger" },
  { speler: "Fabio Sposito", vorigeClub: "Roda JC", nieuweClub: "", positie: "Middenvelder" },
  { speler: "Niek Vossebelt", vorigeClub: "Roda JC", nieuweClub: "Wezel Sport (amateurs)", positie: "Middenvelder" },
  { speler: "Lennerd Daneels", vorigeClub: "Roda JC", nieuweClub: "Helmond Sport", positie: "Aanvaller" },
  { speler: "Leroy Been", vorigeClub: "Roda JC", nieuweClub: "", positie: "Aanvaller" },
  { speler: "Koen Jansen", vorigeClub: "PSV", nieuweClub: "Roda JC", positie: "Verdediger" },
  { speler: "Justin Treichel", vorigeClub: "Schalke 04 II", nieuweClub: "Roda JC", positie: "Doelman" },
  { speler: "Jay Kruiver", vorigeClub: "Telstar", nieuweClub: "Roda JC", positie: "Verdediger" },
  { speler: "Thomas Oude Kotte", vorigeClub: "Telstar", nieuweClub: "Roda JC", positie: "Verdediger" },
  { speler: "Joshua Schwirten", vorigeClub: "FC Erzgebirge Aue", nieuweClub: "Roda JC", positie: "Middenvelder" },
  { speler: "Iman Griffith", vorigeClub: "Jong AZ", nieuweClub: "Roda JC", positie: "Aanvaller" },
  { speler: "Nathan Markelo", vorigeClub: "Fortuna Sittard", nieuweClub: "Roda JC", positie: "Verdediger" },
  { speler: "Patriot Sejdiu", vorigeClub: "Malmö FF (huur)", nieuweClub: "Roda JC", positie: "Aanvaller" }
]



export default function TransferPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voetbal Transfers 2023-2024</h1>
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