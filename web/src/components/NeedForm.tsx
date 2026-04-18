import { useState } from 'react';
import type { UserNeed } from '../types';

interface Props {
  onSubmit: (need: UserNeed) => void;
  loading: boolean;
}

const defaultNeed: UserNeed = {
  budget_max_inr: 1500000,
  family_size: 4,
  fuel_preference: 'any',
  primary_usage: 'mixed',
  safety_priority: 3,
  mileage_priority: 3,
  transmission_pref: 'any',
  body_type_pref: 'any',
};

// Dark theme utility classes
const selectCls = 'w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none ring-brand-primary/40 transition focus:border-brand-primary/50 focus:ring-2 appearance-none';
const inputCls = 'w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none ring-brand-primary/40 transition focus:border-brand-primary/50 focus:ring-2';

export default function NeedForm({ onSubmit, loading }: Props) {
  const [need, setNeed] = useState<UserNeed>(defaultNeed);
  const [errors, setErrors] = useState<Partial<Record<keyof UserNeed, string>>>({});

  function set<K extends keyof UserNeed>(key: K, value: UserNeed[K]) {
    setNeed(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof UserNeed, string>> = {};
    if (need.budget_max_inr < 300000) e.budget_max_inr = 'Threshold: ₹3L';
    if (need.family_size < 1 || need.family_size > 9) e.family_size = 'Range: 1–9';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(need);
  }

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white">Input Parameters</h2>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Budget - The Primary Constraint */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Max Budget</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-brand-primary font-bold">₹</span>
            <input
              className={`${inputCls} pl-8`}
              type="number"
              min={300000}
              step={50000}
              value={need.budget_max_inr}
              onChange={e => set('budget_max_inr', Number(e.target.value))}
            />
          </div>
          <span className="text-[10px] font-bold text-brand-primary/60 italic">
            {(need.budget_max_inr / 100000).toFixed(1)} Lakh Limit
          </span>
          {errors.budget_max_inr && <span className="text-[10px] font-bold text-red-500">{errors.budget_max_inr}</span>}
        </div>

        {/* Occupancy */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Family Size</label>
          <input
            className={inputCls}
            type="number"
            min={1}
            max={9}
            value={need.family_size}
            onChange={e => set('family_size', Number(e.target.value))}
          />
          {errors.family_size && <span className="text-[10px] font-bold text-red-500">{errors.family_size}</span>}
        </div>

        {/* Fuel Type */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Fuel Tech</label>
          <div className="relative">
            <select className={selectCls} value={need.fuel_preference} onChange={e => set('fuel_preference', e.target.value)}>
              <option value="any">All Propulsion</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="cng">CNG</option>
              <option value="ev">Electric (EV)</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-brand-primary">▼</div>
          </div>
        </div>

        {/* Priorities with Range Sliders */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-6 md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Safety Weighting</label>
                <span className="text-xs font-black text-brand-primary italic">{need.safety_priority}/5</span>
              </div>
              <input
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-brand-primary"
                type="range"
                min={1}
                max={5}
                value={need.safety_priority}
                onChange={e => set('safety_priority', Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Mileage Weighting</label>
                <span className="text-xs font-black text-brand-primary italic">{need.mileage_priority}/5</span>
              </div>
              <input
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-brand-primary"
                type="range"
                min={1}
                max={5}
                value={need.mileage_priority}
                onChange={e => set('mileage_priority', Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t border-white/5 pt-8">
        <button
          type="submit"
          className="group relative flex items-center gap-3 rounded-full bg-brand-primary px-10 py-4 text-xs font-black uppercase tracking-[0.2em] text-black shadow-glow transition-all hover:scale-105 disabled:opacity-30"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
              Processing Logic...
            </span>
          ) : (
            <>
              Execute Search
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}