'use client'

import { useEffect, useState } from "react";

interface Team {
  rank: number;
  team: { id: number; name: string };
  all: { played: number; win: number; draw: number; lose: number };
  points: number;
}

export default function LiveStandings() {
  const [standings, setStandings] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStandings = async () => {
    try {
      const res = await fetch("/api/standings");
      const data = await res.json();
      console.log('Client-side data:', data);

      if (!res.ok) {
        throw new Error(`Failed to fetch standings: ${res.status} ${res.statusText}. ${data.error || ''}`);
      }

      if (
        data.response &&
        data.response.length > 0 &&
        data.response[0].league &&
        data.response[0].league.standings &&
        data.response[0].league.standings.length > 0
      ) {
        setStandings(data.response[0].league.standings[0]);
      } else {
        throw new Error("No standings data available in the expected format");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, []);

  if (loading) return <p className="text-center p-4">Loading standings...</p>;
  if (error) return (
    <div className="text-center p-4">
      <p className="text-red-500 font-bold">Error:</p>
      <p className="text-red-500">{error}</p>
      <p className="mt-4">Please check the server logs for more details.</p>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Keuken Kampioen Divisie Live Standings</h1>
      {standings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Position</th>
                <th className="border border-gray-300 p-2">Team</th>
                <th className="border border-gray-300 p-2">Played</th>
                <th className="border border-gray-300 p-2">Won</th>
                <th className="border border-gray-300 p-2">Draw</th>
                <th className="border border-gray-300 p-2">Lost</th>
                <th className="border border-gray-300 p-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team) => (
                <tr key={team.team.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{team.rank}</td>
                  <td className="border border-gray-300 p-2">{team.team.name}</td>
                  <td className="border border-gray-300 p-2">{team.all.played}</td>
                  <td className="border border-gray-300 p-2">{team.all.win}</td>
                  <td className="border border-gray-300 p-2">{team.all.draw}</td>
                  <td className="border border-gray-300 p-2">{team.all.lose}</td>
                  <td className="border border-gray-300 p-2">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No standings available at this time.</p>
      )}
    </div>
  );
}