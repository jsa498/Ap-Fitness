import { NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID; // AP Fitness's Google Place ID

export async function GET() {
  try {
    if (!GOOGLE_PLACES_API_KEY || !PLACE_ID) {
      return NextResponse.json(
        { error: 'Missing API configuration' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_PLACES_API_KEY}`
    );

    const data = await response.json();

    if (!data.result?.reviews) {
      return NextResponse.json(
        { error: 'No reviews found' },
        { status: 404 }
      );
    }

    // Format and sort reviews by date (most recent first)
    const reviews = data.result.reviews
      .map((review: any) => ({
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        profile_photo_url: review.profile_photo_url,
        relative_time_description: review.relative_time_description,
      }))
      .sort((a: any, b: any) => b.time - a.time) // Sort by timestamp, newest first
      .slice(0, 10); // Get only the 10 most recent reviews

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
} 