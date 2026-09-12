'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Cpu,
  Satellite,
  Radio,
  ShieldAlert,
  Network,
  Activity,
  Layers,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  FileCode2,
  Sliders,
  CheckCircle2,
  Terminal,
  Zap
} from 'lucide-react';
import PageBanner from '@/components/patterns/PageBanner';

type TechTrack = {
  id: string;
  title: string;
  category: string;
  icon: any;
  trl: 'TRL-3' | 'TRL-4' | 'TRL-5' | 'TRL-6';
  trlLabel: string;
  arch: string;
  summary: string;
  specs: { label: string; value: string }[];
  highlight?: boolean;
};

const techTracks: TechTrack[] = [
  {
    id: 'sensor-fusion',
    title: 'Sensor Fusion & Multi-Spectral Target Acquisition',
    category: 'Target Tracking',
    icon: Cpu,
    trl: 'TRL-5',
    trlLabel: 'Hardware-in-Loop Validated',
    arch: 'Extended Kalman & Transformer Deep Fusion',
    summary: 'Decentralized state estimation fusing 94 GHz millimeter-wave radar returns with mid-wave thermal infrared (MWIR) and electro-optical feeds for high-fidelity situational awareness in GPS-contested flight corridors.',
    specs: [
      { label: 'Compute Latency', value: '< 8.4 ms' },
      { label: 'Tracking Accuracy', value: '0.12 mrad' },
      { label: 'Throughput', value: '120 frames/sec' },
      { label: 'EW Resilience', value: 'Class-4 ECCM' }
    ],
    highlight: true
  },
  {
    id: 'mission-planning',
    title: 'Autonomous Trajectory & Mission Re-Planning AI',
    category: 'Avionics GN&C',
    icon: Compass,
    trl: 'TRL-4',
    trlLabel: 'High-Fidelity Simulated',
    arch: 'Hierarchical Task Network (HTN) & PPO Reinforcement',
    summary: 'Dynamic 6-DOF trajectory re-computation in flight, adapting to atmospheric perturbations, dynamic no-fly airspace boundaries, and propellant consumption curves.',
    specs: [
      { label: 'Re-Planning Cycle', value: '15 ms' },
      { label: 'G-Load Tolerance', value: 'Up to 35G' },
      { label: 'State Vectors', value: '18 Parameters' }
    ]
  },
  {
    id: 'satellite-sar',
    title: 'Satellite SAR Telemetry & Orbital Downlink AI',
    category: 'Space Systems',
    icon: Satellite,
    trl: 'TRL-6',
    trlLabel: 'Operational Prototype',
    arch: 'Self-Supervised Vision Transformer (ViT)',
    summary: 'Onboard edge inference pipeline that cleans, compresses, and detects surface anomalies directly on the satellite payload before low-bandwidth S-band telemetry downlink.',
    specs: [
      { label: 'Compression Ratio', value: '4.8× Lossless' },
      { label: 'Inference Power', value: '< 15 Watts' },
      { label: 'Cloud Filtering', value: '99.2% Precision' }
    ]
  },
  {
    id: 'digital-twin',
    title: 'Propulsion & Aerodynamic Digital Twin Sandbox',
    category: 'Simulation',
    icon: Layers,
    trl: 'TRL-4',
    trlLabel: 'Testbed Rehearsed',
    arch: 'Physics-Informed Neural Differential Equations (PINNs)',
    summary: 'Real-time telemetry digital twin mirroring launch vehicle vibration acoustic modes, chamber heat-flux, and turbo-pump bearing cavitation during ground hot-fire tests.',
    specs: [
      { label: 'Model Resolution', value: '1000 Hz Telemetry' },
      { label: 'Predictive Horizon', value: '12 seconds ahead' },
      { label: 'Anomaly F1 Score', value: '0.978' }
    ]
  },
  {
    id: 'swarm-mesh',
    title: 'Decentralized Swarm Consensus & Collision Avoidance',
    category: 'Autonomous Mesh',
    icon: Network,
    trl: 'TRL-3',
    trlLabel: 'Algorithmic Formulation',
    arch: 'Asynchronous Byzantine Fault Tolerant Mesh',
    summary: 'Autonomous swarm flight mechanics enabling micro-satellite constellations and UAV formations to coordinate search patterns without single points of telemetry failure.',
    specs: [
      { label: 'Node Capacity', value: '64 Agents' },
      { label: 'Convergence Time', value: '< 40 ms' },
      { label: 'Packet Drop Loss', value: 'Zero State Loss' }
    ]
  },
  {
    id: 'threat-detection',
    title: 'Kinematic Threat Assessment & Anomaly Vectoring',
    category: 'Defence Radar',
    icon: ShieldAlert,
    trl: 'TRL-4',
    trlLabel: 'Simulated Radar Deck',
    arch: 'Temporal Graph Neural Networks (TGNN)',
    summary: 'Automated identification of anomalous ballistic trajectories and sudden kinematic maneuvers against pre-cataloged civil airspace corridors.',
    specs: [
      { label: 'Reaction Velocity', value: 'Mach 7+ Intercept' },
      { label: 'False Alarm Rate', value: '< 0.01%' },
      { label: 'Threat Tiers', value: '5 Severity Levels' }
    ]
  },
  {
    id: 'optical-odometry',
    title: 'Terrain Relative Optical Navigation (TRN)',
    category: 'GPS-Denied',
    icon: Radio,
    trl: 'TRL-4',
    trlLabel: 'Hardware Emulated',
    arch: 'Feature-Point SLAM & Elevation Surface Matcher',
    summary: 'GPS-independent positioning leveraging high-resolution surface elevation models and high-speed CMOS optical sensors during terminal approach.',
    specs: [
      { label: 'Circular Error Probable', value: '< 2.5 meters' },
      { label: 'Operating Altitude', value: '100m to 12,000m' },
      { label: 'Lighting Independence', value: 'Thermal Infused' }
    ]
  },
  {
    id: 'predictive-health',
    title: 'Subsystem Life Prognosis & Degradation Analytics',
    category: 'Reliability',
    icon: Activity,
    trl: 'TRL-5',
    trlLabel: 'Testbed Monitored',
    arch: 'Bayesian State-Space Wear Estimator',
    summary: 'Predicts residual operational lifespan of actuators, thermal protection tiles, and cryogenic valve packings under extreme cyclic thermal loading.',
    specs: [
      { label: 'Cycle Accuracy', value: '± 2 Missions' },
      { label: 'Wear Profiling', value: 'Multi-Subsystem' },
      { label: 'Deployment', value: 'Ground & Avionics' }
    ]
  }
];

const trlFilters = [
  { id: 'ALL', label: 'All Research Tracks' },
  { id: 'TRL-6', label: 'TRL-6 Validated (1)' },
  { id: 'TRL-5', label: 'TRL-5 Hardware-in-Loop (2)' },
  { id: 'TRL-4', label: 'TRL-4 Simulated (4)' },
  { id: 'TRL-3', label: 'TRL-3 Conceptual (1)' }
] as const;

export default function TechnologyPageContent() {
  const [selectedTrl, setSelectedTrl] = useState<string>('ALL');

  const filteredTracks = techTracks.filter((track) => {
    if (selectedTrl === 'ALL') return true;
    return track.trl === selectedTrl;
  });

  return (
    <div className="home-light min-h-screen bg-[#f7faff] text-slate-900">
      <PageBanner
        eyebrow="SOVEREIGN AEROSPACE CAPABILITY"
        title="Conceptual AI Defence & Guidance Technologies"
        description="Exploration of decentralized autonomy, multi-sensor telemetry fusion, and real-time flight guidance envelopes designed for national aerospace resilience."
        breadcrumbs={[
          { label: 'Aerospace Technologies', href: '/technology' },
          { label: 'Autonomous Systems & AI Tracks' }
        ]}
      />

      {/* Telemetry Standards Ribbon */}
      <section className="border-b border-slate-200/80 bg-white py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 sm:px-8 md:grid-cols-4 xl:px-12">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-isroBlue shadow-sm">
              <Cpu className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-bold text-slate-950 font-mono">08 Tracks</p>
              <p className="text-[11px] font-medium text-slate-500">Autonomous Domains</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#E67300] shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-bold text-slate-950 font-mono">TRL 3–6</p>
              <p className="text-[11px] font-medium text-slate-500">Readiness Envelope</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-sm">
              <FileCode2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-bold text-slate-950 font-mono">100% Defensive</p>
              <p className="text-[11px] font-medium text-slate-500">Non-Lethal Algorithms</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shadow-sm">
              <Radio className="h-5 w-5 animate-pulse" />
            </span>
            <div>
              <p className="text-xl font-bold text-slate-950 font-mono">&lt; 10ms</p>
              <p className="text-[11px] font-medium text-slate-500">Edge Compute Target</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Tracks & Radar Section */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24" aria-label="Conceptual AI Research Tracks">
        <div className="home-grid absolute inset-0 -z-20 opacity-60" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12 space-y-12">
          {/* Section Header & TRL Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">
                Architectural Taxonomy
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Eight Autonomous Aerospace Architecture Tracks
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Filter research programs by Technology Readiness Level (TRL) to inspect verified neural stacks, mathematical models, and edge hardware specifications.
              </p>
            </div>

            {/* TRL Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {trlFilters.map((tab) => {
                const isSelected = selectedTrl === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedTrl(tab.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'bg-isroBlue text-white shadow-sm ring-2 ring-isroBlue/20'
                        : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Asymmetric Bento Architecture Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTracks.map((track, index) => {
              const Icon = track.icon;
              const isLarge = track.highlight && selectedTrl === 'ALL';

              return (
                <article
                  key={track.id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg ${
                    isLarge ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white via-white to-blue-50/40 border-l-4 border-l-isroBlue' : ''
                  }`}
                >
                  <div>
                    {/* Top Row: Icon + Badges */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-isroBlue transition-transform duration-300 group-hover:scale-105 shadow-sm">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <span className="rounded-md bg-slate-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-slate-700">
                            {track.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`rounded-md px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                          track.trl === 'TRL-6' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          track.trl === 'TRL-5' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          track.trl === 'TRL-4' ? 'bg-amber-50 text-[#E67300] border border-amber-200' :
                          'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}>
                          {track.trl}
                        </span>
                      </div>
                    </div>

                    <h3 className={`mt-5 font-bold tracking-tight text-slate-950 group-hover:text-isroBlue transition-colors ${
                      isLarge ? 'text-2xl sm:text-3xl' : 'text-xl'
                    }`}>
                      {track.title}
                    </h3>

                    <p className="mt-1.5 font-mono text-xs font-semibold text-isroBlue">
                      {track.arch}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {track.summary}
                    </p>

                    {/* Technical Parameter Grid */}
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 rounded-xl bg-slate-50/80 p-3.5 border border-slate-100">
                      {track.specs.map((spec) => (
                        <div key={spec.label}>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{spec.label}</p>
                          <p className="mt-0.5 text-xs font-bold font-mono text-slate-900">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-slate-500">
                      STATUS: <strong className="text-emerald-600 font-bold">{track.trlLabel.toUpperCase()}</strong>
                    </span>
                    <Link
                      href="/research"
                      className="inline-flex items-center gap-1 font-bold text-isroBlue hover:text-isroBlueDark group-hover:gap-2 transition-all active:scale-[0.98]"
                    >
                      <span>Examine Papers</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>


      {/* Call to Action Banner */}
      <section className="px-6 py-16 sm:px-8 xl:px-12 bg-[#f7faff]">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-sm text-center max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-isroBlue">
            <Sparkles className="h-3.5 w-3.5 text-[#E67300]" />
            RESEARCH CADRE COLLABORATION
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-950">
            Submit a Technical Model to the Research Directorate
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl mx-auto">
            Collaborate with missile guidance teams, access specialized wind tunnel telemetry, or simulate flight software on national testbeds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/research#submit"
              className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E67300] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#CF5F00] active:scale-[0.98]"
            >
              Submit Research Proposal <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/research"
              className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-7 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-100 active:scale-[0.98]"
            >
              Access Published Papers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
