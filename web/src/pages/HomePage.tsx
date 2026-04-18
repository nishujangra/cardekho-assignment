import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center gap-12 py-16 text-center lg:py-24">
      
      {/* Hero Section */}
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
          DRIVE WITH <span className="text-brand-primary">CERTAINTY.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-brand-muted leading-relaxed">
          The noise of 400+ car models, distilled into the <span className="text-white italic">only three</span> that actually fit your lifestyle. No ads, no bias, just logic.
        </p>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-wrap justify-center gap-5">
        <button
          onClick={() => navigate('/find')}
          className="group relative overflow-hidden rounded-full bg-brand-primary px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:scale-105 hover:shadow-glow"
        >
          Start Match Engine
        </button>
        <button
          onClick={() => navigate('/shortlists')}
          className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-brand-primary/50"
        >
          View My Shortlist
        </button>
      </div>

      {/* Feature Logic Cards */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { 
            title: 'Lifestyle Mapping', 
            desc: 'We score cars based on your reality—like "fits 3 car seats" or "low-clearance garage" constraints.',
            tag: 'Logic'
          },
          { 
            title: 'Bias-Free Analysis', 
            desc: 'Unfiltered data on reliability and depreciation. We don’t take dealer kickbacks.',
            tag: 'Honest'
          },
          { 
            title: 'Decision Ready', 
            desc: 'Go from 500 options to a verified Top 3 with a clear "Pros vs. Cons" breakdown.',
            tag: 'Focus'
          },
        ].map((f) => (
          <div 
            key={f.title} 
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface p-8 text-left transition-all hover:border-brand-primary/30"
          >
            {/* Subtle Accent Flare */}
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-brand-primary/5 blur-2xl group-hover:bg-brand-primary/10" />
            
            <span className="mb-4 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary/70">
              {f.tag}
            </span>
            <h3 className="mb-2 text-xl font-bold text-white">{f.title}</h3>
            <p className="text-sm leading-relaxed text-brand-muted">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Background Decorative Element */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[300px] w-full -translate-x-1/2 bg-gradient-to-t from-brand-primary/5 to-transparent opacity-50" />
    </div>
  );
}