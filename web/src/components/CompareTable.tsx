import type { Recommendation } from '../types';

interface Props {
  recs: Recommendation[];
  onClose: () => void;
}

function fmtPrice(n: number) {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  return `₹${(n / 1_00_000).toFixed(2)}L`;
}

const ROWS: { label: string; key: keyof import('../types').Car | null; render?: (r: Recommendation) => React.ReactNode }[] = [
  { label: 'Market Price', key: null, render: r => <span className="font-black text-brand-primary">{fmtPrice(r.car.price_inr)}</span> },
  { label: 'Configuration', key: null, render: r => <span className="capitalize">{r.car.body_type} · {r.car.fuel_type}</span> },
  { label: 'Transmission', key: 'transmission' },
  { label: 'Capacity', key: null, render: r => `${r.car.seating_capacity} Occupants` },
  { label: 'Efficiency', key: null, render: r => (r.car.fuel_type === 'ev' ? 'Electric Range' : `${r.car.mileage_kmpl} kmpl`) },
  { label: 'Safety Index', key: null, render: r => <span className="text-white font-bold">{r.car.safety_rating} / 5.0</span> },
  { label: 'Storage', key: null, render: r => `${r.car.boot_space_litres} Litres` },
  { label: 'Logic Scores', key: null, render: r => <span className="text-brand-muted">{r.car.city_score} City / {r.car.highway_score} Hwy</span> },
];

export default function CompareTable({ recs, onClose }: Props) {
  if (recs.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 lg:p-12">
      <div className="flex h-[95vh] sm:h-full w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 sm:px-8 py-4 sm:py-6">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Analysis Dashboard</h2>
            <p className="text-xl font-black text-white uppercase italic tracking-tighter">Technical Comparison</p>
          </div>
          <button 
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-brand-primary/50" 
            onClick={onClose}
          >
            <span className="text-white group-hover:text-brand-primary">✕</span>
          </button>
        </div>

        {/* Comparison Engine */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="sticky left-0 z-30 bg-surface pr-8 pb-6 text-[10px] font-black uppercase tracking-widest text-brand-muted">
                  Metric
                </th>
                {recs.map(r => (
                  <th key={r.car.id} className="min-w-[240px] px-6 pb-6">
                    <div className="text-sm font-black text-white leading-tight uppercase">
                      {r.car.brand} {r.car.model}
                    </div>
                    <div className="text-[10px] font-bold text-brand-muted uppercase tracking-tighter">{r.car.variant}</div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/5 text-sm">
              {ROWS.map(row => (
                <tr key={row.label} className="group transition-colors hover:bg-white/[0.01]">
                  <td className="sticky left-0 z-30 bg-surface py-4 pr-8 text-[10px] font-black uppercase tracking-wider text-brand-muted">
                    {row.label}
                  </td>
                  {recs.map(r => (
                    <td key={r.car.id} className="px-6 py-4 text-slate-300">
                      {row.render ? row.render(r) : row.key ? String(r.car[row.key]) : '—'}
                    </td>
                  ))}
                </tr>
              ))}

              {/* High Intensity Logic Rows */}
              <tr className="bg-brand-primary/[0.02]">
                <td className="sticky left-0 z-30 bg-surface py-6 pr-8 text-[10px] font-black uppercase tracking-wider text-brand-primary">
                  The Fit
                </td>
                {recs.map(r => (
                  <td key={r.car.id} className="px-6 py-6">
                    <ul className="space-y-2">
                      {r.why_fits.map((w, i) => (
                        <li key={i} className="flex gap-2 text-xs font-bold text-white leading-tight">
                          <span className="text-brand-primary">✔</span> {w}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="sticky left-0 z-30 bg-surface py-6 pr-8 text-[10px] font-black uppercase tracking-wider text-red-500/70">
                  Tradeoffs
                </td>
                {recs.map(r => (
                  <td key={r.car.id} className="px-6 py-6">
                    {r.tradeoffs.length > 0 ? (
                      <ul className="space-y-2">
                        {r.tradeoffs.map((t, i) => (
                          <li key={i} className="flex gap-2 text-[11px] italic text-brand-muted leading-tight">
                            <span className="text-red-500/30">✕</span> {t}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted/20">Optimal</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Shortcut */}
        <div className="border-t border-white/5 bg-white/[0.02] px-8 py-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">
            End of technical brief
          </p>
        </div>
      </div>
    </div>
  );
}