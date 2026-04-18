import { useLocation, useNavigate } from 'react-router-dom';
import type { Recommendation } from '../types';

function fmtPrice(n: number) {
  if (n >= 10_00_000) return `₹${(n / 10_00_000).toFixed(2)} Cr`;
  return `₹${(n / 1_00_000).toFixed(1)}L`;
}

type Row = {
  label: string;
  render: (r: Recommendation) => React.ReactNode;
  isPriority?: boolean;
};

const ROWS: Row[] = [
  { label: 'Price',          render: r => <span className="text-brand-primary font-bold">{fmtPrice(r.car.price_inr)}</span> },
  { label: 'Body Type',      render: r => r.car.body_type },
  { label: 'Fuel',           render: r => r.car.fuel_type },
  { label: 'Transmission',   render: r => r.car.transmission },
  { label: 'Safety Rating',  render: r => <span className="text-white">{r.car.safety_rating} / 5 ★</span>, isPriority: true },
  { label: 'Mileage',        render: r => r.car.fuel_type === 'ev' ? 'EV Mode' : `${r.car.mileage_kmpl} kmpl` },
  { label: 'Seating',        render: r => `${r.car.seating_capacity} Seats` },
  { label: 'Boot Space',     render: r => `${r.car.boot_space_litres} L` },
  { label: 'City Score',     render: r => `${r.car.city_score}/10` },
  { label: 'Highway Score',  render: r => `${r.car.highway_score}/10` },
];

export default function ComparePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const recs: Recommendation[] = location.state?.recs ?? [];

  if (recs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-32 text-center">
        <div className="h-16 w-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-2xl">⚖️</div>
        <p className="text-brand-muted uppercase tracking-widest text-sm font-bold">No cars selected for analysis</p>
        <button
          onClick={() => navigate('/find')}
          className="rounded-full bg-brand-primary px-8 py-3 text-xs font-black uppercase tracking-widest text-black shadow-glow transition-transform hover:scale-105"
        >
          Return to Match Engine
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-10 md:pb-20 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Head-to-Head</h1>
          <p className="text-brand-muted text-sm">Comparing the logic behind your top {recs.length} matches.</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/10"
        >
          ← Adjust Filters
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-surface shadow-2xl">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="sticky left-0 z-20 bg-surface px-6 py-8 text-xs font-black uppercase tracking-widest text-brand-muted w-48">
                Parameters
              </th>
              {recs.map(r => (
                <th key={r.car.id} className="min-w-[280px] px-6 py-8">
                  <div className="text-brand-primary text-[10px] font-black uppercase mb-1">Rank #{recs.indexOf(r) + 1}</div>
                  <div className="text-xl font-black text-white leading-none tracking-tight">
                    {r.car.brand} {r.car.model}
                  </div>
                  <div className="text-xs font-medium text-brand-muted mt-1 uppercase tracking-wide">{r.car.variant}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {ROWS.map(row => (
              <tr key={row.label} className="border-b border-white/5 group transition-colors hover:bg-white/[0.02]">
                <td className="sticky left-0 z-20 bg-surface px-6 py-4 font-bold text-brand-muted uppercase text-[11px] tracking-wider">
                  {row.label}
                </td>
                {recs.map(r => (
                  <td key={r.car.id} className={`px-6 py-4 capitalize ${row.isPriority ? 'bg-brand-primary/5' : 'text-slate-300'}`}>
                    {row.render(r)}
                  </td>
                ))}
              </tr>
            ))}

            {/* Why It Fits - THE CORE VALUE PROPOSITION */}
            <tr className="border-b border-white/10 bg-brand-primary/[0.02]">
              <td className="sticky left-0 z-20 bg-surface px-6 py-6 font-black text-brand-primary uppercase text-[11px] tracking-wider">
                The Logic
              </td>
              {recs.map(r => (
                <td key={r.car.id} className="px-6 py-6">
                  <ul className="space-y-3">
                    {r.why_fits.map((w, i) => (
                      <li key={i} className="flex gap-2 text-white font-medium leading-snug">
                        <span className="text-brand-primary text-xs">✔</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Tradeoffs - THE HONESTY PIECE */}
            <tr className="border-b border-white/10">
              <td className="sticky left-0 z-20 bg-surface px-6 py-6 font-black text-red-400 uppercase text-[11px] tracking-wider">
                Tradeoffs
              </td>
              {recs.map(r => (
                <td key={r.car.id} className="px-6 py-6">
                  {(r.tradeoffs ?? []).length > 0 ? (
                    <ul className="space-y-3">
                      {(r.tradeoffs ?? []).map((t, i) => (
                        <li key={i} className="flex gap-2 text-brand-muted text-xs italic leading-snug">
                          <span className="text-red-500/50">✕</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-brand-muted/30 text-xs italic uppercase">No significant compromises</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}