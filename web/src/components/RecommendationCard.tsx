import type { Recommendation } from '../types';

interface Props {
  rec: Recommendation;
  rank: number;
  isSelected: boolean;
  onToggleCompare: () => void;
  onAddToShortlist: () => void;
}

function fmtPrice(n: number) {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  return `₹${(n / 1_00_000).toFixed(2)}L`;
}

export default function RecommendationCard({ rec, rank, isSelected, onToggleCompare, onAddToShortlist }: Props) {
  const { car } = rec;

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
        isSelected
          ? 'border-brand-primary bg-brand-primary/[0.04] shadow-glow'
          : 'border-white/5 bg-surface hover:border-white/20'
      }`}
    >
      {/* Rank badge */}
      <div className={`absolute right-0 top-0 rounded-bl-2xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
        isSelected ? 'bg-brand-primary text-black' : 'bg-white/10 text-white'
      }`}>
        #{rank}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 pt-10">
        {/* Brand / Model / Price */}
        <div>
          <h3 className="text-xl font-black italic tracking-tight text-white uppercase leading-none">
            {car.brand} <span className="text-brand-primary">{car.model}</span>
          </h3>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-brand-muted">
            {car.variant}
          </span>
          <span className="mt-2 block text-lg font-black text-white">
            {fmtPrice(car.price_inr)}
          </span>
        </div>

        {/* Pill tags */}
        <div className="flex flex-wrap gap-1.5">
          {[car.body_type, car.fuel_type, car.transmission, `${car.seating_capacity} seats`].map(tag => (
            <span key={tag} className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-muted">
              {tag}
            </span>
          ))}
        </div>

        {/* Specs 2×2 */}
        <div className="grid grid-cols-2 gap-3 border-y border-white/5 py-4 text-xs">
          <div><span className="block text-[9px] uppercase tracking-widest text-brand-muted">Safety</span><span className="font-bold text-white">{car.safety_rating} / 5</span></div>
          <div><span className="block text-[9px] uppercase tracking-widest text-brand-muted">Efficiency</span><span className="font-bold text-white">{car.fuel_type === 'ev' ? 'Electric' : `${car.mileage_kmpl} kmpl`}</span></div>
          <div><span className="block text-[9px] uppercase tracking-widest text-brand-muted">Boot</span><span className="font-bold text-white">{car.boot_space_litres}L</span></div>
          <div><span className="block text-[9px] uppercase tracking-widest text-brand-muted">City / Hwy</span><span className="font-bold text-white">{car.city_score} / {car.highway_score}</span></div>
        </div>

        {/* Why fits & tradeoffs */}
        <div className="flex flex-col gap-1.5 text-xs">
          {rec.why_fits.map((w, i) => (
            <div key={i} className="flex items-start gap-2 text-white/80">
              <span className="mt-0.5 text-brand-primary">✔</span>{w}
            </div>
          ))}
          {(rec.tradeoffs ?? []).map((t, i) => (
            <div key={i} className="flex items-start gap-2 italic text-brand-muted/70">
              <span className="mt-0.5 text-red-500/50">✕</span>{t}
            </div>
          ))}
        </div>

        {/* Actions — pushed to bottom */}
        <div className="mt-auto flex gap-2 pt-2">
          <button
            onClick={onToggleCompare}
            className={`flex-1 rounded-full border py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
              isSelected
                ? 'border-brand-primary bg-brand-primary text-black'
                : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            {isSelected ? 'Selected' : 'Compare'}
          </button>
          <button
            onClick={onAddToShortlist}
            className="flex-1 rounded-full bg-white py-2.5 text-[10px] font-black uppercase tracking-widest text-black transition-all hover:bg-brand-primary"
          >
            + Save
          </button>
        </div>
      </div>

      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-brand-primary/5 blur-3xl" />
    </div>
  );
}
