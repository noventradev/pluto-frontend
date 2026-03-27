import React from 'react';

const SVG3 = () => {
  return (
    <svg width="100%" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="90"
        y="18"
        width="140"
        height="124"
        rx="8"
        fill="var(--muted)"
        stroke="var(--border)"
        strokeWidth="1"
        opacity={0.2}
      />
      <rect
        x="102"
        y="30"
        width="52"
        height="16"
        rx="8"
        fill="#185FA5"
        opacity="0.9"
      />
      <text
        x="128"
        y="42"
        textAnchor="middle"
        fontSize="10"
        fill="#E6F1FB"
        fontWeight="500"
      >
        FOOD
      </text>
      <rect x="102" y="55" width="116" height="6" rx="3" fill="var(--border)" />
      <rect x="102" y="68" width="80" height="6" rx="3" fill="var(--border)" />
      <rect
        x="102"
        y="84"
        width="116"
        height="22"
        rx="5"
        fill="#0F6E56"
        opacity="0.1"
      />
      <text
        x="215"
        y="99"
        textAnchor="end"
        fontSize="14"
        fontWeight="500"
        fill="#0F6E56"
      >
        ₹ 1,240
      </text>
      <rect
        x="102"
        y="114"
        width="72"
        height="14"
        rx="7"
        fill="var(--foreground)"
        opacity="0.6"
      />
      <circle cx="113" cy="121" r="4" fill="#5DCAA5" />
      <text x="125" y="125" fontSize="9" fill="var(--foreground)">
        Arjun K.
      </text>
      <circle cx="214" cy="121" r="8" fill="#1D9E75" opacity="0.15" />
      <path
        d="M209,121 L213,125 L220,117"
        fill="none"
        stroke="#0F6E56"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SVG3;
