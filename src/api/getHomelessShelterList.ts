// @ts-ignore
import {GOOGLE_MAPS_API_KEY} from '@env';

export const getHomelessShelterList = async (postcode: string) => {
  const apiKey = GOOGLE_MAPS_API_KEY;

  // Step 1: Convert postcode to latitude and longitude using Geocoding API
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${apiKey}`;

  try {
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.results.length === 0) {
      throw new Error('Invalid postcode or no results found');
    }

    // Extract latitude and longitude from the geocoding result
    const location = geocodeData.results[0].geometry.location;
    const latitude = location.lat;
    const longitude = location.lng;

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Step 2: Fetch homeless shelters near the location using Places API
    const radius = 5000; // Radius in meters
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=homeless+shelter&key=${apiKey}`;

    const placesResponse = await fetch(placesUrl);
    const placesData = await placesResponse.json();

    console.log('Shelters:', JSON.stringify(placesData.results, null, 2));

    return placesData.results; // Return the results for further processing
  } catch (error) {
    return Promise.reject(error);
  }
};