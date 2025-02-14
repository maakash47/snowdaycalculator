import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-8">
        About Snow Day Calculator
      </h1>

      <Card>
        <CardContent className="prose prose-blue max-w-none pt-6">
          <p>
            The Snow Day Calculator is a sophisticated tool that uses real-time weather data
            from the National Weather Service to predict the likelihood of school closures
            due to snow conditions.
          </p>

          <h2>How it Works</h2>
          <p>
            Our calculator takes into account multiple weather parameters including:
          </p>
          <ul>
            <li>Temperature and precipitation forecasts</li>
            <li>Expected snowfall accumulation</li>
            <li>Wind speed and visibility conditions</li>
            <li>Historical school closure data</li>
            <li>Local district policies</li>
          </ul>

          <h2>Data Sources</h2>
          <p>
            We utilize the National Weather Service API to obtain accurate and up-to-date
            weather information for your location. The probability calculation is based on
            a proprietary algorithm that considers all relevant weather parameters.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
