const STAR_COUNT = 36;
const PARTICLE_COUNT = 10;

function seededPercent(seed: number, multiplier: number) {
  return (seed * multiplier) % 100;
}

export default function HeroBackgroundEffects() {
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
    left: seededPercent(i + 1, 37),
    top: seededPercent(i + 3, 53),
    size: 1 + (i % 3),
    delay: (i % 7) * 0.4
  }));

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    left: seededPercent(i + 2, 29) + 5,
    delay: (i % 5) * 1.3,
    duration: 7 + (i % 4)
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Starfield */}
      {stars.map((star, i) => (
        <span
          key={`star-${i}`}
          data-hero-effect
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            animation: `star-twinkle ${3 + (i % 4)}s ease-in-out ${star.delay}s infinite`
          }}
        />
      ))}

      {/* Rising particles */}
      {particles.map((particle, i) => (
        <span
          key={`particle-${i}`}
          data-hero-effect
          className="absolute bottom-24 h-1 w-1 rounded-full bg-white/70"
          style={{
            left: `${particle.left}%`,
            animation: `particle-rise ${particle.duration}s linear ${particle.delay}s infinite`
          }}
        />
      ))}

      {/* Launch smoke */}
      <div
        data-hero-effect
        className="absolute bottom-[-10%] left-1/2 h-[42%] w-[70%] -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
        style={{ animation: 'smoke-drift 14s ease-in-out infinite' }}
      />
      <div
        data-hero-effect
        className="absolute bottom-[-14%] left-[38%] h-[30%] w-[45%] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        style={{ animation: 'smoke-drift 18s ease-in-out 3s infinite' }}
      />

      {/* Satellite orbit (top-right) */}
      <div className="absolute right-[8%] top-[14%] hidden h-24 w-24 lg:block">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div data-hero-effect className="absolute inset-0" style={{ animation: 'orbit-spin 22s linear infinite' }}>
          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/80 shadow-[0_0_6px_2px_rgba(255,255,255,0.5)]" />
        </div>
      </div>

      {/* Radar sweep (bottom-right accent) */}
      <div className="absolute bottom-[8%] right-[6%] hidden h-20 w-20 items-center justify-center rounded-full border border-emerald-300/20 md:flex">
        <div className="h-14 w-14 rounded-full border border-emerald-300/15" />
        <div
          data-hero-effect
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, rgba(52,211,153,0.35), transparent 25%)',
            animation: 'radar-spin 4s linear infinite'
          }}
        />
      </div>
    </div>
  );
}
