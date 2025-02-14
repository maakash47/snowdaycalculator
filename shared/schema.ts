import { z } from "zod";

export const weatherParamsSchema = z.object({
  zipCode: z.string().length(5),
  temperature: z.number(),
  snowfall: z.number(),
  humidity: z.number(),
  windSpeed: z.number(),
  visibility: z.number(),
  pressure: z.number()
});

export type WeatherParams = z.infer<typeof weatherParamsSchema>;

export const snowProbabilitySchema = z.object({
  probability: z.number().min(0).max(100),
  schoolClosing: z.string(),
  params: weatherParamsSchema
});

export type SnowProbability = z.infer<typeof snowProbabilitySchema>;
