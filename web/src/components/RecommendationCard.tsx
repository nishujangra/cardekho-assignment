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

export default function RecommendationCard({ rec, rank, isSelected, onToggleCompare, onAddToShortlist }: Props) {
  const { car } = rec;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isSelected 
          ? 'border-brand-primary bg-brand-primary/[0.03] shadow-glow' 
          : 'border-white/5 bg-surface hover:border-white/20 shadow-2xl'
      }`}
    >
      {/* Rank Indicator */}
      <div className={`absolute right-0 top-0 rounded-bl-2xl px-6 py-2 text-xs font-black uppercase tracking-widest ${
        isSelected ? 'bg-brand-primary text-black' : 'bg-white/10 text-white'
      }`}>
        Match #{rank}
      </div>

      <div className="p-6 md:p-8">
        {/* Header: Brand & Price */}
        <div className="mb-6 flex flex-col justify-between gap-4 pr-20 md:flex-row md:items-end">
          <div>
            <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">
              {car.brand} <span className="text-brand-primary">{car.model}</span>
            </h3>
            <span className="mt-2 block text-xs font-bold uppercase tracking-[0.2em] text-brand-muted">
              {car.variant}
            </span>
          </div>
          <div className="text-2xl font-black tracking-tighter text-white">
            {fmtPrice(car.price_inr)}
          </div>
        </div>

        {/* Quick Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[car.body_type, car.fuel_type, car.transmission, `${car.seating_capacity} seats`].map((tag) => (
            <span key={tag} className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-brand-muted">
              {tag}
            </span>
          ))}
        </div>

        {/* Data Grid */}
        <div className="mb-8 grid grid-cols-2 gap-6 border-y border-white/5 py-6 md:grid-cols-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Safety</span>
            <span className="text-sm font-bold text-white">{car.safety_rating} / 5.0</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Efficiency</span>
            <span className="text-sm font-bold text-white">
              {car.fuel_type === 'ev' ? 'Electric' : `${car.mileage_kmpl} kmpl`}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Storage</span>
            <span className="text-sm font-bold text-white">{car.boot_space_litres}L Boot</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Capability</span>
            <span className="text-sm font-bold text-white">{car.city_score}C | {car.highway_score}H</span>
          </div>
        </div>

        {/* The "Confidence" Section: Why it fits vs Tradeoffs */}
        <div className="mb-8 space-y-4">
          <div className="space-y-2">
            {rec.why_fits.map((w, i) => (
              <div key={i} className="flex items-start gap-3 text-sm font-medium text-white/90">
                <span className="text-brand-primary text-xs">✔</span> {w}
              </div>
            ))}
          </div>
          <div className="space-y-2 opacity-60">
            {(rec.tradeoffs ?? []).map((t, i) => (
              <div key={i} className="flex items-start gap-3 text-sm italic text-brand-muted">
                <span className="text-red-500/50 text-xs">✕</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onToggleCompare}
            className={`flex-1 rounded-full border px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all md:flex-none ${
              isSelected
                ? 'border-brand-primary bg-brand-primary text-black'
                : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            {isSelected ? 'Selected' : 'Compare'}
          </button>
          <button
            onClick={onAddToShortlist}
            className="flex-1 rounded-full bg-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-brand-primary md:flex-none"
          >
            + Archive Match
          </button>
        </div>
      </div>
      
      {/* Decorative accent for the card */}
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-brand-primary/5 blur-3xl" />
    </div>
  );
}