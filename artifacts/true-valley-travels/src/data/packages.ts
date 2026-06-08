/**
 * Central catalog of all Kashmir tour packages.
 *
 * This is the single source of truth consumed by:
 *  - the Packages section (homepage grid, seasonal toggle)
 *  - the PackageDetail page (/packages/:slug)
 *  - the Contact enquiry form (package-of-interest options + pre-fill)
 *
 * Itineraries & pricing are Kashmir-only (Srinagar / Gulmarg / Pahalgam /
 * Sonamarg). No pilgrimage / religious circuits.
 */

export type Season = "summer" | "winter";
export type Tier = "Budget" | "Premium" | "Luxury" | "Ultra-Luxury";

export interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  tier: Tier;
  season: Season;
  /** Discounted, currently-advertised price (per adult), e.g. "16,900" */
  price: string;
  /** Original / strike-through price, e.g. "20,000" */
  originalPrice: string;
  /** Savings amount, e.g. "3,100" */
  save: string;
  duration: string;     // "6D / 5N"
  minPax: string;       // "Min. 2 Pax"
  route: string;        // "Srinagar – Gulmarg – Pahalgam"
  image: string;        // /packages/*.jpg
  fallback: string;     // /destinations/*.jpg
  popular?: boolean;
  /** Short bullets shown on the card */
  highlights: string[];
  /** Long-form intro shown on the detail page */
  overview: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
}

/* ─────────────────────────────────────────────────────────────
   Shared inclusion / exclusion sets (Kashmir-only, non-religious)
   ───────────────────────────────────────────────────────────── */
const baseInclusions = (nights: number): string[] => [
  "Wildlife & environmental entry fees",
  `${nights} breakfasts & ${nights} dinners (as per itinerary)`,
  "Private AC vehicle (Innova / Xylo / Scorpio) for all transfers & sightseeing",
  "All sightseeing and transfers as per the itinerary",
  "Driver allowance, fuel, parking, toll & road taxes",
  `${nights} nights accommodation on double-sharing basis (2 adults)`,
  "Airport / bus-stand pick-up and drop",
  "24×7 on-trip assistance from True Valley Travels",
];

const baseExclusions: string[] = [
  "5% GST",
  "Any airfare or train fare to & from Kashmir",
  "Lunches and any meals not specified in the itinerary",
  "Entry fees to gardens, monuments & parks",
  "Gondola cable car, pony rides, shikara & adventure-activity charges",
  "Travel insurance of any kind",
  "Personal expenses — tips, laundry, telephone, medical",
  "Anything not mentioned under inclusions",
  "Costs arising from circumstances beyond our control (weather, landslides, road blocks)",
];

/* ─────────────────────────────────────────────────────────────
   SUMMER PACKAGES
   ───────────────────────────────────────────────────────────── */
const summerPackages: Package[] = [
  {
    id: "s1",
    slug: "kashmir-paradise-tour",
    title: "Kashmir Paradise Tour",
    tier: "Budget",
    season: "summer",
    price: "16,900",
    originalPrice: "20,000",
    save: "3,100",
    duration: "6D / 5N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Gulmarg – Pahalgam",
    image: "https://images.unsplash.com/photo-1715457573748-8e8a70b2c1be?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/dal_summer.jpg",
    highlights: [
      "Shikara ride on Dal Lake",
      "Gulmarg meadow & gondola option",
      "Pahalgam — Valley of Shepherds",
      "Mughal Gardens of Srinagar",
    ],
    overview:
      "Kashmir is a divine paradise on earth — undulating meadows, twisting rivers and majestic snow-capped peaks. This six-day journey covers the three classics every first-time traveller dreams of: the houseboats and gardens of Srinagar, the alpine meadow of Gulmarg, and the pine-wrapped Valley of Shepherds at Pahalgam. Enough time to soak it in, without stretching the trip too thin.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Met on arrival and transferred to your houseboat / hotel. Evening Shikara ride on Dal Lake past the floating gardens, lotus beds and Char Chinar island. Overnight in Srinagar." },
      { day: 2, title: "Srinagar – Gulmarg – Srinagar", desc: "Full-day excursion to Gulmarg, the meadow of flowers. Optional Gondola cable car to Kongdoori / Khilanmarg, or a pony ride to the seven springs. Return to Srinagar for the night." },
      { day: 3, title: "Srinagar – Pahalgam", desc: "Drive (approx. 3 hrs) to Pahalgam, the Valley of Shepherds, en route through saffron fields and the Avantipura ruins. Evening at leisure by the Lidder river. Overnight in Pahalgam." },
      { day: 4, title: "Pahalgam Sightseeing", desc: "Explore Pahalgam at leisure — Chandanwari, Aru and Betaab valley (by local cab) or a relaxed riverside walk. Overnight in Pahalgam." },
      { day: 5, title: "Pahalgam – Srinagar", desc: "Return to Srinagar. Afternoon tour of the Mughal Gardens — Nishat, Shalimar and Chashme Shahi — and the Shankaracharya hill viewpoint. Overnight in Srinagar." },
      { day: 6, title: "Departure", desc: "After breakfast, time for last-minute handicraft shopping before your transfer to the airport." },
    ],
    inclusions: baseInclusions(5),
    exclusions: baseExclusions,
  },
  {
    id: "s2",
    slug: "best-of-kashmir-tour",
    title: "Best of Kashmir Tour",
    tier: "Premium",
    season: "summer",
    price: "20,900",
    originalPrice: "25,000",
    save: "4,100",
    duration: "6D / 5N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Sonamarg – Gulmarg – Pahalgam",
    image: "https://images.unsplash.com/photo-1561287437-c69a30664793?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/sonamarg_summer.jpg",
    popular: true,
    highlights: [
      "All four valleys in one trip",
      "Sonamarg — Thajiwas Glacier",
      "Gulmarg gondola & Pahalgam",
      "Houseboat stay on Dal Lake",
    ],
    overview:
      "The complete Kashmir — majestic snow-clad mountains and verdant valleys across all four headline destinations. From romantic boat rides on Dal Lake to the glacier meadows of Sonamarg, the ski slopes of Gulmarg and the shepherds' valley of Pahalgam, this is the itinerary for travellers who want to see it all in one unhurried week.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Transfer to a deluxe houseboat on Dal Lake. Leisurely Shikara ride with a chance to shop for Kashmiri handicrafts. Overnight on the houseboat." },
      { day: 2, title: "Srinagar – Sonamarg – Srinagar", desc: "Drive ~84 km to Sonamarg, the Meadow of Gold, at ~9,000 ft. Optional pony trek to the Thajiwas Glacier or trout fishing in the Sindh river. Return to Srinagar. Overnight in Srinagar." },
      { day: 3, title: "Srinagar – Pahalgam", desc: "Drive to Pahalgam, the Valley of Shepherds. Walk along the Lidder river and explore the surrounding pine forests. Overnight in Pahalgam." },
      { day: 4, title: "Pahalgam – Srinagar", desc: "Return to Srinagar with stops at the Avantipura ruins and Mattan. Afternoon visit to the Mughal Gardens — Nishat & Shalimar. Overnight in Srinagar." },
      { day: 5, title: "Srinagar – Gulmarg – Srinagar", desc: "Day excursion to Gulmarg (~8,700 ft). Ride the Gondola cable car for panoramic views or try the slopes. Return to Srinagar. Overnight in Srinagar." },
      { day: 6, title: "Departure", desc: "Breakfast and transfer to Srinagar airport." },
    ],
    inclusions: baseInclusions(5),
    exclusions: baseExclusions,
  },
  {
    id: "s3",
    slug: "kashmir-honeymoon-tour",
    title: "Kashmir Honeymoon Tour",
    tier: "Luxury",
    season: "summer",
    price: "27,900",
    originalPrice: "30,000",
    save: "2,100",
    duration: "7D / 6N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Pahalgam – Gulmarg – Sonamarg",
    image: "https://images.unsplash.com/photo-1707381076957-ec19b90e9cbe?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/dal_summer.jpg",
    highlights: [
      "Romantic deluxe houseboat stay",
      "Candlelit dinner & Shikara ride",
      "Gulmarg gondola for two",
      "Sonamarg glacier excursion",
    ],
    overview:
      "Kashmir is the most romantic way to begin a new life together. This seven-day honeymoon pairs a deluxe houseboat on Dal Lake with the meadows of Gulmarg, the pine valleys of Pahalgam and the glaciers of Sonamarg — candlelit dinners, private transfers and unhurried moments crafted just for two.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Welcome transfer to a deluxe houseboat. Romantic evening Shikara ride on Dal Lake with a demonstration of papier-mâché and walnut-wood craft. Candlelit dinner on board. Overnight on the houseboat." },
      { day: 2, title: "Srinagar Sightseeing", desc: "Visit the Mughal Gardens — Nishat Bagh and Shalimar Bagh — and a traditional carpet-weaving atelier. Evening at leisure. Overnight on the houseboat." },
      { day: 3, title: "Srinagar – Pahalgam (90 km / ~2.5 hrs)", desc: "Drive to Pahalgam via the Avantipura ruins and Mattan. Optional pony ride to Baisaran or Mamleshwar. Overnight in Pahalgam." },
      { day: 4, title: "Pahalgam – Gulmarg (~4 hrs)", desc: "Scenic drive to Gulmarg. Ride the Gondola, try skiing / snowboarding (seasonal), or stroll the world's highest 18-hole golf course. Overnight in Gulmarg." },
      { day: 5, title: "Gulmarg – Srinagar", desc: "Return to Srinagar visiting the Shankaracharya viewpoint and the local markets. Overnight in Srinagar." },
      { day: 6, title: "Sonamarg Excursion", desc: "Full-day excursion to Sonamarg, the Gateway of Ladakh. Horse ride to the Thajiwas Glacier. Return to Srinagar. Overnight in Srinagar." },
      { day: 7, title: "Departure", desc: "Breakfast and transfer to the airport for your onward journey." },
    ],
    inclusions: baseInclusions(6),
    exclusions: baseExclusions,
  },
  {
    id: "s4",
    slug: "charismatic-kashmir-tour",
    title: "Charismatic Kashmir Tour",
    tier: "Ultra-Luxury",
    season: "summer",
    price: "29,900",
    originalPrice: "35,000",
    save: "5,100",
    duration: "6D / 5N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Pahalgam – Betaab & Aru Valley – Sonamarg",
    image: "https://images.unsplash.com/photo-1701957494338-95527b753a7f?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/pahalgam_summer.jpg",
    highlights: [
      "Betaab & Aru Valley exploration",
      "Premium stays throughout",
      "Gulmarg gondola & Khilanmarg",
      "Sonamarg, the Valley of Gold",
    ],
    overview:
      "Nature's youthful, timeless beauty across Kashmir's most charismatic corners. This premium circuit goes beyond the classics — adding the celebrated Betaab Valley, Aru Valley and forest trails along the Sheshnag river to the gardens of Srinagar, the slopes of Gulmarg and the golden meadows of Sonamarg. Crafted for travellers who want depth, comfort and the very best views.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Transfer to a houseboat, a traditional Kashmiri Wazwan lunch and free time to settle in. Evening Shikara ride on Dal Lake. Overnight on the houseboat." },
      { day: 2, title: "Srinagar – Gulmarg – Srinagar", desc: "Excursion to Gulmarg (~2,690 m). Aerial Gondola to Khilanmarg, skiing and scenic viewpoints. Return to Srinagar. Overnight in Srinagar." },
      { day: 3, title: "Srinagar – Pahalgam", desc: "Drive ~150 km to Pahalgam through saffron fields and apple orchards. Evening at leisure by the Lidder. Overnight in Pahalgam." },
      { day: 4, title: "Pahalgam – Betaab & Aru Valley", desc: "Visit Chandanwari, the famous Betaab Valley and Aru Valley. Leisurely forest walk along the Sheshnag / Lidder river. Overnight in Pahalgam." },
      { day: 5, title: "Pahalgam – Srinagar", desc: "Return to Srinagar. Mughal Gardens, Shankaracharya hill and time for market shopping. Overnight in Srinagar." },
      { day: 6, title: "Sonamarg & Departure", desc: "Early excursion to Sonamarg, the Valley of Gold, through dramatic mountain terrain — before your departure transfer to the airport." },
    ],
    inclusions: baseInclusions(5),
    exclusions: baseExclusions,
  },
  {
    id: "s5",
    slug: "kashmir-angling-tour",
    title: "Kashmir Angling Tour",
    tier: "Premium",
    season: "summer",
    price: "20,900",
    originalPrice: "25,000",
    save: "4,100",
    duration: "6D / 5N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Pahalgam – Sonamarg",
    image: "https://images.unsplash.com/photo-1610997186335-12de8a2dc7fd?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/sonamarg_summer.jpg",
    highlights: [
      "Brown-trout angling, Lidder valley",
      "Sindh valley fishing at Sonamarg",
      "Deluxe houseboat stays",
      "Trout season Apr–Sep",
    ],
    overview:
      "Cast a line in the cold, clear streams of the Himalayas. The Kashmir valley — fed by the Jhelum, Dal and Nagin lakes and eight glacial valleys — is famous for its brown trout. This six-day angling expedition pairs the upper and lower Lidder valley at Pahalgam with the Sindh valley at Sonamarg, between gardens, houseboats and the calm of Dal Lake.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Transfer to a deluxe houseboat. Evening visit to the Mughal Gardens; dinner on board. Overnight on the houseboat." },
      { day: 2, title: "Srinagar – Pahalgam", desc: "Drive to the Upper Lidder valley near Pahalgam for a day of trout angling. Overnight in Pahalgam." },
      { day: 3, title: "Pahalgam – Srinagar", desc: "Morning angling in the lower Lidder valley, then return to Srinagar. Overnight on the houseboat." },
      { day: 4, title: "Srinagar – Sonamarg", desc: "Drive to the Upper Sindh valley at Sonamarg for a full day of trout fishing. Overnight in Sonamarg." },
      { day: 5, title: "Sonamarg – Srinagar", desc: "Final session in the lower Sindh valley, then return to Srinagar. Overnight on the houseboat." },
      { day: 6, title: "Departure", desc: "Morning Shikara ride on Dal Lake and transfer to the airport. Note: angling permits arranged on request; trout season runs April–September." },
    ],
    inclusions: [
      ...baseInclusions(5),
      "Assistance arranging angling permits (on request)",
    ],
    exclusions: [
      ...baseExclusions,
      "Fishing tackle, bait & angling-beat permit fees",
    ],
  },
  {
    id: "s6",
    slug: "kashmir-family-tour",
    title: "Kashmir Family Tour",
    tier: "Luxury",
    season: "summer",
    price: "35,900",
    originalPrice: "40,000",
    save: "4,100",
    duration: "7D / 6N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Sonamarg – Pahalgam – Gulmarg",
    image: "https://images.unsplash.com/photo-1568889753852-196c487a536e?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/pahalgam_summer.jpg",
    highlights: [
      "All-ages friendly itinerary",
      "Sonamarg glacier & Thajiwas",
      "Betaab Valley & Baisaran meadows",
      "Gulmarg gondola & horse riding",
    ],
    overview:
      "Kashmir — heaven on earth — is made for family holidays. This relaxed seven-day tour blends breathtaking scenery with activities for every age group: a Shikara ride on Dal Lake, a glacier trek at Sonamarg, the grasslands of Pahalgam and the gondola at Gulmarg, with plenty of free time, Kashmiri cuisine and handicraft shopping along the way.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Met on arrival and a scenic drive through New Srinagar across the Abdullah Bridge over the Jhelum. Check in to your hotel / houseboat, followed by a one-hour Shikara ride on Dal Lake. Overnight in Srinagar." },
      { day: 2, title: "Srinagar – Sonamarg – Srinagar", desc: "Day trip to Sonamarg via Kangan and Gagangir. Trek or horse-ride to the Thajiwas Glacier and explore the town market. Return to Srinagar. Overnight in Srinagar." },
      { day: 3, title: "Srinagar – Pahalgam (97 km / 3–4 hrs)", desc: "Drive via Pampore's saffron fields, the Avantipura ruins and Bijbehara along the Lidder river. Evening at leisure. Overnight in Pahalgam." },
      { day: 4, title: "Pahalgam Sightseeing", desc: "Explore Betaab Valley and Chandanwari; horse-ride to the Baisaran grasslands. Free time for the family. Overnight in Pahalgam." },
      { day: 5, title: "Pahalgam – Gulmarg (152 km / 4–5 hrs)", desc: "Scenic drive via Tangmarg to Gulmarg. Check in and relax in the meadow of flowers. Overnight in Gulmarg." },
      { day: 6, title: "Gulmarg Sightseeing", desc: "Gondola cable-car excursion and horse riding across the meadows. Overnight in Gulmarg." },
      { day: 7, title: "Departure", desc: "Breakfast and transfer to the airport." },
    ],
    inclusions: baseInclusions(6),
    exclusions: baseExclusions,
  },
  {
    id: "s7",
    slug: "srinagar-gulmarg-getaway",
    title: "Srinagar Gulmarg Getaway",
    tier: "Budget",
    season: "summer",
    price: "11,900",
    originalPrice: "14,000",
    save: "2,100",
    duration: "4D / 3N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Gulmarg",
    image: "https://images.unsplash.com/photo-1564329494258-3f72215ba175?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/dal_summer.jpg",
    highlights: [
      "Perfect short weekend break",
      "Dal Lake shikara ride",
      "Mughal Gardens of Srinagar",
      "Gulmarg meadow & gondola",
    ],
    overview:
      "Short on days, big on Kashmir. This four-day getaway covers the two crowd-favourites — the lakes and gardens of Srinagar and the alpine meadow of Gulmarg — at an easy pace. Ideal for a long-weekend escape or a quick first taste of the valley.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Airport transfer and check-in. Evening Shikara ride on Dal Lake past the floating gardens and Char Chinar island. Overnight in Srinagar." },
      { day: 2, title: "Srinagar Sightseeing", desc: "The Mughal Gardens — Nishat, Shalimar and Chashme Shahi — the Shankaracharya viewpoint and the old-city markets. Overnight in Srinagar." },
      { day: 3, title: "Srinagar – Gulmarg – Srinagar", desc: "Full-day excursion to Gulmarg, the meadow of flowers. Optional Gondola cable car and pony rides. Return to Srinagar. Overnight in Srinagar." },
      { day: 4, title: "Departure", desc: "Breakfast and transfer to the airport." },
    ],
    inclusions: baseInclusions(3),
    exclusions: baseExclusions,
  },
  {
    id: "s8",
    slug: "grand-kashmir-tour",
    title: "Grand Kashmir Tour",
    tier: "Ultra-Luxury",
    season: "summer",
    price: "34,900",
    originalPrice: "40,000",
    save: "5,100",
    duration: "8D / 7N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Sonamarg – Gulmarg – Pahalgam – Doodhpathri",
    image: "https://images.unsplash.com/photo-1634041837617-b43ba4bef0a1?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/sonamarg_summer.jpg",
    highlights: [
      "All four valleys + Doodhpathri",
      "Full 7-night grand itinerary",
      "Houseboat + premium hotels",
      "Gondola, glaciers & meadows",
    ],
    overview:
      "The most complete Kashmir experience we offer. Eight unhurried days across every headline valley — Srinagar, Sonamarg, Gulmarg and Pahalgam — plus the offbeat, crowd-free meadow of Doodhpathri. Deluxe houseboat and premium hotels throughout, with time to truly savour the valley rather than rush it.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Welcome transfer to a deluxe houseboat. Evening Shikara ride on Dal Lake. Overnight on the houseboat." },
      { day: 2, title: "Srinagar Sightseeing", desc: "Mughal Gardens (Nishat, Shalimar, Chashme Shahi), the Shankaracharya hill and a traditional handicraft atelier. Overnight in Srinagar." },
      { day: 3, title: "Srinagar – Sonamarg – Srinagar", desc: "Excursion to Sonamarg, the Meadow of Gold. Pony ride to the Thajiwas Glacier. Return to Srinagar. Overnight in Srinagar." },
      { day: 4, title: "Srinagar – Gulmarg – Srinagar", desc: "Day excursion to Gulmarg. Gondola cable car to Kongdoori / Khilanmarg. Return to Srinagar. Overnight in Srinagar." },
      { day: 5, title: "Srinagar – Pahalgam", desc: "Drive to Pahalgam via the Avantipura ruins and saffron fields. Evening by the Lidder river. Overnight in Pahalgam." },
      { day: 6, title: "Pahalgam – Betaab & Aru Valley", desc: "Visit Chandanwari, the Betaab Valley and Aru Valley. Overnight in Pahalgam." },
      { day: 7, title: "Pahalgam – Doodhpathri – Srinagar", desc: "Return towards Srinagar with an excursion to the offbeat meadow of Doodhpathri, the Valley of Milk. Overnight in Srinagar." },
      { day: 8, title: "Departure", desc: "Breakfast and transfer to the airport." },
    ],
    inclusions: baseInclusions(7),
    exclusions: baseExclusions,
  },
];

/* ─────────────────────────────────────────────────────────────
   WINTER PACKAGES
   ───────────────────────────────────────────────────────────── */
const winterPackages: Package[] = [
  {
    id: "w1",
    slug: "kashmir-snow-escape",
    title: "Kashmir Snow Escape",
    tier: "Budget",
    season: "winter",
    price: "9,900",
    originalPrice: "12,000",
    save: "2,100",
    duration: "5D / 4N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Gulmarg",
    image: "https://images.unsplash.com/photo-1662218752292-848395536ba9?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/gulmarg_winter.jpg",
    highlights: [
      "Gulmarg snow play & sledging",
      "Gondola cable car option",
      "Wintry Dal Lake Shikara ride",
      "Best value snow getaway",
    ],
    overview:
      "Kashmir's snow, without the wait. This short winter escape drops you straight into Gulmarg — Asia's premier snow destination — for sledging, snow play and an optional Gondola ride, bookended by the quiet, mist-wrapped beauty of a wintry Srinagar. Ideal for a long weekend in the white.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Airport transfer to your hotel. Evening Shikara ride on a wintry Dal Lake. Overnight in Srinagar." },
      { day: 2, title: "Srinagar Sightseeing", desc: "The Mughal Gardens in their snow-dusted winter calm and the old-city markets. Overnight in Srinagar." },
      { day: 3, title: "Srinagar – Gulmarg", desc: "Drive to Gulmarg, Kashmir's premier snow destination. Optional Gondola ride and snow play. Overnight in Gulmarg." },
      { day: 4, title: "Gulmarg – Srinagar", desc: "Morning in the snow — sledging and an optional beginner ski lesson — then return to Srinagar. Overnight in Srinagar." },
      { day: 5, title: "Departure", desc: "Breakfast and transfer to the airport." },
    ],
    inclusions: baseInclusions(4),
    exclusions: baseExclusions,
  },
  {
    id: "w2",
    slug: "gulmarg-winter-special",
    title: "Gulmarg Winter Special",
    tier: "Premium",
    season: "winter",
    price: "17,999",
    originalPrice: "21,000",
    save: "3,001",
    duration: "6D / 5N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Gulmarg – Sonamarg",
    image: "https://images.unsplash.com/photo-1651509094074-e8acaeb84d8f?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/gulmarg_winter.jpg",
    popular: true,
    highlights: [
      "Gondola Phase 1 & 2 to Apharwat",
      "Guaranteed snow experience",
      "Skiing & snowboarding (seasonal)",
      "Sonamarg snow views",
    ],
    overview:
      "Two full days in Gulmarg with rides on both phases of the famous Gondola — up towards Apharwat for guaranteed snow, skiing and snowboarding. Add a snow run towards Sonamarg and the gardens of Srinagar, and this is the winter trip serious snow-lovers ask for.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Transfer to your hotel; evening Shikara ride on Dal Lake. Overnight in Srinagar." },
      { day: 2, title: "Srinagar Sightseeing", desc: "Mughal Gardens, Dal Lake and the old-city bazaars. Overnight in Srinagar." },
      { day: 3, title: "Srinagar – Gulmarg", desc: "Transfer to Gulmarg. Ride Gondola Phase 1 to Kongdoori. Overnight in Gulmarg." },
      { day: 4, title: "Gulmarg Snow Day", desc: "Gondola Phase 2 towards Apharwat for guaranteed snow, skiing and snowboarding (seasonal). Overnight in Gulmarg." },
      { day: 5, title: "Gulmarg – Sonamarg – Srinagar", desc: "Drive towards Sonamarg for snow views (subject to road conditions), then return to Srinagar. Overnight in Srinagar." },
      { day: 6, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
    inclusions: baseInclusions(5),
    exclusions: baseExclusions,
  },
  {
    id: "w3",
    slug: "kashmir-winter-honeymoon",
    title: "Kashmir Winter Honeymoon",
    tier: "Luxury",
    season: "winter",
    price: "24,900",
    originalPrice: "28,000",
    save: "3,100",
    duration: "7D / 6N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Gulmarg – Pahalgam",
    image: "https://images.unsplash.com/photo-1670684960824-64378aa634c6?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/gulmarg_winter.jpg",
    highlights: [
      "Deluxe houseboat & candlelit dinner",
      "Gulmarg gondola for two",
      "Snow-clad Pahalgam",
      "Cosy mountain-lodge stays",
    ],
    overview:
      "A honeymoon written in snow. Swap the crowds for crackling fires, frosted pines and a deluxe houseboat on a silent Dal Lake. This seven-day winter escape pairs the snow slopes of Gulmarg with the frozen-river romance of Pahalgam — private, warm and made entirely for two.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Welcome transfer to a deluxe houseboat; candlelit dinner and an evening Shikara ride. Overnight on the houseboat." },
      { day: 2, title: "Srinagar Sightseeing", desc: "Mughal Gardens and a carpet-weaving atelier. Overnight in Srinagar." },
      { day: 3, title: "Srinagar – Gulmarg", desc: "Drive to snow-clad Gulmarg. Gondola ride for couples. Overnight in Gulmarg." },
      { day: 4, title: "Gulmarg Snow Day", desc: "A full day in the snow — skiing, snow play and cosy mountain-lodge time. Overnight in Gulmarg." },
      { day: 5, title: "Gulmarg – Pahalgam", desc: "Scenic transfer to Pahalgam through the snow-laden valley. Overnight in Pahalgam." },
      { day: 6, title: "Pahalgam – Srinagar", desc: "Morning by the frozen Lidder, then return to Srinagar. Overnight in Srinagar." },
      { day: 7, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
    inclusions: baseInclusions(6),
    exclusions: baseExclusions,
  },
  {
    id: "w4",
    slug: "snow-adventure-seekers",
    title: "Snow Adventure Seekers",
    tier: "Ultra-Luxury",
    season: "winter",
    price: "24,999",
    originalPrice: "30,000",
    save: "5,001",
    duration: "8D / 7N",
    minPax: "Min. 2 Pax",
    route: "Srinagar – Gulmarg (Apharwat) – Pahalgam",
    image: "https://images.unsplash.com/photo-1645111596020-79a389bdb97c?w=1200&q=80&auto=format&fit=crop",
    fallback: "/destinations/gulmarg_winter.jpg",
    highlights: [
      "Apharwat peak ski day with instructor",
      "Snowshoe hike & snow trekking",
      "Backcountry Gulmarg powder",
      "Premium mountain lodges",
    ],
    overview:
      "The full Kashmir winter adventure. Ride the Gondola to Apharwat peak for backcountry powder with a certified instructor, snowshoe across Khilanmarg, and chase fresh snow from Gulmarg to Pahalgam over eight unforgettable days. Premium lodges, expert guides and the thrill of the high Himalaya in winter.",
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", desc: "Airport transfer; evening Shikara ride on Dal Lake. Overnight in Srinagar." },
      { day: 2, title: "Srinagar Sightseeing", desc: "Mughal Gardens and old-city markets. Overnight in Srinagar." },
      { day: 3, title: "Srinagar – Gulmarg", desc: "Transfer to Gulmarg; ride Gondola Phase 1 to Kongdoori. Overnight in Gulmarg." },
      { day: 4, title: "Apharwat Ski Day", desc: "Gondola Phase 2 to Apharwat peak for backcountry snow and skiing with a certified instructor (seasonal). Overnight in Gulmarg." },
      { day: 5, title: "Gulmarg Snow Adventure", desc: "Snowshoe hike, sledging and snow trekking around Khilanmarg. Overnight in Gulmarg." },
      { day: 6, title: "Gulmarg – Pahalgam", desc: "Transfer to Pahalgam through snow-laden pine forests. Overnight in Pahalgam." },
      { day: 7, title: "Pahalgam – Srinagar", desc: "Aru / Betaab valley snow views (road permitting), then return to Srinagar. Overnight in Srinagar." },
      { day: 8, title: "Departure", desc: "Breakfast and airport transfer." },
    ],
    inclusions: [
      ...baseInclusions(7),
      "Certified ski / snow-trek instructor for the adventure days",
    ],
    exclusions: [
      ...baseExclusions,
      "Ski / snowboard equipment hire",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   Exports & helpers
   ───────────────────────────────────────────────────────────── */
export const allPackages: Package[] = [...summerPackages, ...winterPackages];

export function packagesBySeason(season: Season): Package[] {
  return allPackages.filter((p) => p.season === season);
}

export function getPackageBySlug(slug: string): Package | undefined {
  return allPackages.find((p) => p.slug === slug);
}

/** The exact string used as the Contact form's "Package of Interest" option. */
export function packageOptionLabel(p: Package): string {
  return `${p.title} (₹${p.price}/pax)`;
}

export { summerPackages, winterPackages };
