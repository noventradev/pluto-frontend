'use client';

import { Container } from '@/components/ui/container';
import { Section } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionLabel } from './section-label';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[][] = [
  [
    {
      quote:
        'Pluto completely replaced our messy spreadsheet setup. Recurring expenses are finally automated and I can see exactly where the budget is going every single day.',
      name: 'Riya Mehta',
      role: 'Founder, Inkraft Studio',
      avatar: 'RM',
    },
    {
      quote:
        'The cash flow graphs alone are worth it. I used to spend an hour every Sunday piecing together numbers — now it is just there when I open the app.',
      name: 'Arjun Nair',
      role: 'Freelance Product Designer',
      avatar: 'AN',
    },
    {
      quote:
        'We onboarded our whole ops team in under 20 minutes. The category tagging is smart and the alerts keep everyone accountable without being annoying.',
      name: 'Priya Shetty',
      role: 'Operations Lead, Zeno Labs',
      avatar: 'PS',
    },
  ],
  [
    {
      quote:
        'I track four client retainers and my own overhead in Pluto. The recurring stream feature is exactly what I needed — nothing slips through anymore.',
      name: 'Kabir Verma',
      role: 'Consultant, KV Advisory',
      avatar: 'KV',
    },
    {
      quote:
        'Finally a tool that does not require a finance degree to use. Clean, fast, and actually shows me what I need without drowning me in dashboards.',
      name: 'Sneha Pillai',
      role: 'Co-founder, Lumio Health',
      avatar: 'SP',
    },
    {
      quote:
        'We cut our monthly expense review from 3 hours to 20 minutes. The export feature is a lifesaver when our accountant asks for a breakdown.',
      name: 'Dev Anand',
      role: 'CFO, Stackbloom',
      avatar: 'DA',
    },
  ],
  [
    {
      quote:
        'The status tracking on every entry — pending, paid, cancelled — is something I did not know I needed until I had it. Total clarity on what is outstanding.',
      name: 'Meera Joshi',
      role: 'Finance Manager, Pebble Co.',
      avatar: 'MJ',
    },
    {
      quote:
        'I switched from a much more complex SaaS tool. Pluto is leaner, faster, and covers everything I actually use. Zero regrets.',
      name: 'Tarun Khanna',
      role: 'Solo Developer',
      avatar: 'TK',
    },
    {
      quote:
        'Our investors ask for monthly burn reports. Pluto makes that a 2-minute export instead of a 2-hour ordeal. It has become a core part of our workflow.',
      name: 'Ananya Rao',
      role: 'CEO, Driftwood Labs',
      avatar: 'AR',
    },
  ],
];

const avatarColors = [
  'bg-blue-100 text-blue-800',
  'bg-teal-100 text-teal-800',
  'bg-purple-100 text-purple-800',
  'bg-amber-100 text-amber-800',
  'bg-rose-100 text-rose-800',
  'bg-green-100 text-green-800',
  'bg-indigo-100 text-indigo-800',
  'bg-orange-100 text-orange-800',
  'bg-cyan-100 text-cyan-800',
];

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.06,
      }}
      className="border-border bg-background flex flex-col gap-4 rounded-2xl border p-6 shadow-sm"
    >
      {/* Quote marks */}
      <span className="text-muted-foreground/30 text-2xl leading-none select-none">
        &ldquo;
      </span>

      <p className="text-muted-foreground text-sm leading-relaxed">{t.quote}</p>

      <div className="mt-auto flex items-center gap-3 pt-2">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
            avatarColors[index % avatarColors.length]
          }`}
        >
          {t.avatar}
        </div>
        <div className="flex flex-col">
          <span className="text-foreground text-xs font-medium">{t.name}</span>
          <span className="text-muted-foreground text-xs">{t.role}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialSection() {
  return (
    <section id="testimonials" className="py-24">
      <Container>
        <SectionLabel
          label="Testimonials"
          headline=" From solo creators to growing startups, here's what people say
            after switching to Pluto."
        />

        {/* Masonry-style 3-column grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((col, colIndex) =>
            col.map((t, rowIndex) => (
              <TestimonialCard
                key={`${colIndex}-${rowIndex}`}
                t={t}
                index={colIndex * testimonials[0].length + rowIndex}
              />
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
