'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Team {
  team: {
    id: number;
    name: string;
    logo: string;
  };
}

interface Match {
  homeTeam: Team['team'];
  awayTeam: Team['team'];
  date: Date;
  score: {
    home: number;
    away: number;
  };
}

export default function LastMatches() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const maxRetries = 3;

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await fetch("/api/teams");
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(`Failed to fetch teams: ${res.status} ${res.statusText}`);
                }
                setTeams(data.response);
            } catch (err) {
                setError('Error fetching teams. Please try again later.');
            }
        };

        const fetchMatches = async (retries = 0) => {
            const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures';
            const params = new URLSearchParams({
                team: '414', // Roda JC team ID
                last: '4'    // Last 4 matches
            });

            try {
                const response = await fetch(`${url}?${params}`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '44dfcf0a82msh4268d80d4b0e5f7p1ebafbjsn7fd1037d4055' as string,
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }

                const data = await response.json();
                const formattedMatches = data.response.map((match: any) => ({
                    homeTeam: {
                        id: match.teams.home.id,
                        name: match.teams.home.name,
                        logo: match.teams.home.logo,
                    },
                    awayTeam: {
                        id: match.teams.away.id,
                        name: match.teams.away.name,
                        logo: match.teams.away.logo,
                    },
                    date: new Date(match.fixture.date),
                    score: {
                        home: match.goals.home,
                        away: match.goals.away
                    }
                }));

                setMatches(formattedMatches);
            } catch (err) {
                if (retries < maxRetries) {
                    console.warn(`Retrying fetch matches... Attempt ${retries + 1}`);
                    await fetchMatches(retries + 1);
                } else {
                    setError('Tijdelijk geen laatste wedstrijden beschikbaar, probeer het later nog eens.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        Promise.all([fetchTeams(), fetchMatches()]);
    }, []);

    const getTeamLogo = (teamId: number) => {
        const team = teams.find(t => t.team.id === teamId);
        return team ? team.team.logo : '';
    };

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <div className="text-center text-zinc-400 p-3 m-3 md:mx-60 border border-dashed rounded-md">{error}</div>;
    }

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Laatste wedstrijden</h2>
                <div className="space-y-4">
                    {matches.map((match, i) => (
                        <Card key={i}>
                            <CardContent className="flex justify-between items-center p-4">
                                <div className="flex flex-col items-center space-y-2 w-1/3">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={getTeamLogo(match.homeTeam.id)} alt={`${match.homeTeam.name} logo`} />
                                        <AvatarFallback>{match.homeTeam.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-bold text-center">{match.homeTeam.name}</span>
                                </div>
                                <div className="text-center w-1/3">
                                    <p className="font-bold mb-2">{match.score.home} - {match.score.away}</p>
                                    <p className="text-sm text-gray-500">{match.date.toLocaleDateString('nl-NL', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }).replace(',', ' / ')}</p>
                                </div>
                                <div className="flex flex-col items-center space-y-2 w-1/3">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={getTeamLogo(match.awayTeam.id)} alt={`${match.awayTeam.name} logo`} />
                                        <AvatarFallback>{match.awayTeam.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-bold text-center">{match.awayTeam.name}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function LoadingSkeleton() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Laatste wedstrijden</h2>
                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i}>
                            <CardContent className="flex justify-between items-center p-4">
                                <div className="flex flex-col items-center space-y-2 w-1/3">
                                    <Skeleton className="h-16 w-16 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="text-center w-1/3">
                                    <Skeleton className="h-6 w-16 mx-auto mb-2" />
                                    <Skeleton className="h-4 w-32 mx-auto" />
                                </div>
                                <div className="flex flex-col items-center space-y-2 w-1/3">
                                    <Skeleton className="h-16 w-16 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}