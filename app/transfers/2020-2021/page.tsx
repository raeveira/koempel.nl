import React from 'react'

type Transfer = {
  speler: string
  vorigeClub: string
  nieuweClub: string
  positie: string
}

const transfers: Transfer[] = [
    { speler: "Antonio Cotan", vorigeClub: "Roda JC", nieuweClub: "CD Numancia", positie: "Middenvelder" },
    { speler: "Ike Ugbo", vorigeClub: "Roda JC (huur Chelsea)", nieuweClub: "Chelsea", positie: "Aanvaller" },
    { speler: "Yann Aurel Bisseck", vorigeClub: "Roda JC (huur 1FC Köln)", nieuweClub: "Vitória Guimaraes", positie: "Verdediger" },
    { speler: "Juan-Gerardo Ramirez-Alonso", vorigeClub: "Roda JC", nieuweClub: "", positie: "Verdediger" },
    { speler: "Maxime Gunst", vorigeClub: "Roda JC", nieuweClub: "KSV Roeselare", positie: "Verdediger" },
    { speler: "Daryl Werker", vorigeClub: "Roda JC", nieuweClub: "Xhanti FC", positie: "Verdediger" },
    { speler: "Tom Muyters", vorigeClub: "Roda JC", nieuweClub: "", positie: "Doelman" },
    { speler: "Ivar Prtajin", vorigeClub: "Roda JC", nieuweClub: "FC Schaffhausen", positie: "Aanvaller" },
    { speler: "Roshon van Eijma", vorigeClub: "Roda JC", nieuweClub: "Preußen Münster", positie: "Verdediger" },
    { speler: "Romario Rösch", vorigeClub: "Roda JC (huur FC Augsburg)", nieuweClub: "FC Augsburg", positie: "Middenvelder" },
    { speler: "Timothy Durwael", vorigeClub: "Roda JC", nieuweClub: "KSV Roeselare", positie: "Verdediger" },
    { speler: "Radomir Novakovic", vorigeClub: "Roda JC", nieuweClub: "FK Indjija", positie: "Doelman" },
    { speler: "Mart Remans", vorigeClub: "Roda JC", nieuweClub: "TOP Oss (verhuurd)", positie: "Aanvaller" },
    { speler: "Roland Alberg", vorigeClub: "Roda JC", nieuweClub: "Hyberabad FC (verhuurd)", positie: "Aanvaller" },
    { speler: "Jordi Croux", vorigeClub: "Roda JC", nieuweClub: "Avispa Fukuoka", positie: "Aanvaller" },
    { speler: "Livio Milts", vorigeClub: "Roda JC", nieuweClub: "TOP Oss (verhuurd)", positie: "Middenvelder" },
    { speler: "Thijmen Goppel", vorigeClub: "ADO Den Haag", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Xander Lambrix", vorigeClub: "KRC Genk", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Kees Luijckx", vorigeClub: "Silkeborg IF", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Niek Vossebelt", vorigeClub: "Almere City FC", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Patrick Pflücke", vorigeClub: "KFC Uerdingen", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Michalis Ioannou", vorigeClub: "Anorthosis Famagusta", nieuweClub: "Roda JC (huur)", positie: "Middenvelder" },
    { speler: "Jan Hoekstra", vorigeClub: "FC Groningen", nieuweClub: "Roda JC (huur)", positie: "Doelman" },
    { speler: "Stefano Marzo", vorigeClub: "KSC Lokeren", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Youri Roulaux", vorigeClub: "Jong PSV", nieuweClub: "Roda JC", positie: "Doelman" },
    { speler: "Amir Absalem", vorigeClub: "FC Groningen", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Fabian Serrarens", vorigeClub: "Arka Gdynia", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Danny Bakker", vorigeClub: "ADO Den Haag", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Stan van Dijck", vorigeClub: "VVV", nieuweClub: "Roda JC (huur)", positie: "Verdediger" },
    { speler: "Ali Messaoud", vorigeClub: "Vendsyssel FF", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Dylan Vente", vorigeClub: "Feyenoord", nieuweClub: "Roda JC (huur)", positie: "Aanvaller" },
    { speler: "Miguel Santos", vorigeClub: "Astra Giurgiu", nieuweClub: "Roda JC (huur)", positie: "Doelman" }
  ]



export default function TransferPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voetbal Transfers 2020-2021</h1>
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