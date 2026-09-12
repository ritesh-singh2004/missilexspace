'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import {
  Rocket,
  ShieldCheck,
  Landmark,
  Award,
  BookOpen,
  Quote,
  Sparkles,
  Compass,
  Calendar,
  Layers,
  ChevronRight,
  Radio
} from 'lucide-react';
import Timeline from '@/components/patterns/Timeline';
import Accordion from '@/components/patterns/Accordion';
import Breadcrumbs from '@/components/patterns/Breadcrumbs';
import { kalamPortrait, kalamGallery } from '@/lib/kalam';

const awardKeys = ['padmaBhushan', 'padmaVibhushan', 'bharatRatna', 'indiraGandhi', 'veerSavarkar', 'honoraryDoctorates'] as const;
const timelineYears = ['1931', '1954', '1960', '1969', '1980', '1982', '1997', '1998', '2002', '2007', '2015'] as const;

export default function KalamPageContent() {
  const { t } = useTranslation(['apjKalam', 'common']);

  const timelineEntries = timelineYears.map((year) => ({ date: year, title: t(`timeline.${year}`) }));
  const quotes = t('quotes', { returnObjects: true }) as string[];
  const books = t('books', { returnObjects: true }) as { title: string; year: string; desc: string }[];
  const faq = t('faq', { returnObjects: true }) as { q: string; a: string }[];

  const sections = [
    { id: 'biography', label: t('sections.biography'), icon: Compass },
    { id: 'childhood', label: t('sections.childhood'), icon: Calendar },
    { id: 'education', label: t('sections.education'), icon: BookOpen },
    { id: 'isro', label: t('sections.isroCareer'), icon: Rocket },
    { id: 'drdo', label: t('sections.drdoCareer'), icon: ShieldCheck },
    { id: 'missiles', label: t('sections.missileProgramme'), icon: Layers },
    { id: 'pokhran', label: t('sections.pokhran'), icon: Sparkles },
    { id: 'presidency', label: t('sections.presidency'), icon: Landmark },
    { id: 'awards', label: t('sections.awards'), icon: Award },
    { id: 'quotes', label: t('sections.quotes'), icon: Quote },
    { id: 'timeline', label: t('sections.timeline'), icon: Calendar },
    { id: 'gallery', label: t('sections.gallery'), icon: Sparkles },
    { id: 'books', label: t('sections.books'), icon: BookOpen },
    { id: 'legacy', label: t('sections.legacy'), icon: Award },
    { id: 'faq', label: t('sections.faq'), icon: ShieldCheck }
  ];

  return (
    <div className="home-light min-h-screen bg-[#f7faff] text-slate-900">
      {/* Memorial Tribute Hero */}
      <section className="relative overflow-hidden border-b border-isroBlueDark bg-gradient-to-r from-[#072B52] via-[#0A4D8C] to-[#083863] text-white">
        <div className="home-grid absolute inset-0 -z-10 opacity-20" aria-hidden="true" />
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16 xl:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-blue-200/70">
                <a href="/" className="hover:text-white transition">Home</a>
                <ChevronRight className="h-3 w-3 text-blue-300/40" />
                <span className="text-white/90">National Memorial &amp; Archives</span>
              </nav>

              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-3.5 py-1 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-amber-300">
                  {t('banner.eyebrow')}
                </span>
              </div>

              <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t('banner.title')}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100/85 sm:text-lg">
                {t('banner.description')}
              </p>

              {/* Honours Badges */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                  <Award className="h-3.5 w-3.5" /> Bharat Ratna (1997)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300/30 bg-white/10 px-3 py-1 text-xs font-bold text-blue-100">
                  Padma Vibhushan (1990)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300/30 bg-white/10 px-3 py-1 text-xs font-bold text-blue-100">
                  Padma Bhushan (1981)
                </span>
              </div>
            </div>

            {/* Portrait Card */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl border-2 border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <Image
                src={kalamPortrait.src}
                alt="Official portrait of Dr. A.P.J. Abdul Kalam"
                fill
                sizes="280px"
                placeholder="blur"
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-center">
                <p className="text-xs font-bold text-amber-300">Dr. Avul Pakir Jainulabdeen Abdul Kalam</p>
                <p className="text-[10px] text-white/70">1931 – 2015 · 11th President of India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-5 sm:grid-cols-4 sm:px-8 xl:px-12">
            {(['born', 'died', 'known', 'honour'] as const).map((key) => (
              <div key={key}>
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">{t(`quickFacts.${key}`)}</dt>
                <dd className="mt-1 text-xs sm:text-sm font-semibold text-white">{t(`quickFacts.${key}Value`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Main Content Layout with Sticky Chapters Nav */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 xl:px-12">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Chapter Navigation Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {t('common:onThisPage')}
              </p>
              <nav className="mt-4 space-y-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-isroBlue"
                    >
                      <Icon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{sec.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Chapters Content */}
          <div className="space-y-10">
            {/* Biography */}
            <article id="biography" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <span className="inline-block rounded-md bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-isroBlue border border-blue-100">
                BIOGRAPHY
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{t('sections.biography')}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                <p>{t('biography.p1')}</p>
                <p>{t('biography.p2')}</p>
              </div>
            </article>

            {/* Childhood & Education in Bento Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              <article id="childhood" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm">
                <span className="inline-block rounded-md bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
                  RAMESWARAM
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-950">{t('sections.childhood')}</h3>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <p>{t('childhood.p1')}</p>
                  <p>{t('childhood.p2')}</p>
                </div>
              </article>

              <article id="education" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm">
                <span className="inline-block rounded-md bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-isroBlue border border-blue-100">
                  AEROSPACE ENGINEERING
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-950">{t('sections.education')}</h3>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <p>{t('education.p1')}</p>
                  <p>{t('education.p2')}</p>
                </div>
              </article>
            </div>

            {/* ISRO & DRDO Milestones */}
            <article id="isro" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-isroBlue" />
                <span className="font-mono text-xs font-bold text-isroBlue uppercase">1969 – 1982</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{t('sections.isroCareer')}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                <p>{t('isroCareer.p1')}</p>
                <p>{t('isroCareer.p2')}</p>
              </div>
            </article>

            <article id="drdo" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span className="font-mono text-xs font-bold text-emerald-600 uppercase">1982 – 1999</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{t('sections.drdoCareer')}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                <p>{t('drdoCareer.p1')}</p>
                <p>{t('drdoCareer.p2')}</p>
              </div>
            </article>

            {/* IGMDP Missile Systems */}
            <article id="missiles" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <span className="inline-block rounded-md bg-[#E67300]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#E67300] border border-amber-200">
                INTEGRATED GUIDED MISSILE PROGRAMME
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{t('sections.missileProgramme')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{t('missileProgramme.p1')}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(['agni', 'prithvi', 'akash', 'trishul', 'nag'] as const).map((key) => (
                  <div key={key} className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
                    <p className="font-bold text-slate-950 capitalize">{key}</p>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{t(`missileProgramme.${key}`)}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-slate-600">{t('missileProgramme.p2')}</p>
            </article>

            {/* Pokhran-II & Presidency */}
            <div className="grid gap-6 sm:grid-cols-2">
              <article id="pokhran" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm">
                <span className="inline-block rounded-md bg-red-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700 border border-red-200">
                  MAY 1998
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-950">{t('sections.pokhran')}</h3>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <p>{t('pokhran.p1')}</p>
                  <p>{t('pokhran.p2')}</p>
                </div>
              </article>

              <article id="presidency" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm">
                <span className="inline-block rounded-md bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-isroBlue border border-blue-100">
                  2002 – 2007
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-950">{t('sections.presidency')}</h3>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <p>{t('presidency.p1')}</p>
                  <p>{t('presidency.p2')}</p>
                </div>
              </article>
            </div>

            {/* National Awards & Honours */}
            <section id="awards" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-2 text-amber-600">
                <Award className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">CIVILIAN &amp; SCIENTIFIC HONOURS</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{t('sections.awards')}</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {awardKeys.map((key) => (
                  <div key={key} className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5">
                    <span className="font-mono text-xs font-bold text-amber-800">{t(`awards.${key}.year`)}</span>
                    <p className="mt-1 font-bold text-slate-950">{t(`awards.${key}.title`)}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{t(`awards.${key}.desc`)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Inspiring Quotes Banner */}
            <section id="quotes" className="scroll-mt-24 overflow-hidden rounded-3xl border border-blue-900 bg-gradient-to-r from-[#072B52] via-[#0A4D8C] to-[#0A3D70] p-8 sm:p-10 text-white shadow-lg relative isolate">
              <div className="flex items-center gap-2 text-amber-400 mb-6">
                <Quote className="h-6 w-6" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{t('sections.quotes')}</span>
              </div>
              <div className="space-y-6">
                {quotes.map((quote) => (
                  <blockquote key={quote} className="border-l-2 border-amber-400/80 pl-5 text-base sm:text-lg italic leading-relaxed text-blue-50">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                ))}
              </div>
            </section>

            {/* Chronological Timeline */}
            <section id="timeline" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">{t('sections.timeline')}</h2>
              <div className="mt-8 max-w-2xl">
                <Timeline entries={timelineEntries} />
              </div>
            </section>

            {/* Archival Photography Gallery */}
            <section id="gallery" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">{t('sections.gallery')}</h2>
              <p className="mt-1 text-xs text-slate-500">Curated Wikimedia Commons licensed historical documentation.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {kalamGallery.map((image) => (
                  <div key={image.slug} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm">
                    <Image
                      src={image.src}
                      alt={image.credit || 'Archival image'}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      placeholder="blur"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    <p className="absolute inset-x-0 bottom-0 p-3 text-xs text-white/90">
                      {image.credit} · {image.license}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Books & Publications */}
            <section id="books" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">{t('sections.books')}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {books.map((book) => (
                  <div key={book.title} className="rounded-2xl border border-slate-200/80 bg-[#fcfdff] p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-950">{book.title}</p>
                      <span className="font-mono text-xs font-semibold text-isroBlue">{book.year}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{book.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Legacy & FAQ */}
            <article id="legacy" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <span className="inline-block rounded-md bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200">
                TIMELESS INSPIRATION
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{t('sections.legacy')}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                <p>{t('legacy.p1')}</p>
                <p>{t('legacy.p2')}</p>
              </div>
            </article>

            <section id="faq" className="scroll-mt-24 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">{t('sections.faq')}</h2>
              <div className="mt-6">
                <Accordion items={faq.map((item) => ({ question: item.q, answer: item.a }))} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

