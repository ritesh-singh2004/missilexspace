export type ResearchPaper = {
  id: string;
  slug: string;
  title: string;
  category: 'Autonomous GN&C' | 'Sensor Fusion' | 'Digital Twin' | 'Hypersonics' | 'Propulsion';
  abstract: string;
  authors: string[];
  institution: string;
  date: string;
  doi: string;
  pages: number;
  trl: string;
  citations: number;
  format: string;
  size: string;
};

export type Publication = {
  id: string;
  title: string;
  type: string;
  date: string;
  pages: number;
  format: string;
  size: string;
  classification: string;
  summary: string;
};

export const researchPapers: ResearchPaper[] = [
  {
    id: 'rp-01',
    slug: 'sensor-fusion-multi-source',
    title: 'Sensor Fusion for Multi-Source Strategic Mission Planning',
    category: 'Sensor Fusion',
    abstract: 'Investigates decentralized Kalman filtering and transformer-based multi-modal sensor fusion across radar, infrared, and optical payloads for resilient terminal tracking under intense electronic countermeasure environments.',
    authors: ['Dr. Priya Sen', 'Arjun Varma', 'Dr. S. K. Nair'],
    institution: 'MissileX Research Directorate & DRDO Testbed',
    date: 'February 2026',
    doi: '10.1016/j.aerosp.2026.02.019',
    pages: 14,
    trl: 'TRL-5',
    citations: 38,
    format: 'PDF',
    size: '2.4 MB'
  },
  {
    id: 'rp-02',
    slug: 'guidance-envelope-modelling',
    title: 'Guidance Envelope Modelling for Hypersonic Interceptor Systems',
    category: 'Autonomous GN&C',
    abstract: 'Presents dynamic 6-DOF trajectory optimization models and finite-horizon predictive autopilot algorithms capable of managing terminal acceleration bounds up to 35G within high-altitude rarefied flow regimes.',
    authors: ['Nikhil Rao', 'Capt. R. Deshmukh', 'Dr. A. P. Chander'],
    institution: 'MissileX Guidance Lab & IISc Aerospace Dept',
    date: 'November 2025',
    doi: '10.1109/TAES.2025.091182',
    pages: 22,
    trl: 'TRL-6',
    citations: 54,
    format: 'PDF',
    size: '4.1 MB'
  },
  {
    id: 'rp-03',
    slug: 'digital-twin-architectures',
    title: 'Hardware-in-the-Loop Digital Twin Architectures for Reusable Launch Rehearsal',
    category: 'Digital Twin',
    abstract: 'Establishes a synchronized real-time digital twin pipeline bridging telemetry streams from Chandipur test firing ranges with high-fidelity aerodynamic flight computers for predictive vehicle health prognosis.',
    authors: ['Ananya Sharma', 'Arjun Varma', 'Vikramaditya Sahai'],
    institution: 'MissileX Flight Systems Directorate',
    date: 'August 2025',
    doi: '10.2514/1.A34891',
    pages: 18,
    trl: 'TRL-4',
    citations: 29,
    format: 'PDF',
    size: '3.6 MB'
  },
  {
    id: 'rp-04',
    slug: 'hypersonic-boundary-layer-transition',
    title: 'Hypersonic Boundary Layer Transition & Aero-Thermal Shielding at Mach 6+',
    category: 'Hypersonics',
    abstract: 'Direct numerical simulations (DNS) and shock-tunnel validation of ultra-high-temperature ceramic matrix composites (UHTCMC) under non-equilibrium stagnation enthalpy conditions.',
    authors: ['Dr. S. K. Nair', 'Nikhil Rao', 'Dr. Meera Nambiar'],
    institution: 'MissileX Propulsion Directorate & VSSC Collaboration',
    date: 'May 2025',
    doi: '10.1017/jfm.2025.402',
    pages: 26,
    trl: 'TRL-5',
    citations: 67,
    format: 'PDF',
    size: '5.2 MB'
  }
];

export const publications: Publication[] = [
  {
    id: 'pub-01',
    title: 'Annual Strategic Aerospace Research Report 2025-26',
    type: 'Institutional Gazette',
    date: 'March 2026',
    pages: 112,
    format: 'PDF',
    size: '14.8 MB',
    classification: 'Public Declassified',
    summary: 'Comprehensive review of national aerospace testbed throughput, guidance software milestones, and academic research grant allocations across Indian institutions.'
  },
  {
    id: 'pub-02',
    title: 'Cryogenic & Semi-Cryo Propulsion Testbed Findings Summary',
    type: 'Technical Monograph',
    date: 'January 2026',
    pages: 48,
    format: 'PDF',
    size: '6.4 MB',
    classification: 'Public Educational',
    summary: 'Hot-fire ignition data, chamber acoustic vibration telemetry, and closed-loop regenerative cooling performance metrics for 2000 kN thrust engines.'
  },
  {
    id: 'pub-03',
    title: 'AI Autonomous Flight Planning Lab — Strategic Five-Year Roadmap',
    type: 'Programme Blueprint',
    date: 'November 2025',
    pages: 36,
    format: 'PDF',
    size: '4.2 MB',
    classification: 'Public Policy',
    summary: 'Decadal architecture for sovereign autonomous navigation stacks, swarm communications protocols, and edge inference verification standards.'
  }
];
