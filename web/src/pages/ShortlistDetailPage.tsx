import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shortlists as api } from '../api';
import type { ShortlistDetail } from '../types';

function fmtPrice(n: number) {
  if (n >= 10_00_000) return `₹${(n / 10_00_000).toFixed(2)} Cr`;
  return `₹${(n / 1_00_000).toFixed(1)}L`;
}

export default function ShortlistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sl, setSl] = useState<ShortlistDetail | null>(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');

  async function load() {
    if (!id) return;
    try {
      const data = await api.get(id);
      setSl(data);
      setEditName(data.name);
    } catch {
      setError('Archive entry not found in system.');
    }
  }

  useEffect(() => { load(); }, [id]);

  async function handleRename(e: React.FormEvent) {
    e.preventDefault();
    if (!sl || !editName.trim()) return;
    try {
      await api.update(sl.id, editName.trim(), sl.car_ids);
      setEditing(false);
      await load();
    } catch {
      setError('System could not process identity update.');
    }
  }

  async function handleRemoveCar(carId: string) {
    if (!sl) return;
    try {
      await api.update(sl.id, sl.name, sl.car_ids.filter(id => id !== carId));
      await load();
    } catch {
      setError('Failed to de-list item.');
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-6 py-32 text-center">
        <p className="text-red-400 font-bold">{error}</p>
        <button 
          onClick={() => navigate('/shortlists')} 
          className="rounded-full border border-white/10 px-6 py-2 text-xs font-black uppercase tracking-widest text-white hover:bg-white/5"
        >
          ← Return to Collections
        </button>
      </div>
    );
  }

  if (!sl) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Navigation & Header */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={() => navigate('/shortlists')} 
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-muted hover:text-white"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Archives
        </button>

        <div className="flex items-center justify-between">
          {editing ? (
            <form onSubmit={handleRename} className="flex items-center gap-3 w-full max-w-md">
              <input
                autoFocus
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xl font-bold text-white outline-none focus:border-brand-primary/50"
              />
              <button type="submit" className="rounded-full bg-brand-primary px-4 py-2 text-[10px] font-black uppercase text-black">
                Save
              </button>
              <button type="button" onClick={() => setEditing(false)} className="text-[10px] font-black uppercase text-brand-muted">
                Cancel
              </button>
            </form>
          ) : (
            <div className="flex items-baseline gap-4">
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">{sl.name}</h1>
              <button 
                onClick={() => setEditing(true)} 
                className="text-[10px] font-black uppercase tracking-widest text-brand-muted hover:text-brand-primary"
              >
                Edit Tag
              </button>
            </div>
          )}
        </div>
        <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      {/* Grid of Car Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(sl.cars ?? []).map(car => (
          <div key={car.id} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface p-6 transition-all hover:border-brand-primary/20">
            {/* Price Tag Overlay */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-black leading-none text-white uppercase">{car.brand}</h3>
                <span className="mt-1 text-xl font-black tracking-tighter text-brand-primary">{car.model}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">{car.variant}</span>
              </div>
              <div className="rounded-lg bg-white/5 px-3 py-1 text-sm font-black text-white">
                {fmtPrice(car.price_inr)}
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="mb-6 grid grid-cols-2 gap-y-3 gap-x-4 border-y border-white/5 py-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-brand-muted tracking-tighter">Safety</span>
                <span className="text-sm font-bold text-white">{car.safety_rating} / 5 ★</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-brand-muted tracking-tighter">Utility</span>
                <span className="text-sm font-bold text-white">{car.boot_space_litres}L Boot</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-brand-muted tracking-tighter">Efficiency</span>
                <span className="text-sm font-bold text-white">{car.fuel_type === 'ev' ? 'Electric' : `${car.mileage_kmpl} kmpl`}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-brand-muted tracking-tighter">Logic Score</span>
                <span className="text-sm font-bold text-brand-primary">{(car.city_score + car.highway_score) / 2}/10</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-1.5">
              {car.feature_tags?.slice(0, 3).map(tag => (
                <span key={tag} className="rounded-md bg-white/[0.03] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-muted border border-white/5">
                  {tag}
                </span>
              ))}
            </div>

            {/* Remove Action */}
            <button
              onClick={() => handleRemoveCar(car.id)}
              className="w-full rounded-full border border-red-500/10 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-red-500/50 transition-all hover:bg-red-500 hover:text-white"
            >
              Remove Target
            </button>
          </div>
        ))}

        {/* Add More Slot */}
        <button 
          onClick={() => navigate('/find')}
          className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-white/5 bg-transparent transition-all hover:bg-white/[0.02] hover:border-brand-primary/20 group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 group-hover:border-brand-primary/50">
            <span className="text-2xl text-brand-muted group-hover:text-brand-primary">+</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted group-hover:text-white">Add Target</span>
        </button>
      </div>
    </div>
  );
}