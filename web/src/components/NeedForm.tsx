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

const selectCls = 'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-500/40 transition focus:ring-2';
const inputCls = 'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-500/40 transition focus:ring-2';

export default function NeedForm({ onSubmit, loading }: Props) {
  const [need, setNeed] = useState<UserNeed>(defaultNeed);
  const [errors, setErrors] = useState<Partial<Record<keyof UserNeed, string>>>({});

  function set<K extends keyof UserNeed>(key: K, value: UserNeed[K]) {
    setNeed(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof UserNeed, string>> = {};
    if (need.budget_max_inr < 300000) e.budget_max_inr = 'Minimum budget is ₹3,00,000';
    if (need.family_size < 1 || need.family_size > 9) e.family_size = 'Must be 1–9';
    if (need.safety_priority < 1 || need.safety_priority > 5) e.safety_priority = 'Must be 1–5';
    if (need.mileage_priority < 1 || need.mileage_priority > 5) e.mileage_priority = 'Must be 1–5';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(need);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">Find Your Car</h2>

      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Max Budget</label>
          <div className="flex items-center gap-1">
            <span className="text-slate-500">₹</span>
            <input
              className={inputCls}
              type="number"
              min={300000}
              step={50000}
              value={need.budget_max_inr}
              onChange={e => set('budget_max_inr', Number(e.target.value))}
            />
          </div>
          <span className="text-xs text-slate-500">{(need.budget_max_inr / 100000).toFixed(1)} lakh</span>
          {errors.budget_max_inr && <span className="text-xs text-red-600">{errors.budget_max_inr}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Family Size</label>
          <input
            className={inputCls}
            type="number"
            min={1}
            max={9}
            value={need.family_size}
            onChange={e => set('family_size', Number(e.target.value))}
          />
          {errors.family_size && <span className="text-xs text-red-600">{errors.family_size}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Fuel Preference</label>
          <select className={selectCls} value={need.fuel_preference} onChange={e => set('fuel_preference', e.target.value)}>
            <option value="any">Any</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="cng">CNG</option>
            <option value="ev">EV</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Primary Usage</label>
          <select className={selectCls} value={need.primary_usage} onChange={e => set('primary_usage', e.target.value)}>
            <option value="city">City</option>
            <option value="highway">Highway</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Transmission</label>
          <select className={selectCls} value={need.transmission_pref} onChange={e => set('transmission_pref', e.target.value)}>
            <option value="any">Any</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Body Type</label>
          <select className={selectCls} value={need.body_type_pref} onChange={e => set('body_type_pref', e.target.value)}>
            <option value="any">Any</option>
            <option value="hatchback">Hatchback</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="mpv">MPV</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Safety Priority <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">{need.safety_priority}/5</span>
          </label>
          <input
            className="accent-blue-600"
            type="range"
            min={1}
            max={5}
            value={need.safety_priority}
            onChange={e => set('safety_priority', Number(e.target.value))}
          />
          {errors.safety_priority && <span className="text-xs text-red-600">{errors.safety_priority}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">
            Mileage Priority <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">{need.mileage_priority}/5</span>
          </label>
          <input
            className="accent-blue-600"
            type="range"
            min={1}
            max={5}
            value={need.mileage_priority}
            onChange={e => set('mileage_priority', Number(e.target.value))}
          />
          {errors.mileage_priority && <span className="text-xs text-red-600">{errors.mileage_priority}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
      >
        {loading ? 'Finding...' : 'Get Recommendations'}
      </button>
    </form>
  );
}
