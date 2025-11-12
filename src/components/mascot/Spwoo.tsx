import React from 'react';

export type SpwooState = 'wave' | 'think' | 'celebrate' | 'strut';

interface SpwooProps {
  state?: SpwooState;
  size?: number;
  catchphrase?: string;
}

// Gobble-gobble! Meet Spwoo: the friendly, helpful Thanksgiving turkey!
const catchphrases = [
  "Gobble-gobble!",
  "Let's plan the perfect potluck!",
  "Turkey-tastic!",
  "Time to feast!",
  "Thanksgiving vibes!",
  "Let's get cooking!",
  "Feast-astic!",
  "Ready to celebrate!",
  "You've got this, friend!",
];

export const Spwoo: React.FC<SpwooProps> = ({ state = 'wave', size = 140, catchphrase }) => {
  // Pick a random catchphrase if not provided
  const phrase = catchphrase || catchphrases[Math.floor(Math.random() * catchphrases.length)];

  // Thanksgiving color palette: warm browns, oranges, reds
  const head = '#DC2626'; // Red head
  const body = '#92400E'; // Brown body
  const beak = '#F97316'; // Orange beak
  const wattle = '#EF4444'; // Red wattle
  const feather = '#FBBF24'; // Gold feather accents
  const outline = 'currentColor';
  const darkMode = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
  const textColor = darkMode ? '#fff' : '#222';
  const eyeColor = darkMode ? '#fff' : '#fff';
  const eyePupil = darkMode ? '#222' : '#000';

  // Turkey proportions
  const centerX = 60;
  const headCenterY = 35;
  const bodyCenterY = 85;
  const headRadius = 18;
  const bodyRadiusX = 25;
  const bodyRadiusY = 35;

  // --- SVG for Spwoo the Turkey ---
  return (
    <div style={{ position: 'relative', width: size, height: size + 20, color: textColor }}>
      <svg width={size} height={size} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* --- Body (large oval) --- */}
        <ellipse 
          cx={centerX} 
          cy={bodyCenterY} 
          rx={bodyRadiusX} 
          ry={bodyRadiusY} 
          fill={body} 
          stroke={outline} 
          strokeWidth="3" 
        />
        
        {/* --- Tail feathers (fan shape) --- */}
        <g>
          {/* Left feather */}
          <ellipse 
            cx="35" 
            cy={bodyCenterY - 10} 
            rx="8" 
            ry="25" 
            fill={feather} 
            stroke={outline} 
            strokeWidth="2" 
            transform="rotate(-20 35 75)"
          />
          {/* Center-left feather */}
          <ellipse 
            cx="42" 
            cy={bodyCenterY - 15} 
            rx="7" 
            ry="28" 
            fill={feather} 
            stroke={outline} 
            strokeWidth="2" 
            transform="rotate(-10 42 70)"
          />
          {/* Center feather */}
          <ellipse 
            cx="50" 
            cy={bodyCenterY - 18} 
            rx="6" 
            ry="30" 
            fill={feather} 
            stroke={outline} 
            strokeWidth="2" 
          />
          {/* Center-right feather */}
          <ellipse 
            cx="58" 
            cy={bodyCenterY - 15} 
            rx="7" 
            ry="28" 
            fill={feather} 
            stroke={outline} 
            strokeWidth="2" 
            transform="rotate(10 58 70)"
          />
          {/* Right feather */}
          <ellipse 
            cx="65" 
            cy={bodyCenterY - 10} 
            rx="8" 
            ry="25" 
            fill={feather} 
            stroke={outline} 
            strokeWidth="2" 
            transform="rotate(20 65 75)"
          />
        </g>

        {/* --- Head (circle) --- */}
        <circle 
          cx={centerX} 
          cy={headCenterY} 
          r={headRadius} 
          fill={head} 
          stroke={outline} 
          strokeWidth="3" 
        />

        {/* --- Wattle (red hanging thing) --- */}
        <ellipse 
          cx={centerX + 8} 
          cy={headCenterY + 5} 
          rx="4" 
          ry="8" 
          fill={wattle} 
          stroke={outline} 
          strokeWidth="1.5" 
        />

        {/* --- Beak (triangle/orange) --- */}
        <path 
          d={`M ${centerX} ${headCenterY - 5} L ${centerX - 4} ${headCenterY + 2} L ${centerX + 4} ${headCenterY + 2} Z`}
          fill={beak}
          stroke={outline}
          strokeWidth="2"
        />

        {/* --- Eyes (expressive!) --- */}
        <circle 
          cx={centerX - 6} 
          cy={headCenterY - 3} 
          r="3" 
          fill={eyeColor} 
          stroke={outline} 
          strokeWidth="1.5" 
        />
        <circle 
          cx={centerX + 6} 
          cy={headCenterY - 3} 
          r="3" 
          fill={eyeColor} 
          stroke={outline} 
          strokeWidth="1.5" 
        />
        {/* Pupils */}
        <circle 
          cx={centerX - 6} 
          cy={headCenterY - 3} 
          r="1.5" 
          fill={eyePupil}
        />
        <circle 
          cx={centerX + 6} 
          cy={headCenterY - 3} 
          r="1.5" 
          fill={eyePupil}
        />

        {/* --- Eyebrows (expressive based on state) --- */}
        {state === 'think' && (
          <>
            <path d="M 48 23 Q 52 20 54 23" stroke={outline} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 66 23 Q 68 20 72 23" stroke={outline} strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        )}
        {state === 'celebrate' && (
          <>
            <path d="M 48 23 Q 52 26 54 23" stroke={outline} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 66 23 Q 68 26 72 23" stroke={outline} strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        )}
        {(state === 'wave' || state === 'strut') && (
          <>
            <path d="M 48 23 Q 52 24 54 23" stroke={outline} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 66 23 Q 68 24 72 23" stroke={outline} strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* --- Wings --- */}
        <ellipse 
          cx={centerX - 15} 
          cy={bodyCenterY - 5} 
          rx="8" 
          ry="15" 
          fill={body} 
          stroke={outline} 
          strokeWidth="2" 
          transform="rotate(-30 45 80)"
        />
        <ellipse 
          cx={centerX + 15} 
          cy={bodyCenterY - 5} 
          rx="8" 
          ry="15" 
          fill={body} 
          stroke={outline} 
          strokeWidth="2" 
          transform="rotate(30 75 80)"
        />

        {/* --- Legs/Feet --- */}
        <path 
          d="M 52 115 L 52 125 L 48 128 L 50 128 L 52 125 L 54 128 L 56 128 L 52 125 Z"
          fill={beak}
          stroke={outline}
          strokeWidth="1.5"
        />
        <path 
          d="M 68 115 L 68 125 L 64 128 L 66 128 L 68 125 L 70 128 L 72 128 L 68 125 Z"
          fill={beak}
          stroke={outline}
          strokeWidth="1.5"
        />

        {/* --- Waving wing (if state is wave) --- */}
        {state === 'wave' && (
          <g>
            <ellipse 
              cx={centerX + 20} 
              cy={headCenterY + 5} 
              rx="6" 
              ry="12" 
              fill={body} 
              stroke={outline} 
              strokeWidth="2" 
              transform="rotate(45 80 40)"
            />
          </g>
        )}

        {/* --- Shadow --- */}
        <ellipse cx={centerX} cy="137" rx="28" ry="6" fill="#D1D5DB" opacity="0.5" />
      </svg>
      
      {/* --- Speech Bubble with catchphrase --- */}
      {phrase && (
        <div
          style={{
            position: 'absolute',
            left: '100%',
            top: '35%',
            transform: 'translateY(-50%)',
            background: darkMode ? '#92400E' : '#FFF7ED',
            color: textColor,
            border: `2px solid ${darkMode ? '#F97316' : '#DC2626'}`,
            borderRadius: 18,
            padding: '8px 18px',
            fontWeight: 700,
            fontFamily: 'Quicksand, Nunito, Inter, system-ui, sans-serif',
            fontSize: 18,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            zIndex: 2,
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            minWidth: 80,
          }}
          className="fun-heading animate-fade-in"
        >
          {phrase}
        </div>
      )}
    </div>
  );
};
// Gobble-gobble! Spwoo the Turkey believes in you. Now go plan the perfect potluck meal!
