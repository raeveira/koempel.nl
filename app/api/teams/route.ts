import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.RAPIDAPI_KEY) {
      throw new Error('RAPIDAPI_KEY is not defined in environment variables');
    }

    const url = "https://api-football-v1.p.rapidapi.com/v3/teams?league=89&season=2024";
    console.log('Fetching from URL:', url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    if (!data.response || data.response.length === 0) {
      throw new Error('No data in API response');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { 
        message: 'Error fetching teams data', 
        error: error instanceof Error ? error.message : String(error) 
      }, 
      { status: 500 }
    );
  }
}