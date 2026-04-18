import type { Recommendation } from '../types';

interface Props {
  recs: Recommendation[];
  onClose: () => void;
}

function fmtPrice(n: number) {
  if (n >= 10_00_000) return `₹${(n / 10_00_000).toFixed(2)} Cr`;
  return `₹${(n / 1_00_000).toFixed(1)}L`;
}

const ROWS: { label: string; key: keyof import('../types').Car | null; render?: (r: Recommendation) => string }[] = [
  { label: 'Price', key: null, render: r => fmtPrice(r.car.price_inr) },
  { label: 'Body Type', key: 'body_type' },
  { label: 'Fuel', key: 'fuel_type' },
  { label: 'Transmission', key: 'transmission' },
  { label: 'Seating', key: null, render: r => `${r.car.seating_capacity} seats` },
  { label: 'Mileage', key: null, render: r => (r.car.fuel_type === 'ev' ? 'EV (₹/km)' : `${r.car.mileage_kmpl} kmpl`) },
  { label: 'Safety Rating', key: null, render: r => `${r.car.safety_rating} / 5` },
  { label: 'Boot Space', key: null, render: r => `${r.car.boot_space_litres} L` },
  { label: 'City Score', key: null, render: r => `${r.car.city_score} / 10` },
  { label: 'Highway Score', key: null, render: r => `${r.car.highway_score} / 10` },
  { label: 'Features', key: null, render: r => r.car.feature_tags?.join(', ') || '—' },
];

export default function CompareTable({ recs, onClose }: Props) {
  if (recs.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 p-4">
      <div className="mx-auto flex h-full max-w-6xl flex-col rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-slate-900">Compare Cars</h2>
          <button className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="overflow-auto p-4">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 bg-slate-50 px-3 py-2 text-left font-semibold text-slate-700">Spec</th>
                {recs.map(r => (
                  <th key={r.car.id} className="min-w-[180px] bg-slate-50 px-3 py-2 text-left font-semibold text-slate-800">
                    {r.car.brand} {r.car.model}
                    <div className="text-xs font-normal text-slate-500">{r.car.variant}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(row => (
                <tr key={row.label} className="border-b border-slate-100">
                  <td className="sticky left-0 bg-white px-3 py-2 font-medium text-slate-700">{row.label}</td>
                  {recs.map(r => (
                    <td key={r.car.id} className="px-3 py-2 text-slate-600">
                      {row.render ? row.render(r) : row.key ? String(r.car[row.key]) : '—'}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-slate-100">
                <td className="sticky left-0 bg-white px-3 py-2 font-medium text-slate-700">Why it fits</td>
                {recs.map(r => (
                  <td key={r.car.id} className="px-3 py-2">
                    <ul className="space-y-1">
                      {r.why_fits.map((w, i) => (
                        <li key={i} className="text-emerald-700">
                          + {w}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="sticky left-0 bg-white px-3 py-2 font-medium text-slate-700">Tradeoffs</td>
                {recs.map(r => (
                  <td key={r.car.id} className="px-3 py-2">
                    {r.tradeoffs.length > 0 ? (
                      <ul className="space-y-1">
                        {r.tradeoffs.map((t, i) => (
                          <li key={i} className="text-amber-700">
                            - {t}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-400">None</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
