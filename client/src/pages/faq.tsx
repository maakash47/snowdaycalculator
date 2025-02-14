import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "How accurate is the Snow Day Calculator?",
      answer: "Our calculator uses real-time data from the National Weather Service and considers multiple factors including temperature, snowfall, wind speed, and more. While we strive for accuracy, weather predictions are inherently uncertain, and final decisions rest with school administrators."
    },
    {
      question: "How do you calculate the snow day probability?",
      answer: "We analyze multiple weather parameters including expected snowfall, temperature, wind speed, visibility, and other factors. These are combined using our algorithm that considers historical patterns of school closures."
    },
    {
      question: "Why do you need my ZIP code?",
      answer: "Your ZIP code helps us fetch local weather data from the National Weather Service for your specific area. We don't store this information after providing your calculation."
    },
    {
      question: "How often is the weather data updated?",
      answer: "We fetch real-time data from the National Weather Service each time you make a calculation, ensuring you get the most current prediction possible."
    },
    {
      question: "Can I use this for any location in the US?",
      answer: "Yes, our calculator works for any US ZIP code where National Weather Service data is available."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-8">
        Frequently Asked Questions
      </h1>

      <Card>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
