import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { linkedinPosts, LINKEDIN_PROFILE } from './linkedin.js';
import { instagramReels, INSTAGRAM_PROFILE } from './instagram.js';
import { pages, pageFor } from './pages.js';
import HeroArt from './Backdrop.jsx';
import { projects } from './projects.js';
import { episodes, highlights, interviews, practiceInterviews, CHANNEL } from './youtube.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EMAIL = 'harrisoliver073@gmail.com';
const YT = id => `https://www.youtube.com/watch?v=${id}`;
const thumb = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const href = id => pages.find(p => p.id === id).path;

// Frames from the videos themselves (YouTube thumbnails)
const work = [
  // A clean frame from inside the recording (the thumbnail has its own text baked in)
  { id: '_V1SWbcVk5g', tag: 'Podcast', title: 'Mark Chapman on Locker Room Pulse', href: href('podcast'), img: 'https://i.ytimg.com/vi/_V1SWbcVk5g/maxres2.jpg' },
  { id: 'RvHx7rrYhKI', tag: 'Studio', title: 'Sports interview set', href: href('projects') },
  { id: 'h3gAJZu_2rs', tag: 'Highlights', title: 'Staines vs Farnborough', href: href('video'), wide: true }
];

// The front page recap: one line per area, each opening its own page
const recap = [
  ['podcast', 'Locker Room Pulse', 'Head Podcast Producer and co-host since November 2025. Over 20 weekly episodes with guests including Mark Chapman, Max Pitman, Alfie Essex and Adam Cash, plus 12 Instagram shorts.'],
  ['video', 'Highlights and interviews', 'Match highlights from Barnsley vs Man United U21 and Staines vs Farnborough rugby, a college interview with Chris Powell, and practice interviews from our studio set.'],
  ['radio', 'Youth Choice radio', 'Hosting shows since November 2025 and producing a daily show, building each running order in Zetta and editing the segues.'],
  ['projects', 'College projects', 'Highlight packages, radio sports bulletins, documentaries on the Baller League and Sutton United’s FA Cup history, a studio interview set, a Heinz campaign pitch and an essay on sports media.'],
  ['about', 'Experience and skills', 'Retail Assistant at Chessington Garden Centre since April 2025 and Employee of the Year 2025. Premiere Pro, Audition, Zetta and studio cameras.'],
  ['linkedin', 'On LinkedIn', 'Posts about producing the Mark Chapman and Alfie Essex episodes and presenting our Heinz project at The Shard.']
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

/* ---------- Shared pieces ---------- */

function PageHead({ eyebrow, title, children }) {
  return (
    <header className="page-head wrap">
      <p className="eyebrow">{eyebrow}</p>
      <div className="hero-grid">
        <h1>{title}</h1>
        {children && <div className="hero-side">{children}</div>}
      </div>
    </header>
  );
}

function Contact() {
  return (
    <section className="band band-end" id="contact" aria-labelledby="contact-title">
      <div className="wrap split">
        <div>
          <h2 id="contact-title">Get in touch</h2>
          <p className="band-lede">I'm looking for apprenticeships and entry-level roles in broadcast production and live events.</p>
        </div>
        <div className="split-side">
          <a className="btn btn-big" href={`mailto:${EMAIL}`}>{EMAIL}</a>
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
        <nav aria-label="Pages in the footer" className="foot-nav">
          {pages.map(p => <a key={p.id} href={p.path}>{p.label}</a>)}
        </nav>
      </footer>
    </section>
  );
}


// A YouTube video that plays in place: the thumbnail and a play button until pressed, then YouTube's
// privacy-enhanced player (no tracking cookies before play). Keeps the page fast with many videos.
function YouTubePlayer({ id, title, thumbSize = 'maxresdefault', big = false }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`yt${big ? ' yt-big' : ''}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" className="yt-btn" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          <img src={`https://i.ytimg.com/vi/${id}/${thumbSize}.jpg`} alt="" loading={big ? 'eager' : 'lazy'} decoding="async" width="1280" height="720" />
          <span className="yt-play" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5v14l11-7z" fill="currentColor" /></svg></span>
        </button>
      )}
    </div>
  );
}

/* Showreel: plays muted on arrival (unless reduced motion); the button restarts it with sound and controls */
function Showreel({ reduced }) {
  const ref = useRef(null);
  const [sound, setSound] = useState(false);
  useEffect(() => {
    const v = ref.current;
    v.muted = true; // React does not render the muted attribute on the server, and browsers only autoplay muted video
    if (!reduced) v.play().catch(() => {});
    else v.pause();
  }, [reduced]);
  const withSound = () => {
    const v = ref.current;
    v.muted = false; v.loop = false; v.currentTime = 0;
    v.play().catch(() => {});
    setSound(true);
  };
  return (
    <figure className="reel">
      <div className="reel-frame">
        <video ref={ref} poster="/video/showreel-poster.jpg" loop playsInline preload="metadata" controls={sound} aria-label="Oliver Harris showreel 2026">
          <source src="/video/showreel-720.mp4" type="video/mp4" media="(max-width: 900px)" />
          <source src="/video/showreel-1080.mp4" type="video/mp4" />
        </video>
        {!sound && (
          <button type="button" className="reel-btn" onClick={withSound}>
            <span className="reel-icon" aria-hidden="true"><svg width="14" height="16" viewBox="0 0 14 16"><path d="M0 0 L14 8 L0 16 Z" fill="currentColor" /></svg></span>
            Watch with sound
          </button>
        )}
      </div>
      <figcaption>Showreel 2026 · 53 seconds</figcaption>
    </figure>
  );
}

/* ---------- Pages ---------- */

function Home({ reduced }) {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        {/* Photo of Oliver at work: drop the real file in public/images/hero.jpg (served as /images/hero.jpg) */}
        <img className="hero-photo" src="/images/hero.jpg" alt="" width="1920" height="1080" fetchPriority="high" />
        <HeroArt />
        <div className="wrap hero-inner">
          <div className="hero-text">
          <p className="eyebrow">Sports podcast and radio producer · Epsom, Surrey</p>
          <h1 id="hero-title">Oliver Harris</h1>
          <p className="hero-intro">I produce, edit and present sports content. I run production for the Locker Room Pulse podcast and host and produce shows on Youth Choice radio. Open to apprenticeships in broadcast production and live events.</p>
          <p className="hero-guests">I've produced episodes with Mark Chapman, Alfie Essex, Max Pitman and Adam Cash.</p>
          <a className="btn" href={href('podcast')}>See my work</a>
          </div>
          <Showreel reduced={reduced} />
        </div>
      </section>

      <section className="section wrap" aria-labelledby="recap-title">
        <div className="split">
          <h2 id="recap-title">What I've<br />done</h2>
          <p className="split-side">A final-year Creative Media Production student with a Distinction in my Diploma. Most of my work is in sport. Each line below opens its own page.</p>
        </div>
        <ol className="recap">
          {recap.map(([id, title, text]) => (
            <li key={id}>
              <a href={href(id)}>
                <span className="recap-title">{title}</span>
                <span className="recap-text">{text}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap" aria-labelledby="work-title">
        <div className="split">
          <h2 id="work-title">Selected<br />work</h2>
          <p className="split-side">Podcast episodes, studio interviews and match highlights I produced, shot or edited.</p>
        </div>
        <div className="tiles">
          {work.map(w => (
            <a key={w.id} className={`tile${w.wide ? ' tile-wide' : ''}`} href={w.href}>
              <img src={w.img ?? thumb(w.id)} alt="" loading="lazy" decoding="async" width="1280" height="720" />
              <span className="tile-tag">{w.tag}</span>
              <span className="tile-title">{w.title}{'\u00a0'}<Arrow /></span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function Podcast({ reduced }) {
  const shortsRef = useRef(null);
  const scrollShorts = dir => shortsRef.current?.scrollBy({ left: dir * 632, behavior: reduced ? 'auto' : 'smooth' });
  return (
    <>
      <PageHead eyebrow="Head Podcast Producer · since November 2025" title="Locker Room Pulse">
        <p>A weekly student-run sports podcast covering football, basketball, tennis, boxing and more. I'm Head Podcast Producer and a co-host, and I've produced over 20 episodes, one every week.</p>
        <a className="btn" href="https://www.youtube.com/@LockerRoomPulse">Watch on YouTube</a>
      </PageHead>

      <section className="band" aria-labelledby="role-title">
        <div className="wrap split">
          <div>
            <h2 id="role-title">My role on<br />the show</h2>
            <p className="band-lede">Everything that happens between booking a guest and the episode going live.</p>
          </div>
          <ol className="duties">
            {duties.map(([t, d]) => (
              <li key={t}>
                <details>
                  <summary><span className="t">{t}</span><span className="plus" aria-hidden="true" /></summary>
                  <p>{d}</p>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap" id="episodes" aria-labelledby="episodes-title">
        <div className="split">
          <h2 id="episodes-title">Watch the<br />episodes</h2>
          <div className="split-side">
            <p>Every episode and extra from the Locker Room Pulse YouTube channel, newest first. Press play to watch here on the page.</p>
            <div className="actions">
              <a className="btn" href={CHANNEL}>Subscribe on YouTube</a>
              <a className="btn btn-ghost" href={INSTAGRAM_PROFILE}>Follow on Instagram</a>
            </div>
          </div>
        </div>
        <ul className="videos">
          {episodes.map(v => (
            <li key={v.id}>
              <YouTubePlayer id={v.id} title={v.title} />
              <p className="video-meta">
                <span>{v.ep ? `Episode ${v.ep}` : v.kind ?? 'Episode'}</span>
                <span>{v.mins >= 60 ? `${Math.floor(v.mins / 60)} hr ${v.mins % 60} min` : `${v.mins} min`}</span>
              </p>
              <h3 className="video-title">{v.title}</h3>
            </li>
          ))}
        </ul>

        <div className="shorts">
          <div className="shorts-head">
            <div>
              <h2 className="h3">Shorts I've edited</h2>
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
          <a className="link" href={INSTAGRAM_PROFILE}>See all on Instagram</a>
        </div>
      </section>
    </>
  );
}

function Radio() {
  return (
    <>
      <PageHead eyebrow="Host and producer · since November 2025" title="Youth Choice radio">
        <p>I've hosted shows on Youth Choice college radio since November 2025, and I produce a daily show.</p>
      </PageHead>
      <section className="section section-tight wrap" aria-labelledby="method-title">
        <div className="split">
          <h2 id="method-title">How I produce<br />a show</h2>
          <div className="split-side">
            <ol className="steps">
              <li><span className="t">Running order</span><span className="d">For each show I build the running order in Zetta, the playout system used by professional radio stations.</span></li>
              <li><span className="t">Segues</span><span className="d">I edit the segues so music fades cleanly in and out of each link, keeping the show tight and on time.</span></li>
            </ol>
          </div>
        </div>
      </section>
      <section className="section wrap" aria-labelledby="show-title">
        <div className="split">
          <div>
            <h2 id="show-title">Listen to<br />a show</h2>
            <p className="side-note">Ollie and Freddie, 10 November 2026. The whole show, then each link on its own. A link is the talk we do between songs.</p>
          </div>
          <div className="split-side">
            <ol className="list">
              {shows.map(([id, label]) => (
                <li key={id}><a href={`https://open.spotify.com/episode/${id}`}><span className="list-title">{label}</span><span className="list-kind">Spotify</span></a></li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

function Video() {
  return (
    <>
      <PageHead eyebrow="Editing and production" title="Highlights and interviews">
        <p>Match highlight packages I edited and interviews I produced. Press play to watch here on the page.</p>
      </PageHead>
      <section className="section section-tight wrap" id="highlights" aria-labelledby="highlights-title">
        <div className="split split-stack">
          <h2 id="highlights-title">Highlights</h2>
          <p className="split-side">College highlight packages: Barnsley vs Man United U21 in the EFL Trophy, my first highlight edit, and Staines vs Farnborough rugby, cut from raw match footage and a timecode sheet.</p>
        </div>
        <ul className="videos videos-2">
          {highlights.map(v => (
            <li key={v.id}>
              <YouTubePlayer id={v.id} title={v.title} thumbSize={v.thumb} big />
              <h3 className="video-title">{v.title}</h3>
            </li>
          ))}
        </ul>
      </section>
      <section className="section wrap" id="interviews" aria-labelledby="interviews-title">
        <div className="split split-stack">
          <h2 id="interviews-title">Interviews</h2>
          <p className="split-side">A two-part college interview with Chris Powell on his playing career and his coaching career, and practice interviews from our studio set.</p>
        </div>
        <ul className="videos videos-feature">
          {interviews.map((v, i) => (
            <li key={v.id}>
              <YouTubePlayer id={v.id} title={v.title} big={i === 0} />
              <h3 className="video-title">{v.title}</h3>
            </li>
          ))}
        </ul>

        <div className="practice">
          <h3 className="practice-title">Practice interviews</h3>
          <p className="practice-note">Filmed at college while I practised setting up and running interviews, starting with the Global interview on a single camera and moving on to two cameras on our own studio set. They were made for practice, so the picture and sound quality is lower than my finished work.</p>
          <ul className="videos">
            {practiceInterviews.map(v => (
              <li key={v.id}>
                <YouTubePlayer id={v.id} title={v.title} />
                <p className="video-meta"><span>Practice</span><span>Studio set</span></p>
                <h4 className="video-title">{v.title}</h4>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Projects() {
  return (
    <>
      <PageHead eyebrow="Creative Media Production" title="College projects">
        <p>Every project from my Creative Media Production course, from my first highlight packages to my Final Major Project.</p>
        <a className="btn btn-ghost" href="https://oliverharris6.wordpress.com/">See all coursework</a>
      </PageHead>
      <section className="section section-tight wrap" aria-label="Projects">
        <div className="cards">
          {projects.map(pr => (
            <article className="card" key={pr.title}>
              <p className="card-tag">{pr.unit}</p>
              <h2 className="h3">{pr.title}</h2>
              <p>{pr.text}</p>
              {pr.quote && <blockquote className="card-quote"><p>{pr.quote}</p></blockquote>}
              {pr.links.length > 0 && (
                <ul className="project-links">
                  {pr.links.map(([label, url]) => <li key={url}><a className="link" href={url}>{label}</a></li>)}
                </ul>
              )}
              {pr.wp && <a className="card-more" href={pr.wp}>Full write-up on my coursework site</a>}
            </article>
          ))}
        </div>
      </section>
      <section className="section wrap quote-section" aria-label="From my essay">
        <p className="eyebrow">From my Unit 12 essay</p>
        <blockquote className="quote"><p>“The internet has democratised making media more than it has democratised reaching people.”</p></blockquote>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <PageHead eyebrow="Creative Media Production · final year" title="About me">
        <p>I'm a final-year Creative Media Production student with a Distinction in my Creative Media Production Diploma. Most of my work is in sport: podcast episodes, interviews, highlight packages, radio shows and documentaries.</p>
      </PageHead>
      <section className="section section-tight wrap" aria-labelledby="approach-title">
        <div className="split">
          <h2 id="approach-title">How I<br />work</h2>
          <div className="split-side about">
            <p className="lead">I enjoy the whole production process, from planning a shoot and writing risk assessments to recording, editing, designing the thumbnail and getting the finished piece in front of an audience.</p>
            <p>I'm now looking for an apprenticeship or entry-level role where I can build a career in broadcast production and live events.</p>
            <dl className="rows">
              <div><dt>Podcast production</dt><dd>Recording, editing, mixing and publishing a weekly sports podcast</dd></div>
              <div><dt>Live radio</dt><dd>Hosting since November 2025 and producing a daily show</dd></div>
              <div><dt>Video and studio</dt><dd>Multi-camera shoots, set planning, lighting and editing</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="skills-title">
        <div className="split">
          <h2 id="skills-title">Skills<br />and kit</h2>
          <div className="split-side">
            <p>The software and equipment I use regularly.</p>
            <dl className="rows">
              {skills.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="exp-title">
        <div className="split">
          <div>
            <h2 id="exp-title">Work<br />experience</h2>
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
    </>
  );
}

function LinkedIn() {
  return (
    <>
      <PageHead eyebrow="Posts and updates" title="LinkedIn">
        <p>Posts about producing The Locker Room Pulse and presenting our Heinz project, with the clips and photos.</p>
        <a className="btn btn-ghost" href={LINKEDIN_PROFILE}>Follow me on LinkedIn</a>
      </PageHead>
      <section className="section section-tight wrap" aria-label="LinkedIn posts">
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
    </>
  );
}

const views = { home: Home, podcast: Podcast, video: Video, radio: Radio, projects: Projects, about: About, linkedin: LinkedIn };

/* ---------- Shell ---------- */

export default function App({ path }) {
  const page = pageFor(path);
  const View = views[page.id];
  const reduced = useReducedMotion();
  const progressRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Reading progress line under the menu
  useGSAP(() => {
    gsap.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: reduced ? true : 0.3 } });
  }, { dependencies: [reduced], revertOnUpdate: true });

  // Focus that moves into a LinkedIn or Instagram embed stays inside their frame, where no focus style
  // of ours can reach: mark the card around the focused frame so keyboard users can see where they are
  useEffect(() => {
    const mark = () => {
      document.querySelectorAll('.embed-focus').forEach(el => el.classList.remove('embed-focus'));
      const el = document.activeElement;
      if (el?.tagName === 'IFRAME') el.parentElement.classList.add('embed-focus');
    };
    const onBlur = () => setTimeout(mark);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', mark);
    document.addEventListener('focusin', mark);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', mark);
      document.removeEventListener('focusin', mark);
    };
  }, []);

  const toggleMenu = () => {
    const d = menuRef.current;
    if (d.open) d.close(); else d.showModal();
    setMenuOpen(d.open);
  };
  const menuLinks = cls => pages.map(p => (
    <li key={p.id}><a className={cls} href={p.path} aria-current={p.id === page.id ? 'page' : undefined}>{p.label}</a></li>
  ));

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className="nav">
        <div className="wrap nav-inner">
          <a className="brand" href="/">Oliver Harris</a>
          <nav aria-label="Main">
            <ul className="nav-links">{menuLinks()}</ul>
          </nav>
          <div className="nav-end">
            <a className="btn btn-sm" href="#contact">Get in touch</a>
            <button className="menu-btn" type="button" aria-expanded={menuOpen} aria-controls="menu" onClick={toggleMenu}>Menu</button>
          </div>
        </div>
        <div className="progress" ref={progressRef} aria-hidden="true" />
      </header>

      <dialog className="menu" id="menu" ref={menuRef} aria-label="Menu" onClose={() => setMenuOpen(false)}>
        <div className="wrap menu-head">
          <a className="brand" href="/">Oliver Harris</a>
          <button className="menu-btn" type="button" onClick={toggleMenu}>Close</button>
        </div>
        <nav className="wrap" aria-label="Pages">
          <ul className="menu-links">{menuLinks('menu-link')}</ul>
        </nav>
        <div className="wrap menu-foot">
          <a className="btn" href={`mailto:${EMAIL}`}>Email me</a>
        </div>
      </dialog>

      <main id="main">
        <View reduced={reduced} />
      </main>
      <Contact />
    </>
  );
}
