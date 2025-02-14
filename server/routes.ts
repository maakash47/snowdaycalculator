import type { Express } from "express";
import { createServer } from "http";
import fetch from "node-fetch";
import { weatherParamsSchema, snowProbabilitySchema } from "@shared/schema";

const NWS_API = "https://api.weather.gov/points";
const ZIPCODE_API = "https://api.zippopotam.us/us/";

interface ZipResponse {
  places: Array<{
    latitude: string;
    longitude: string;
    "place name": string;
    state: string;
  }>;
}

interface NWSPointsResponse {
  properties: {
    forecast: string;
  };
}

interface NWSForecastResponse {
  properties: {
    periods: Array<{
      temperature: number;
      windSpeed: string;
    }>;
  };
}

export function registerRoutes(app: Express) {
  // Add location info endpoint
  app.get("/api/location/:zipCode", async (req, res) => {
    try {
      const zipRes = await fetch(`${ZIPCODE_API}${req.params.zipCode}`);
      if (!zipRes.ok) {
        return res.status(400).json({ message: "Invalid ZIP code" });
      }
      const data = await zipRes.json();
      res.json(data);
    } catch (error) {
      console.error("Location API error:", error);
      res.status(500).json({ message: "Failed to fetch location data" });
    }
  });

  app.get("/api/calculate/:zipCode", async (req, res) => {
    try {
      // Get coordinates from zip code
      const zipRes = await fetch(`${ZIPCODE_API}${req.params.zipCode}`);
      if (!zipRes.ok) {
        return res.status(400).json({ message: "Invalid ZIP code" });
      }

      const zipData = (await zipRes.json()) as ZipResponse;
      const lat = zipData.places[0].latitude;
      const lon = zipData.places[0].longitude;

      // Get NWS forecast data
      const pointsRes = await fetch(`${NWS_API}/${lat},${lon}`);
      if (!pointsRes.ok) {
        return res.status(500).json({ message: "Weather service unavailable" });
      }

      const pointsData = (await pointsRes.json()) as NWSPointsResponse;
      const forecastRes = await fetch(pointsData.properties.forecast);
      if (!forecastRes.ok) {
        return res.status(500).json({ message: "Forecast unavailable" });
      }

      const forecastData = (await forecastRes.json()) as NWSForecastResponse;
      const current = forecastData.properties.periods[0];

      // Calculate weather parameters
      const params = weatherParamsSchema.parse({
        zipCode: req.params.zipCode,
        temperature: current.temperature,
        snowfall: Math.random() * 3, // Simulated
        humidity: Math.round(Math.random() * 30 + 60), // Simulated
        windSpeed: parseInt(current.windSpeed.split(" ")[0]),
        visibility: Math.round(Math.random() * 5 + 5), // Simulated
        pressure: Math.round(Math.random() * 20 + 1000) // Simulated
      });

      // Calculate snow probability based on temperature, humidity, and other factors
      let probability = 0;
      
      // Temperature is the most critical factor
      if (params.temperature <= 28) {
        probability += 50;  // High probability for well below freezing
      } else if (params.temperature <= 32) {
        probability += 35;  // Moderate probability at freezing
      } else if (params.temperature <= 34) {
        probability += 15;  // Low probability just above freezing
      }

      // Snowfall forecast is second most important
      if (params.snowfall > 0) {
        probability += Math.min(30, params.snowfall * 10);
      }

      // Humidity must be high for snow
      if (params.humidity >= 90) {
        probability += 15;
      } else if (params.humidity >= 80) {
        probability += 10;
      } else if (params.humidity < 70) {
        probability -= 15;  // Too dry for snow
      }

      // Strong winds reduce snow probability
      if (params.windSpeed > 20) {
        probability -= 20;
      } else if (params.windSpeed > 15) {
        probability -= 10;
      }

      // Low visibility often indicates precipitation
      if (params.visibility < 3) {
        probability += 15;
      } else if (params.visibility < 5) {
        probability += 5;
      }

      // Pressure affects storm systems
      if (params.pressure < 1000) {
        probability += 10;  // Low pressure system
      }

      // Final adjustments
      probability = Math.max(0, Math.min(100, Math.round(probability)));

      // Zero probability conditions
      if (params.temperature > 35 || params.humidity < 50 || (params.temperature > 32 && params.snowfall === 0)) {
        probability = 0;
      }

      // Determine school closing prediction
      let schoolClosing = "Schools likely to remain open";
      if (probability > 80) {
        schoolClosing = "Schools very likely to close";
      } else if (probability > 60) {
        schoolClosing = "Schools likely to close";
      } else if (probability > 40) {
        schoolClosing = "Possible delays or early dismissal";
      }

      // Add region to the response
      const response = snowProbabilitySchema.parse({
        probability,
        schoolClosing,
        params,
        region: `${zipData.places[0]["place name"]}, ${zipData.places[0].state}`
      });

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to calculate probability" });
    }
  });

  return createServer(app);
}