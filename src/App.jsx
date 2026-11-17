import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Aurora from './components/Aurora.jsx';
import BlurText from './components/BlurText/BlurText.jsx';
import SpotlightCard from './components/SpotlightCard.jsx';
import RotatingText from './components/RotatingText.jsx';
import { linkedinPosts, LINKEDIN_PROFILE } from './linkedin.js';

// Shared look for every spotlight card: white card, soft blue light, the site's border colour
const spot = {
  theme: 'light',
  spotlightColor: '#2457D6',
  intensity: 0.45,
  style: {
    '--spotlight-card-surface': '#FFFFFF',
    '--spotlight-card-border': '#E1E5EE',
    '--spotlight-card-shadow': 'none'
  }
};

const Card = ({ className = '', children, ...rest }) => (
  <SpotlightCard {...spot} className={`card ${className}`.trim()} {...rest}>
    {children}
  </SpotlightCard>
);

const PlayIcon = () => (
  <span className="play" aria-hidden="true">
    <svg width="12" height="14" viewBox="0 0 12 14"><path d="M0 0l12 7-12 7z" fill="#fff" /></svg>
  </span>
);

const media = [
  ['https://www.youtube.com/watch?v=oGT1sZjNrgM', 'Chris Powell interview, part 1', 'Podcast episode'],
  ['https://www.youtube.com/watch?v=duiCQ1NCDNY', 'Chris Powell interview, part 2', 'Podcast episode'],
  ['https://www.youtube.com/watch?v=KlJEv28Dh5E', 'Sports interview', 'Interview'],
  ['https://www.youtube.com/watch?v=6TqCgRl2C2o', 'Highlight package', 'Highlights'],
  ['https://www.youtube.com/watch?v=h3gAJZu_2rs', 'Rugby highlights', 'Highlights']
];

const shows = [
  '6dh1KIxyt9GDbJsHdD7Kds', '3dWKPUsF7KR58q5wI5mjdw', '7MzqDmm5prdm7fXTB0Yelo', '6fw92kOMwJanocqRuoRvlv',
  '3IlDpXp8k43Epg6J7UIdSI', '03Ztk57csEpuaPFmPETFop', '10Aj5hz58MuL3chVeSwrXI', '2b3CXGDPXGn71wXR7SXMqr'
];

const skills = [
  ['Editing', ['Premiere Pro', 'After Effects', 'Multi-camera editing', 'Short-form clips']],
  ['Audio and radio', ['Audition', 'Mixing and mastering', 'Zetta playout', 'Presenting']],
  ['Studio and camera', ['Canon EOS R50', 'Studio lighting', 'Floor plans', 'Risk assessments']],
  ['Design', ['Photoshop', 'Illustrator', 'Canva', 'Thumbnails']]
];

gsap.registerPlugin(useGSAP, ScrollTrigger);
// Keep GSAP on real clock time even when frames come slowly, so entrances finish on schedule
gsap.ticker.lagSmoothing(0);

const navIds = ['about', 'podcast', 'radio', 'projects', 'skills', 'contact'];

function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

// Highlight the current section in the top bar
function useCurrentSection() {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const update = () => {
      const y = window.scrollY + 120;
      let found = null;
      navIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) found = id;
      });
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) found = 'contact';
      setCurrent(found);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return current;
}

export default function App() {
  const reduced = useReducedMotion();
  const current = useCurrentSection();
  const [raysPaused, setRaysPaused] = useState(false);
  const heroRef = useRef(null);
  const progressRef = useRef(null);

  // Reading progress: the blue line under the top bar fills as the page is scrolled.
  // It follows the scrollbar exactly, so it stays on for reduced-motion users (no lag added for them).
  useGSAP(() => {
    gsap.fromTo(progressRef.current, { scaleX: 0 }, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: reduced ? true : 0.3 }
    });
    // Fonts and the hero animations change the page height after load, so re-measure once they settle
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const t = setTimeout(() => ScrollTrigger.refresh(), 3000);
    return () => clearTimeout(t);
  }, { dependencies: [reduced], revertOnUpdate: true });
  // BlurText runs on animation frames; if they stall on a slow device, show the plain name after 2.5s
  const [nameDone, setNameDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setNameDone(true), 2500);
    return () => clearTimeout(t);
  }, []);

  // Hero entrance: the buttons rise in one after the other, then the At a glance box settles.
  // Runs once on load, scoped to the hero, and skipped for anyone who asks for reduced motion.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const hero = heroRef.current;
      hero.dataset.entering = '';
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.45, onComplete: () => delete hero.dataset.entering })
        .from('.actions .btn', { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.08, clearProps: 'transform,opacity,visibility' })
        .from('.glance', { y: 18, scale: 0.98, autoAlpha: 0, duration: 0.9, clearProps: 'transform,opacity,visibility' }, '<0.1')
        .from('.glance dl > div', { y: 8, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, '<0.2');
      // Safety net: on a slow or throttled device frames can stall, so never leave the hero hidden.
      // After 2.5s (about when the entrance ends anyway) jump straight to the finished state.
      const safety = setTimeout(() => tl.progress(1), 2500);
      return () => clearTimeout(safety);
    });
    return () => {
      mm.revert();
      delete heroRef.current?.dataset.entering;
    };
  }, { scope: heroRef });

  // Section entrances: each section gets one short timeline that plays once as it scrolls into view.
  // Heading first, then its line of text, then the cards in a quick stagger. Transform and opacity only.
  const mainRef = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const clear = 'transform,opacity,visibility';
      const rise = { y: 28, autoAlpha: 0, duration: 0.8, clearProps: clear };
      const card = { y: 32, autoAlpha: 0, duration: 0.75, stagger: 0.08, clearProps: clear };
      const small = { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.04, clearProps: clear };

      // [section id, [selector, tween vars, position on the timeline]...] in page order
      const plans = [
        ['about', [['h2', rise], ['.about-grid > div:first-child p', { ...rise, stagger: 0.08 }, '<0.12'], ['.highlight', card, '<0.15']]],
        ['podcast', [['.head h2', rise], ['.head p', rise, '<0.1'], ['.duties .card', card, '<0.15'], ['.lrp-grid > .card', { ...rise, y: 36 }, '<0.1'], ['.media-list li', small, '<0.25'], ['.card-foot .btn', small, '<0.2']]],
        ['radio', [['.head h2', rise], ['.head p', rise, '<0.1'], ['.radio-grid > .card', { ...rise, y: 36 }, '<0.15'], ['.show', { ...small, stagger: { each: 0.05, grid: 'auto', from: 'start' } }, '<0.15'], ['.small', small, '>-0.2']]],
        ['projects', [['.head h2', rise], ['.head p, .head .text-link', { ...rise, stagger: 0.08 }, '<0.1'], ['.proj', card, '<0.15']]],
        ['linkedin', [['.head h2', rise], ['.head p, .head .text-link', { ...rise, stagger: 0.08 }, '<0.1'], ['.li-post', card, '<0.15']]],
        ['skills', [['.head h2', rise], ['.head p', rise, '<0.1'], ['.skills-grid .card', card, '<0.15'], ['.chips li', { ...small, stagger: 0.015 }, '<0.3']]],
        ['experience', [['.head h2', rise], ['.head p', rise, '<0.1'], ['.exp-grid > .card', { ...rise, y: 36 }, '<0.15'], ['.award', { autoAlpha: 0, y: 24, scale: 0.97, duration: 0.9, clearProps: clear }, '<0.12']]],
        ['contact', [['.head h2', rise], ['.head p', rise, '<0.1'], ['.contact-item', card, '<0.15']]]
      ];

      const timelines = plans.map(([id, steps]) => {
        const section = document.getElementById(id);
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: section, start: 'top 82%', once: true },
          onStart: () => {
            section.dataset.entering = '';
            // Safety net: if frames stall part-way, finish the section shortly after it should have
            tl.safety = setTimeout(() => tl.progress(1), (tl.duration() + 0.8) * 1000);
          },
          onComplete: () => {
            delete section.dataset.entering;
            clearTimeout(tl.safety);
          }
        });
        steps.forEach(([selector, vars, position]) => {
          const targets = section.querySelectorAll(selector);
          if (targets.length) tl.from(targets, vars, position);
        });
        return tl;
      });

      // If animation frames never run (very slow device, crawler, print preview), show everything
      const startFrame = gsap.ticker.frame;
      const watchdog = setTimeout(() => {
        if (gsap.ticker.frame - startFrame < 10) timelines.forEach(tl => tl.progress(1));
      }, 3000);

      return () => {
        clearTimeout(watchdog);
        timelines.forEach(tl => clearTimeout(tl.safety));
        plans.forEach(([id]) => { delete document.getElementById(id)?.dataset.entering; });
      };
    });
    return () => mm.revert();
  }, { scope: mainRef });

  const navLink = (id, label, cls) => (
    <li className={cls}>
      <a href={`#${id}`} className={current === id ? 'active' : undefined}>{label}</a>
    </li>
  );

  return (
    <>
      <a className="skip" href="#about">Skip to content</a>

      <header className="bar">
        <div className="wrap bar-inner">
          <a className="brand" href="#top" aria-label="Oliver Harris, back to top">
            <span className="brand-mark">OH</span><span className="brand-name">Oliver Harris</span>
          </a>
          <nav aria-label="Main">
            <ul className="nav">
              {navLink('about', 'About', 'hide-xs')}
              {navLink('podcast', 'Podcast')}
              {navLink('radio', 'Radio')}
              {navLink('projects', 'Projects')}
              {navLink('skills', 'Skills', 'hide-sm')}
              {navLink('contact', 'Contact', 'cta')}
            </ul>
          </nav>
        </div>
        <div className="progress" ref={progressRef} aria-hidden="true" />
      </header>

      <main id="top" ref={mainRef}>
        <div className="hero" ref={heroRef}>
          <div className="hero-rays" aria-hidden="true">
            <Aurora
              colorStops={['#1A6FE0', '#38A3FF', '#1A6FE0']}
              lightMode
              amplitude={0.9}
              blend={0.6}
              speed={0.5}
              height={0.5}
              opacity={0.8}
              mouseInteraction={false}
              paused={raysPaused}
            />
          </div>
          {!reduced && (
            <button className="rays-toggle" type="button" aria-pressed={raysPaused} onClick={() => setRaysPaused(p => !p)}>
              {raysPaused ? 'Play background' : 'Pause background'}
            </button>
          )}
          <div className="wrap hero-grid">
            <div>
              <span className="status">Open to apprenticeships in broadcast and live events</span>
              <h1 className="sr-only">Oliver Harris</h1>
              <div aria-hidden="true">
                {nameDone || reduced ? (
                  <p className="hero-name">Oliver Harris</p>
                ) : (
                  <BlurText text="Oliver Harris" className="hero-name" trigger="load" animateBy="words" direction="top" delay={120} onAnimationComplete={() => setNameDone(true)} />
                )}
              </div>
              <p className="role">
                Sports{' '}
                <RotatingText
                  texts={['podcast producer', 'radio host and producer', 'video editor', 'podcast and radio producer']}
                  mainClassName="role-rotate"
                  rotationInterval={1800}
                  staggerDuration={0.015}
                  splitBy="characters"
                  loop={false}
                  pauseOnHover
                />
              </p>
              <p className="intro">I produce, edit and present sports content. I run production for the Locker Room Pulse podcast and host and produce shows on Youth Choice radio.</p>
              <div className="actions">
                <a className="btn btn-primary" href="#podcast">See my work</a>
                <a className="btn btn-secondary" href="#contact">Contact me</a>
              </div>
            </div>
            <aside className="glance" aria-labelledby="glance-title">
              <h2 id="glance-title">At a glance</h2>
              <dl>
                <div><dt>Podcast</dt><dd>Head Podcast Producer, Locker Room Pulse</dd></div>
                <div><dt>Radio</dt><dd>Host and producer, Youth Choice radio</dd></div>
                <div><dt>Education</dt><dd>Creative Media Production, final year. Distinction in Diploma</dd></div>
                <div><dt>Award</dt><dd>Employee of the Year 2025, Chessington Garden Centre</dd></div>
              </dl>
            </aside>
          </div>
        </div>

        <section id="about">
          <div className="wrap about-grid">
            <div>
              <div className="head"><div><h2>About me</h2></div></div>
              <p>I'm a final-year Creative Media Production student with a Distinction in my Creative Media Production Diploma. Most of my work is in sport: podcast episodes, interviews, highlight packages, radio shows and documentaries.</p>
              <p>I enjoy the whole production process, from planning a shoot and writing risk assessments to recording, editing, designing the thumbnail and getting the finished piece in front of an audience.</p>
              <p>I'm now looking for an apprenticeship or entry-level role where I can build a career in broadcast production and live events.</p>
            </div>
            <div className="highlights">
              <div className="card highlight">
                <span className="icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 17v5" /></svg></span>
                <div><h3>Podcast production</h3><p>Recording, editing, mixing and publishing a weekly sports podcast</p></div>
              </div>
              <div className="card highlight">
                <span className="icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19.1 4.9a10 10 0 0 1 0 14.2M4.9 19.1a10 10 0 0 1 0-14.2" /></svg></span>
                <div><h3>Live radio</h3><p>Hosting since November 2025 and producing a daily show</p></div>
              </div>
              <div className="card highlight">
                <span className="icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="14" height="12" rx="2" /><path d="m16 10 6-3v10l-6-3" /></svg></span>
                <div><h3>Video and studio</h3><p>Multi-camera shoots, set planning, lighting and editing</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="podcast" className="alt">
          <div className="wrap">
            <div className="head">
              <div>
                <h2>Locker Room Pulse</h2>
                <p>A weekly student-run sports podcast covering football, basketball, tennis, boxing and more. I've been Head Podcast Producer and a co-host since November 2025, and I've produced over 20 episodes, one every week.</p>
              </div>
            </div>
            <div className="lrp-grid">
              <div className="duties">
                <Card><h3>Audio production</h3><p>Recording, editing, mixing and mastering each episode.</p></Card>
                <Card><h3>Video editing</h3><p>Producing and publishing full episodes and extra vlogs on YouTube.</p></Card>
                <Card><h3>Social media</h3><p>Cutting highlight clips, trailers and promos to grow the audience.</p></Card>
                <Card><h3>Visual design</h3><p>Designing YouTube thumbnails and cover art to get more clicks.</p></Card>
                <Card><h3>Guest bookings</h3><p>Tracking guests, topics and episode outlines in a spreadsheet, and rearranging recordings when guests cancel so an episode still goes out every week.</p></Card>
                <Card><h3>File archive</h3><p>Keeping a secure archive of raw and finished files for every episode, so the team can find any file when needed.</p></Card>
              </div>
              <Card>
                <h3>Watch and listen</h3>
                <ul className="media-list">
                  {media.map(([href, title, kind]) => (
                    <li key={href}>
                      <a href={href}>
                        <PlayIcon />
                        <span className="m-text"><span className="m-title">{title}</span><span className="m-kind">{kind}</span></span>
                        <span className="m-where">YouTube</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="card-foot">
                  <a className="btn btn-primary" href="https://www.youtube.com/@LockerRoomPulse">Watch on YouTube</a>
                  <a className="btn btn-secondary" href="https://www.instagram.com/lockerroompulse/">Follow on Instagram</a>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="radio">
          <div className="wrap">
            <div className="head">
              <div>
                <h2>Youth Choice radio</h2>
                <p>I've hosted shows on Youth Choice college radio since November 2025, and I produce a daily show.</p>
              </div>
            </div>
            <div className="radio-grid">
              <div className="card">
                <span className="tag">How I produce a show</span>
                <h3>Running order and playout in Zetta</h3>
                <p>For each show I build the running order in Zetta, the playout system used by professional radio stations.</p>
                <p className="last">I edit the segues so music fades cleanly in and out of each link, keeping the show tight and on time.</p>
              </div>
              <div>
                <div className="shows">
                  {shows.map((id, i) => (
                    <a key={id} className="show" href={`https://open.spotify.com/episode/${id}`}>
                      <b>Show {i + 1}</b><span>Listen on Spotify</span>
                    </a>
                  ))}
                </div>
                <p className="small">Each link opens on Spotify, in show order.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="alt">
          <div className="wrap">
            <div className="head">
              <div>
                <h2>College projects</h2>
                <p>Selected work from my Creative Media Production course.</p>
              </div>
              <a className="text-link" href="https://oliverharris6.wordpress.com/">See all coursework</a>
            </div>
            <div className="proj-grid">
              <Card className="proj" role="article">
                <span className="tag">Final Major Project</span>
                <h3>Final documentary</h3>
                <p>A sports audio documentary that I planned, researched, recorded and edited, then published as a podcast episode.</p>
                <a className="text-link go" href="https://open.spotify.com/episode/70miIYJU1hjJrxphGiWMu8">Listen on Spotify</a>
              </Card>
              <Card className="proj" role="article">
                <span className="tag">Unit 12, Specialist Study</span>
                <h3>Who tells sports stories now?</h3>
                <p>An essay on whether the internet has changed who controls sports media, across podcasts, YouTube, TikTok and journalism.</p>
                <p className="quote">“The internet has democratised making media more than it has democratised reaching people.”</p>
                <a className="text-link go" href="https://oliverharris6.wordpress.com/unit-12-specialist-study/">Read the essay</a>
              </Card>
              <Card className="proj" role="article">
                <span className="tag">Unit 6</span>
                <h3>Building a sports interview set</h3>
                <p>I planned and dressed our own studio set, wrote the risk assessments, chose the kit and edited the multi-camera interviews.</p>
                <ul>
                  <li>Two Canon EOS R50s: one wide, one close-up</li>
                  <li>Pixapro light, LED light bar and two wash lights</li>
                  <li>Clip-on microphones</li>
                </ul>
                <div className="links-row go">
                  <a className="text-link" href="https://www.youtube.com/watch?v=RvHx7rrYhKI">Final interview</a>
                  <a className="text-link" href="https://www.youtube.com/watch?v=mO9n21DGQfc">Edit 2</a>
                  <a className="text-link" href="https://www.youtube.com/watch?v=wLvESyANWHs">Edit 3</a>
                  <a className="text-link" href="https://www.youtube.com/watch?v=RhMIyLw_MRs">Edit 4</a>
                  <a className="text-link" href="https://www.youtube.com/watch?v=8jnANhyJQFI">Edit 5</a>
                </div>
              </Card>
              <Card className="proj" role="article">
                <span className="tag">Unit 3 and 4</span>
                <h3>Heinz Flavour Tour pitch</h3>
                <p>Working in a five-person creative agency, we pitched a UK tour bus campaign for Heinz with The Fellas podcast. I made the pitch presentation.</p>
                <a className="text-link go" href="https://www.canva.com/design/DAHCPrCYfr4/MUXgXCzDCj74b65YnE1EDw/view">View the presentation</a>
              </Card>
            </div>
          </div>
        </section>

        <section id="linkedin">
          <div className="wrap">
            <div className="head">
              <div>
                <h2>On LinkedIn</h2>
                <p>Posts about producing The Locker Room Pulse and presenting our Heinz project, with the clips and photos.</p>
              </div>
              <a className="text-link" href={LINKEDIN_PROFILE}>Follow me on LinkedIn</a>
            </div>
            <div className="li-grid">
              {[0, 1].map(col => (
                <div className="li-col" key={col}>
                  {linkedinPosts.filter(p => p.column === col).map(p => (
                    <div className="li-post" key={p.id} style={{ '--li-h': `${p.desktop}px`, '--li-h-phone': `${p.phone}px` }}>
                      <iframe
                        src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${p.id}?collapsed=1`}
                        title={`LinkedIn post: ${p.title}`}
                        loading="lazy"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="alt">
          <div className="wrap">
            <div className="head"><div><h2>Skills and kit</h2><p>The software and equipment I use regularly.</p></div></div>
            <div className="skills-grid">
              {skills.map(([title, items]) => (
                <Card key={title}>
                  <h3>{title}</h3>
                  <ul className="chips">{items.map(item => <li key={item}>{item}</li>)}</ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap">
            <div className="head"><div><h2>Work experience</h2><p>Experience outside media that I bring to every production.</p></div></div>
            <div className="exp-grid">
              <div className="card">
                <h3>Retail Assistant, Chessington Garden Centre</h3>
                <p className="meta">April 2025 to present, part-time alongside college</p>
                <p>I work three shifts a week, plus cover in half terms. I serve customers, keep the shelves stocked and build product displays, and in February 2026 I completed Weber's barbecue product expert training.</p>
                <ul className="exp-list">
                  <li>Built a 10-product Remembrance Day display two weeks before 11 November. About 10 of the 30 units sold in the first week.</li>
                  <li>Built or reset around 15 outdoor furniture and Christmas displays, and finished the Christmas displays by a fixed deadline for the October opening event.</li>
                  <li>During Christmas 2025, reviewed sales and placement across the store, spotted Elf on the Shelf as a repeat seller and recorded where it sold best.</li>
                  <li>Process around 50 cash and card transactions a shift and answer customers' product questions.</li>
                </ul>
                <p className="last">It's taught me to stay calm when it's busy, be reliable and deal with people well, all of which matter on a live production.</p>
              </div>
              <div className="award">
                <span className="tag">Award</span>
                <b>Employee of the Year 2025</b>
                <span>Chessington Garden Centre, for always being there for the team, being up for any job, keeping a positive attitude and giving great customer service</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap">
            <div className="head"><div><h2>Get in touch</h2><p>I'm looking for apprenticeships and entry-level roles in broadcast production and live events.</p></div></div>
            <div className="contact-grid">
              <a className="contact-item" href="mailto:harrisoliver073@gmail.com"><small>Email</small><strong>harrisoliver073@gmail.com</strong></a>
              <a className="contact-item" href="https://oliverharris6.wordpress.com/"><small>Coursework</small><strong>oliverharris6.wordpress.com</strong></a>
              <a className="contact-item" href="https://www.youtube.com/@LockerRoomPulse"><small>YouTube</small><strong>@LockerRoomPulse</strong></a>
              <a className="contact-item" href={LINKEDIN_PROFILE}><small>LinkedIn</small><strong>Oliver Harris</strong></a>
              <a className="contact-item" href="https://www.instagram.com/lockerroompulse/"><small>Instagram</small><strong>@lockerroompulse</strong></a>
            </div>
          </div>
        </section>
      </main>

      <footer><div className="wrap">© 2026 Oliver Harris</div></footer>
    </>
  );
}
