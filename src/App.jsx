import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { linkedinPosts, LINKEDIN_PROFILE } from './linkedin.js';
import { instagramReels, INSTAGRAM_PROFILE } from './instagram.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EMAIL = 'harrisoliver073@gmail.com';
const YT = id => `https://www.youtube.com/watch?v=${id}`;
const thumb = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

const nav = [['work', 'Work'], ['about', 'About'], ['podcast', 'Podcast'], ['radio', 'Radio'], ['projects', 'Projects']];

// Only facts from the CV and the accounts
const metrics = [
  ['20+', 'podcast episodes produced'],
  ['12', 'shorts edited for Instagram'],
  ['Nov 2025', 'on air at Youth Choice'],
  ['2025', 'Employee of the Year']
];

// Frames from the videos themselves (YouTube thumbnails)
const work = [
  { id: 'oGT1sZjNrgM', tag: '01 / podcast', title: 'Chris Powell interview', href: YT('oGT1sZjNrgM') },
  { id: 'RvHx7rrYhKI', tag: '02 / studio', title: 'Sports interview set', href: '#projects' },
  { id: 'h3gAJZu_2rs', tag: '03 / highlights', title: 'Staines vs Farnborough', href: YT('h3gAJZu_2rs'), wide: true }
];

// Titles from YouTube
const media = [
  ['oGT1sZjNrgM', 'Chris Powell, part 1: playing career', 'Podcast episode'],
  ['duiCQ1NCDNY', 'Chris Powell, part 2: coaching career', 'Podcast episode'],
  ['KlJEv28Dh5E', 'Global interview', 'Interview'],
  ['6TqCgRl2C2o', 'Barnsley vs Man United, EFL', 'Highlights'],
  ['h3gAJZu_2rs', 'Staines vs Farnborough rugby', 'Highlights']
];

const duties = [
  ['Audio production', 'Recording, editing, mixing and mastering each episode.'],
  ['Video editing', 'Producing and publishing full episodes and extra vlogs on YouTube.'],
  ['Social media', 'Cutting highlight clips, trailers and promos to grow the audience.'],
  ['Visual design', 'Designing YouTube thumbnails and cover art to get more clicks.'],
  ['Guest bookings', 'Tracking guests, topics and episode outlines in a spreadsheet, and rearranging recordings when guests cancel so an episode still goes out every week.'],
  ['File archive', 'Keeping a secure archive of raw and finished files for every episode, so the team can find any file when needed.']
];

// Spotify titles start "101126": the show of 10 November 2026, as the full show and its seven links
const shows = [
  ['6dh1KIxyt9GDbJsHdD7Kds', 'Full show'], ['3dWKPUsF7KR58q5wI5mjdw', 'Link 1'], ['7MzqDmm5prdm7fXTB0Yelo', 'Link 2'],
  ['6fw92kOMwJanocqRuoRvlv', 'Link 3'], ['3IlDpXp8k43Epg6J7UIdSI', 'Link 4'], ['03Ztk57csEpuaPFmPETFop', 'Link 5'],
  ['10Aj5hz58MuL3chVeSwrXI', 'Link 6'], ['2b3CXGDPXGn71wXR7SXMqr', 'Link 7']
];

const skills = [
  ['Editing', 'Premiere Pro, After Effects, multi-camera editing, short-form clips'],
  ['Audio and radio', 'Audition, mixing and mastering, Zetta playout, presenting'],
  ['Studio and camera', 'Canon EOS R50, studio lighting, floor plans, risk assessments'],
  ['Design', 'Photoshop, Illustrator, Canva, thumbnails']
];

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;

function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export default function App() {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(null);
  const progressRef = useRef(null);
  const shortsRef = useRef(null);

  // Current section underline in the nav, and the reading progress line
  useGSAP(() => {
    nav.forEach(([id]) => {
      ScrollTrigger.create({ trigger: `#${id}`, start: 'top 45%', end: 'bottom 45%', onToggle: self => self.isActive && setCurrent(id) });
    });
    ScrollTrigger.create({ trigger: '#top', start: 'top bottom', end: 'bottom 45%', onToggle: self => self.isActive && setCurrent(null) });
    gsap.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: reduced ? true : 0.3 } });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, { dependencies: [reduced], revertOnUpdate: true });

  const scrollShorts = dir => shortsRef.current?.scrollBy({ left: dir * 632, behavior: reduced ? 'auto' : 'smooth' });

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className="nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#top">Oliver Harris</a>
          <nav aria-label="Main">
            <ul className="nav-links">
              {nav.map(([id, label]) => (
                <li key={id}><a href={`#${id}`} aria-current={current === id ? 'location' : undefined}>{label}</a></li>
              ))}
            </ul>
          </nav>
          <a className="pill pill-sm" href="#contact">Get in touch</a>
        </div>
        <div className="progress" ref={progressRef} aria-hidden="true" />
      </header>

      <main id="main">
        <section className="hero wrap" id="top" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">Sports podcast and radio producer · Epsom, Surrey</p>
              <h1 id="hero-title">Oliver Harris.</h1>
            </div>
            <div className="hero-side">
              <p>I produce, edit and present sports content. I run production for the Locker Room Pulse podcast and host and produce shows on Youth Choice radio. Open to apprenticeships in broadcast production and live events.</p>
              <a className="pill" href="#work">See my work <Arrow /></a>
            </div>
          </div>
          <dl className="metrics">
            {metrics.map(([n, l]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}
          </dl>
        </section>

        <section className="section wrap" id="work" aria-labelledby="work-title">
          <div className="split">
            <h2 id="work-title">Selected<br />work.</h2>
            <p className="split-side">Podcast episodes, studio interviews and match highlights I produced, shot or edited.</p>
          </div>
          <div className="tiles">
            {work.map(w => (
              <a key={w.id} className={`tile${w.wide ? ' tile-wide' : ''}`} href={w.href}>
                <img src={thumb(w.id)} alt="" loading="lazy" decoding="async" width="1280" height="720" />
                <span className="tile-tag">{w.tag}</span>
                <span className="tile-title">{w.title} <Arrow /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="section wrap" id="about" aria-labelledby="about-title">
          <div className="split">
            <h2 id="about-title">About<br />me.</h2>
            <div className="split-side about">
              <p className="lead">I'm a final-year Creative Media Production student with a Distinction in my Creative Media Production Diploma. Most of my work is in sport: podcast episodes, interviews, highlight packages, radio shows and documentaries.</p>
              <p>I enjoy the whole production process, from planning a shoot and writing risk assessments to recording, editing, designing the thumbnail and getting the finished piece in front of an audience.</p>
              <p>I'm now looking for an apprenticeship or entry-level role where I can build a career in broadcast production and live events.</p>
              <dl className="rows">
                <div><dt>Podcast production</dt><dd>Recording, editing, mixing and publishing a weekly sports podcast</dd></div>
                <div><dt>Live radio</dt><dd>Hosting since November 2025 and producing a daily show</dd></div>
                <div><dt>Video and studio</dt><dd>Multi-camera shoots, set planning, lighting and editing</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="band" id="podcast" aria-labelledby="podcast-title">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Head Podcast Producer</p>
              <h2 id="podcast-title">Locker Room Pulse.</h2>
              <p className="band-lede">A weekly student-run sports podcast covering football, basketball, tennis, boxing and more. I've been Head Podcast Producer and a co-host since November 2025, and I've produced over 20 episodes, one every week.</p>
            </div>
            <ol className="duties">
              {duties.map(([t, d], i) => (
                <li key={t}>
                  <details>
                    <summary><span className="n">{String(i + 1).padStart(2, '0')}</span><span className="t">{t}</span><span className="plus" aria-hidden="true" /></summary>
                    <p>{d}</p>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section wrap" aria-labelledby="watch-title">
          <div className="split">
            <h2 id="watch-title">Watch and<br />listen.</h2>
            <div className="split-side">
              <ul className="list">
                {media.map(([id, title, kind]) => (
                  <li key={id}>
                    <a href={YT(id)}><span className="list-title">{title}</span><span className="list-kind">{kind}</span><Arrow /></a>
                  </li>
                ))}
              </ul>
              <div className="actions">
                <a className="pill" href="https://www.youtube.com/@LockerRoomPulse">Watch on YouTube <Arrow /></a>
                <a className="pill pill-ghost" href={INSTAGRAM_PROFILE}>Follow on Instagram</a>
              </div>
            </div>
          </div>

          <div className="shorts" id="shorts">
            <div className="shorts-head">
              <div>
                <h3>Shorts I've edited</h3>
                <p>{instagramReels.length} reels from the Locker Room Pulse Instagram: predictions, guest clips and behind the scenes.</p>
              </div>
              <div className="shorts-nav">
                <button type="button" className="round" aria-label="Previous shorts" onClick={() => scrollShorts(-1)}><span aria-hidden="true" data-dir="prev">←</span></button>
                <button type="button" className="round" aria-label="Next shorts" onClick={() => scrollShorts(1)}><span aria-hidden="true" data-dir="next">→</span></button>
              </div>
            </div>
            <div className="shorts-row" ref={shortsRef} role="region" aria-label="Instagram shorts, scroll sideways" tabIndex={0}>
              {instagramReels.map(r => (
                <div className="short" key={r.code}>
                  <iframe src={`https://www.instagram.com/reel/${r.code}/embed/`} title={`Instagram short: ${r.title}`} loading="lazy" allowFullScreen />
                </div>
              ))}
            </div>
            <a className="link" href={INSTAGRAM_PROFILE}>See all on Instagram <Arrow /></a>
          </div>
        </section>

        <section className="section wrap" id="radio" aria-labelledby="radio-title">
          <div className="split">
            <div>
              <h2 id="radio-title">Youth Choice<br />radio.</h2>
              <p className="side-note">I've hosted shows on Youth Choice college radio since November 2025, and I produce a daily show.</p>
            </div>
            <div className="split-side">
              <ol className="steps">
                <li><span className="n">01</span><span className="t">Running order</span><span className="d">For each show I build the running order in Zetta, the playout system used by professional radio stations.</span></li>
                <li><span className="n">02</span><span className="t">Segues</span><span className="d">I edit the segues so music fades cleanly in and out of each link, keeping the show tight and on time.</span></li>
              </ol>
              <h3 className="list-head">Ollie and Freddie, 10 November 2026</h3>
              <p className="list-note">The whole show, then each link on its own. A link is the talk we do between songs.</p>
              <ol className="list">
                {shows.map(([id, label]) => (
                  <li key={id}><a href={`https://open.spotify.com/episode/${id}`}><span className="list-title">{label}</span><span className="list-kind">Spotify</span><Arrow /></a></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section wrap" id="projects" aria-labelledby="projects-title">
          <div className="split">
            <h2 id="projects-title">College<br />projects.</h2>
            <p className="split-side">Selected work from my Creative Media Production course. <a className="link" href="https://oliverharris6.wordpress.com/">See all coursework <Arrow /></a></p>
          </div>
          <div className="cards">
            <article className="card">
              <p className="card-tag">Final Major Project</p>
              <h3>Final documentary</h3>
              <p>A sports audio documentary on Sutton United's FA Cup history that I planned, researched, recorded and edited, then published as a podcast episode.</p>
              <a className="link" href="https://open.spotify.com/episode/70miIYJU1hjJrxphGiWMu8">Listen on Spotify <Arrow /></a>
            </article>
            <article className="card">
              <p className="card-tag">Unit 12, Specialist Study</p>
              <h3>Who tells sports stories now?</h3>
              <p>An essay on whether the internet has changed who controls sports media, across podcasts, YouTube, TikTok and journalism.</p>
              <a className="link" href="https://oliverharris6.wordpress.com/unit-12-specialist-study/">Read the essay <Arrow /></a>
            </article>
            <article className="card">
              <p className="card-tag">Unit 6</p>
              <h3>Building a sports interview set</h3>
              <p>I planned and dressed our own studio set, wrote the risk assessments, chose the kit and edited the multi-camera interviews: two Canon EOS R50s (one wide, one close-up), a Pixapro light, an LED light bar, two wash lights and clip-on microphones.</p>
              <p className="links">
                <a className="link" href={YT('RvHx7rrYhKI')}>Finley and Josh <Arrow /></a>
                <a className="link" href={YT('mO9n21DGQfc')}>With Brody <Arrow /></a>
                <a className="link" href={YT('wLvESyANWHs')}>Two-person interview <Arrow /></a>
                <a className="link" href={YT('RhMIyLw_MRs')}>Eduarda <Arrow /></a>
                <a className="link" href={YT('8jnANhyJQFI')}>Imad <Arrow /></a>
              </p>
            </article>
            <article className="card">
              <p className="card-tag">Unit 3 and 4</p>
              <h3>Heinz Flavour Tour pitch</h3>
              <p>Working in a five-person creative agency, we pitched a UK tour bus campaign for Heinz with The Fellas podcast. I made the pitch presentation.</p>
              <a className="link" href="https://www.canva.com/design/DAHCPrCYfr4/MUXgXCzDCj74b65YnE1EDw/view">View the presentation <Arrow /></a>
            </article>
          </div>
        </section>

        <section className="section wrap quote-section" aria-label="From my essay">
          <p className="eyebrow">From my Unit 12 essay</p>
          <blockquote className="quote"><p>“The internet has democratised making media more than it has democratised reaching people.”</p></blockquote>
        </section>

        <section className="section wrap" id="linkedin" aria-labelledby="linkedin-title">
          <div className="split">
            <h2 id="linkedin-title">On<br />LinkedIn.</h2>
            <p className="split-side">Posts about producing The Locker Room Pulse and presenting our Heinz project, with the clips and photos. <a className="link" href={LINKEDIN_PROFILE}>Follow me on LinkedIn <Arrow /></a></p>
          </div>
          <div className="li-grid">
            {[0, 1].map(col => (
              <div className="li-col" key={col}>
                {linkedinPosts.filter(p => p.column === col).map(p => (
                  <div className="li-post" key={p.id} style={{ '--li-h': `${p.desktop}px`, '--li-h-phone': `${p.phone}px` }}>
                    <iframe src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${p.id}?collapsed=1`} title={`LinkedIn post: ${p.title}`} loading="lazy" allowFullScreen />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="section wrap" id="skills" aria-labelledby="skills-title">
          <div className="split">
            <h2 id="skills-title">Skills<br />and kit.</h2>
            <div className="split-side">
              <p>The software and equipment I use regularly.</p>
              <dl className="rows">
                {skills.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
              </dl>
            </div>
          </div>
        </section>

        <section className="section wrap" id="experience" aria-labelledby="exp-title">
          <div className="split">
            <div>
              <h2 id="exp-title">Work<br />experience.</h2>
              <p className="side-note">Experience outside media that I bring to every production.</p>
            </div>
            <div className="split-side">
              <h3 className="job-title">Retail Assistant, Chessington Garden Centre</h3>
              <p className="job-meta">April 2025 to present, part-time alongside college</p>
              <p>I work three shifts a week, plus cover in half terms. I serve customers, keep the shelves stocked and build product displays, and in February 2026 I completed Weber's barbecue product expert training.</p>
              <ul className="job-list">
                <li>Built a 10-product Remembrance Day display two weeks before 11 November. About 10 of the 30 units sold in the first week.</li>
                <li>Built or reset around 15 outdoor furniture and Christmas displays, and finished the Christmas displays by a fixed deadline for the October opening event.</li>
                <li>During Christmas 2025, reviewed sales and placement across the store, spotted Elf on the Shelf as a repeat seller and recorded where it sold best.</li>
                <li>Process around 50 cash and card transactions a shift and answer customers' product questions.</li>
              </ul>
              <p>It's taught me to stay calm when it's busy, be reliable and deal with people well, all of which matter on a live production.</p>
              <aside className="award" aria-label="Award">
                <p className="award-n">2025</p>
                <div>
                  <p className="award-title">Employee of the Year</p>
                  <p className="award-text">Chessington Garden Centre, for always being there for the team, being up for any job, keeping a positive attitude and giving great customer service</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="band band-end" id="contact" aria-labelledby="contact-title">
          <div className="wrap split">
            <div>
              <h2 id="contact-title">Let's make<br />the next show.</h2>
              <p className="band-lede">I'm looking for apprenticeships and entry-level roles in broadcast production and live events.</p>
            </div>
            <div className="split-side">
              <a className="pill pill-big" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <ul className="contact-links">
                <li><a href="https://oliverharris6.wordpress.com/"><span>Coursework</span>oliverharris6.wordpress.com <Arrow /></a></li>
                <li><a href="https://www.youtube.com/@LockerRoomPulse"><span>YouTube</span>@LockerRoomPulse <Arrow /></a></li>
                <li><a href={LINKEDIN_PROFILE}><span>LinkedIn</span>Oliver Harris <Arrow /></a></li>
                <li><a href={INSTAGRAM_PROFILE}><span>Instagram</span>@lockerroompulse <Arrow /></a></li>
              </ul>
            </div>
          </div>
          <footer className="wrap foot">
            <span>© 2026 Oliver Harris</span>
            <a href="#top">Back to the top</a>
          </footer>
        </section>
      </main>
    </>
  );
}
