import React from 'react'

type Transfer = {
    speler: string
    vorigeClub: string
    nieuweClub: string
    positie: string
}

const transfers: Transfer[] = [
    { speler: "Mitchel Paulissen", vorigeClub: "Roda JC", nieuweClub: "SC Cambuur", positie: "Middenvelder" },
    { speler: "Florian Loshaj", vorigeClub: "Roda JC", nieuweClub: "CSM Politehnica Iași", positie: "Middenvelder" },
    { speler: "Jannes Vansteenkiste", vorigeClub: "Roda JC", nieuweClub: "KMSK Deinze", positie: "Verdediger" },
    { speler: "Robert Klaasen", vorigeClub: "De Graafschap", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Jordy Croux", vorigeClub: "Willem II (verhuurd aan MVV)", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Mario Engels", vorigeClub: "Roda JC", nieuweClub: "SV Sandhausen", positie: "Aanvaller" },
    { speler: "Juan-Gerardo Ramirez Alonso", vorigeClub: "FC Stumbras", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Antonio Cotán", vorigeClub: "Sevilla", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Roland Alberg", vorigeClub: "Panionios", nieuweClub: "Roda JC", positie: "Middenvelder" },
    { speler: "Romario Rösch", vorigeClub: "FC Augsburg", nieuweClub: "Roda JC (huur)", positie: "Middenvelder" },
    { speler: "Ivan Prtajin", vorigeClub: "Hajduk Split", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Ike Ugbo", vorigeClub: "Chelsea", nieuweClub: "Roda JC", positie: "Aanvaller" },
    { speler: "Yann Aurel Bisseck", vorigeClub: "1FC Köln", nieuweClub: "Roda JC", positie: "Verdediger" },
    { speler: "Gyliano van Velzen", vorigeClub: "Roda JC", nieuweClub: "Crawley Town FC", positie: "Aanvaller" },
    { speler: "Mo el Makrini", vorigeClub: "Roda JC", nieuweClub: "Kilmarnock", positie: "Middenvelder" },
    { speler: "Maxime Gunst", vorigeClub: "MVV", nieuweClub: "Roda JC", positie: "Verdediger" }
]

export default function TransferPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Voetbal Transfers 2019-2020</h1>
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