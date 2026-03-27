import React from 'react';

const SVG1 = () => {
  return (
    <svg width="100%" viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker
          id="a1"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke="context-stroke"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      <rect
        x="30"
        y="96"
        width="260"
        height="2"
        rx="2"
        fill="var(--foreground)"
      />
      <rect
        x="60"
        y="90"
        width="1.5"
        height="10"
        rx="1"
        fill="var(--foreground)"
      />
      <rect
        x="120"
        y="90"
        width="1.5"
        height="10"
        rx="1"
        fill="var(--foreground)"
      />
      <rect
        x="180"
        y="90"
        width="1.5"
        height="10"
        rx="1"
        fill="var(--foreground)"
      />
      <rect
        x="240"
        y="90"
        width="1.5"
        height="10"
        rx="1"
        fill="var(--foreground)"
      />
      <circle cx="60" cy="97" r="6" fill="#3B8BD4" opacity="0.5" />
      <circle cx="120" cy="97" r="6" fill="#3B8BD4" opacity="0.6" />
      <circle cx="180" cy="97" r="9" fill="#3B8BD4" opacity="0.85" />
      <circle cx="240" cy="97" r="11" fill="#3B8BD4" opacity="0.15" />
      <circle cx="240" cy="97" r="7" fill="#3B8BD4" opacity="0.9" />
      <rect
        x="42"
        y="62"
        width="38"
        height="20"
        rx="5"
        fill="#3B8BD4"
        opacity="0.15"
      />
      <text x="61" y="76" textAnchor="middle" fontSize="11" fill="#185FA5">
        ₹240
      </text>
      <rect
        x="102"
        y="55"
        width="38"
        height="20"
        rx="5"
        fill="#3B8BD4"
        opacity="0.15"
      />
      <text x="121" y="69" textAnchor="middle" fontSize="11" fill="#185FA5">
        ₹890
      </text>
      <rect x="158" y="46" width="46" height="22" rx="6" fill="#185FA5" />
      <text
        x="181"
        y="61"
        textAnchor="middle"
        fontSize="11"
        fill="#E6F1FB"
        fontWeight="500"
      >
        ₹1,200
      </text>
      <line
        x1="61"
        y1="82"
        x2="61"
        y2="91"
        stroke="#3B8BD4"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <line
        x1="121"
        y1="75"
        x2="121"
        y2="91"
        stroke="#3B8BD4"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <line
        x1="181"
        y1="68"
        x2="181"
        y2="88"
        stroke="#185FA5"
        strokeWidth="1.5"
      />
      <text
        x="240"
        y="120"
        textAnchor="middle"
        fontSize="11"
        fontWeight="500"
        fill="#185FA5"
      >
        now
      </text>
      <polygon
        points="248,26 242,42 248,42 240,58 252,38 246,38"
        fill="#EF9F27"
        opacity="0.9"
      />
    </svg>
  );
};

export default SVG1;
