export type WorkDetail = {
  business: string;
  audience: string;
  capabilities: string[];
  publicPositioning: string;
};

/**
 * Editorial context for the public work archive. Keep claims tied to the live
 * product, app-store listing, or supplied project record; this is not a record
 * of private delivery scope.
 */
export const workDetails: Record<string, WorkDetail> = {
  "Asset Infinity": {
    business: "Cloud asset-management software for organizations that need a single view of physical and digital assets.",
    audience: "Asset, operations, IT, facilities, and compliance teams working across sites.",
    capabilities: ["Asset lifecycle records", "QR, barcode, RFID, and GPS tracking", "Audits, maintenance, and reporting", "Mobile access"],
    publicPositioning: "The public product site uses enterprise proof, industry use cases, product capabilities, and free-trial/demo calls to action to reach operational buyers.",
  },
  AutoBeacon: {
    business: "A connected-vehicle companion app focused on automotive diagnostics and driving insight.",
    audience: "Drivers and vehicle owners using a connected automotive experience.",
    capabilities: ["Driving-score view", "Trip history", "Trend analytics", "Trip detail breakdown"],
    publicPositioning: "The published App Store presence and product screens provide the primary public discovery path for this mobile product.",
  },
  "Karching Driver Education": {
    business: "A mobile driver-training and examination experience.",
    audience: "Learners and educators completing certified driver-training workflows.",
    capabilities: ["Drive-score log", "Route tracking", "Session history", "Student settings"],
    publicPositioning: "The App Store listing is the public acquisition channel, supported by in-app training and examination workflows.",
  },
  "Live Kirtan": {
    business: "A spiritual live-audio and community platform for Sikh devotional content.",
    audience: "Listeners seeking live kirtan, daily updates, and community resources.",
    capabilities: ["Live audio streams", "Gurdwara directory", "Daily Hukamnama", "Audio player with translation"],
    publicPositioning: "The product is distributed through mobile app stores and presents live spiritual programming as its core reason to return.",
  },
  "MProtekt Gold": {
    business: "A mobile GPS vehicle-tracking and fleet-management product.",
    audience: "Vehicle owners and fleet operators who need location and movement visibility.",
    capabilities: ["GPS vehicle tracking", "Fleet visibility", "Mobile access"],
    publicPositioning: "The published iOS listing is the available public product entry point.",
  },
  QuizzyPop: {
    business: "An ad-free daily educational quiz app for children.",
    audience: "Children and families looking for short, recurring learning activities.",
    capabilities: ["Grade selection", "Daily learning home", "Quiz questions", "Daily fact cards"],
    publicPositioning: "The Google Play listing communicates a lightweight, repeatable daily-learning experience without ads.",
  },
  CuraNet: {
    business: "A patient-facing health-data platform for records, appointments, consent, and emergency sharing.",
    audience: "Patients and families coordinating care while retaining control over access to health information.",
    capabilities: ["Records and appointment views", "Consent by scope and expiry", "Time-limited emergency links", "Privacy controls"],
    publicPositioning: "Its public site leads with patient-first, consent-aware care coordination and invites visitors to create an account or receive product updates.",
  },
  Kuriersoft: {
    business: "Courier and logistics software built around operational administration.",
    audience: "Courier and logistics teams managing the back-office side of delivery operations.",
    capabilities: ["Administrative sign-in", "Password recovery", "Courier operations software"],
    publicPositioning: "The publicly accessible experience is currently an administrative login and recovery flow, rather than a marketing-focused product site.",
  },
  KurierWalla: {
    business: "A courier service serving domestic, international, urgent, and special-handling delivery needs.",
    audience: "Individuals and businesses sending parcels and documents.",
    capabilities: ["Express, same-day, and next-day delivery", "International delivery", "Rate and volumetric-weight calculators", "Callback requests"],
    publicPositioning: "The public website markets service breadth with delivery options, calculators, customer testimonials, and callback/newsletter forms.",
  },
  PGKhata: {
    business: "A web platform for PG billing, rent collection, and tenant management.",
    audience: "PG operators and accommodation managers handling tenant and payment workflows.",
    capabilities: ["Billing workflows", "Rent collection", "Tenant management", "Web access"],
    publicPositioning: "The live product presents a focused operational proposition for PG managers through its web presence.",
  },
  "RGRT Group": {
    business: "A logistics business offering domestic, corporate-support, air-freight, and international services.",
    audience: "Businesses and individuals arranging reliable shipment and transportation services.",
    capabilities: ["Domestic logistics", "Corporate support", "Air freight", "International services and tracking"],
    publicPositioning: "The public website emphasizes trust and transparency through service pages, quote and callback requests, operating details, and customer testimonials.",
  },
  Shotup: {
    business: "A premium visual studio and photography portfolio.",
    audience: "Clients evaluating a photography and visual-production partner.",
    capabilities: ["Visual portfolio", "Photography showcase", "Creative-studio presence"],
    publicPositioning: "The visual portfolio itself is the primary marketing asset: it demonstrates the studio’s aesthetic and completed work before a prospective client contacts the team.",
  },
  "The Dark Store": {
    business: "A black-first fashion and streetwear e-commerce store.",
    audience: "Shoppers looking for distinctive streetwear and fashion accessories.",
    capabilities: ["Product-led storefront", "Collection navigation", "E-commerce shopping flow", "Brand-led art direction"],
    publicPositioning: "The storefront markets through high-impact product photography, a distinct black-first identity, and collection-led shopping navigation.",
  },
};
