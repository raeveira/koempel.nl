'use client'
import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";

export default function UpcomingMatches() {
    const matches = [
        {
            homeTeam: "Emmen",
            awayTeam: "Roda JC",
            date: new Date(2024, 8, 13)
        },
        {
            homeTeam: "Cambuur",
            awayTeam: "Roda JC",
            date: new Date(2024, 8, 16)
        },
        {
            homeTeam: "Roda JC",
            awayTeam: "MVV",
            date: new Date(2024, 8, 21)
        },
        {
            homeTeam: "FC Eindhoven",
            awayTeam: "Roda JC",
            date: new Date(2024, 8, 29)
        }
    ];


    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Upcoming Matches</h2>
                <div className="space-y-4">
                    {matches.map((match: any, i: any) => (
                        <Card key={i}>
                            <CardContent className="flex justify-between items-center p-4">
                                <div className="flex items-center space-x-4 flex-col">
                                    <span>Thuis:</span>
                                    <span className="font-bold">{match.homeTeam}</span>
                                </div>
                                <div className="text-center">
                                    <p className="font-bold">VS</p>
                                    <p className="text-sm text-gray-500">{match.date.toLocaleDateString('nl-NL', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }).replace(',', ' / ')}</p>
                                </div>
                                <div className="flex items-right space-x-4 flex-col text-right">
                                    <span>Uit:</span>
                                    <span className="font-bold">{match.awayTeam}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
