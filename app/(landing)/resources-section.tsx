import { Container } from '@/components/ui/container';
import { SectionLabel } from './section-label';

const steps = [
  {
    num: '01',
    title: 'Connect your accounts',
    desc: 'Link your bank, cards, or manually add your income and expense streams.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect
          x="6"
          y="8"
          width="20"
          height="16"
          rx="4"
          stroke="#185FA5"
          strokeWidth="1.5"
        />
        <path d="M6 13h20" stroke="#185FA5" strokeWidth="1.5" />
        <circle cx="10.5" cy="10.5" r="1" fill="#185FA5" />
        <circle cx="14" cy="10.5" r="1" fill="#185FA5" />
        <rect
          x="10"
          y="17"
          width="12"
          height="2.5"
          rx="1.2"
          fill="#3B8BD4"
          opacity="0.5"
        />
        <rect
          x="10"
          y="21"
          width="7"
          height="2"
          rx="1"
          fill="#3B8BD4"
          opacity="0.3"
        />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Categorize & track',
    desc: 'Pluto auto-tags every transaction. Review, adjust, and add recurring streams.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect
          x="7"
          y="7"
          width="18"
          height="18"
          rx="4"
          stroke="#0F6E56"
          strokeWidth="1.5"
        />
        <path
          d="M11 16l3 3 7-7"
          stroke="#1D9E75"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="22" y="5" width="8" height="8" rx="4" fill="#1D9E75" />
        <text
          x="26"
          y="11"
          textAnchor="middle"
          fontSize="8"
          fontWeight="600"
          fill="white"
          fontFamily="var(--font-sans)"
        >
          3
        </text>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Get insights & alerts',
    desc: 'See real-time dashboards, set spend limits, and get notified when it matters.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect
          x="6"
          y="16"
          width="5"
          height="10"
          rx="2"
          fill="#534AB7"
          opacity="0.4"
        />
        <rect
          x="13.5"
          y="11"
          width="5"
          height="15"
          rx="2"
          fill="#534AB7"
          opacity="0.65"
        />
        <rect x="21" y="7" width="5" height="19" rx="2" fill="#534AB7" />
        <path
          d="M8 14l6-5 5 4 6-7"
          stroke="#EF9F27"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="26" cy="6" r="2" fill="#EF9F27" />
      </svg>
    ),
  },
];

export const ResourceSection = () => {
  return (
    <section id="how-it-works">
      <Container className="my-8">
        <SectionLabel
          label="How it works"
          headline="Everything you need to know for using Pluto"
        />

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1fr_40px_1fr_40px_1fr]">
          {steps.map((step, i) => (
            <div key={step.num} className="contents">
              <div
                key={step.num}
                className="relative flex flex-col items-center gap-3 text-center"
              >
                <div className="bg-surface border-border flex h-16 w-16 items-center justify-center rounded-2xl border">
                  {step.icon}
                </div>

                {/* Step number */}
                <span className="text-muted-foreground text-xs font-medium tracking-widest">
                  {step.num}
                </span>

                {/* Title */}
                <p className="text-sm font-medium">{step.title}</p>

                {/* Description */}
                <p className="text-muted-foreground max-w-40 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Connector — only between steps, not after the last */}
              {i < steps.length - 1 && (
                <div
                  key={`connector-${i}`}
                  className="hidden items-start pt-8 md:flex"
                >
                  <div className="border-border relative w-full border-t">
                    {/* Arrowhead */}
                    <span className="border-border absolute -top-1.5 -right-1.5 h-0 w-0 border-y-4 border-l-[6px] border-y-transparent" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
