// Line drawing behind the home hero: a broadcast camera on a pedestal and a desk mic with a mic flag.
// Blue signal lines run through both, each carrying a bright pulse. The drawing etches in once on load.
// Reduced motion: the finished drawing and faint signal lines, nothing moving.

const camera = [
  // body, handle, viewfinder and its hood
  'M900 304 H1150 Q1162 304 1162 316 V428 Q1162 440 1150 440 H900 Z',
  'M940 304 L952 270 H1032 L1044 304',
  'M1060 304 V258 H1176 V296 H1162',
  'M1176 258 L1198 248 V306 L1176 296',
  // lens barrel with focus rings and hood
  'M900 322 L812 336 V408 L900 422',
  'M846 331 V413 M872 327 V417',
  'M812 326 H768 V418 H812',
  // pedestal head, column, pan bar and legs
  'M1000 440 V466 H1080 V440',
  'M1040 466 V560',
  'M1162 420 L1226 446',
  'M1040 560 L930 760 M1040 560 L1150 760 M1040 560 V760',
  'M905 760 H1175'
];

const mic = [
  // capsule with grille, yoke, stem and base
  'M1286 330 A30 30 0 0 1 1316 360 V448 A30 30 0 0 1 1256 448 V360 A30 30 0 0 1 1286 330 Z',
  'M1260 372 H1312 M1258 394 H1314 M1258 416 H1314',
  'M1244 430 V452 A42 42 0 0 0 1328 452 V430',
  'M1252 494 H1320 V538 H1252 Z',
  'M1286 538 V748',
  'M1226 760 Q1226 748 1240 748 H1332 Q1346 748 1346 760 Z'
];

// Signal lines: three through the camera, two curving through the mic
const signals = [
  'M720 352 C 860 352, 980 352, 1440 352',
  'M700 372 C 860 372, 1000 372, 1440 372',
  'M720 392 C 860 392, 980 392, 1440 392',
  'M1060 210 C 1180 250, 1240 330, 1286 400 S 1380 560, 1440 600',
  'M1100 640 C 1180 600, 1240 520, 1286 470 S 1390 330, 1440 300'
];

export default function HeroArt() {
  let i = 0;
  return (
    <svg className="hero-art" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {signals.map((d, k) => <path key={`s${k}`} className="sig" d={d} />)}
      {[...camera, ...mic].map(d => <path key={i} className="art" d={d} pathLength="1" style={{ '--i': i++ }} />)}
      <circle className="tally" cx="924" cy="320" r="5" />
      {signals.map((d, k) => <path key={`p${k}`} className="pulse" d={d} pathLength="1" style={{ '--d': `${k * 1.3}s` }} />)}
    </svg>
  );
}
