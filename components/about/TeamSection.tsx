'use client';

import { useTranslation } from 'react-i18next';
import { ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const memberMeta = [
  {
    key: 'priya',
    badge: 'STRATEGIC SYSTEMS',
    lab: 'Aero-Propulsion Labs',
    id: 'DIR-01'
  },
  {
    key: 'arjun',
    badge: 'AUTONOMOUS GN&C',
    lab: 'Sensor Fusion Center',
    id: 'DIR-02'
  },
  {
    key: 'nikhil',
    badge: 'AVIONICS ARCHITECTURE',
    lab: 'Tactical Computing Division',
    id: 'DIR-03'
  }
] as const;

export default function TeamSection() {
  const { t } = useTranslation('about');

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {memberMeta.map((member) => {
        const name = t(`leadership.members.${member.key}.name`);
        const role = t(`leadership.members.${member.key}.role`);
        const focus = t(`leadership.members.${member.key}.focus`);

        return (
          <article
            key={member.key}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_20px_45px_rgba(10,77,140,0.1)]"
          >
            <span className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-isroBlue to-[#E67300] opacity-80" />

            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/50 text-xl font-bold text-isroBlue shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {name.charAt(0)}
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-500">
                    {member.id}
                  </span>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 flex items-center justify-end gap-1">
                    <ShieldCheck className="h-3 w-3" /> Credentialed
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-bold tracking-tight text-slate-950 group-hover:text-isroBlue transition-colors">
                  {name}
                </h3>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.16em] text-[#E67300]">
                  {role}
                </p>
                <span className="mt-2 inline-block rounded-md bg-blue-50/80 px-2.5 py-0.5 text-[10px] font-semibold text-isroBlue border border-blue-100/60">
                  {member.lab}
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-600">
                {focus}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-isroBlue hover:text-isroBlueDark transition"
              >
                <Mail className="h-3.5 w-3.5" /> Direct liaison
              </Link>
              <span className="text-[10px] font-mono text-slate-400">RESTRICTED CADRE</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
