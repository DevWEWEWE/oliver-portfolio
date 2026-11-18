// YouTube videos shown on the site. Titles and lengths come from YouTube (emoji removed).
// Each plays in place on the page when clicked (see YouTubePlayer in App.jsx).
//
// To add a Locker Room Pulse episode: copy the id after watch?v= in its link and add a line at the TOP of
// `episodes` (newest first). `ep` is the episode number, or leave it out for extras such as vlogs.
// The thumbnail is taken from YouTube automatically.

export const CHANNEL = 'https://www.youtube.com/@LockerRoomPulse';

export const episodes = [
  { id: 'RvaQWFKSnho', ep: 20, title: 'World Cup Review, Early Prem Predictions and Non-League Fixtures Release', mins: 36 },
  { id: 'xqOqZ2fvhXI', ep: 19, title: 'The World Cup Dream, England’s Route to Glory and The Football Content Awards', mins: 32 },
  { id: 'lCdJ3M9LT9A', ep: 18, title: 'Who Wins The World Cup? All Tournament Predictions', mins: 32 },
  { id: 'HpaejaZI6uo', ep: 17, title: 'Premier League End of Season Awards: Arsenal Win the Title and Wealdstone’s Wembley Heartbreak', mins: 38 },
  { id: 'WW3malnR3OY', ep: 16, title: 'World Cup Countdown and Arsenal’s Final Push, plus Hornchurch Promoted and Wealdstone’s Final', mins: 47 },
  { id: 'ZbZLVGG8u3o', ep: 15, title: 'It’s Now or Never for Hornchurch: Battle of Britain Preview', mins: 34 },
  { id: 'NyM42_Nbzb0', ep: 14, title: 'Who Wins the Prem, Top of Table Clash in the National League and The Cost of Football', mins: 35 },
  { id: 'PRCIq9iWFW0', ep: 13, title: 'Football, Darts, Grand National and Golf: The Top 5 Race and Rory McIlroy Winning the Masters', mins: 30 },
  { id: '369g3hn0v1o', ep: 12, title: 'Who Wins the Champions League? AFCON and Premier League Preview', mins: 34 },
  { id: '45X3mXdS-jU', title: 'Culture Day World Cup Quiz', mins: 6, kind: 'Extra' },
  { id: '8QLY79-HM9g', title: 'Visit to the Heinz Beans Office at The Shard', mins: 8, kind: 'Vlog' },
  { id: 'fGrmswFAA3k', ep: 11, title: 'Max on the Football Cards, Horse Racing, Premier League and Non-League Culture', mins: 44 },
  { id: 'TT3l9WHgzPM', title: 'The Icon Architect: Adam Cash on Sibling Rivalry, Sporting Success and Shaping the Future of Football', mins: 32, kind: 'Guest' },
  { id: 'N6uMazdPPZ0', title: 'Thomas Frank Sacked, Best Goalkeeper in the World, plus Champions League and Darts Preview', mins: 28 },
  { id: 'f6hNgja8DMQ', title: 'Finley’s Birthday, YOU Festival, Nando’s and TOCA Social', mins: 12, kind: 'Vlog' },
  { id: '9SNOh-7Z4M4', ep: 8, title: 'Arsenal Striker Situation, Champions League Returns and Premier League Reaction', mins: 42 },
  { id: 'tWwjL9e7uQc', title: 'Football Overload: Manchester Derby, FA Cup Shocks and the Champions League Is Back', mins: 39 },
  { id: '3iUdxRvkgPM', ep: 6, title: 'Littler Retains World Title, 2026 Premier League Reveal and Sacking Drama', mins: 34 },
  { id: '_V1SWbcVk5g', title: 'Mark Chapman on His TV Career, Manchester United and Inside the Sports TV Industry', mins: 30, kind: 'Guest' },
  { id: 'qigHbzCg0Cg', ep: 4, title: 'Alfie Essex: Playing Career, Coaching Career, Brentford and His Special AC Milan Trip', mins: 55 },
  { id: '_MRNc6elmCs', ep: 3, title: 'International Break Review, Premier League Predictions, Darts and Boxing Talk', mins: 67 },
  { id: '0RaKgLxKDw0', ep: 2, title: 'Weekend Football Breakdown, Huge Boxing Preview, Darts Action and Ronaldo’s Last World Cup?', mins: 49 },
  { id: '9pdkn9ZR-Rw', ep: 1, title: 'Inside Football’s New Era: Max Pitman’s Story, Baller League, Kings League and West Ham Roots', mins: 42 }
];

// Match highlights Oliver edited
export const highlights = [
  { id: '6TqCgRl2C2o', title: 'Barnsley vs Man United, EFL', thumb: 'hqdefault' },
  { id: 'h3gAJZu_2rs', title: 'Staines vs Farnborough rugby' }
];

// Interviews Oliver produced
export const interviews = [
  { id: 'KlJEv28Dh5E', title: 'Global interview' },
  { id: 'oGT1sZjNrgM', title: 'Chris Powell, part 1: playing career' },
  { id: 'duiCQ1NCDNY', title: 'Chris Powell, part 2: coaching career' }
];
