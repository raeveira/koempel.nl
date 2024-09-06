import React from 'react'

type Transfer = {
  speler: string
  vorigeClub: string
  nieuweClub: string
  positie: string
}

const transfers: Transfer[] = [
    { speler: "Mitchel Keulen", vorigeClub: "Roda JC", nieuweClub: "MVV", positie: "Verdediger" },
    { speler: "Pepijn Schlösser", vorigeClub: "Roda JC", nieuweClub: "", positie: "Verdediger" },
    { speler: "Jan Hoekstra", vorigeClub: "Roda JC (huur FC Groningen)", nieuweClub: "FC Groningen", positie: "Doelman" },
    { speler: "Miguel Santos", vorigeClub: "Roda JC (huur Astra Giurgiu)", nieuweClub: "Astra Giurgiu", positie: "Doelman" },
    { speler: "Youri Roulaux", vorigeClub: "Roda JC", nieuweClub: "Jong PSV", positie: "Doelman(trainer)" },
    { speler: "Kees Luijckx", vorigeClub: "Roda JC", nieuweClub: "", positie: "Verdediger" },
    { speler: "Stan van Dijck", vorigeClub: "Roda JC (huur VVV)", nieuweClub: "VVV", positie: "Verdediger" },
    { speler: "Erik Falkenburg", vorigeClub: "Roda JC", nieuweClub: "", positie: "Aanvaller" },
    { speler: "Danny Bakker", vorigeClub: "Roda JC (huur ADO Den Haag)", nieuweClub: "ADO Den Haag", positie: "Middenvelder" },
    { speler: "Michalis Ioannou", vorigeClub: "Roda JC (huur Anorthosis Famagusta)", nieuweClub: "", positie: "Middenvelder" },
    { speler: "Livio Milts", vorigeClub: "Roda JC (verhuurd aan TOP Oss)", nieuweClub: "FC Urartu", positie: "Middenvelder" },
    { speler: "Thijmen Goppel", vorigeClub: "Roda JC", nieuweClub: "SV Wehen Wiesbaden", positie: "Aanvaller" },
    { speler: "Nicky Souren", vorigeClub: "Roda JC", nieuweClub: "MVV", positie: "Middenvelder" },
    { speler: "Mart Remans", vorigeClub: "Roda JC (verhuurd aan TOP Oss)", nieuweClub: "MVV", positie: "Aanvaller" },
    { speler: "Jeremy Cijntje", vorigeClub: "Roda JC (huur Heracles)", nieuweClub: "FC Den Bosch", positie: "Aanvaller" },
    { speler: "Jeremy Cijntje", vorigeClub: "Roda JC", nieuweClub: "Heracles (verhuur aan FC Den Bosch)", positie: "Aanvaller" },
    { speler: "Jimmy Vijgen", vorigeClub: "Roda JC (O21)", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Rody de Boer", vorigeClub: "AZ", nieuweClub: "Roda JC", positie: "Keeper" },
    { speler: "Denzel Jubitana", vorigeClub: "Waasland Beveren", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Guus Joppen", vorigeClub: "Helmond Sport", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Florian Mayer", vorigeClub: "Borussia Mönchengladbach", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Dylan Vente", vorigeClub: "Feyenoord", nieuweClub: "Roda JC (huur)", positie: "Aanvaller" },
    { speler: "Xian Emmers", vorigeClub: "FC Internazionale", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Daryl Werker", vorigeClub: "Xanthi", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Jeremy Cijntje", vorigeClub: "Heracles", nieuweClub: "Roda JC (huur)", positie: "Aanvaller" },
    { speler: "Tomer Altman", vorigeClub: "Clubloos", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Jamie Yayi Mpie", vorigeClub: "Sampdoria", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Dehninio Muringen", vorigeClub: "Clubloos", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Dave van den Berg", vorigeClub: "FC Utrecht", nieuweClub: "Roda JC (huur)", positie: "Middenvelder" },
    { speler: "Mohamed Amissi", vorigeClub: "Heracles", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Pelé van Anholt", vorigeClub: "Clubloos", nieuweClub: "Roda JC", positie: "Verdediger" }
  ]



export default function TransferPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voetbal Transfers 2021-2022</h1>
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