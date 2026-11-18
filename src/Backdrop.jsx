// Football pitch markings drawn as thin lines, laid over the hero photo as a subtle overlay.
// A camera plan for a sports broadcast: pitch, three camera positions with their field of view, a ruler.
// Static: no glow, no animation.

const lines = [
  'M700 120 H1800 M700 820 H1800 M700 120 V820',
  'M1250 120 V820',
  'M1250 350 A120 120 0 1 1 1249.9 350',
  'M1250 466 A4 4 0 1 1 1249.9 466',
  'M700 300 H850 V640 H700',
  'M700 400 H755 V540 H700',
  'M850 413 A95 95 0 0 1 850 527',
  'M1250 52 A10 10 0 1 1 1249.9 52',
  'M618 470 A10 10 0 1 1 617.9 470',
  'M1250 62 L880 900 M1250 62 L1620 900',
  'M628 470 L1120 250 M628 470 L1120 690',
  'M60 860 H680',
  Array.from({ length: 32 }, (_, i) => `M${60 + i * 20} 860 v${i % 5 === 0 ? -14 : -7}`).join(' ')
];

export default function PitchLines() {
  return (
    <svg className="pitch-lines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {lines.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
