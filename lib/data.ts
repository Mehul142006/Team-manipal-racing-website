export const LOGO = {
  src: "/photo/TMRElogo.png",
  alt: "Team Manipal Racing Electric",
} as const;

export const SITE = {
  name: "Team Manipal Racing Electric",
  shortName: "TMRE",
  tagline: "Innovate. Initiate. Incarnate.",
  email: "tmrelectric@manipal.edu",
  captain: {
    name: "Akarsh P Poojary",
    phone: "+91 97405 42083",
  },
  location: {
    lines: [
      "Team Manipal Racing Electric",
      "Techshila Workshop",
      "MIT Manipal",
    ],
    googleMapsUrl:
      "https://www.google.com/maps/place/Team+Manipal+Racing/@13.345658,74.7933336,19.35z/data=!4m6!3m5!1s0x3bbca5127b1a763d:0x979ec85b0eb62cd4!8m2!3d13.3454656!4d74.7938914!16s%2Fg%2F11fj3vtbjr",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Car", href: "/car" },
  { label: "Subsystems", href: "/subsystems" },
  { label: "Team", href: "/team" },
  { label: "Achievements", href: "/achievements" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
] as const;

export const MEDIA_NAV_ITEMS = [
  { label: "Photos", href: "/media/photos" },
  { label: "Research & Development", href: "/media/research" },
] as const;

export const VISION =
  "To lead in the design and development of high-performance electric off-road vehicles by driving innovation, sustainability, and real-world engineering excellence.";

export const MISSION =
  "To engineer championship-caliber electric off-road vehicles through rigorous design, manufacturing excellence, and data-driven performance optimization — developing the next generation of motorsport engineers at MIT Manipal.";

export const SUBSYSTEMS = [
  {
    slug: "vehicle-dynamics",
    title: "Vehicle Dynamics",
    icon: "↔",
    tagline: "Handling, suspension and vehicle control.",
    image: "/photos/workshop/vehicle-dynamics.jpg",
    whatItDoes:
      "Tunes suspension, steering, and chassis setup so the vehicle responds predictably on loose terrain, sharp turns, and endurance runs.",
    whyImportant:
      "Handling wins maneuverability events and keeps the driver confident when conditions change lap to lap.",
    roleInVehicle: [
      "Suspension geometry and damper tuning",
      "Steering response and stability",
      "Track testing and driver feedback",
    ],
    technologies: ["MATLAB", "Adams Car", "OptimumK", "Telemetry analysis"],
  },
  {
    slug: "transmission",
    title: "Transmission",
    icon: "⚙",
    tagline: "Power delivery and drivetrain optimization.",
    image: "/photos/workshop/transmission.jpg",
    whatItDoes:
      "Designs the drivetrain that converts motor torque into usable wheel speed through gear reduction and drive layout.",
    whyImportant:
      "The right ratios and a reliable drivetrain translate powertrain performance into acceleration and hill-climb capability.",
    roleInVehicle: [
      "Gear ratio selection and optimization",
      "Chain drive layout and alignment",
      "Torque transfer and packaging",
    ],
    technologies: ["CAD modeling", "FEA load analysis", "Dynamometer testing", "Chain drive systems"],
  },
  {
    slug: "data-acquisition",
    title: "Data Acquisition",
    icon: "◎",
    tagline: "Vehicle telemetry and performance monitoring.",
    image: "/photos/workshop/data-acquisition.jpg",
    whatItDoes:
      "Integrates sensors, logging, and telemetry to capture how the vehicle behaves during testing and competition.",
    whyImportant:
      "Measured data turns track sessions into clear setup decisions instead of guesswork.",
    roleInVehicle: [
      "Sensor placement and integration",
      "CAN communication and data logging",
      "Performance analysis after each run",
    ],
    technologies: ["STM32", "CAN Bus", "ESP8266", "Custom DAQ PCB"],
  },
  {
    slug: "electronics",
    title: "Electronics",
    icon: "◈",
    tagline: "Electrical systems and control architecture.",
    image: "/photos/workshop/electronics.jpg",
    whatItDoes:
      "Architects wiring, control electronics, and safety circuits so every electrical system works together reliably.",
    whyImportant:
      "Clean electrical integration keeps the vehicle safe, serviceable, and competition-ready under race conditions.",
    roleInVehicle: [
      "Wiring harness design and routing",
      "ECU, BMS, and control interfaces",
      "Safety interlocks and system testing",
    ],
    technologies: ["Altium Designer", "STM32", "BMS integration", "CAN & LV architecture"],
  },
  {
    slug: "electric-powertrain",
    title: "Electric Powertrain",
    icon: "⚡",
    tagline: "Motor, battery and propulsion systems.",
    image: "/photos/workshop/electric-powertrain.jpg",
    whatItDoes:
      "Integrates motor, controller, and thermal management into a propulsion package built for off-road performance.",
    whyImportant:
      "Propulsion defines acceleration, hill climb, and endurance — the core of competitive E-BAJA performance.",
    roleInVehicle: [
      "Motor and controller selection",
      "Power delivery and efficiency tuning",
      "Thermal management under load",
    ],
    technologies: ["PMSM motor", "Motor controller", "Thermal simulation", "Powertrain dyno testing"],
  },
  {
    slug: "structures",
    title: "Structures",
    icon: "⬡",
    tagline: "Chassis and structural design.",
    image: "/photo/Structures.jpg",
    whatItDoes:
      "Develops the spaceframe, roll cage, and mounting systems that form the structural backbone of the vehicle.",
    whyImportant:
      "A validated chassis protects the driver, carries every subsystem, and stays light enough to compete.",
    roleInVehicle: [
      "Spaceframe and roll cage design",
      "Structural validation and FEA",
      "Mounting interfaces for all subsystems",
    ],
    technologies: ["ANSYS", "SolidWorks", "TIG welding", "Strain gauges"],
  },
  {
    slug: "research-and-development",
    title: "Research & Development",
    icon: "◇",
    tagline: "Innovation, testing and future concepts.",
    image: "/photos/workshop/research-and-development.jpg",
    whatItDoes:
      "Tests new ideas, simulations, and concepts before they enter the competition vehicle pipeline.",
    whyImportant:
      "R&D keeps each new generation advancing beyond the last — not repeating the same design choices.",
    roleInVehicle: [
      "Concept validation and prototyping",
      "Simulation and modeling studies",
      "Technology scouting for future platforms",
    ],
    technologies: ["CFD & FEA", "MATLAB", "Prototype testing", "Design of experiments"],
  },
  {
    slug: "management",
    title: "Management",
    icon: "◉",
    tagline: "Team operations and sponsorship relations.",
    image: "/photos/workshop/management.jpg",
    whatItDoes:
      "Runs team operations — sponsorship, logistics, documentation, and communication that connect engineering to competition.",
    whyImportant:
      "A championship team needs more than a fast car; management keeps every subsystem aligned and competition-ready.",
    roleInVehicle: [
      "Sponsor relations and outreach",
      "Competition logistics and planning",
      "Documentation, budgeting, and team operations",
    ],
    technologies: ["Project management", "Cost analysis", "Design report", "Media & outreach"],
  },
] as const;

export type SubsystemSlug = (typeof SUBSYSTEMS)[number]["slug"];

/** Figures stated in the sponsorship brochure or already documented on the site. */
export const TEAM_STATS = [
  { label: "Founded", value: 2021, suffix: "" },
  { label: "Single-seater", value: 9, suffix: " kW" },
  { label: "Vehicle Generations", value: 6, suffix: "" },
  { label: "Subsystems", value: 8, suffix: "" },
] as const;

export const ABOUT_CONTENT = {
  motto: "Innovate. Initiate. Incarnate.",
  lead:
    "Team Manipal Racing Electric is the official E-BAJA SAE team of Manipal Academy of Higher Education.",
  body:
    "The team designs, builds, and tests all-terrain electric vehicles for national-level competitions. Founded in 2021 after five years of research and development, the work focuses on engineering and optimizing vehicle components and electrical systems.",
  vehicle:
    "That work includes a 9 kW single-seater, designed to rival the capabilities of its combustion-engine counterparts.",
} as const;

export const ABOUT_HIGHLIGHTS = [
  {
    title: "Official team",
    text: "The official E-BAJA SAE team of Manipal Academy of Higher Education.",
  },
  {
    title: "Engineering focus",
    text: "Engineering and optimizing vehicle components and electrical systems.",
  },
  {
    title: "Electric mobility",
    text: "All-terrain electric vehicles for national-level competition, including a 9 kW single-seater.",
  },
] as const;

export const HOME_SHOWCASE_STATS = [
  { label: "Vehicle Generations", value: 6, suffix: "+" },
  { label: "Subsystems", value: 8, suffix: "" },
  { display: "National", label: "Competition Team" },
  { label: "Student Built", value: 100, suffix: "%" },
] as const;

export const EBAJA_INFO = {
  intro:
    "E-BAJA SAE India is one of India's premier student engineering competitions — where university teams design, manufacture, validate, and race electric all-terrain vehicles on demanding real-world terrain.",
  paragraphs: [
    "Backed by SAE India, the competition mirrors the complete product development cycle: engineering design, business presentation, cost analysis, manufacturing validation, and on-track performance across endurance, maneuverability, acceleration, and off-road capability.",
    "Teams must prove not only that their vehicle performs — but that it is engineered responsibly, cost-effectively, and ready for the rigours of competition. Every subsystem, every design decision, and every test run counts.",
    "For Team Manipal Racing Electric, E-BAJA is our proving ground — a platform where innovation, hands-on learning, and championship ambition converge in the workshop and on the track.",
  ],
  highlight:
    "From concept to competition, E-BAJA challenges students to engineer a complete electric off-road vehicle capable of performing in demanding real-world conditions.",
  learnMoreUrl: "https://www.bajasaeindia.org/",
} as const;

export type ResultTier = "gold" | "silver" | "bronze" | "listed";

export type CompetitionResult = {
  place: string;
  event: string;
  tier: ResultTier;
  note?: string;
};

export const EBAJA_SEASONS = [
  {
    id: "2025",
    title: "E-BAJA 2025",
    results: [
      { place: "1st", event: "Engineering Design Event", tier: "gold" },
      { place: "1st", event: "Sled Pull", tier: "gold" },
      { place: "2nd", event: "Maneuverability", tier: "silver" },
      { place: "3rd", event: "Overall Dynamics", tier: "bronze" },
      { place: "4th", event: "CAE Event", tier: "listed" },
      { place: "4th", event: "Acceleration", tier: "listed" },
      { place: "9th", event: "Overall Ranking", tier: "listed" },
    ],
  },
  {
    id: "2026",
    title: "E-BAJA 2026",
    results: [
      { place: "3rd", event: "Engineering Design Event", tier: "bronze" },
      { place: "7th", event: "Sled Pull", tier: "listed" },
      { place: "13th", event: "Suspension and Traction", tier: "listed" },
      { place: "5th", event: "Innovation", tier: "listed" },
      { place: "4th", event: "CAE Event", tier: "listed" },
      { place: "4th", event: "Acceleration", tier: "listed" },
      {
        place: "27th",
        event: "Overall Ranking",
        tier: "listed",
        note: "out of 100+ teams",
      },
    ],
  },
] as const satisfies readonly {
  id: string;
  title: string;
  results: readonly CompetitionResult[];
}[];

export type EvResult = {
  result: string;
  event: string;
};

export const EV_EVOLUTION = [
  {
    id: "EV1",
    upcoming: false,
    summary: "Our first-ever EV debuted virtually during the pandemic.",
    results: [
      { result: "AIR 5", event: "Cost Event" },
      { result: "AIR 4", event: "Hill Climb Event" },
      { result: "AIR 9", event: "Sales Event" },
      { result: "AIR 15", event: "Overall" },
    ],
  },
  {
    id: "EV2",
    upcoming: false,
    summary: null,
    results: [
      { result: "AIR 5", event: "Overall" },
      { result: "AIR 2", event: "Prelims Quiz" },
      { result: "AIR 3", event: "Endurance Race" },
      { result: "AIR 2", event: "Innovation Event" },
      { result: "AIR 2", event: "Validation Event" },
      { result: "AIR 5", event: "Acceleration Event" },
      { result: "AIR 7", event: "CAE Event" },
    ],
  },
  {
    id: "EV3",
    upcoming: false,
    summary: null,
    results: [
      { result: "AIR 7", event: "Overall" },
      { result: "AIR 4", event: "Design Event" },
      { result: "AIR 5", event: "CAE Event" },
      { result: "AIR 8", event: "Cost Event" },
      { result: "AIR 4", event: "Suspension and Traction Event" },
      { result: "AIR 8", event: "Maneuverability Event" },
      { result: "AIR 8", event: "Endurance Race" },
    ],
  },
  {
    id: "EV4",
    upcoming: false,
    summary: null,
    results: [
      { result: "AIR 7", event: "Overall" },
      { result: "AIR 1", event: "Sled Pull Event" },
      { result: "AIR 2", event: "Overall Dynamics" },
      { result: "AIR 4", event: "Suspension and Traction Event" },
      { result: "AIR 5", event: "Maneuverability Event" },
      { result: "AIR 6", event: "CAE Event" },
      { result: "AIR 8", event: "Endurance Race" },
    ],
  },
  {
    id: "EV5",
    upcoming: false,
    summary: null,
    results: [
      { result: "AIR 1", event: "Engineering Design Event" },
      { result: "AIR 1", event: "Sled Pull" },
      { result: "AIR 2", event: "Maneuverability" },
      { result: "AIR 3", event: "Overall Dynamics" },
      { result: "AIR 4", event: "CAE Event" },
      { result: "AIR 4", event: "Acceleration" },
      { result: "AIR 9", event: "Overall" },
    ],
  },
  {
    id: "EV6",
    upcoming: false,
    summary: null,
    results: [
      { result: "AIR 3", event: "Engineering Design Event" },
      { result: "AIR 7", event: "Sled Pull" },
      { result: "AIR 13", event: "Suspension and Traction" },
      { result: "AIR 5", event: "Innovation" },
      { result: "AIR 4", event: "CAE Event" },
      { result: "AIR 4", event: "Acceleration" },
      { result: "AIR 27", event: "Overall" },
    ],
  },
  {
    id: "EV7",
    upcoming: true,
    summary: "Details coming soon.",
    results: [],
  },
] as const;

export const SPONSORS = [
  { name: "Virya Electric Powertrains", tier: "title" },
  { name: "Metamorphosys Technologies", tier: "major" },
  { name: "ASAP Motorsports", tier: "major" },
  { name: "Orscheln", tier: "major" },
  { name: "Hexagon", tier: "major" },
  { name: "Cad and Cart", tier: "technical" },
  { name: "Altium", tier: "technical" },
  { name: "Fracktal Works", tier: "technical" },
  { name: "Pankaj Potentiometers", tier: "technical" },
  { name: "MATLAB", tier: "technical" },
  { name: "Beico Industries", tier: "technical" },
  { name: "EPLAN", tier: "technical" },
  { name: "Altair", tier: "technical" },
  { name: "Ansys", tier: "technical" },
  { name: "Bhor", tier: "technical" },
  { name: "JunoFast", tier: "technical" },
  { name: "Mosil Lubricants", tier: "supporting" },
  { name: "Scolarian", tier: "supporting" },
  { name: "C2M Engineering", tier: "supporting" },
] as const;

export type SponsorTier = (typeof SPONSORS)[number]["tier"];

export const GALLERY_CATEGORIES = [
  { id: "manufacturing", label: "Manufacturing", path: "/photos/manufacturing" },
  { id: "testing", label: "Testing", path: "/photos/testing" },
  { id: "competition", label: "Competition", path: "/photos/competition" },
] as const;

export const CAR_PAGE = {
  hero: {
    eyebrow: "Current Platform",
    title: "EV6",
    tagline:
      "Our latest electric off-road platform — engineered for competition, built by students, and refined through every lap at Techshila.",
    image: "/photos/competition/vehicle-showcase.jpg",
  },
  overview: {
    title: "Vehicle Overview",
    paragraphs: [
      "EV6 is Team Manipal Racing Electric's sixth-generation E-BAJA prototype — a lightweight electric off-road vehicle designed to excel across acceleration, maneuverability, endurance, and real-world terrain.",
      "Our design philosophy prioritises reliability, manufacturability, and competition readiness. Every subsystem is integrated into a cohesive platform that students design, build, and validate from the ground up.",
      "From concept sketches to the start line, EV6 represents years of iterative learning — each generation pushing further toward championship-caliber performance.",
    ],
    image: "/photos/testing/ev6.jpg",
  },
  highlights: [
    {
      icon: "⚡",
      title: "Electric Powertrain",
      description: "High-torque electric propulsion tuned for off-road acceleration, hill climb, and endurance events.",
    },
    {
      icon: "◎",
      title: "Data Acquisition System",
      description:
        "Custom data acquisition platform used for vehicle testing and performance analysis.",
    },
    {
      icon: "⬡",
      title: "Lightweight Chassis",
      description: "Purpose-built structure engineered for safety, agility, and competition durability.",
    },
    {
      icon: "◈",
      title: "Custom Electronics",
      description: "Integrated electrical systems designed for reliability in demanding race conditions.",
    },
    {
      icon: "🏁",
      title: "Competition-Tested Design",
      description: "Validated through intensive testing and refined across multiple competition seasons.",
    },
  ],
  focusAreas: [
    {
      title: "Performance",
      description: "Responsive power delivery and handling tuned for E-BAJA dynamic events.",
    },
    {
      title: "Reliability",
      description: "Engineered to endure repeated testing cycles and demanding endurance runs.",
    },
    {
      title: "Sustainability",
      description: "Zero-emission electric propulsion proving sustainable engineering can compete at the highest level.",
    },
    {
      title: "Driver Experience",
      description: "Ergonomic controls and predictable handling give drivers confidence on any terrain.",
    },
    {
      title: "Vehicle Dynamics",
      description: "Suspension and steering calibrated for unpredictable off-road surfaces and competition loads.",
    },
    {
      title: "Data Intelligence",
      description: "Logged and live vehicle data guide setup decisions and continuous improvement.",
    },
  ],
  competitionReady: {
    title: "Competition Ready",
    paragraphs: [
      "Designed from the ground up for E-BAJA SAE India — one of the nation's premier student engineering competitions.",
      "Every design cycle is validated through workshop testing, driver feedback, and on-track evaluation before competition.",
      "Built entirely by students at MIT Manipal, EV6 evolves with each season — continuously improved through real competition experience.",
    ],
    image: "/photos/competition/podium.jpg",
  },
} as const;

export type RoleBadge = "Captain" | "Vice Captain" | "Subsystem Head" | "Driver";

export type TeamMember = {
  name: string;
  role: string;
  badges?: readonly RoleBadge[];
  placeholder?: boolean;
};

export const LEADERSHIP: readonly TeamMember[] = [
  { name: "Akarsh P Poojary", role: "Captain" },
  { name: "Yashvardhan M", role: "Vice Captain" },
];

export const SUBSYSTEM_TEAMS = [
  {
    id: "vehicle-dynamics",
    title: "Vehicle Dynamics",
    members: [
      { name: "Brian D'Souza", role: "Subsystem Head" },
      { name: "Rajendra Sunki Reddy", role: "Member & Driver" },
      { name: "Yashvardhan M", role: "Vice Captain" },
    ],
  },
  {
    id: "transmission",
    title: "Transmission",
    members: [
      { name: "Shamith Krishna U G", role: "Subsystem Head" },
      { name: "Anant G Agarwal", role: "Member" },
    ],
  },
  {
    id: "data-acquisition",
    title: "Data Acquisition",
    members: [
      { name: "Shlok Chakravarthy", role: "Subsystem Head" },
      { name: "Mehul Chhibber", role: "Member" },
    ],
  },
  {
    id: "electronics",
    title: "Electronics",
    members: [
      { name: "Ananthakrishnan O.", role: "Subsystem Head" },
      { name: "Niyati Yadav", role: "Member" },
    ],
  },
  {
    id: "electric-powertrain",
    title: "Electric Powertrain",
    members: [{ name: "Arsh Dhar", role: "Subsystem Head" }],
  },
  {
    id: "research-and-development",
    title: "Research and Development",
    members: [
      { name: "Anish K", role: "Subsystem Head" },
      { name: "Karan Kumar", role: "Member" },
    ],
  },
  {
    id: "structures",
    title: "Structures",
    members: [
      { name: "Thushar P K", role: "Subsystem Head" },
      { name: "Akarsh P Poojary", role: "Captain" },
      { name: "Bijin Babu", role: "Member" },
    ],
  },
  {
    id: "management",
    title: "Management",
    members: [] as TeamMember[],
    emptyMessage: "No members currently assigned",
  },
] as const;

export const SOCIALS = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/teammanipalracing/",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/Team.Manipal.Racing/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/teammanipalracing/?originalSubdomain=in",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/user/TMRBAJA",
  },
] as const;

export type SocialId = (typeof SOCIALS)[number]["id"];

export function getSubsystem(slug: string) {
  return SUBSYSTEMS.find((s) => s.slug === slug);
}
