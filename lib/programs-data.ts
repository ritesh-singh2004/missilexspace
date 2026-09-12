export type AgencyCode = 'ISRO' | 'NASA' | 'ESA' | 'JAXA' | 'DLR' | 'COMMERCIAL';

export type ProgramMilestone = {
  step: number;
  title: string;
  phase: string;
  deliverable: string;
  dueDate: string; // ISO date string (YYYY-MM-DD)
  weight: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  criteria: string;
};

export type GlobalProgram = {
  id: string;
  slug: string;
  title: string;
  agency: AgencyCode;
  agencyName: string;
  country: string;
  countryCode: string;
  category: 'Fellowship' | 'Hardware Challenge' | 'Avionics Hackathon' | 'SAR Telemetry' | 'Student Satellite';
  level: 'Undergraduate' | 'Postgraduate' | 'Doctoral / Early Career';
  funding: string;
  duration: string;
  intakeStatus: 'INTAKE_OPEN' | 'COHORT_ACTIVE' | 'EVALUATING';
  deadline: string; // ISO date string (YYYY-MM-DD)
  milestones: ProgramMilestone[];
  enrolledCount: number;
  onTimeRate: string;
  description: string;
  skillsRequired: string[];
  officialUrl: string;
  featured?: boolean;
};

export const globalPrograms: GlobalProgram[] = [
  {
    id: 'PRG-ISRO-01',
    slug: 'isro-start-deep-space',
    title: 'ISRO START: Space Science & Planetary Exploration Training',
    agency: 'ISRO',
    agencyName: 'Indian Space Research Organisation',
    country: 'India',
    countryCode: 'IN',
    category: 'Fellowship',
    level: 'Undergraduate',
    funding: '₹1,50,000 Research Grant',
    duration: '6 Months (Hybrid)',
    intakeStatus: 'INTAKE_OPEN',
    deadline: '2026-10-31',
    milestones: [
      {
        step: 1,
        title: 'Mission Concept Proposal',
        phase: 'PDR-1',
        deliverable: '10-Page Planetary Science Instrument Proposal & Sensor Architecture',
        dueDate: '2026-11-20',
        weight: '20%',
        status: 'UPCOMING',
        criteria: 'Instrument payload mass < 4.5kg, radiation tolerance > 50 krad'
      },
      {
        step: 2,
        title: 'Thermal & Structural Simulation Deck',
        phase: 'PDR-2',
        deliverable: 'Finite Element Analysis (FEA) and Lunar South Pole Thermal Simulation (.step / .fem)',
        dueDate: '2026-12-18',
        weight: '30%',
        status: 'UPCOMING',
        criteria: 'Cryogenic survivability between 40K and 390K verified'
      },
      {
        step: 3,
        title: 'Avionics Telemetry Integration',
        phase: 'CDR-1',
        deliverable: 'MIL-STD-1553B / CAN-Bus flight telemetry interface simulator in C/C++',
        dueDate: '2027-01-25',
        weight: '30%',
        status: 'UPCOMING',
        criteria: 'Zero telemetry frame drops over 72-hour sustained test bench run'
      },
      {
        step: 4,
        title: 'Final Telemetry Defense & URSC Evaluation',
        phase: 'FINAL',
        deliverable: 'Live Hardware-in-the-Loop demonstration at URSC Bengaluru',
        dueDate: '2027-03-10',
        weight: '20%',
        status: 'UPCOMING',
        criteria: 'Approved by URSC ISRO Directorate technical review committee'
      }
    ],
    enrolledCount: 184,
    onTimeRate: '97.2%',
    description: 'Premier national program providing postgraduate and final-year undergraduate students with direct access to Chandrayaan-3 and Aditya-L1 primary telemetry datasets for planetary instrument development.',
    skillsRequired: ['Thermal Analysis', 'Python / NumPy', 'FEA Modeling', 'Spacecraft Avionics'],
    officialUrl: 'https://isro.gov.in',
    featured: true
  },
  {
    id: 'PRG-NASA-02',
    slug: 'nasa-artemis-student-challenge',
    title: 'NASA Artemis: Autonomous Lunar Landing Guidance Challenge',
    agency: 'NASA',
    agencyName: 'National Aeronautics and Space Administration',
    country: 'United States',
    countryCode: 'US',
    category: 'Avionics Hackathon',
    level: 'Postgraduate',
    funding: '$12,500 Team Award',
    duration: '4 Months (Virtual)',
    intakeStatus: 'INTAKE_OPEN',
    deadline: '2026-11-15',
    milestones: [
      {
        step: 1,
        title: '6-DOF Trajectory Optimization',
        phase: 'PDR',
        deliverable: 'Nonlinear optimal guidance algorithm in MATLAB/Simulink or Julia',
        dueDate: '2026-12-05',
        weight: '25%',
        status: 'UPCOMING',
        criteria: 'Target landing velocity < 1.2 m/s with 3-sigma dispersed terrain'
      },
      {
        step: 2,
        title: 'Optical Terrain Relative Navigation (TRN)',
        phase: 'CDR',
        deliverable: 'Edge-quantized crater detection neural network running at > 30 FPS',
        dueDate: '2027-01-15',
        weight: '40%',
        status: 'UPCOMING',
        criteria: 'Circular Error Probable (CEP) < 2.0 meters in shadowed lunar craters'
      },
      {
        step: 3,
        title: 'Hardware-in-the-Loop Flight Verification',
        phase: 'FINAL',
        deliverable: 'Flight computer binary tested against NASA simulation testbed',
        dueDate: '2027-02-28',
        weight: '35%',
        status: 'UPCOMING',
        criteria: '100% Monte Carlo success across 5,000 simulated descent runs'
      }
    ],
    enrolledCount: 96,
    onTimeRate: '94.8%',
    description: 'International collegiate engineering challenge designing autonomous descent guidance and hazard detection for human-rated lunar landers descending into the Lunar South Pole Shackleton Crater.',
    skillsRequired: ['Optimal Control', 'ROS 2', 'C++20', 'Simulink', 'Computer Vision'],
    officialUrl: 'https://nasa.gov/stem',
    featured: true
  },
  {
    id: 'PRG-ESA-03',
    slug: 'esa-fly-your-thesis-microgravity',
    title: 'ESA Academy: Fly Your Thesis! Microgravity Research Campaign',
    agency: 'ESA',
    agencyName: 'European Space Agency',
    country: 'Europe',
    countryCode: 'EU',
    category: 'Hardware Challenge',
    level: 'Doctoral / Early Career',
    funding: '€25,000 Flight Campaign Grant',
    duration: '10 Months (ESTEC & Bordeaux)',
    intakeStatus: 'INTAKE_OPEN',
    deadline: '2026-12-01',
    milestones: [
      {
        step: 1,
        title: 'Experiment Safety & Feasibility Review',
        phase: 'ESR',
        deliverable: 'Experiment Safety Dossier (ESD) compliant with Novespace A310 Zero-G safety standards',
        dueDate: '2026-12-22',
        weight: '25%',
        status: 'UPCOMING',
        criteria: 'Structural integrity certified for 9g emergency deceleration load'
      },
      {
        step: 2,
        title: 'Preliminary Design Review (PDR)',
        phase: 'PDR',
        deliverable: 'Complete 3D CAD assembly, fluid containment schematic, and power budget',
        dueDate: '2027-02-10',
        weight: '25%',
        status: 'UPCOMING',
        criteria: 'Total mass under 120 kg, power draw < 1.8 kW peak'
      },
      {
        step: 3,
        title: 'Critical Design Review & Bench Testing',
        phase: 'CDR',
        deliverable: 'Hardware breadboard test logs and electromagnetic compatibility (EMC) reports',
        dueDate: '2027-04-15',
        weight: '30%',
        status: 'UPCOMING',
        criteria: 'Successful 20-second simulated 0-g test with zero fluid leakage'
      },
      {
        step: 4,
        title: 'Parabolic Flight Campaign in Bordeaux',
        phase: 'FLIGHT',
        deliverable: '30 Parabolic flight cycles aboard Novespace Zero-G aircraft and telemetry report',
        dueDate: '2027-06-30',
        weight: '20%',
        status: 'UPCOMING',
        criteria: 'Publication of peer-reviewed data paper in ESA Space Science series'
      }
    ],
    enrolledCount: 42,
    onTimeRate: '98.5%',
    description: 'Fully funded microgravity experimentation campaign where university teams build and fly custom physical science experiments aboard the Novespace Airbus A310 Zero-G aircraft.',
    skillsRequired: ['Fluid Dynamics', 'Mechanical CAD', 'LabVIEW / DAQ', 'Safety Engineering'],
    officialUrl: 'https://esa.int/Education',
    featured: false
  },
  {
    id: 'PRG-JAXA-04',
    slug: 'jaxa-kibo-robot-programming-challenge',
    title: 'JAXA Kibo-RPC: ISS Astrobee Autonomous Guidance Sprint',
    agency: 'JAXA',
    agencyName: 'Japan Aerospace Exploration Agency',
    country: 'Japan',
    countryCode: 'JP',
    category: 'Avionics Hackathon',
    level: 'Undergraduate',
    funding: 'JAXA Tsukuba Flight Fellowship',
    duration: '3 Months (Virtual & Tsukuba)',
    intakeStatus: 'INTAKE_OPEN',
    deadline: '2026-10-25',
    milestones: [
      {
        step: 1,
        title: 'Simulator Flight Qualification',
        phase: 'QUAL',
        deliverable: 'ROS/Android code operating inside JAXA Kibo-RPC digital twin environment',
        dueDate: '2026-11-10',
        weight: '30%',
        status: 'UPCOMING',
        criteria: 'Complete obstacle course navigation in < 180 seconds without collision'
      },
      {
        step: 2,
        title: 'QR Code Laser Target Targeting',
        phase: 'TARGET',
        deliverable: 'Real-time OpenCV marker tracking and simulated laser pointer calibration',
        dueDate: '2026-12-05',
        weight: '40%',
        status: 'UPCOMING',
        criteria: 'Center-point hit accuracy within 5 mm at 1.5 meter standoff distance'
      },
      {
        step: 3,
        title: 'Final Telemetry Run Aboard ISS',
        phase: 'ISS_RUN',
        deliverable: 'Live execution on physical Astrobee robot in the ISS Japanese Experiment Module',
        dueDate: '2027-01-20',
        weight: '30%',
        status: 'UPCOMING',
        criteria: 'Broadcasted live from JAXA Tsukuba Space Center mission control'
      }
    ],
    enrolledCount: 210,
    onTimeRate: '95.1%',
    description: 'Students write autonomous flight guidance and machine vision algorithms for NASA/JAXA Astrobee free-flying robotic assistants inside the International Space Station (ISS).',
    skillsRequired: ['ROS', 'OpenCV', 'Java / Android', 'SLAM Algorithms'],
    officialUrl: 'https://iss.jaxa.jp/en/kuoa/kibo_rpc/',
    featured: true
  },
  {
    id: 'PRG-ISRO-05',
    slug: 'isro-respond-cryogenic-cfd',
    title: 'ISRO RESPOND: Semi-Cryogenic Combustion & Regenerative Cooling',
    agency: 'ISRO',
    agencyName: 'Indian Space Research Organisation',
    country: 'India',
    countryCode: 'IN',
    category: 'Fellowship',
    level: 'Doctoral / Early Career',
    funding: '₹3,50,000 Institutional Fellowship',
    duration: '12 Months (LPSC Mahendragiri & Campus)',
    intakeStatus: 'COHORT_ACTIVE',
    deadline: '2026-11-30',
    milestones: [
      {
        step: 1,
        title: 'Combustion Chamber Geometry & Mesh Refinement',
        phase: 'PHASE-1',
        deliverable: 'Polyhedral grid mesh model with y+ < 1 near-wall boundary layer resolution',
        dueDate: '2026-12-15',
        weight: '25%',
        status: 'UPCOMING',
        criteria: 'Validated against NASA SP-8087 cryogenic benchmark experiments'
      },
      {
        step: 2,
        title: 'Conjugate Heat Transfer (CHT) Modeling',
        phase: 'PHASE-2',
        deliverable: 'Coupled 3D supercritical RP-1 coolant channel thermal dissipation model',
        dueDate: '2027-02-28',
        weight: '35%',
        status: 'UPCOMING',
        criteria: 'Predicted nozzle throat wall temperature deviation < 35 K'
      },
      {
        step: 3,
        title: 'Acoustic Combustion Instability Analysis',
        phase: 'PHASE-3',
        deliverable: 'Helmholtz resonator damping analysis and transverse pressure mode harmonics',
        dueDate: '2027-05-30',
        weight: '40%',
        status: 'UPCOMING',
        criteria: 'Presented to LPSC Propulsion Directorate review panel'
      }
    ],
    enrolledCount: 28,
    onTimeRate: '99.0%',
    description: 'Advanced academic research grant for postgraduate researchers solving liquid oxygen and kerosene (ISROSENE) turbulent heat transfer for 2000 kN semi-cryogenic rocket stages.',
    skillsRequired: ['ANSYS Fluent / OpenFOAM', 'Cryogenics', 'Thermodynamics', 'High-Performance Computing'],
    officialUrl: 'https://isro.gov.in/RESPOND.html',
    featured: false
  },
  {
    id: 'PRG-AXIOM-06',
    slug: 'axiom-commercial-orbital-avionics',
    title: 'Axiom Space: Commercial Orbital Station Fault-Tolerant Avionics',
    agency: 'COMMERCIAL',
    agencyName: 'Axiom Space / International Consortium',
    country: 'International',
    countryCode: 'GLOBAL',
    category: 'Avionics Hackathon',
    level: 'Postgraduate',
    funding: '$15,000 Commercial Innovation Prize',
    duration: '5 Months (Hybrid)',
    intakeStatus: 'INTAKE_OPEN',
    deadline: '2026-12-15',
    milestones: [
      {
        step: 1,
        title: 'Triple Modular Redundancy (TMR) Architecture',
        phase: 'ARCH',
        deliverable: 'Byzantine fault-tolerant voter circuit and voting software in Rust',
        dueDate: '2027-01-10',
        weight: '30%',
        status: 'UPCOMING',
        criteria: 'Zero unhandled single-event upsets (SEU) in cosmic ray radiation simulation'
      },
      {
        step: 2,
        title: 'Real-Time Telemetry Streaming Bus',
        phase: 'BUS',
        deliverable: 'Zero-copy high-throughput telemetry multiplexer handling 100k msgs/sec',
        dueDate: '2027-02-20',
        weight: '35%',
        status: 'UPCOMING',
        criteria: 'Maximum 99th-percentile dispatch latency < 250 microseconds'
      },
      {
        step: 3,
        title: 'Docking Guidance Simulation Rehearsal',
        phase: 'DEFENSE',
        deliverable: 'Full orbital rendezvous and proximity operations (RPO) simulation report',
        dueDate: '2027-04-10',
        weight: '35%',
        status: 'UPCOMING',
        criteria: 'Defended before Axiom Space avionics flight directors'
      }
    ],
    enrolledCount: 64,
    onTimeRate: '96.0%',
    description: 'Commercial space station fellowship designing mission-critical software kernels, cosmic-ray resilient voting circuits, and high-frequency life-support telemetry buses.',
    skillsRequired: ['Rust', 'Embedded Linux / RTOS', 'Fault Tolerance', 'Network Protocols'],
    officialUrl: 'https://axiomspace.com',
    featured: false
  },
  {
    id: 'PRG-SKYROOT-07',
    slug: 'skyroot-composite-rocket-stage',
    title: 'Skyroot Aerospace: Carbon-Composite Rocket Stage Optimization',
    agency: 'COMMERCIAL',
    agencyName: 'Skyroot Aerospace',
    country: 'India',
    countryCode: 'IN',
    category: 'Hardware Challenge',
    level: 'Undergraduate',
    funding: '₹2,00,000 Fellowship + Placement Fast-Track',
    duration: '4 Months (Hyderabad & Campus)',
    intakeStatus: 'INTAKE_OPEN',
    deadline: '2026-11-10',
    milestones: [
      {
        step: 1,
        title: 'Filament Winding Pattern Synthesis',
        phase: 'DES-1',
        deliverable: 'Geodesic trajectory winding simulation for carbon-fiber motor casing',
        dueDate: '2026-11-30',
        weight: '30%',
        status: 'UPCOMING',
        criteria: 'Structural burst pressure margin > 1.6x operating chamber pressure'
      },
      {
        step: 2,
        title: 'Composite Failure Prediction Model',
        phase: 'DES-2',
        deliverable: 'Tsai-Wu and Hashin failure criterion calculations under aerothermal loads',
        dueDate: '2026-12-28',
        weight: '40%',
        status: 'UPCOMING',
        criteria: 'Hydrostatic proof test correlation error < 4%'
      },
      {
        step: 3,
        title: 'Hardware Proof Test at Skyroot Propulsion Rig',
        phase: 'TEST',
        deliverable: 'Physical coupon hydro-burst test review at Hyderabad test range',
        dueDate: '2027-02-15',
        weight: '30%',
        status: 'UPCOMING',
        criteria: 'Direct presentation to Skyroot Chief Rocket Architect'
      }
    ],
    enrolledCount: 112,
    onTimeRate: '97.8%',
    description: 'Work alongside leading NewSpace engineers to design, simulate, and stress-test ultra-lightweight carbon-composite solid rocket motor casings for the Vikram launch vehicle family.',
    skillsRequired: ['Composite Materials', 'Finite Element Analysis', 'SolidWorks / Abaqus', 'Manufacturing'],
    officialUrl: 'https://skyroot.in',
    featured: true
  },
  {
    id: 'PRG-PLANET-08',
    slug: 'planet-synthetic-aperture-radar',
    title: 'Planet Labs: Earth Observation SAR & Optical Data Challenge',
    agency: 'COMMERCIAL',
    agencyName: 'Planet Labs Geospatial Consortium',
    country: 'International',
    countryCode: 'GLOBAL',
    category: 'SAR Telemetry',
    level: 'Undergraduate',
    funding: '$8,000 Cloud Compute & Data Grant',
    duration: '3 Months (Virtual)',
    intakeStatus: 'INTAKE_OPEN',
    deadline: '2026-10-28',
    milestones: [
      {
        step: 1,
        title: 'Multi-Temporal Imagery Ingestion Pipeline',
        phase: 'PIPE',
        deliverable: 'Automated orthorectification and cloud-masking pipeline in Python/GDAL',
        dueDate: '2026-11-12',
        weight: '30%',
        status: 'UPCOMING',
        criteria: 'Processes 500 square km per hour on GPU instance'
      },
      {
        step: 2,
        title: 'Deep Learning Change Detection Model',
        phase: 'MODEL',
        deliverable: 'Siamese Vision Transformer detecting maritime shipping and runway changes',
        dueDate: '2026-12-10',
        weight: '40%',
        status: 'UPCOMING',
        criteria: 'F1 Score > 0.92 on high-contrast satellite benchmarks'
      },
      {
        step: 3,
        title: 'Real-Time Edge Deployment Demonstration',
        phase: 'DEPLOY',
        deliverable: 'Quantized ONNX model running under 15W edge compute envelope',
        dueDate: '2027-01-15',
        weight: '30%',
        status: 'UPCOMING',
        criteria: 'Sub-second inference on satellite bus flight hardware'
      }
    ],
    enrolledCount: 148,
    onTimeRate: '96.2%',
    description: 'Harness high-cadence 3-meter satellite constellation imagery to create automated computer vision pipelines tracking maritime logistics, environmental anomalies, and infrastructure expansion.',
    skillsRequired: ['Python', 'PyTorch', 'GIS / Remote Sensing', 'Computer Vision'],
    officialUrl: 'https://planet.com',
    featured: false
  }
];

export const velocityMetrics = [
  {
    label: 'Global Agencies & Consortia',
    value: '06',
    subtext: 'ISRO, NASA, ESA, JAXA, DLR, NewSpace',
    badge: 'ACTIVE COHORTS'
  },
  {
    label: 'Verified International Programs',
    value: '14+',
    subtext: 'Research fellowships & flight challenges',
    badge: 'UPDATED WEEKLY'
  },
  {
    label: 'On-Time Milestone Velocity',
    value: '96.8%',
    subtext: 'Student cohorts hitting PDR/CDR targets',
    badge: 'VERIFIED TIMESTAMPS'
  },
  {
    label: 'Research Grants & Awards',
    value: '₹4.8 Cr+',
    subtext: 'Total institutional stipends & cloud compute',
    badge: 'DIRECT DISBURSEMENT'
  }
];
