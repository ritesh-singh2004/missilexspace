'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  User,
  Compass,
  Radio,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  KeyRound,
  Lock,
  ArrowRight
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Provide a valid phone number (min 10 digits)'),
  organization: z.string().optional(),
  researchInterest: z.string().min(10, 'Specify research interest (min 10 characters)'),
  message: z.string().min(20, 'Message must be at least 20 characters')
});

type ContactFormValues = z.infer<typeof contactSchema>;

const campusFacilities = [
  {
    id: 'noida',
    name: 'Research & Software Directorate',
    location: 'Noida, NCR, India',
    coordinates: '28.6280° N, 77.3649° E',
    type: 'Primary Command Hub',
    focus: 'Guidance software, telemetry platforms, and digital twin simulation systems.'
  },
  {
    id: 'bengaluru',
    name: 'Propulsion & AI Labs',
    location: 'Bengaluru, Karnataka',
    coordinates: '12.9716° N, 77.5946° E',
    type: 'Hardware & AI Testbed',
    focus: 'HTN flight planning, Kalman filter sensor fusion, and propulsion test cells.'
  },
  {
    id: 'chandipur',
    name: 'Integrated Test Range Liaison',
    location: 'Chandipur, Odisha',
    coordinates: '21.4398° N, 87.0142° E',
    type: 'Live Range Operations',
    focus: 'Flight tracking, radar telemetry acquisition, and ballistic trajectory analysis.'
  },
  {
    id: 'sriharikota',
    name: 'Space Launch Coordination',
    location: 'Sriharikota, Andhra Pradesh',
    coordinates: '13.7259° N, 80.2266° E',
    type: 'Orbital Mission Desk',
    focus: 'Launch vehicle trajectory verification and payload separation data link.'
  }
];

const interestSuggestions = [
  'Autonomous Missile Guidance',
  'Satellite Analytics & TRN',
  'Propulsion Simulation (CFD)',
  'Swarm Drone Algorithms',
  'Cyber Defence & Telemetry',
  'Academic Research Collaboration'
];

export default function ContactSection() {
  const { t } = useTranslation(['pages', 'forms']);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPgp, setCopiedPgp] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      organization: '',
      researchInterest: '',
      message: ''
    }
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const currentInterest = watch('researchInterest');

  const copyCoordinates = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyPgp = () => {
    navigator.clipboard.writeText('4A9F 81BC E342 09D1 77B4 EF20 3381 CC04 9012 B7AA');
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit message');
      }

      setStatus('success');
      reset();
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Transmission error. Please try again.');
    }
  };

  return (
    <div className="space-y-16 py-6">
      {/* 1. HERO STRATEGIC LIAISON BANNER */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-sm">
        <div className="home-grid absolute inset-0 -z-10 opacity-30 pointer-events-none" />

        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B4F9C]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              DIRECT LIAISON &amp; RESEARCH DESK
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.15]">
              Connect with the Aerospace Research Directorate.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg max-w-xl">
              Submit research proposals, inquire about testbed access, or establish institutional collaborations with our engineering and guidance teams.
            </p>

            {/* Quick Strip */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 border-t border-slate-100 pt-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Response Protocol</p>
                <p className="mt-1 text-base font-bold text-slate-900">&lt; 24 Hours</p>
                <p className="text-[11px] text-slate-500">Working days (Mon–Sat)</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Security Encryption</p>
                <p className="mt-1 text-base font-bold text-[#0B4F9C]">TLS 1.3 Strict</p>
                <p className="text-[11px] text-slate-500">Direct Gateway</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Hotline Status</p>
                <p className="mt-1 flex items-center gap-1.5 text-base font-bold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Desk Online
                </p>
                <p className="text-[11px] text-slate-500">+91 9199326333</p>
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Protocol Dossier */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 sm:p-7 shadow-inner space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-mono text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#0B4F9C]" />
                COMMUNICATION CIPHER DECK
              </span>
              <span className="rounded bg-blue-100/70 px-2 py-0.5 font-mono text-[10px] font-bold text-isroBlue">
                ACTIVE
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Official Directorate Inbox</p>
                <a href="mailto:missilexrocketspace@gmail.com" className="font-bold text-slate-900 hover:text-isroBlue text-sm">
                  missilexrocketspace@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Direct Telephone Link</p>
                <a href="tel:+919199326333" className="font-bold text-slate-900 hover:text-[#E67300] text-sm">
                  +91 9199326333
                </a>
              </div>

              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Directorate Campus</p>
                <p className="font-medium text-slate-700">
                  Sector 62, Institutional Area, Gautam Buddha Nagar, UP 201309
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">PGP Key Fingerprint</span>
                  <button
                    type="button"
                    onClick={copyPgp}
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-isroBlue hover:underline"
                  >
                    {copiedPgp ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedPgp ? 'Copied' : 'Copy Key'}</span>
                  </button>
                </div>
                <p className="font-mono text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200 truncate">
                  4A9F 81BC E342 09D1 77B4 EF20 3381 CC04 9012 B7AA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SPLIT: DISPATCH FORM & CLEARANCE ADVISORY */}
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left Column: Form Terminal */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm">
            <div className="mb-6 border-b border-slate-100 pb-5">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#0B4F9C]">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                MISSION INQUIRY TERMINAL
              </span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Dispatch Research Inquiry</h2>
              <p className="mt-1 text-sm text-slate-600">
                All communications are routed directly to the designated flight systems or AI research teams.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Row 1: Name & Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="c-name" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                    <User className="h-3.5 w-3.5 text-[#0B4F9C]" />
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="c-name"
                    {...register('name')}
                    placeholder="e.g. Dr. Rajesh Verma"
                    className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0B4F9C]/20 ${
                      errors.name ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0B4F9C]'
                    }`}
                  />
                  {errors.name && <p className="text-xs font-medium text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="c-email" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                    <Mail className="h-3.5 w-3.5 text-[#0B4F9C]" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    {...register('email')}
                    placeholder="rajesh.verma@institution.res.in"
                    className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0B4F9C]/20 ${
                      errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0B4F9C]'
                    }`}
                  />
                  {errors.email && <p className="text-xs font-medium text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              {/* Row 2: Phone & Organization */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="c-phone" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                    <Phone className="h-3.5 w-3.5 text-[#0B4F9C]" />
                    Telephone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="c-phone"
                    type="tel"
                    {...register('phone')}
                    placeholder="+91 98765 43210"
                    className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0B4F9C]/20 ${
                      errors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0B4F9C]'
                    }`}
                  />
                  {errors.phone && <p className="text-xs font-medium text-red-500">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="c-org" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                    <Building2 className="h-3.5 w-3.5 text-[#0B4F9C]" />
                    Affiliated Institution / Lab
                  </label>
                  <input
                    id="c-org"
                    {...register('organization')}
                    placeholder="e.g. IIT Madras / DRDO Lab / Aerospace Lab"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#0B4F9C] focus:ring-2 focus:ring-[#0B4F9C]/20"
                  />
                </div>
              </div>

              {/* Row 3: Research Interest + Quick Chips */}
              <div className="space-y-2">
                <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-[#0B4F9C]" />
                    Primary Focus Domain <span className="text-red-500">*</span>
                  </span>
                  <span className="text-[11px] font-normal text-slate-400 lowercase">click chip or type custom</span>
                </label>

                {/* Suggestion Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {interestSuggestions.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setValue('researchInterest', item)}
                      className={`rounded-xl px-3 py-1 text-xs font-medium transition ${
                        currentInterest === item
                          ? 'bg-[#0B4F9C] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <input
                  {...register('researchInterest')}
                  placeholder="e.g. Autonomous missile trajectory optimization using HTN planning"
                  className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0B4F9C]/20 ${
                    errors.researchInterest ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0B4F9C]'
                  }`}
                />
                {errors.researchInterest && (
                  <p className="text-xs font-medium text-red-500">{errors.researchInterest.message}</p>
                )}
              </div>

              {/* Row 4: Message Textarea */}
              <div className="space-y-1.5">
                <label htmlFor="c-msg" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Send className="h-3.5 w-3.5 text-[#0B4F9C]" />
                  Technical Specification / Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="c-msg"
                  {...register('message')}
                  rows={4}
                  placeholder="Detail technical scope, facility requirements, timeline, and collaboration objectives..."
                  className={`w-full rounded-xl border bg-slate-50/60 p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0B4F9C]/20 ${
                    errors.message ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0B4F9C]'
                  }`}
                />
                {errors.message && <p className="text-xs font-medium text-red-500">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E67300] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#cf6700] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Dispatching Transmission...</span>
                  </>
                ) : (
                  <>
                    <span>Dispatch Mission Inquiry</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* Feedback Alerts */}
              {status === 'success' && (
                <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-800">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">Inquiry Dispatched Successfully</p>
                    <p className="mt-0.5 text-xs text-emerald-700">Your message has been assigned a tracking reference and routed to the technical team.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-800">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">Transmission Failed</p>
                    <p className="mt-0.5 text-xs text-red-700">{errorMessage}</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Column: Confidentiality Guidelines & Liaison Office Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#0B4F9C]" />
              Sovereign Protocol Advisory
            </h3>
            <div className="mt-4 space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Inquiries concerning proprietary aerospace components, academic fellowship eligibility, or collaborative wind-tunnel trials are evaluated under bilateral non-disclosure provisions.
              </p>
              <p>
                Official correspondence requires institutional affiliation or verifiable researcher credentials.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>Operating Hours: 08:30 – 18:30 IST</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Radio className="h-4 w-4 text-emerald-600" />
                <span>Telemetry Ingest: Continuous (24/7)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NATIONAL FACILITY TESTBEDS & NODES */}
      <section className="border-t border-slate-200/80 pt-16">
        <div className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E67300]">
            Operational Testbeds
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            National Facility Nodes &amp; Testbeds
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            MissileX technical and testing liaisons coordinate research across multiple strategic aerospace corridors.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {campusFacilities.map((fac) => (
            <div
              key={fac.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#0B4F9C]">
                    {fac.type}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyCoordinates(fac.coordinates, fac.id)}
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-400 hover:text-slate-700"
                    title="Copy Geo Coordinates"
                  >
                    {copiedId === fac.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Coords</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="mt-3 text-sm font-bold text-slate-900">{fac.name}</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                  <span>{fac.location}</span>
                </div>
                <div className="mt-1 font-mono text-[10px] text-slate-400">
                  {fac.coordinates}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                  {fac.focus}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Active Facility Node</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
