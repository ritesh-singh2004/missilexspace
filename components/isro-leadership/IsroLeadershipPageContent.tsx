'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Rocket, Satellite, Orbit, Award, ShieldCheck, Compass, Radio, ArrowRight, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import PageBanner from '@/components/patterns/PageBanner';

const pastChairmen = [
  {
    name: 'Dr. Vikram A. Sarabhai',
    tenure: '1963 – 1971',
    badge: 'FOUNDING FATHER',
    milestones: 'Pioneered Indian space research; established INCOSPAR, TERLS at Thumba, and laid vision for satellite education.',
    icon: Sparkles
  },
  {
    name: 'Prof. M.G.K. Menon',
    tenure: 'Jan 1972 – Sep 1972',
    badge: 'CONSOLIDATION',
    milestones: 'Guided crucial institutional transitions; formalized Department of Space and Space Commission framework.',
    icon: Compass
  },
  {
    name: 'Prof. Satish Dhawan',
    tenure: '1972 – 1984',
    badge: 'ROCKETRY PIONEER',
    milestones: 'Led India into orbital era with SLV-3; conceptualized PSLV and established Sriharikota Space Centre (SHAR).',
    icon: Rocket
  },
  {
    name: 'Prof. U.R. Rao',
    tenure: '1984 – 1994',
    badge: 'SATELLITE ARCHITECT',
    milestones: 'Architect of Aryabhata, Bhaskara, and INSAT-1 systems; guided development of ASLV and maiden PSLV flight.',
    icon: Satellite
  },
  {
    name: 'Dr. K. Kasturirangan',
    tenure: '1994 – 2003',
    badge: 'OPERATIONAL FLEET',
    milestones: 'Operationalized PSLV as global workhorse; initiated cryogenic propulsion program and IRS remote sensing constellations.',
    icon: Orbit
  },
  {
    name: 'Shri G. Madhavan Nair',
    tenure: '2003 – 2009',
    badge: 'LUNAR BREAKTHROUGH',
    milestones: 'Launched Chandrayaan-1 discovering water molecules on Moon; executed 25 consecutively successful missions.',
    icon: Award
  },
  {
    name: 'Dr. K. Radhakrishnan',
    tenure: '2009 – 2014',
    badge: 'INTERPLANETARY TRIUMPH',
    milestones: 'Led Mars Orbiter Mission (Mangalyaan) to historic maiden-attempt success; mastered indigenous Cryogenic Upper Stage.',
    icon: ShieldCheck
  },
  {
    name: 'Shri A.S. Kiran Kumar',
    tenure: '2015 – 2018',
    badge: 'CONSTELLATION SCALE',
    milestones: 'Operationalized NavIC regional navigation system; launched record 104 satellites on single PSLV-C37 mission.',
    icon: Radio
  },
  {
    name: 'Dr. K. Sivan',
    tenure: '2018 – 2022',
    badge: 'GAGANYAAN INCEPTION',
    milestones: 'Formulated Human Spaceflight Centre and Gaganyaan mission; launched Chandrayaan-2 lunar orbiter payload.',
    icon: CheckCircle2
  },
  {
    name: 'Shri S. Somanath',
    tenure: '2022 – Present',
    badge: 'SOUTH POLE HISTORIC',
    milestones: 'Achieved Chandrayaan-3 soft-landing on lunar South Pole; injected Aditya-L1 into Sun-Earth L1 halo orbit; advancing BAS space station.',
    icon: Rocket
  }
];

const programmePillars = [
  {
    title: 'Launch Vehicle Fleet',
    tag: 'ACCESS TO SPACE',
    desc: 'Developing dependable, heavy-lift, and cost-effective orbital transport from PSLV and LVM3 to reusable launch systems.',
    specs: ['LVM3 Heavy Lift (8T LEO)', 'PSLV Polar Workhorse', 'SSLV On-Demand Launch', 'NGLV Reusable Architecture']
  },
  {
    title: 'Earth & Space Observation',
    tag: 'PLANETARY ANALYTICS',
    desc: 'High-resolution optical, radar, hyperspectral, and meteorological sensor networks protecting national boundaries and agriculture.',
    specs: ['Cartosat & Oceansat Arrays', 'RISAT Synthetic Aperture Radar', 'INSAT-3D Weather Telemetry', 'NISAR Joint Radar Mission']
  },
  {
    title: 'Interplanetary & Human Missions',
    tag: 'EXPLORATION FRONTIER',
    desc: 'Advancing lunar exploration, solar observation, human-rated crew modules, and autonomous deep-space probes.',
    specs: ['Chandrayaan-3 South Pole', 'Aditya-L1 Solar Corona', 'Gaganyaan Crewed Orbital Flight', 'Bharatiya Antariksh Station 2035']
  }
];

export default function IsroLeadershipPageContent() {
  const { t } = useTranslation('pages');

  return (
    <div className="home-light min-h-screen bg-[#f7faff] text-slate-900">
      <PageBanner
        eyebrow={t('isroLeadership.eyebrow')}
        title={t('isroLeadership.title')}
        description={t('isroLeadership.description')}
        breadcrumbs={[
          { label: 'National Ecosystem', href: '/isro-leadership' },
          { label: 'ISRO Leadership & Governance' }
        ]}
      />

      {/* Leadership Spotlight: Current Governance & Mandate */}
      <section className="relative isolate overflow-hidden border-b border-blue-100 py-14 sm:py-20" aria-label="Current Leadership Spotlight">
        <div className="home-grid absolute inset-0 -z-20 opacity-60" aria-hidden="true" />
        <div className="home-halo absolute -left-20 top-10 -z-10 h-72 w-72 rounded-full" aria-hidden="true" />
        <div className="home-halo home-halo--orange absolute -right-20 bottom-10 -z-10 h-72 w-72 rounded-full" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-isroBlue">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Apex Space Administration
                </span>
                <h2 className="mt-4 text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
                  {t('isroLeadership.chairmanTitle')}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {t('isroLeadership.chairmanBody')}
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-semibold text-isroBlue border border-blue-100">
                    Secretary, Department of Space
                  </span>
                  <span className="rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 border border-amber-200">
                    Chairman, Space Commission
                  </span>
                  <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                    Member, National Security Council Advisory
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 p-6 border border-blue-100/80 lg:w-96 shrink-0">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Key Directives</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-isroBlue text-white text-xs font-bold">01</span>
                    <p className="text-xs font-bold text-slate-800">Gaganyaan Crewed Test Flights</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-isroBlue text-white text-xs font-bold">02</span>
                    <p className="text-xs font-bold text-slate-800">Chandrayaan-4 Lunar Sample Return</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-isroBlue text-white text-xs font-bold">03</span>
                    <p className="text-xs font-bold text-slate-800">Bharatiya Antariksh Station (BAS)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E67300] text-white text-xs font-bold">04</span>
                    <p className="text-xs font-bold text-slate-800">Next Generation Launch Vehicle (NGLV)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Indian Space Programme Architecture */}
      <section className="border-b border-slate-200/80 py-16 sm:py-24" aria-label="Space Programme Architecture">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-isroBlue shadow-sm">
              <Orbit className="h-3 w-3" />
              National Strategy
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
              {t('isroLeadership.programmeTitle')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              {t('isroLeadership.programmeBody')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {programmePillars.map((pillar) => (
              <article
                key={pillar.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div>
                  <span className="inline-block rounded-md bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-isroBlue border border-blue-100">
                    {pillar.tag}
                  </span>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950 group-hover:text-isroBlue transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {pillar.desc}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-slate-100 pt-4">
                    {pillar.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/space-systems"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-isroBlue hover:text-isroBlueDark transition"
                  >
                    View mission registry <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Historic Past Chairmen Hall of Fame */}
      <section className="relative isolate overflow-hidden bg-white pt-16 pb-24 sm:pt-20 sm:pb-32" aria-label="Historic Chairmen Hall of Fame">
        <div className="home-grid absolute inset-0 -z-20 opacity-40" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-800">
              <Award className="h-3.5 w-3.5 text-amber-600" />
              Visionary Legacy
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
              {t('isroLeadership.pastChairmenTitle')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              {t('isroLeadership.pastChairmenBody')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastChairmen.map((chairman) => {
              const Icon = chairman.icon;

              return (
                <div
                  key={chairman.name}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#fcfdff] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-isroBlue transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
                        {chairman.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-950 group-hover:text-isroBlue transition-colors">
                      {chairman.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-isroBlue">
                      {chairman.tenure}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      {chairman.milestones}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>CHAIR OF ISRO</span>
                    <span>DISTINGUISHED</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

