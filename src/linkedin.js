// LinkedIn posts shown in the "On LinkedIn" section, as official LinkedIn embeds.
// The photos and videos play from LinkedIn itself, so nothing is copied onto this site.
//
// To add a new post: on LinkedIn open the post's "…" menu > "Embed this post" (or copy its link).
// The long number in the link ("activity-7419411139567972352" or "urn:li:activity:7419411139567972352") is the id.
// Heights are the embed's height in pixels (collapsed text) at about 540px wide (desktop) and 350px wide (phone),
// so the frame fits the post without an inner scrollbar.
//
// column: 0 = left column, 1 = right column on desktop. On phones the posts stack in this file's order.

export const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/oliver-harris-901211273/';

export const linkedinPosts = [
  { id: '7419411139567972352', title: 'Weekly Premier League Predictions clips I edited for The Locker Room Pulse', desktop: 1180, phone: 950, column: 0 },
  { id: '7407405267425898497', title: 'Producing the Mark Chapman and Alfie Essex episodes of The Locker Room Pulse', desktop: 870, phone: 870, column: 0 },
  { id: '7437526503325626368', title: 'Senniya Jacob: presenting our Heinz project at The Shard', desktop: 870, phone: 870, column: 1 },
  { id: '7397675009688825857', title: 'Brody Martin: the first three episodes of The Locker Room Pulse', desktop: 910, phone: 880, column: 1 }
];
