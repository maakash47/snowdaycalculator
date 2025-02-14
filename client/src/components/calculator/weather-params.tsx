import { Card, CardContent } from "@/components/ui/card";
import { type WeatherParams } from "@shared/schema";
import {
  Calendar,
  Clock,
  Droplets,
  Eye,
  Gauge,
  Thermometer,
  Wind
} from "lucide-react";

interface WeatherParamsDisplayProps {
  params: WeatherParams;
}

export default function WeatherParamsDisplay({ params }: WeatherParamsDisplayProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const parameters = [
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Date",
      value: currentDate
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Time",
      value: currentTime
    },
    {
      icon: <Thermometer className="h-5 w-5" />,
      label: "Temperature",
      value: `${params.temperature}°F`
    },
    {
      icon: <Droplets className="h-5 w-5" />,
      label: "Humidity",
      value: `${params.humidity}%`
    },
    {
      icon: <Wind className="h-5 w-5" />,
      label: "Wind Speed",
      value: `${params.windSpeed} mph`
    },
    {
      icon: <Eye className="h-5 w-5" />,
      label: "Visibility",
      value: `${params.visibility} mi`
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      label: "Pressure",
      value: `${params.pressure} mb`
    }
  ];

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {parameters.map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="text-primary">{icon}</div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}