'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionLabel } from './section-label';
import { Container } from '@/components/ui/container';

const faqs = [
  {
    q: 'What is Pluto and who is it for?',
    a: 'Pluto is a financial tracking platform built for individuals, freelancers, and small teams. Whether you manage personal budgets or oversee team expenses, Pluto gives you a single place to track every rupee — recurring or one-time.',
  },
  {
    q: 'How does recurring expense tracking work?',
    a: 'You define a stream — give it a name, frequency (daily, weekly, monthly, yearly), interval, and base amount. Pluto automatically generates entries on schedule so you never miss a recurring cost like subscriptions, salaries, or rent.',
  },
  {
    q: 'Can I track both income and expenses?',
    a: 'Yes. Pluto supports both expense and income flows. You can categorize each transaction, tag it with a type, and get a unified cash flow view across everything you track.',
  },
  {
    q: 'Is my financial data secure?',
    a: 'All data is encrypted at rest and in transit. We never sell your data and do not share it with third parties. Your financial information stays yours.',
  },
  {
    q: 'Do I need a credit card to get started?',
    a: 'No. You can sign up and start tracking expenses immediately without entering any payment details. Premium features are available when you are ready to upgrade.',
  },
  {
    q: 'Can I export my data?',
    a: 'Yes — you can export all transactions and reports as CSV or PDF at any time. Your data is never locked in.',
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="">
      <Container>
        <SectionLabel
          headline="Everything you need to know about Pluto. Can't find the answer
            you're looking for?"
          label="Frequently asked questions"
        />

        {/* Items */}
        <div className="divide-border mx-auto flex max-w-3xl flex-col divide-y">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-foreground text-md font-medium">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="text-muted-foreground shrink-0"
                  >
                    <Plus size={16} strokeWidth={1.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-muted-foreground pb-5 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
