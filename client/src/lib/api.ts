import { WeatherParams, SnowProbability } from "@shared/schema";

const ZIPCODE_API = "https://api.zippopotam.us/us/";

interface ZipResponse {
  places: Array<{
    latitude: string;
    longitude: string;
    "place name": string;
    state: string;
  }>;
}

export async function getLocationInfo(zipCode: string): Promise<{
  coords: [number, number];
  region: string;
}> {
  const res = await fetch(`${ZIPCODE_API}${zipCode}`);
  if (!res.ok) throw new Error("Invalid ZIP code");

  const data = (await res.json()) as ZipResponse;
  const place = data.places[0];

  return {
    coords: [parseFloat(place.latitude), parseFloat(place.longitude)],
    region: `${place["place name"]}, ${place.state}`
  };
}

export async function calculateSnowProbability(zipCode: string): Promise<SnowProbability & { region: string }> {
  const locationInfo = await getLocationInfo(zipCode);
  const res = await fetch(`/api/calculate/${zipCode}`);
  if (!res.ok) throw new Error("Failed to calculate probability");
  const data = await res.json();
  return { ...data, region: locationInfo.region };
}