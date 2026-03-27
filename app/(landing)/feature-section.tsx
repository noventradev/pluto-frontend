import { Container } from '@/components/ui/container';
import { SectionLabel } from './section-label';
import SVG1 from '@/components/illustrations/svg1';
import SVG2 from '@/components/illustrations/svg2';
import SVG3 from '@/components/illustrations/svg3';
import SVG4 from '@/components/illustrations/svg4';

export const FeatureSection = () => {
  const features = [
    {
      imgae: <SVG1 />,
      title: 'Instant Visibilty, Zero Delays',
      subtitle:
        "See spend appear the moment it happens, whether it's a coffee or a client dinner.",
    },
    {
      imgae: <SVG2 />,
      title: 'Continous Cash Flow Insights',
      subtitle:
        'See how money moves across the expenses and operations with graphs and patterns',
    },
    {
      imgae: <SVG3 />,
      title: 'Built for transparency',
      subtitle:
        'Every transactions is flagged with a categorical expense and employee details instantly.',
    },
    {
      imgae: <SVG4 />,
      title: 'Smarter Alerts & Notification',
      subtitle:
        'Customize notifications by amount, category or user to focus only on what matters the most.',
    },
  ];
  return (
    <section id="features">
      <Container className="my-8">
        <div className="my-8 flex items-center justify-between gap-40">
          <SectionLabel
            label="Features deep dive"
            headline="Whether you are a inidividual creator/ org owner we got you!"
          ></SectionLabel>
          <p className="text-muted max-w-md">
            Bring your every transaction to one platform, automate reporting,
            expenses, add income flows, or organization finances from day one.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 px-30">
          {features &&
            features.map((feature, index) => (
              <div
                className="border-border bg-surface overflow-hidden rounded-2xl border shadow-2xs"
                key={index}
              >
                <div className="bg-surface flex h-60 items-center justify-between">
                  {feature.imgae}
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-muted text-base font-normal">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
};
