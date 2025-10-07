import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/constants/data";

export default function FaqPage() {
  return (
    <main className="py-8 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h1>
      <Accordion
        type="single"
        collapsible
        className="space-y-4 max-w-3xl mx-auto"
      >
        {faqItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            value={`item-${index}`}
            className="border rounded-lg"
          >
            <AccordionTrigger className="px-4 py-3 font-semibold hover:bg-gray-100 cursor-pointer text-black">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-gray-700">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
