import Link from "next/link";
import { FaqItem } from "./FaqItem";
import { JsonLd } from "./JsonLd";
import { eventFaq, type FaqAnswerPart } from "@/content/faq";
import { faqJsonLd } from "@/lib/structured-data";

function AnswerPart({ part }: { part: FaqAnswerPart }) {
  if (typeof part === "string") return <>{part}</>;
  if (part.href.startsWith("/")) return <Link href={part.href}>{part.text}</Link>;
  if (part.href.startsWith("mailto:")) return <a href={part.href}>{part.text}</a>;
  return <a href={part.href} target="_blank" rel="noopener noreferrer">{part.text}</a>;
}

export function EventFaq() {
  return (
    <section className="content-section event-faq" aria-labelledby="event-faq-title">
      <JsonLd data={faqJsonLd(eventFaq)} />
      <p className="technical-label">GOOD TO KNOW</p>
      <h2 id="event-faq-title">Frequently asked questions.</h2>
      <div className="faq-list">
        {eventFaq.map((entry) => (
          <FaqItem key={entry.question} question={entry.question}>
            <p>{entry.answer.map((part, index) => <AnswerPart key={index} part={part} />)}</p>
          </FaqItem>
        ))}
      </div>
    </section>
  );
}
