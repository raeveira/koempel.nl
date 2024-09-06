import React from 'react'

type Transfer = {
    speler: string
    vorigeClub: string
    nieuweClub: string
    positie: string
}

const transfers: Transfer[] = [
    { speler: "Simon Gustafson", vorigeClub: "Roda JC (gehuurd van Feyenoord)", nieuweClub: "FC Utrecht", positie: "Middenvelder" },
    { speler: "Tom Muyters", vorigeClub: "Samsunspor", nieuweClub: "Roda JC", positie: "Doelman" },
    { speler: "Jorn Vancamp", vorigeClub: "Roda JC (gehuurd van Anderlecht)", nieuweClub: "Beerschot-Wilrijk (huur Anderlecht)", positie: "Aanvaller" },
    { speler: "Christian Kum", vorigeClub: "Roda JC", nieuweClub: "VVV", positie: "Verdediger" },
    { speler: "Filip Kurto", vorigeClub: "Roda JC", nieuweClub: "Wellington Phoenix", positie: "Doelman" },
    { speler: "Mikhael Rosheuvel", vorigeClub: "Roda JC", nieuweClub: "NAC", positie: "Aanvaller" },
    { speler: "Niels Verburgh", vorigeClub: "Club Brugge", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Adil Auassar", vorigeClub: "Roda JC", nieuweClub: "Sparta", positie: "Verdediger" },
    { speler: "Dani Schahin", vorigeClub: "Roda JC", nieuweClub: "Pyramids FC", positie: "Aanvaller" },
    { speler: "Hidde Jurjus", vorigeClub: "Roda JC (gehuurd van PSV)", nieuweClub: "De Graafschap (huur PSV)", positie: "Doelman" },
    { speler: "Richard Jensen", vorigeClub: "FC Twente", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Ba-Muaka Simakala", vorigeClub: "Borussia Monchengladbach", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Ba-Muaka Simakala", vorigeClub: "Roda JC", nieuweClub: "SV 07 Elversberg", positie: "Aanvaller" },
    { speler: "Donis Avdijaj", vorigeClub: "Roda JC (gehuurd van Schalke)", nieuweClub: "Willem II", positie: "Aanvaller" },
    { speler: "Tsiy Ndenge", vorigeClub: "Roda JC (gehuurd van Borussia Mönchengladbach)", nieuweClub: "", positie: "Middenvelder" },
    { speler: "Patrick Banggaard", vorigeClub: "Roda JC (gehuurd van Darmstadt 98)", nieuweClub: "Pafos FC (huur Darmstadt 98)", positie: "Verdediger" },
    { speler: "Nathan Rutjens", vorigeClub: "Roda JC", nieuweClub: "Groene Ster", positie: "Middenvelder" },
    { speler: "Ard van Peppen", vorigeClub: "Roda JC", nieuweClub: "", positie: "Verdediger" },
    { speler: "Maecky Ngombo", vorigeClub: "Roda JC", nieuweClub: "Ascoli (huur FC Bari 1908)", positie: "Aanvaller" },
    { speler: "Ashton Götz", vorigeClub: "Roda JC", nieuweClub: "", positie: "Verdediger" },
    { speler: "Raf Mertens", vorigeClub: "Roda JC jeugd", nieuweClub: "Roda JC", positie: "Doelman" },
    { speler: "Radomir Novakovic", vorigeClub: "Roda JC jeugd", nieuweClub: "Roda JC", positie: "Doelman" },
    { speler: "Mart Remans", vorigeClub: "Roda JC jeugd", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Roshon van Eijma", vorigeClub: "Roda JC jeugd", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Tim Väyrynen", vorigeClub: "Hansa Rostock", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Mitchel Keulen", vorigeClub: "Roda JC jeugd", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Nicky Souren", vorigeClub: "Roda JC jeugd", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Ognjen Gnjatić", vorigeClub: "Roda JC", nieuweClub: "Korona Kielce", positie: "Middenvelder" },
    { speler: "Maxime Gunst", vorigeClub: "MVV", nieuweClub: "Roda JC", positie: "Verdediger" }
  ]
  

export default function TransferPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Voetbal Transfers 2018-2019</h1>
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