import React from 'react'
import { transfers } from '@/lib/transfers'



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