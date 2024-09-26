'use client'

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Team {
  team: {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  };
  venue: {
    name: string;
    address: string;
    city: string;
    capacity: number;
  };
}

export default function LeagueTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = async () => {
    try {
      const res = await fetch("/api/teams");
      const data = await res.json();
      console.log('Client-side data:', data);

      if (!res.ok) {
        throw new Error(`Failed to fetch teams: ${res.status} ${res.statusText}. ${data.error || ''}`);
      }

      if (data.response && data.response.length > 0) {
        setTeams(data.response);
      } else {
        throw new Error("No teams data available in the expected format");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading) return <p className="text-center p-4">Loading teams...</p>;
  if (error) return (
    <div className="text-center p-4">
      <p className="text-red-500 font-bold">Error:</p>
      <p className="text-red-500">{error}</p>
      <p className="mt-4">Please check the server logs for more details.</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Keuken Kampioen Divisie Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <Card key={team.team.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={team.team.logo} alt={`${team.team.name} logo`} />
                <AvatarFallback>{team.team.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <CardTitle>{team.team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Founded:</strong> {team.team.founded}</p>
              <p><strong>Stadium:</strong> {team.venue.name}</p>
              <p><strong>City:</strong> {team.venue.city}</p>
              <p><strong>Capacity:</strong> {team.venue.capacity.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}