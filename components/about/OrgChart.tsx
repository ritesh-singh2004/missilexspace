'use client';

import { useTranslation } from 'react-i18next';
import { Target, Rocket, Cpu, Network, Shield, ChevronDown } from 'lucide-react';

const divisionMeta = [
  {
    key: 'missileSystems',
    icon: Target,
    tag: 'STRATEGIC STRIKE',
    badgeClass: 'bg-red-50 text-red-700 border-red-200'
  },
  {
    key: 'rocketSystems',
    icon: Rocket,
    tag: 'PROPULSION & STAGES',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    key: 'aiSystems',
    icon: Cpu,
    tag: 'SENSOR FUSION',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    key: 'programs',
    icon: Network,
    tag: 'NATIONAL CADRE',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
] as const;

export default function OrgChart() {
  const { t } = useTranslation('about');

  return (
    <div className="flex flex-col items-center">
      {/* Level 1: Board of Governors */}
      <div className="group relative w-full max-w-md overflow-hidden rounded-2xl border border-isroBlue/30 bg-gradient-to-br from-[#072B52] via-[#0A4D8C] to-[#0A3D70] p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
          <Shield className="h-3 w-3" />
          {t('orgStructure.governingBody')}
        </div>
        <h3 className="mt-2 text-lg font-bold text-white tracking-tight sm:text-xl">
          {t('orgStructure.boardOfGovernors')}
        </h3>
        <p className="mt-1 text-xs text-blue-100/75">
          National apex council for strategic guidance, mission authorizations & inter-agency alignment.
        </p>
      </div>

      {/* Connector Line 1 */}
      <div className="flex flex-col items-center py-2">
        <div className="h-8 w-0.5 bg-gradient-to-b from-isroBlue to-slate-300" />
        <ChevronDown className="h-4 w-4 -mt-1 text-slate-400" />
      </div>

      {/* Level 2: Executive Leadership */}
      <div className="w-full max-w-sm rounded-2xl border border-slate-200/90 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:border-isroBlue/30 hover:shadow-md">
        <span className="inline-block rounded-md bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-isroBlue border border-blue-100">
          {t('orgStructure.executiveLeadership')}
        </span>
        <h4 className="mt-2 text-base font-bold text-slate-950">
          {t('orgStructure.directorGeneral')}
        </h4>
        <p className="mt-1 text-xs text-slate-500">
          Chief scientific direction, cross-divisional synthesis & defence laboratory coordination.
        </p>
      </div>

      {/* Connector Line 2 with Horizontal Distribution Bar */}
      <div className="flex flex-col items-center pt-2">
        <div className="h-8 w-0.5 bg-slate-300" />
      </div>

      <div className="relative w-full max-w-6xl">
        <div className="absolute left-[12.5%] right-[12.5%] top-0 h-0.5 bg-gradient-to-r from-red-300 via-blue-300 to-emerald-300 hidden lg:block" />

        <div className="grid gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {divisionMeta.map((div, idx) => {
            const Icon = div.icon;
            const title = t(`orgStructure.divisions.${div.key}.title`);
            const focus = t(`orgStructure.divisions.${div.key}.focus`);

            return (
              <div
                key={div.key}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_16px_36px_rgba(10,77,140,0.09)]"
              >
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-isroBlue to-[#E67300] opacity-80 transition-opacity group-hover:opacity-100" />
                
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-isroBlue transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className={`rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${div.badgeClass}`}>
                      {div.tag}
                    </span>
                  </div>

                  <h5 className="mt-4 text-sm font-bold tracking-tight text-slate-900 group-hover:text-isroBlue transition-colors">
                    {title}
                  </h5>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {focus}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                  <span>Specialized Division</span>
                  <span className="font-mono text-slate-500">DIV-0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
