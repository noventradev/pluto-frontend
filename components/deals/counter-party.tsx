import { Counterparty } from '@/app/lib/types/deal.types';
import { Mail, Phone, Building2, User } from 'lucide-react';

type Props = {
  data: Counterparty;
};

export const CounterpartyInfo = ({ data }: Props) => {
  const items = [
    data.name && {
      icon: <User size={14} />,
      value: data.name,
    },
    data.email && {
      icon: <Mail size={14} />,
      value: data.email,
    },
    data.type && {
      icon: <Building2 size={14} />,
      value: data.type,
    },
    data.contactPhone && {
      icon: <Phone size={14} />,
      value: data.contactPhone,
    },
  ].filter(Boolean) as { icon: React.ReactNode; value: string }[];

  if (!items.length) return null;

  return (
    <div className="text-muted-foreground flex flex-col items-start gap-x-3 gap-y-1 text-xs">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          <span className="opacity-70">{item.icon}</span>
          <span className="max-w-37.5 truncate">{item.value}</span>
          {/* {idx !== items.length - 1 && (
            <span className="mx-1 opacity-40">•</span>
          )} */}
        </div>
      ))}
    </div>
  );
};
