import { useEffect, useRef } from "react";
import { createGauge } from "@/lib/gauge";
import { Card, CardContent } from "@/components/ui/card";

interface ProbabilityGaugeProps {
  probability: number;
  title: string;
}

export default function ProbabilityGauge({ probability, title }: ProbabilityGaugeProps) {
  const gaugeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gaugeRef.current) {
      createGauge(gaugeRef.current, probability);
    }
  }, [probability]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div ref={gaugeRef} className="w-full" />
        <div className="text-center mt-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </CardContent>
    </Card>
  );
}