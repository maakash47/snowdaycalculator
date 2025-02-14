import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { calculateSnowProbability } from "@/lib/api";
import ZipForm from "@/components/calculator/zip-form";
import ProbabilityGauge from "@/components/calculator/probability-gauge";
import WeatherParams from "@/components/calculator/weather-params";
import LoadingSkeleton from "@/components/calculator/loading-skeleton";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [zipCode, setZipCode] = useState<string>();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/calculate", zipCode],
    queryFn: () => calculateSnowProbability(zipCode!),
    enabled: !!zipCode
  });

  const handleSubmit = (zip: string) => {
    setZipCode(zip);
  };

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error instanceof Error ? error.message : "An error occurred"
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-4 animate-fade-in">
          Snow Day Calculator
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Enter your ZIP code to calculate the probability of snow day and get detailed weather information.
        </p>
      </div>

      <div className="mb-12 max-w-md mx-auto">
        <ZipForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : data && (
        <div className="space-y-8 animate-fade-in">
          {data.region && (
            <div className="text-center text-lg font-semibold text-gray-800">
              {data.region}
            </div>
          )}
          <div className="text-center">
            <ProbabilityGauge probability={data.probability} title="Snow Probability" />
            <Card className="mt-4">
              <CardContent className="py-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">School Status Prediction</h3>
                <p className="text-primary">{data.schoolClosing}</p>
              </CardContent>
            </Card>
          </div>
          <WeatherParams params={data.params} />
        </div>
      )}

      <div className="mt-16 prose prose-blue max-w-none">
        <h2 className="text-2xl font-bold text-center mb-8">About Our Snow Day Calculator</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3>How It Works</h3>
            <p>
              Our Snow Day Calculator uses real-time data from the National Weather Service to predict 
              the likelihood of snow in your area. We analyze multiple weather parameters including 
              temperature, precipitation, wind speed, and visibility to generate accurate predictions.
            </p>
          </div>
          <div>
            <h3>What Sets Us Apart</h3>
            <p>
              Unlike simple weather forecasts, our calculator specifically focuses on conditions that 
              typically lead to snow days. We consider factors such as ground temperature, humidity 
              levels, and wind conditions to provide a comprehensive analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}