import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-8">
        Terms of Service
      </h1>

      <Card>
        <CardContent className="prose prose-blue max-w-none pt-6">
          <p className="text-lg mb-4">Last updated: February 13, 2025</p>

          <h2>1. Terms of Use</h2>
          <p>
            By accessing and using the Snow Day Calculator website, you accept and agree to be bound by these 
            Terms of Service. If you do not agree to these terms, please do not use our service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            The Snow Day Calculator provides predictions about the likelihood of snow days based on weather data. 
            These predictions are estimates and should not be considered as guaranteed outcomes.
          </p>

          <h2>3. Disclaimer</h2>
          <p>
            Our predictions are based on available weather data and historical patterns. We make no guarantees 
            about the accuracy of predictions, and decisions should not be made solely based on our calculations.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the property of 
            Snow Day Calculator and is protected by copyright laws.
          </p>

          <h2>5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the service after changes 
            constitutes acceptance of the new terms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
