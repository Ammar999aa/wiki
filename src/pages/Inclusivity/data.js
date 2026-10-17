// Data for the Inclusivity page's two figures.

// The countries the page text names ("…including Saudi Arabia, Peru, Colombia,
// India, the United States, Kazakhstan, China, Türkiye, and Singapore"), in
// that order, with an approximate centre for the map marker. These are also
// the countries listed on the Members page (Roster.jsx `countryCode`s).
// Saudi Arabia's marker sits on KAUST (Thuwal), where the team works.
export const countries = [
  { name: "Saudi Arabia", lon: 39.1, lat: 22.3, home: true },
  { name: "Peru", lon: -75.0, lat: -9.2 },
  { name: "Colombia", lon: -74.3, lat: 4.6 },
  { name: "India", lon: 78.9, lat: 22.0 },
  { name: "United States", lon: -98.6, lat: 39.8 },
  { name: "Kazakhstan", lon: 66.9, lat: 48.0 },
  { name: "China", lon: 104.2, lat: 35.9 },
  { name: "Türkiye", lon: 35.2, lat: 39.0 },
  { name: "Singapore", lon: 103.8, lat: 1.35 },
];

// "Bringing different disciplines into synthetic biology": team members in
// their own words, as given in the page draft's design note. Photos are the
// Members page portraits.
const ROSTER_CDN = "https://static.igem.wiki/teams/6341/wiki/roster";

export const voices = [
  { name: "Ammar Almarzooq", photo: `${ROSTER_CDN}/ammar.avif`, quote: "I’m a computer scientist" },
  { name: "Nadia Houti", photo: `${ROSTER_CDN}/nadia.avif`, quote: "My background is in mechanical engineering" },
  { name: "Hassan Abuali", photo: `${ROSTER_CDN}/hassan.avif`, quote: "I’m a PhD in mechanical engineering" },
  { name: "Sriharsha Chowdarapu", photo: `${ROSTER_CDN}/sriharsha.avif`, quote: "My background is in microbiology" },
];
