// Every page of the site: its address, menu label and the title/description used in <head>.
// scripts/prerender.mjs writes one dist/<path>/index.html per entry.
export const SITE = 'https://oliverharrismedia.co.uk';

export const pages = [
  { id: 'home', path: '/', label: 'Home', title: 'Oliver Harris – Sports Production Portfolio', description: 'Oliver Harris, sports podcast and radio producer. Head Podcast Producer at Locker Room Pulse and host and producer on Youth Choice radio.' },
  { id: 'podcast', path: '/podcast/', label: 'Podcast', title: 'Locker Room Pulse podcast – Oliver Harris', description: 'Head Podcast Producer at Locker Room Pulse: over 20 weekly episodes, guest interviews, highlight edits and 12 Instagram shorts.' },
  { id: 'radio', path: '/radio/', label: 'Radio', title: 'Youth Choice radio – Oliver Harris', description: 'Hosting and producing shows on Youth Choice college radio since November 2025, with running orders built in Zetta.' },
  { id: 'projects', path: '/projects/', label: 'Projects', title: 'College projects – Oliver Harris', description: 'Creative Media Production projects: a Sutton United FA Cup documentary, an essay on sports media, a studio interview set and a Heinz pitch.' },
  { id: 'about', path: '/about/', label: 'About', title: 'About Oliver Harris – skills and experience', description: 'About Oliver Harris: Creative Media Production student, skills and kit, and work experience at Chessington Garden Centre.' },
  { id: 'posts', path: '/posts/', label: 'Posts', title: 'LinkedIn posts – Oliver Harris', description: 'LinkedIn posts about producing Locker Room Pulse and presenting a Heinz project at The Shard.' }
];

export const pageFor = path => pages.find(p => p.path === path || p.path === `${path}/`) ?? pages[0];
