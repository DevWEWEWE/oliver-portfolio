// The fixed blue background behind every page: a breathing navy-to-electric-blue gradient and a
// camera plan for a sports broadcast (pitch markings, camera positions and their field of view, a ruler)
// that etches itself in on load, then sparks of light run along the lines. CSS only: pathLength="1"
// lets every line animate without measuring, and reduced motion shows the finished drawing, still.

const lines = [
  // [group (etch order), path]
  // Pitch: outline runs off the right edge, halfway line, centre circle and spot
  [0, 'M700 120 H1800 M700 820 H1800 M700 120 V820'],
  [0, 'M1250 120 V820'],
  [1, 'M1250 350 A120 120 0 1 1 1249.9 350'],
  [1, 'M1250 466 A4 4 0 1 1 1249.9 466'],
  // Penalty area, six-yard box, penalty arc
  [1, 'M700 300 H850 V640 H700'],
  [1, 'M700 400 H755 V540 H700'],
  [2, 'M850 413 A95 95 0 0 1 850 527'],
  // Camera positions: main gantry, behind the goal, low corner; and their fields of view
  [2, 'M1250 52 A10 10 0 1 1 1249.9 52'],
  [2, 'M618 470 A10 10 0 1 1 617.9 470'],
  [3, 'M1250 62 L880 900 M1250 62 L1620 900'],
  [3, 'M628 470 L1120 250 M628 470 L1120 690'],
  // Big arc for depth, off the top left
  [0, 'M-200 380 A520 520 0 0 1 520 -120'],
  // Ruler along the bottom left
  [0, 'M60 860 H680'],
  [4, Array.from({ length: 32 }, (_, i) => `M${60 + i * 20} 860 v${i % 5 === 0 ? -14 : -7}`).join(' ')]
];

// Sparks run along these lines (index into `lines`), each on its own delay so they never fire together
const sparks = [[9, 0], [0, 2.4], [10, 4.1], [11, 5.6], [1, 7.3], [12, 8.8]];

export default function Backdrop() {
  return (
    <div className="bd" aria-hidden="true">
      <div className="bd-glow bd-glow-a" />
      <div className="bd-glow bd-glow-b" />
      <svg className="bd-lines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {lines.map(([g, d], i) => (
          <path key={i} d={d} pathLength="1" className="bd-line" style={{ '--g': g, '--i': i }} />
        ))}
        {sparks.map(([i, delay]) => (
          <path key={`s${i}`} d={lines[i][1]} pathLength="1" className="bd-spark" style={{ '--delay': `${delay}s` }} />
        ))}
      </svg>
    </div>
  );
}
