import { useLocation, useNavigate } from 'react-router-dom';
import type { Recommendation } from '../types';

function fmtPrice(n: number) {
  if (n >= 10_00_000) return `₹${(n / 10_00_000).toFixed(2)} Cr`;
  return `₹${(n / 1_00_000).toFixed(1)}L`;
}

type SpecRow = { label: string; render: (r: Recommendation) => React.ReactNode; priority?: boolean };

const ROWS: SpecRow[] = [
  { label: 'Price',         render: r => <span className="font-bold text-brand-primary">{fmtPrice(r.car.price_inr)}</span> },
  { label: 'Body Type',     render: r => r.car.body_type },
  { label: 'Fuel',          render: r => r.car.fuel_type },
  { label: 'Transmission',  render: r => r.car.transmission },
  { label: 'Safety',        render: r => `${r.car.safety_rating} / 5 ★`, priority: true },
  { label: 'Mileage',       render: r => r.car.fuel_type === 'ev' ? 'Electric' : `${r.car.mileage_kmpl} kmpl` },
  { label: 'Seating',       render: r => `${r.car.seating_capacity} seats` },
  { label: 'Boot',          render: r => `${r.car.boot_space_litres} L` },
  { label: 'City',          render: r => `${r.car.city_score} / 10` },
  { label: 'Highway',       render: r => `${r.car.highway_score} / 10` },
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
    <div className="flex flex-col gap-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase italic">Head-to-Head</h1>
          <p className="text-brand-muted text-sm mt-1">Top {recs.length} matches compared.</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="self-start sm:self-auto rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/10"
        >
          ← Back
        </button>
      </div>

      {/* Table — horizontal scroll, sticky label col */}
      <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-surface shadow-2xl">
        <table className="w-full border-collapse text-left" style={{ minWidth: `${recs.length * 240 + 160}px` }}>
          <thead>
            <tr className="border-b border-white/10">
              {/* sticky label header */}
              <th className="sticky left-0 z-20 bg-[#16161f] w-40 px-6 py-6 text-[10px] font-black uppercase tracking-widest text-brand-muted" />
              {recs.map((r, i) => (
                <th key={r.car.id} className="px-6 py-6 align-top">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-brand-primary mb-1">Rank #{i + 1}</span>
                  <span className="block text-xl font-black text-white leading-tight">{r.car.brand} {r.car.model}</span>
                  <span className="block text-xs text-brand-muted uppercase tracking-wide mt-1">{r.car.variant}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {ROWS.map(row => (
              <tr key={row.label} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className={`sticky left-0 z-20 px-6 py-4 text-[11px] font-black uppercase tracking-wider whitespace-nowrap ${row.priority ? 'bg-[#16161f] text-brand-primary' : 'bg-[#16161f] text-brand-muted'}`}>
                  {row.label}
                </td>
                {recs.map(r => (
                  <td key={r.car.id} className={`px-6 py-4 capitalize text-slate-300 ${row.priority ? 'bg-brand-primary/5 font-semibold text-white' : ''}`}>
                    {row.render(r)}
                  </td>
                ))}
              </tr>
            ))}

            {/* Why it fits */}
            <tr className="border-b border-white/10">
              <td className="sticky left-0 z-20 bg-[#16161f] px-6 py-5 text-[11px] font-black uppercase tracking-wider text-brand-primary whitespace-nowrap align-top">
                Why it fits
              </td>
              {recs.map(r => (
                <td key={r.car.id} className="px-6 py-5 align-top">
                  <ul className="flex flex-col gap-1.5">
                    {r.why_fits.map((w, i) => (
                      <li key={i} className="flex gap-2 text-xs text-white/90 leading-snug">
                        <span className="text-brand-primary shrink-0">✔</span>{w}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Tradeoffs */}
            <tr>
              <td className="sticky left-0 z-20 bg-[#16161f] px-6 py-5 text-[11px] font-black uppercase tracking-wider text-red-400 whitespace-nowrap align-top">
                Tradeoffs
              </td>
              {recs.map(r => (
                <td key={r.car.id} className="px-6 py-5 align-top">
                  {(r.tradeoffs ?? []).length > 0 ? (
                    <ul className="flex flex-col gap-1.5">
                      {(r.tradeoffs ?? []).map((t, i) => (
                        <li key={i} className="flex gap-2 text-xs text-brand-muted italic leading-snug">
                          <span className="text-red-500/50 shrink-0">✕</span>{t}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-[10px] text-brand-muted/40 italic uppercase">None</span>
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
