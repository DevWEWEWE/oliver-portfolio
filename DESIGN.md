# Design: Oliver Harris portfolio

## Current style (Nov 2026): broadcast studio, option A in studio blue

Oliver asked for a site that looks like a real sports podcast and radio producer's, not an AI template. He picked
option A of two (A: studio near-black, B: off-white paper).

- Ground `#0F0F10`, raised surfaces and bands `#18181A`, text `#F3F1EC`, muted `#A6A39C`, hairlines at 12%.
- One studio blue (Oliver chose it over the red, which read as orange): `#1F6FEB` for buttons, the award, the play buttons and the progress line (white text on it),
  hover `#1959C2`, blue text on dark `#6CA8FF`. The current page in the menu has a small blue dot.
- Headings: Bricolage Grotesque 600 (Google Fonts), sentence case. Body: Helvetica Neue / Arial.
- Flat: no glows, no blur, no glass, no gradients except the photo scrim. Buttons are 4px radius blocks; cards 6px.
- Home hero: full-width photo of Oliver at work (`public/images/hero.jpg`, placeholder until he adds it), a dark
  scrim from the left, and a line drawing of a broadcast camera and desk mic (`src/Backdrop.jsx`) that draws in on load, with blue pulses running along signal lines through it. Reduced motion: still drawing.
- No row numbers. Arrows only on the Selected work cards and the external contact links.

The blue b3xgraphics, Bracken House and running-order designs below are earlier versions.

## Earlier style: blue animated theme after b3xgraphics.com

Oliver's favourite things about b3xgraphics.com were the blue background and how it animates. Recreated in our
own code (no code, art or copy taken): a fixed backdrop of deep navy `#02132C` with electric-blue glows that
breathe (CSS scale and opacity, 11 to 14 s), and a line drawing that etches in on load and then carries sparks.
Their drawing is a football tactics board; ours is a camera plan for a sports broadcast (pitch, three camera
positions with fields of view, ruler), from Oliver's multi-camera and floor-plan work. Content sits on frosted
glass (radius 22 to 28, white edge at 14%), headings are Archivo 900 in capitals, buttons are cyan `#3FB3F5` with
navy text or navy pills with a cyan edge. Reduced motion: the finished drawing, nothing moving.

The Bracken House and running-order designs below are earlier versions.

## Earlier style: Bracken House reference

Oliver asked for the look of the "Bracken House" portfolio template in Kombai's gallery
(kombai.com/gallery/inspirations/portfolio-website-web-8). Style only: its words and brand are not used.

- Canvas `#F4F2ED`, ink `#171915`, muted `#63665E`, rules `#CBC9C1`, process tiles `#EBE8E1`, dark bands `#171915`.
- Accent `#D03C1A` on pill buttons, the award panel and the reading progress line. The reference's `#E94924`
  gives 3.7:1 with its button text; `#D03C1A` gives 4.6:1.
- Type: Helvetica Neue stack, bold headlines at about -0.06em tracking and 0.86 to 0.92 line height; 11 to 12px
  uppercase labels; 16px body.
- Structure: nav bar; hero headline left, description and pill right; four true metrics between rules; "Selected
  work" band of picture tiles (YouTube frames from his own videos, 2 + 1); split sections with the heading left.
- Hover: pills turn ink and lift 2px; nav words draw an underline; list rows step right and turn orange; tiles zoom
  1.03; arrows travel. Reduced motion turns all of it off.

The running-order design below was the previous version (kept for reference; replaced at Oliver's request).

## Brief

- Subject: Oliver Harris, sports podcast and radio producer, final-year Creative Media Production student.
- Audience: recruiters for broadcast production and live events apprenticeships (BBC Junior Production Coordinator among them).
- Job: get him an interview. Show real work fast, look like a producer, not a template.
- Assets: real links only (YouTube, Spotify, Instagram reels, LinkedIn posts, coursework). No photos yet.
- Constraint: keep every feature of the previous site (hero, at a glance, about, podcast duties and episodes, shorts row, radio shows, projects, LinkedIn, skills, work and award, contact, reading progress).

## Concepts considered

| | Idea | Anchor | Signature | O / F / Fe / P |
|---|---|---|---|---|
| A. Material | The site is his running order: every section is an item, an on-air tally moves down the list and stamps the time you reached each item, like a studio as-run log | he builds running orders in Zetta and produces live shows; a production coordinator lives in rundowns | rail with tally and as-run stamps, live on-air clock | 4 / 5 / 5 / 2 |
| B. Formal | An edit timeline: sections are clips on tracks with a playhead | he edits in Premiere | scrubbing playhead across tracks | 3 / 4 / 3 / 3 |
| C. Name | Locker Room Pulse waveform drives the page | the podcast's name | waveform reacting to scroll | 2 / 2 / 4 / 4 |

Pick A: it fits the job he is applying for, every decision falls out of it, and it is honest (the clock and stamps are real times).
From B, the 404 borrows "item not found in the running order".

## Concept card

```
Idea:        Oliver's portfolio is a broadcast running order you move down item by item.
Metaphor:    a producer's rundown sheet in a studio gallery.
Signature:   the running order rail: a red on-air tally marks the current item, items you have passed
             get stamped with the real elapsed time you reached them (as-run log), clock ticks in the bar.
Emotion:     a live studio a few minutes before air: calm, precise, on time.
Motion verb: cue and take. Hover cues an item (tally bar slides in, text steps right); things take with a
             short hard wipe, never a float.
Screenshot:  the gallery-dark hero with the name set like an on-screen caption, beside the running order.
```

## System

Palette (from a studio gallery and a paper rundown):

| Role | Hex | Use |
|---|---|---|
| ground | `#FFFFFF` | rundown paper |
| ink | `#0D1117` | text, rules |
| muted | `#555D6B` | secondary text (6.6:1 on ground) |
| line | `#E2E4E8` | hairlines between rundown rows |
| field | `#0F1A2E` | gallery dark: hero and contact finale (his navy, deepened) |
| tally | `#D92D20` | on-air light only: tally, current item, primary hover fill. Never body text |

Type:
- Archivo (Google, variable width and weight). Display: width 75, weight 800, uppercase for the name and
  the finale, like a broadcast caption. Headings: width 90, weight 700, sentence case. Text: width 100, weight 400.
- IBM Plex Mono 400/500 only for real data: item numbers, timecodes, show numbers. Never for decoration.
- Scale: mega clamp(3.6rem, 1rem + 11vw, 11rem); xl clamp(2.2rem, 1.2rem + 3.6vw, 4.5rem);
  l clamp(1.5rem, 1.15rem + 1.3vw, 2.25rem); body 17px / 1.55.

Grid: 12 columns, gutter clamp(16px, 2.2vw, 32px). From 1100px the running order rail takes a fixed
260px column on the left; content hangs from two lines (the slug number column and the text column).
Below 1100px the rail becomes a "Running order" button in the top bar that opens the same list full screen.

Shape: square corners everywhere (a rundown is a ruled sheet). Third-party embeds keep their own frames.
This breaks the "zero radius plus hairlines" tell on purpose: the rundown is the concept.

Motion: one ease, cubic-bezier(.16, 1, .3, 1). Hover 180ms, takes 450 to 700ms. Hero name lines take in once.
Section slugs take (the rule wipes in) the first time they go on air. No fade-up on content: content is
always visible. Idle motion: the on-air clock ticks every second (real elapsed time). Reduced motion: no
wipes, no smooth scroll, clock still counts (it is information, not decoration).

## Composition

```
HERO (field)      [ OLIVER          ]   [ at a glance: rundown 4 rows ]
                  [ HARRIS          ]
                  role line, intro, Take / Email
RAIL | 01 About          statement paragraph, 3 strengths as ruled rows
RAIL | 02 Locker Room    crew sheet (duty | what I do), episode index list, shorts strip
RAIL | 03 Radio          Zetta method left, playout log (Show 01..08) right
RAIL | 04 Projects       stacked project rows: unit | title + text + links
RAIL | 05 LinkedIn       two columns of embeds
RAIL | 06 Skills         4 ruled rows: area | tools
RAIL | 07 Work           job (left 7 cols) + award fact block (right)
CONTACT (field)   giant email, link row, footer corners
```

## Genericness test

- Gradient aurora hero, glowing spotlight cards, pill status badge, icon-in-a-soft-square cards, rotating
  role text and blur-in name: all read as generated. Removed.
- Plus Jakarta Sans and rounded SaaS cards replaced by a condensed caption face and ruled rundown rows.
- Section numbers are kept only because a running order is a real sequence.

## Decisions after QA

- No hero intro: the first paint is the finished frame (name, role, glance). Two critics marked the name reveal
  down (h1 blank in early frames). The "take" now lives in the section rules and the on-air rail.
- Idle state: the on-air clock ticks every second and the as-run stamps change as you read. Nothing else moves at
  rest, on purpose (a studio gallery is still until something goes to air).
- Embeds stay live (LinkedIn, Instagram) because the owner asked for the real photos and videos; their own cookie
  notices and grey panels are outside our control. A striped "Loading" label sits behind each frame.
- Titles come from YouTube and Spotify oEmbed (real titles). Radio "101126" read as 10 November 2026.
- Outside critic (fresh agent, screenshots only): 6.9 and 6.9. Biggest gains left: real photographs (headshot,
  studio, behind the scenes) and short case studies for the projects.
