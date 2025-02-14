import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-8">
        Privacy Policy
      </h1>

      <Card>
        <CardContent className="prose prose-blue max-w-none pt-6">
          <p className="text-lg mb-4">Last updated: February 13, 2025</p>

          <h2>Information We Collect</h2>
          <p>
            The Snow Day Calculator website collects minimal information necessary to provide our service. 
            We only collect ZIP codes temporarily to calculate snow day probabilities and do not store this information.
          </p>

          <h2>How We Use Information</h2>
          <p>
            We use ZIP codes solely to fetch weather data from the National Weather Service API 
            to calculate snow day probabilities. This information is not stored or shared with third parties.
          </p>

          <h2>Cookies and Tracking</h2>
          <p>
            We use essential cookies to improve your experience. These cookies are necessary for the website 
            to function properly. We also use analytics cookies to understand how visitors use our website.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We use the National Weather Service API to provide weather data. Your ZIP code is shared with 
            this service to retrieve local weather information.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our privacy policy, please contact us through our contact page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
