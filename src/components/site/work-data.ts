const ai1 = "/assets/work/asset-infinity-1.webp";
const ai2 = "/assets/work/asset-infinity-2.webp";
const ai3 = "/assets/work/asset-infinity-3.webp";
const ai4 = "/assets/work/asset-infinity-4.webp";
const ab1 = "/assets/work/autobeacon-1.webp";
const ab2 = "/assets/work/autobeacon-2.webp";
const ab3 = "/assets/work/autobeacon-3.webp";
const ab4 = "/assets/work/autobeacon-4.webp";
const lk1 = "/assets/work/live-kirtan-1.webp";
const lk2 = "/assets/work/live-kirtan-2.webp";
const lk3 = "/assets/work/live-kirtan-3.webp";
const lk4 = "/assets/work/live-kirtan-4.webp";
const kc1 = "/assets/work/karching-1.webp";
const kc2 = "/assets/work/karching-2.webp";
const kc3 = "/assets/work/karching-3.webp";
const qp1 = "/assets/work/quizzypop-1.webp";
const qp2 = "/assets/work/quizzypop-2.webp";
const qp3 = "/assets/work/quizzypop-3.webp";
const qp4 = "/assets/work/quizzypop-4.webp";
const kw1 = "/assets/work/kurierwalla-1.webp";
const kw2 = "/assets/work/kurierwalla-2.webp";
const kw3 = "/assets/work/kurierwalla-3.webp";

export type Platform = "iOS" | "Android" | "Web";
export type PatternKey = "grid" | "speedo" | "wave" | "road" | "quiz" | "route";

export type Shot = { src: string; w: number; h: number; caption: string };

export type Project = {
  name: string;
  desc: string;
  platforms: Platform[];
  url: string;
  appStore?: string;
  playStore?: string;
  website?: string;
  gradient: string;
  span: string;
  wide?: boolean;
  pattern: PatternKey;
  shotFit: "phone" | "web";
  shots: Shot[];
};

const phone = (src: string, caption: string): Shot => ({
  src,
  w: 720,
  h: 1560,
  caption,
});
const web = (src: string, caption: string): Shot => ({
  src,
  w: 1440,
  h: 900,
  caption,
});

export const projects: Project[] = [
  {
    name: "Asset Infinity",
    desc: "Enterprise asset tracking & management platform",
    platforms: ["iOS", "Android", "Web"],
    url: "https://apps.apple.com/in/app/asset-infinity-v2/id1641535604",
    appStore: "https://apps.apple.com/in/app/asset-infinity-v2/id1641535604",
    playStore: "https://play.google.com/store/apps/details?id=com.assetinfinity.app",
    gradient: "linear-gradient(135deg, oklch(0.36 0.16 285), oklch(0.28 0.11 262))",
    span: "lg:col-span-3",
    pattern: "grid",
    shotFit: "phone",
    shots: [
      phone(ai1, "Asset overview dashboard"),
      phone(ai2, "Asset detail record"),
      phone(ai3, "Smart barcode scanning"),
      phone(ai4, "QR / barcode generator"),
    ],
  },
  {
    name: "AutoBeacon",
    desc: "Connected automotive diagnostics & companion app",
    platforms: ["iOS"],
    url: "https://apps.apple.com/in/app/autobeacon/id1597764990",
    appStore: "https://apps.apple.com/in/app/autobeacon/id1597764990",
    gradient: "linear-gradient(135deg, oklch(0.58 0.16 55), oklch(0.36 0.11 40))",
    span: "lg:col-span-3",
    pattern: "speedo",
    shotFit: "phone",
    shots: [
      phone(ab1, "Driving score home screen"),
      phone(ab2, "Score trend analytics"),
      phone(ab3, "Trip history list"),
      phone(ab4, "Trip detail breakdown"),
    ],
  },
  {
    name: "Live Kirtan",
    desc: "Spiritual streaming platform with live audio & community",
    platforms: ["iOS", "Android"],
    url: "https://apps.apple.com/in/app/live-kirtan/id562758691",
    appStore: "https://apps.apple.com/in/app/live-kirtan/id562758691",
    playStore: "https://play.google.com/store/apps/details?id=com.centra.livekirtan",
    gradient: "linear-gradient(135deg, oklch(0.55 0.12 195), oklch(0.32 0.09 210))",
    span: "lg:col-span-2",
    pattern: "wave",
    shotFit: "phone",
    shots: [
      phone(lk1, "Live streams & sections menu"),
      phone(lk2, "Gurdwara directory"),
      phone(lk3, "Daily Hukamnama"),
      phone(lk4, "Audio player with translation"),
    ],
  },
  {
    name: "Karching Driver Education",
    desc: "Certified driver training & examination platform",
    platforms: ["iOS"],
    url: "https://apps.apple.com/us/app/karching-driver-education/id1479901287",
    appStore: "https://apps.apple.com/us/app/karching-driver-education/id1479901287",
    gradient: "linear-gradient(135deg, oklch(0.52 0.14 150), oklch(0.30 0.08 165))",
    span: "lg:col-span-2",
    pattern: "road",
    shotFit: "phone",
    shots: [
      phone(kc1, "Drive score & session log"),
      phone(kc2, "Live route tracking map"),
      phone(kc3, "Student settings panel"),
    ],
  },
  {
    name: "QuizzyPop",
    desc: "Daily educational quiz app for children - free, no ads",
    platforms: ["Android"],
    url: "https://play.google.com/store/apps/details?id=com.quizzypop.app",
    playStore: "https://play.google.com/store/apps/details?id=com.quizzypop.app",
    gradient: "linear-gradient(135deg, oklch(0.55 0.19 15), oklch(0.32 0.12 330))",
    span: "lg:col-span-2",
    pattern: "quiz",
    shotFit: "phone",
    shots: [
      phone(qp1, "Grade selection onboarding"),
      phone(qp2, "Daily learning home"),
      phone(qp3, "Quiz question screen"),
      phone(qp4, "Daily fact card"),
    ],
  },
  {
    name: "KurierWalla",
    desc: "Logistics & last-mile delivery management system",
    platforms: ["Web"],
    url: "https://kurierwalla.com/",
    website: "https://kurierwalla.com/",
    gradient: "linear-gradient(135deg, oklch(0.50 0.16 255), oklch(0.28 0.10 240))",
    span: "lg:col-span-6",
    wide: true,
    pattern: "route",
    shotFit: "web",
    shots: [
      web(kw1, "Homepage with shipment tracking"),
      web(kw2, "Delivery services overview"),
      web(kw3, "Network stats & rate calculator"),
    ],
  },
];

export const secondary = [
  {
    name: "MProtekt Gold",
    platform: "iOS",
    url: "https://apps.apple.com/in/app/m-protekt-gold/id1471286583",
  },
  { name: "Kuriersoft", platform: "Web", url: "https://kuriersoft.in/" },
  { name: "RGRT Group", platform: "Web", url: "https://rgrtgroup.com/" },
];
