// College projects for the Projects page, taken from Oliver's coursework site (oliverharris6.wordpress.com).
// Every fact here is from that site; titles of audio and video are their Spotify/YouTube titles.
// links: [label, url]. `wp` is the project's page on the coursework site.

const WP = 'https://oliverharris6.wordpress.com';
const SP = id => `https://open.spotify.com/episode/${id}`;
const YT = id => `https://www.youtube.com/watch?v=${id}`;

export const projects = [
  {
    unit: 'Unit 1 and 2',
    title: 'Highlight packages',
    text: 'My first video and audio highlight packages, edited in Premiere Pro and Audition. I cut Barnsley vs Man United U21 in the EFL Trophy, including a slow-motion version for the goals, built audio packages for Newcastle vs Villa and Newcastle vs Barcelona, and recorded my own commentary over a Real Madrid vs Atlético Madrid package.',
    links: [
      ['Barnsley vs Man United U21 (V1)', YT('4424B82Fu0Y')],
      ['Barnsley vs Man United U21 (slow motion)', YT('6TqCgRl2C2o')],
      ['Newcastle vs Villa (audio)', SP('3XR2fZZz4ToPwy8QpE9WTf')],
      ['Newcastle vs Barcelona (audio)', SP('5A47k169SKG63MQ4MoHZ8S')]
    ],
    wp: `${WP}/unit-1-2/`
  },
  {
    unit: 'Unit 3 and 4',
    title: 'Heinz Flavour Tour pitch',
    text: 'Working in a five-person creative agency, we pitched a campaign for the Heinz flavoured beans range: a custom-wrapped tour bus with The Fellas podcast, live streams, a cook-off with fans and teaser billboards before each stop. I made the pitch presentation, and we presented the project at The Shard.',
    links: [['View the presentation', 'https://www.canva.com/design/DAHCPrCYfr4/MUXgXCzDCj74b65YnE1EDw/view']],
    wp: `${WP}/branded-content/`
  },
  {
    unit: 'Unit 5',
    title: 'Sports bulletins and The Rise of the Baller League',
    text: 'Radio-style sports bulletins written with IRN Net Newsroom and recorded and edited in Audition, then The Rise of the Baller League, an audio documentary I developed over four versions using peer feedback, music and sound effects.',
    links: [
      ['Champions League overview', SP('1lPRZdJddFX5FiZiext6SP')],
      ['Weekend overview', SP('6s50z7SWHlLaeWYwcw11cw')],
      ['Sport overview 2', SP('1dI3LyDNqvmK6UtGDUVJIf')],
      ['The Rise of the Baller League 4.0', SP('1Z5DMGo3WFZyTPFMiYJuH8')],
      ['Earlier versions: 1.0', SP('3d7WR3eLSYOjnHcenM6zCs')],
      ['2.0', SP('1Z2hEZb9bMlVstVZ3heoBr')],
      ['3.0', SP('4FN6mFQXkNQFKNyNRGwajP')]
    ],
    wp: `${WP}/unit-5/`
  },
  {
    unit: 'Unit 6',
    title: 'Building a sports interview set',
    text: 'I started with a single-camera interview aimed at 14 to 18 year olds at Global Academy, then our group planned and dressed our own two-camera studio set. My role was scene selection. I wrote the risk assessments, chose the kit (two Canon EOS R50s, a Pixapro light, an LED light bar, two wash lights and clip-on microphones) and edited our interview and other groups’ interviews.',
    links: [
      ['Watch the interviews', '/video/#interviews'],
      ['Finley and Josh, final interview', YT('RvHx7rrYhKI')]
    ],
    wp: `${WP}/unit-6-creating-our-own-set/`
  },
  {
    unit: 'Unit 8, Final Major Project',
    title: 'The History of Sutton United',
    text: 'An audio documentary on Sutton United’s FA Cup history, including the 1989 win over cup holders Coventry City. I wrote the BIF, project proposal and pitch deck, researched the story, scripted and recorded the voiceover, and used a feedback form from my class to refine the edit. I planned 8 to 10 minutes but cut it to just under 3 to keep listeners hooked.',
    links: [
      ['Listen on Spotify', SP('70miIYJU1hjJrxphGiWMu8')],
      ['Pitch deck', 'https://www.canva.com/design/DAHExpWPDVo/EekHC89jIDTunSEuA0jndg/view']
    ],
    wp: `${WP}/fmp/`
  },
  {
    unit: 'Unit 10',
    title: 'Engaging with an audience',
    text: 'Audience research and platform plans for two projects: the Heinz Bean Bus, aimed at 18 to 34 year olds through social media influencers, and my Sutton United documentary, aimed at 14 to 30 year olds who follow non-league football on Spotify and YouTube. Each has demographics and an audience persona.',
    links: [],
    wp: `${WP}/unit-10/`
  },
  {
    unit: 'Unit 12, Specialist Study',
    title: 'Who tells sports stories now?',
    text: 'An essay on whether the internet has changed who controls sports media, across podcasts, YouTube, TikTok and journalism.',
    quote: '“The internet has democratised making media more than it has democratised reaching people.”',
    links: [['Read the essay', `${WP}/unit-12-specialist-study/`]],
    wp: null
  },
  {
    unit: 'Year 13',
    title: 'Broadcast editing briefs and radio',
    text: 'A rugby highlights package cut from raw match footage and a timecode sheet, keeping a strict order from kick-off to full time; an audio edit of an eleven-minute TNT Sports interview with Joe Cole and Owen Hargreaves; and a daily sports radio show run in Zetta.',
    links: [
      ['Staines vs Farnborough rugby', '/video/#highlights'],
      ['Joe Cole and Owen Hargreaves (audio)', SP('6ru8taxm39xIavFMeKYJHg')],
      ['Radio shows', '/radio/']
    ],
    wp: `${WP}/year-13-weekly-logs/`
  }
];
