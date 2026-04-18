import type { Recommendation } from '../types';

interface Props {
  rec: Recommendation;
  rank: number;
  isSelected: boolean;
  onToggleCompare: () => void;
  onAddToShortlist: () => void;
}

function fmtPrice(n: number) {
  if (n >= 10_00_000) return `₹${(n / 10_00_000).toFixed(2)} Cr`;
  return `₹${(n / 1_00_000).toFixed(1)}L`;
}

function stars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.round(rating) ? 'text-amber-500' : 'text-slate-300'}>
      ★
    </span>
  ));
}

export default function RecommendationCard({ rec, rank, isSelected, onToggleCompare, onAddToShortlist }: Props) {
  const { car } = rec;

  return (
    <div
      className={`relative rounded-xl border p-5 shadow-sm transition ${
        isSelected ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">#{rank}</div>

      <div className="mb-3 flex items-start justify-between gap-3 pr-12">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {car.brand} {car.model}
          </h3>
          <span className="text-sm text-slate-500">{car.variant}</span>
        </div>
        <div className="whitespace-nowrap text-lg font-bold text-blue-700">{fmtPrice(car.price_inr)}</div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs capitalize">{car.body_type}</span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs capitalize">{car.fuel_type}</span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs capitalize">{car.transmission}</span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs">{car.seating_capacity} seats</span>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-slate-500">Safety</span>
          <span className="inline-flex gap-0.5">{stars(car.safety_rating)}</span>
        </div>
        {car.fuel_type !== 'ev' && (
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-slate-500">Mileage</span>
            <span>{car.mileage_kmpl} kmpl</span>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-slate-500">Boot</span>
          <span>{car.boot_space_litres}L</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-slate-500">City / Hwy</span>
          <span>
            {car.city_score} / {car.highway_score}
          </span>
        </div>
      </div>

      {car.feature_tags?.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {car.feature_tags.map(tag => (
            <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mb-4 flex flex-col gap-1 text-sm">
        {rec.why_fits.map((w, i) => (
          <div key={i} className="text-emerald-700">
            + {w}
          </div>
        ))}
        {rec.tradeoffs.map((t, i) => (
          <div key={i} className="text-amber-700">
            - {t}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
            isSelected
              ? 'border-blue-300 bg-blue-100 text-blue-700'
              : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-700'
          }`}
          onClick={onToggleCompare}
        >
          {isSelected ? 'Remove Compare' : 'Compare'}
        </button>
        <button
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          onClick={onAddToShortlist}
        >
          + Shortlist
        </button>
      </div>
    </div>
  );
}
