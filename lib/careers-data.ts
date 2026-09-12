export type CadreRole = {
  id: string;
  title: string;
  cadreCode: string;
  department: 'guidance' | 'ai' | 'propulsion' | 'cyber' | 'software';
  departmentLabel: string;
  location: string;
  clearance: string;
  stipend: string;
  summary: string;
  techStack: string[];
  responsibilities: string[];
  featured?: boolean;
};

export const cadreRoles: CadreRole[] = [
  {
    id: 'research-engineer',
    title: 'Aerospace Research Engineer (GN&C)',
    cadreCode: 'CADRE-GNC-01',
    department: 'guidance',
    departmentLabel: 'Guidance & Navigation',
    location: 'Noida HQ / Bengaluru Hybrid',
    clearance: 'Level-2 Sovereign',
    stipend: '₹22L – ₹30L CTC + Fellowship Grant',
    summary: 'Lead mathematical modeling and 6-DOF simulation of terminal guidance laws, proportional navigation algorithms, and hardware-in-the-loop (HIL) flight computer validation.',
    techStack: ['C++20', 'Simulink', 'RTOS', 'EKF Kalman', 'OpenFOAM'],
    responsibilities: [
      'Design adaptive finite-horizon predictive autopilot algorithms under 35G high-load regimes.',
      'Calibrate hardware-in-the-loop test benches with real-time telemetry from Chandipur range firings.',
      'Author technical reports for DRDO/ISRO peer review panels.'
    ],
    featured: true
  },
  {
    id: 'ai-engineer',
    title: 'AI Sensor Fusion & Edge Inference Specialist',
    cadreCode: 'CADRE-AI-02',
    department: 'ai',
    departmentLabel: 'Autonomous Systems',
    location: 'Bengaluru Propulsion & AI Labs',
    clearance: 'Level-2 Sovereign',
    stipend: '₹24L – ₹34L CTC + GPU Rig Allocation',
    summary: 'Develop sub-10ms edge neural networks fusing radar, infrared radiometry, and electro-optical telemetry for resilient autonomous flight planning in contested airspace.',
    techStack: ['PyTorch', 'TensorRT', 'CUDA', 'Transformer Fusion', 'ROS 2'],
    responsibilities: [
      'Quantize and deploy vision transformers on radiation-tolerant FPGA / embedded GPU payloads.',
      'Implement decentralized state estimators for multi-sensor target verification.',
      'Optimize edge inference latency to under 8.4 milliseconds per frame.'
    ]
  },
  {
    id: 'software-engineer',
    title: 'Flight Software & Telemetry Platform Engineer',
    cadreCode: 'CADRE-SW-03',
    department: 'software',
    departmentLabel: 'Flight Systems Software',
    location: 'Noida HQ',
    clearance: 'Level-2 Sovereign',
    stipend: '₹18L – ₹26L CTC',
    summary: 'Architect mission-critical ground telemetry ingestion pipelines, high-throughput time-series databases, and real-time digital twin visualization dashboards.',
    techStack: ['Rust', 'Go', 'TypeScript', 'Next.js', 'TimescaleDB', 'Kafka'],
    responsibilities: [
      'Build fault-tolerant ingestion pipelines handling 50,000 telemetry events per second.',
      'Develop real-time 3D flight trajectory visualizers for orbital and sub-orbital flight rehearsals.',
      'Maintain automated verification test suites matching DO-178C airborne software standards.'
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Defence & Telemetry Cryptography Analyst',
    cadreCode: 'CADRE-SEC-04',
    department: 'cyber',
    departmentLabel: 'Cyber Defence Directorate',
    location: 'Noida HQ / Remote Support',
    clearance: 'Level-3 Secret',
    stipend: '₹20L – ₹28L CTC',
    summary: 'Fortify down-range telemetry streams, authenticate ground-station uplinks, and audit cryptographic key rotation pipelines across national aerospace testbed links.',
    techStack: ['Post-Quantum Cryptography', 'TLS 1.3', 'Wireshark', 'Rust', 'Linux Kernel'],
    responsibilities: [
      'Perform protocol fuzzing and vulnerability analysis on airborne datalinks.',
      'Implement hardware security module (HSM) key distribution architectures.',
      'Conduct active adversary simulation across ground communication relays.'
    ]
  },
  {
    id: 'propulsion-engineer',
    title: 'Propulsion & Aerothermodynamics Analyst',
    cadreCode: 'CADRE-PROP-05',
    department: 'propulsion',
    departmentLabel: 'Propulsion Directorate',
    location: 'Bengaluru / Sriharikota Liaison',
    clearance: 'Level-2 Sovereign',
    stipend: '₹22L – ₹32L CTC + Testbed Allowance',
    summary: 'Model combustion acoustics, supersonic nozzle boundary layers, and regenerative cryogenic cooling dynamics for liquid and semi-cryo rocket stages.',
    techStack: ['ANSYS Fluent', 'OpenFOAM', 'Cryogenics', 'Thermodynamics', 'Fortran/C++'],
    responsibilities: [
      'Simulate 200 kN semi-cryogenic combustion instability in high-pressure LOX/kerosene thrust chambers.',
      'Perform aero-thermal analysis of reentry shockwaves exceeding Mach 6 at high atmospheric angles of attack.',
      'Validate testbed heat-flux sensors during static hot-fire engine runs at Mahendragiri.'
    ]
  }
];
