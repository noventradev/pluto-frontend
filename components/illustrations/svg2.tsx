const SVG2 = () => {
  return (
    <svg width="100%" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="40"
        y1="130"
        x2="290"
        y2="130"
        stroke="var(--color-border-secondary)"
        strokeWidth="1.5"
      />
      <line
        x1="40"
        y1="30"
        x2="40"
        y2="130"
        stroke="var(--color-border-secondary)"
        strokeWidth="1.5"
      />
      <line
        x1="40"
        y1="100"
        x2="290"
        y2="100"
        stroke="var(--color-border-tertiary)"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      <line
        x1="40"
        y1="70"
        x2="290"
        y2="70"
        stroke="var(--color-border-tertiary)"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      <line
        x1="40"
        y1="42"
        x2="290"
        y2="42"
        stroke="var(--color-border-tertiary)"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      <path
        d="M40,110 L80,105 L120,90 L160,95 L200,78 L240,82 L280,68 L280,130 L40,130 Z"
        fill="#D85A30"
        opacity="0.12"
      />
      <path
        d="M40,110 L80,105 L120,90 L160,95 L200,78 L240,82 L280,68"
        fill="none"
        stroke="#D85A30"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40,95 L80,88 L120,72 L160,78 L200,58 L240,62 L280,45 L280,130 L40,130 Z"
        fill="#1D9E75"
        opacity="0.1"
      />
      <path
        d="M40,95 L80,88 L120,72 L160,78 L200,58 L240,62 L280,45"
        fill="none"
        stroke="#1D9E75"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="78" r="4" fill="#D85A30" />
      <circle cx="200" cy="58" r="4" fill="#1D9E75" />
      <rect x="50" y="34" width="8" height="8" rx="2" fill="#1D9E75" />
      <text x="63" y="42" fontSize="11" fill="var(--foreground)">
        Income
      </text>
      <rect x="110" y="34" width="8" height="8" rx="2" fill="#D85A30" />
      <text x="123" y="42" fontSize="11" fill="var(--foreground)">
        Expenses
      </text>
    </svg>
  );
};

export default SVG2;
