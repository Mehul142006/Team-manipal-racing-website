export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Vehicle", href: "#vehicle" },
  { label: "Performance", href: "#performance" },
  { label: "Technology", href: "#technology" },
  { label: "Timeline", href: "#timeline" },
  { label: "Gallery", href: "#gallery" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Contact", href: "#contact" },
] as const;

export const PERFORMANCE_METRICS = [
  { label: "Top Speed", value: 65.33, unit: "km/h", decimals: 2 },
  { label: "Maximum Acceleration", value: 8.46, unit: "m/s²", decimals: 2 },
  { label: "Gradeability", value: 85.91, unit: "%", decimals: 2 },
  { label: "Maximum Torque", value: 712.14, unit: "Nm", decimals: 2 },
  { label: "Motor Peak Torque", value: 65, unit: "Nm", decimals: 0 },
  { label: "Peak Power", value: 9, unit: "kW", decimals: 0 },
  { label: "Nominal Power", value: 6, unit: "kW", decimals: 0 },
  {
    label: "Battery",
    value: 50.4,
    unit: "V 78Ah",
    decimals: 1,
    prefix: "",
    displaySuffix: true,
  },
] as const;

export const VEHICLE_STATS = [
  { label: "Vehicle Weight", value: 230, unit: "kg", decimals: 0 },
  { label: "Front Wheel Travel", value: 277, unit: "mm", decimals: 0 },
  { label: "Rear Wheel Travel", value: 263, unit: "mm", decimals: 0 },
  { label: "Wheelbase", value: 1248, unit: "mm", decimals: 0 },
  { label: "Front Track Width", value: 1350, unit: "mm", decimals: 0 },
  { label: "Rear Track Width", value: 1280, unit: "mm", decimals: 0 },
] as const;

export const VEHICLE_VIEWS = [
  {
    id: "front",
    label: "Front View",
    src: "/vehicle/front.svg",
    alt: "Team Manipal Racing Electric — front view",
  },
  {
    id: "side",
    label: "Side View",
    src: "/vehicle/side.svg",
    alt: "Team Manipal Racing Electric — side view",
  },
  {
    id: "top",
    label: "Top View",
    src: "/vehicle/top.svg",
    alt: "Team Manipal Racing Electric — top view",
  },
] as const;

export const TIMELINE_EVENTS = [
  {
    year: "2015",
    title: "Team Formation",
    description:
      "Team Manipal Racing Electric was founded at MIT Manipal with a vision to compete at the highest level of student motorsport.",
  },
  {
    year: "2018–2023",
    title: "Previous BAJA Seasons",
    description:
      "Multiple competitive seasons in BAJA SAE India, building expertise in off-road vehicle design, manufacturing, and endurance racing.",
  },
  {
    year: "2024",
    title: "EV Transition",
    description:
      "Strategic pivot to electric powertrains — re-engineering the entire platform for sustainable, high-performance off-road racing.",
  },
  {
    year: "2025",
    title: "BAJA SAE INDIA 2025",
    description:
      "Competing with a fully electric eBAJA prototype featuring advanced telemetry, BMS integration, and data-driven engineering.",
  },
  {
    year: "Future",
    title: "Future Goals",
    description:
      "Pushing boundaries in electric off-road racing, autonomous systems integration, and international Formula Student competition.",
  },
] as const;

export const TECHNOLOGY_ITEMS = [
  {
    title: "STM32 ECU",
    description:
      "Central electronic control unit processing real-time vehicle data and executing control algorithms for optimal performance.",
    icon: "cpu",
  },
  {
    title: "CAN Bus Communication",
    description:
      "High-speed controller area network enabling seamless communication between ECU, BMS, motor controller, and sensors.",
    icon: "network",
  },
  {
    title: "BMS",
    description:
      "Battery Management System monitoring cell voltages, temperatures, and state of charge for safe, efficient power delivery.",
    icon: "battery",
  },
  {
    title: "PMSM Motor",
    description:
      "Permanent Magnet Synchronous Motor delivering peak torque with high efficiency for demanding off-road conditions.",
    icon: "motor",
  },
  {
    title: "Telemetry System",
    description:
      "Real-time data streaming from vehicle to pit crew enabling live performance analysis and strategic decisions.",
    icon: "signal",
  },
  {
    title: "ESP8266 Wireless Monitoring",
    description:
      "Wireless module providing remote sensor data access and over-the-air diagnostics during testing and competition.",
    icon: "wifi",
  },
  {
    title: "DAQ System",
    description:
      "Data Acquisition System capturing high-frequency sensor readings for post-run analysis and vehicle optimization.",
    icon: "chart",
  },
] as const;

export const SENSORS = [
  {
    title: "Load Cell",
    description:
      "Measures suspension load forces in real time, enabling precise tuning of spring rates and damper settings for optimal traction.",
    data: "Force (N)",
  },
  {
    title: "Strain Gauge",
    description:
      "Monitors structural strain on chassis components, validating FEA models and ensuring safety under extreme loads.",
    data: "Strain (με)",
  },
  {
    title: "IMU",
    description:
      "Inertial Measurement Unit tracks acceleration, angular velocity, and orientation for dynamics analysis and stability control.",
    data: "Accel · Gyro · Yaw",
  },
  {
    title: "Temperature Sensors",
    description:
      "Continuous monitoring of motor, battery, and controller temperatures to prevent thermal derating and ensure reliability.",
    data: "Temperature (°C)",
  },
  {
    title: "Inductive Sensors",
    description:
      "Non-contact proximity sensing for wheel speed, gear position, and rotational component monitoring without wear.",
    data: "RPM · Position",
  },
  {
    title: "Laser Sensors",
    description:
      "High-precision distance measurement for ride height, obstacle detection, and suspension geometry validation.",
    data: "Distance (mm)",
  },
  {
    title: "Shock Potentiometers",
    description:
      "Tracks suspension travel dynamically, correlating damper performance with terrain inputs for setup optimization.",
    data: "Travel (mm)",
  },
] as const;

export const SPONSORS = [
  "Bosch",
  "Ansys",
  "Altair",
  "Dassault Systèmes",
  "Mahindra",
  "Tata Motors",
  "Shell",
  "SKF",
  "Continental",
  "Moog",
  "Michelin",
  "Red Bull",
] as const;

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Track Testing",
    aspect: "tall",
    gradient: "from-red-900/40 via-black to-zinc-900",
  },
  {
    id: 2,
    title: "Pit Lane",
    aspect: "wide",
    gradient: "from-zinc-900 via-red-950/30 to-black",
  },
  {
    id: 3,
    title: "Chassis Assembly",
    aspect: "square",
    gradient: "from-black via-zinc-800 to-red-900/20",
  },
  {
    id: 4,
    title: "Suspension Tuning",
    aspect: "square",
    gradient: "from-red-950/30 via-black to-zinc-900",
  },
  {
    id: 5,
    title: "Endurance Run",
    aspect: "wide",
    gradient: "from-zinc-900 via-black to-red-900/30",
  },
  {
    id: 6,
    title: "Team Briefing",
    aspect: "tall",
    gradient: "from-black via-red-900/20 to-zinc-800",
  },
  {
    id: 7,
    title: "Electronics Bay",
    aspect: "square",
    gradient: "from-zinc-800 via-black to-red-950/40",
  },
  {
    id: 8,
    title: "BAJA SAE India",
    aspect: "wide",
    gradient: "from-red-900/30 via-zinc-900 to-black",
  },
] as const;
