'use client'

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Team {
  rank: number;
  team: { id: number; name: string; logo: string };
  all: { played: number; win: number; draw: number; lose: number };
  points: number;
}

export default function LiveStandings() {
  const [standings, setStandings] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStandings = async () => {
    try {
      const [standingsRes, teamsRes] = await Promise.all([
        fetch("/api/standings"),
        fetch("/api/teams")
      ]);

      const standingsData = await standingsRes.json();
      const teamsData = await teamsRes.json();

      if (!standingsRes.ok) {
        throw new Error(`Failed to fetch standings: ${standingsRes.status} ${standingsRes.statusText}. ${standingsData.error || ''}`);
      }

      if (!teamsRes.ok) {
        throw new Error(`Failed to fetch teams: ${teamsRes.status} ${teamsRes.statusText}. ${teamsData.error || ''}`);
      }

      if (
        standingsData.response &&
        standingsData.response.length > 0 &&
        standingsData.response[0].league &&
        standingsData.response[0].league.standings &&
        standingsData.response[0].league.standings.length > 0
      ) {
        const standingsWithLogos = standingsData.response[0].league.standings[0].map((team: Team) => {
          const matchingTeam = teamsData.response.find((t: any) => t.team.id === team.team.id);
          return {
            ...team,
            team: {
              ...team.team,
              logo: matchingTeam ? matchingTeam.team.logo : ''
            }
          };
        });
        setStandings(standingsWithLogos);
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Plaats</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Gespeeld</TableHead>
                <TableHead>Win</TableHead>
                <TableHead>Gelijk</TableHead>
                <TableHead>Verloren</TableHead>
                <TableHead>Punten</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((team) => (
                <TableRow key={team.team.id}>
                  <TableCell>{team.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={team.team.logo} alt={`${team.team.name} logo`} />
                        <AvatarFallback>{team.team.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{team.team.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{team.all.played}</TableCell>
                  <TableCell>{team.all.win}</TableCell>
                  <TableCell>{team.all.draw}</TableCell>
                  <TableCell>{team.all.lose}</TableCell>
                  <TableCell>{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center">No standings available at this time.</p>
      )}
    </div>
  );
}