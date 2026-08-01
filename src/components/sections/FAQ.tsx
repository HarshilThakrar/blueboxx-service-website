'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Our timelines vary based on project complexity. A standard enterprise web application typically takes 12-16 weeks from discovery to launch, while simpler automation scripts or MVPs can be delivered in 4-6 weeks.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, we offer comprehensive SLA-backed support and maintenance packages. We act as your long-term technology partner to ensure your systems remain secure, scalable, and up-to-date.",
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in modern, high-performance tech stacks including Next.js, React, Node.js, Python, Laravel, and cloud infrastructure like AWS and Google Cloud. We also integrate advanced AI models like OpenAI and Claude.",
  },
  {
    question: "How do you ensure the security of our enterprise data?",
    answer: "Security is built into our architecture from day one. We follow industry best practices, implement end-to-end encryption, conduct regular vulnerability assessments, and ensure compliance with relevant data protection regulations (GDPR, HIPAA, etc.).",
  },
  {
    question: "Can you augment our existing in-house development team?",
    answer: "Absolutely. We offer dedicated developer models where our senior engineers integrate seamlessly with your internal teams, adopting your workflows and accelerating your product roadmap.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-theme-gold font-semibold tracking-wider uppercase text-sm mb-4">Questions & Answers</h4>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-zinc-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-600 text-lg">
              Everything you need to know about our services, process, and billing.
            </p>
          </div>

          <div className="bg-black/[0.02] border border-black/5 rounded-3xl p-6 md:p-10">
            <Accordion className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-black/10">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-theme-gold transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
