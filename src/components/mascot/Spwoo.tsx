import React from 'react';

export type SpwooState = 'wave' | 'think' | 'code' | 'celebrate';

interface SpwooProps {
  state?: SpwooState;
  size?: number;
  catchphrase?: string;
}

// Oo-wee! Meet Spwoo: the oatmeal-obsessed, can-do code spoon!
const catchphrases = [
  "Oo-wee!",
  "Let's stir it up!",
  "Oat-yeah!",
  "Spoon up some code!",
  "Breakfast for your brain!",
  "Let's get weird!",
  "Oatstanding!",
  "Time to scoop!",
  "You got this, buttercup!",
];

export const Spwoo: React.FC<SpwooProps> = ({ state = 'wave', size = 140, catchphrase }) => {
  // Pick a random catchphrase if not provided
  const phrase = catchphrase || catchphrases[Math.floor(Math.random() * catchphrases.length)];

  // Color palette: fun, saturated, and night-mode friendly
  const skin = '#FFE066'; // Spoon face
  const body = '#F3F4F6'; // Spoon body
  const accent = '#60A5FA'; // Bow tie
  const hat = '#22223B'; // Top hat
  const mouth = '#F59E42'; // Mouth
  const outline = 'currentColor';
  const darkMode = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
  const textColor = darkMode ? '#fff' : '#222';
  // Arm color: visible in both modes
  const armFill = darkMode ? '#ffe066' : '#b45309';
  const armOutline = darkMode ? '#fff' : '#222';

  // Adjusted proportions
  const headCx = 60;
  const headCy = 38;
  const headRx = 22;
  const headRy = 26; // slightly smaller head
  const bodyCx = 60;
  const bodyCy = 100;
  const bodyRx = 9;
  const bodyRy = 38; // longer, slimmer body

  // --- SVG for Spwoo ---
  return (
    <div style={{ position: 'relative', width: size, height: size + 20, color: textColor }}>
      {/* Spwoo's body and face */}
      <svg width={size} height={size} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* --- Top Hat --- */}
        <g>
          <ellipse cx="60" cy="13" rx="16" ry="7" fill={hat} stroke={outline} strokeWidth="2" />
          <rect x="44" y="2" width="32" height="18" rx="7" fill={hat} stroke={outline} strokeWidth="2" />
          <rect x="50" y="16" width="20" height="6" rx="3" fill={accent} stroke={outline} strokeWidth="1.5" />
        </g>
        {/* --- Spoon Head (face) --- */}
        <ellipse cx={headCx} cy={headCy} rx={headRx} ry={headRy} fill={skin} stroke={outline} strokeWidth="3" />
        {/* --- Eyebrows (expressive!) --- */}
        <path d="M48 28 Q52 24 56 28" stroke={outline} strokeWidth="2" strokeLinecap="round" />
        <path d="M64 28 Q68 24 72 28" stroke={outline} strokeWidth="2" strokeLinecap="round" />
        {/* --- Eyes (big, excited) --- */}
        <ellipse cx="52" cy="40" rx="4" ry="6" fill="#fff" stroke={outline} strokeWidth="2" />
        <ellipse cx="68" cy="40" rx="4" ry="6" fill="#fff" stroke={outline} strokeWidth="2" />
        {/* Pupils */}
        <ellipse cx="52" cy="42" rx="1.5" ry="2" fill="#222" />
        <ellipse cx="68" cy="42" rx="1.5" ry="2" fill="#222" />
        {/* --- Buck Teeth --- */}
        <rect x="57" y="56" width="6" height="7" rx="2" fill="#fff" stroke={outline} strokeWidth="1" />
        <line x1="60" y1="56" x2="60" y2="63" stroke={outline} strokeWidth="0.8" />
        {/* --- Big Mouth (smile!) --- */}
        <path d="M52 52 Q60 66 68 52 Q60 62 52 52" fill={mouth} stroke={outline} strokeWidth="2" />
        {/* --- Slender Spoon Body --- */}
        <path d={`M${bodyCx} 72 Q${bodyCx + 2} 110 ${bodyCx} 128 Q${bodyCx - 2} 110 ${bodyCx} 72`} fill={body} stroke={outline} strokeWidth="3" />
        <ellipse cx={bodyCx} cy={bodyCy} rx={bodyRx} ry={bodyRy} fill={body} stroke={outline} strokeWidth="2.5" />
        {/* --- Bow Tie --- */}
        <g>
          <ellipse cx="60" cy="74" rx="7" ry="3.5" fill={accent} stroke={outline} strokeWidth="1.5" />
          <ellipse cx="53" cy="74" rx="3" ry="2" fill={accent} stroke={outline} strokeWidth="1" />
          <ellipse cx="67" cy="74" rx="3" ry="2" fill={accent} stroke={outline} strokeWidth="1" />
        </g>
        {/* --- Waving Arm (right, visible in all modes) --- */}
        <g>
          <path d="M80 80 Q110 60 95 45" stroke={armOutline} strokeWidth="6" fill="none" />
          <path d="M80 80 Q110 60 95 45" stroke={armFill} strokeWidth="3" fill="none" />
          <ellipse cx="95" cy="45" rx="5" ry="7" fill={armFill} stroke={armOutline} strokeWidth="2" />
          {/* Fingers */}
          <ellipse cx="98" cy="40" rx="1.5" ry="3" fill={armFill} stroke={armOutline} strokeWidth="1" />
          <ellipse cx="92" cy="44" rx="1.5" ry="3" fill={armFill} stroke={armOutline} strokeWidth="1" />
          <ellipse cx="97" cy="50" rx="1.5" ry="3" fill={armFill} stroke={armOutline} strokeWidth="1" />
        </g>
        {/* --- Left Arm (resting, visible in all modes) --- */}
        <g>
          <path d="M40 80 Q10 60 25 45" stroke={armOutline} strokeWidth="6" fill="none" />
          <path d="M40 80 Q10 60 25 45" stroke={armFill} strokeWidth="3" fill="none" />
          <ellipse cx="25" cy="45" rx="5" ry="7" fill={armFill} stroke={armOutline} strokeWidth="2" />
          {/* Fingers */}
          <ellipse cx="22" cy="40" rx="1.5" ry="3" fill={armFill} stroke={armOutline} strokeWidth="1" />
          <ellipse cx="28" cy="44" rx="1.5" ry="3" fill={armFill} stroke={armOutline} strokeWidth="1" />
          <ellipse cx="23" cy="50" rx="1.5" ry="3" fill={armFill} stroke={armOutline} strokeWidth="1" />
        </g>
        {/* --- Little Foot (for extra cartoon energy) --- */}
        <ellipse cx="60" cy="128" rx="7" ry="4" fill={accent} stroke={outline} strokeWidth="2" />
        {/* --- Shadow --- */}
        <ellipse cx="60" cy="137" rx="24" ry="6" fill="#D1D5DB" />
      </svg>
      {/* --- Speech Bubble with catchphrase (side of head, vertically centered) --- */}
      {phrase && (
        <div
          style={{
            position: 'absolute',
            left: '100%',
            top: '38%',
            transform: 'translateY(-50%)',
            background: darkMode ? '#22223B' : '#fffbe6',
            color: textColor,
            border: `2px solid ${darkMode ? '#ffe066' : '#22223B'}`,
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
// Oo-wee! Spwoo believes in you. Now go stir up something weirdly useful! 