// Every page of the site: its address, menu label and the title/description used in <head>.
// scripts/prerender.mjs writes one dist/<path>/index.html per entry.
export const SITE = 'https://oliverharrismedia.co.uk';

export const pages = [
  { id: 'home', path: '/', label: 'Home', title: 'Oliver Harris – Sports Production Portfolio', description: 'Oliver Harris, sports podcast and radio producer. Head Podcast Producer at Locker Room Pulse and host and producer on Youth Choice radio.' },
  { id: 'podcast', path: '/podcast/', label: 'Podcast', title: 'Locker Room Pulse podcast – Oliver Harris', description: 'Head Podcast Producer at Locker Room Pulse: watch every episode, from Mark Chapman and Alfie Essex to the World Cup specials, plus 12 Instagram shorts.' },
  { id: 'video', path: '/video/', label: 'Video', title: 'Highlights and interviews – Oliver Harris', description: 'College highlight packages from Barnsley vs Man United U21 and Staines vs Farnborough rugby, a college interview with Chris Powell and practice interviews, edited by Oliver Harris.' },
  { id: 'radio', path: '/radio/', label: 'Radio', title: 'Youth Choice radio – Oliver Harris', description: 'Hosting and producing shows on Youth Choice college radio since November 2025, with running orders built in Zetta.' },
  { id: 'projects', path: '/projects/', label: 'Projects', title: 'College projects – Oliver Harris', description: 'Every Creative Media Production project: highlight packages, sports bulletins, the Baller League and Sutton United documentaries, a studio interview set, a Heinz pitch and a sports media essay.' },
  { id: 'about', path: '/about/', label: 'About', title: 'About Oliver Harris – skills and experience', description: 'About Oliver Harris: Creative Media Production student, skills and kit, and work experience at Chessington Garden Centre.' },
  { id: 'linkedin', path: '/linkedin/', label: 'LinkedIn', title: 'LinkedIn posts – Oliver Harris', description: 'LinkedIn posts about producing Locker Room Pulse and presenting a Heinz project at The Shard.' }
];

export const pageFor = path => pages.find(p => p.path === path || p.path === `${path}/`) ?? pages[0];
