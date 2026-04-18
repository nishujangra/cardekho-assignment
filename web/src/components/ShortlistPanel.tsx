import { useState, useEffect } from 'react';
import { shortlists as shortlistApi } from '../api';
import type { ShortlistDetail } from '../types';

interface Props {
  pendingCarId: string | null;
  onClearPending: () => void;
}

function fmtPrice(n: number) {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  return `₹${(n / 1_00_000).toFixed(2)}L`;
}

export default function ShortlistPanel({ pendingCarId, onClearPending }: Props) {
  const [shortlists, setShortlists] = useState<ShortlistDetail[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');

  async function load() {
    try {
      const sls = await shortlistApi.list();
      const details = await Promise.all((sls ?? []).map(sl => shortlistApi.get(sl.id)));
      setShortlists(details);
    } catch {
      setError('System: Failed to sync archives.');
    }
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (pendingCarId) setShowCreate(true);
  }, [pendingCarId]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) {
      setNameError('Identity tag required');
      return;
    }
    setNameError('');
    try {
      await shortlistApi.create(newName.trim(), pendingCarId ? [pendingCarId] : []);
      setNewName('');
      setShowCreate(false);
      onClearPending();
      await load();
    } catch {
      setError('Archive creation failed.');
    }
  }

  async function handleAddToExisting(slId: string) {
    if (!pendingCarId) return;
    const sl = shortlists.find(s => s.id === slId);
    if (!sl) return;
    const updated = sl.car_ids.includes(pendingCarId) ? sl.car_ids : [...sl.car_ids, pendingCarId];
    try {
      await shortlistApi.update(slId, sl.name, updated);
      onClearPending();
      await load();
    } catch {
      setError('Update failed.');
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Purge this archive?")) return;
    try {
      await shortlistApi.delete(id);
      await load();
    } catch {
      setError('Purge failed.');
    }
  }

  async function handleRemoveCar(slId: string, carId: string) {
    const sl = shortlists.find(s => s.id === slId);
    if (!sl) return;
    try {
      await shortlistApi.update(slId, sl.name, sl.car_ids.filter(id => id !== carId));
      await load();
    } catch {
      setError('Item de-listing failed.');
    }
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-surface p-6 shadow-2xl">
      <div className="mb-6 flex items-center justify-between gap-2 border-b border-white/5 pb-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Your Archives</h2>
        <button
          className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-white/10"
          onClick={() => {
            setShowCreate(true);
            setNameError('');
          }}
        >
          + Initialize
        </button>
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-[10px] font-bold text-red-400 uppercase tracking-tighter">{error}</div>}

      {pendingCarId && (
        <div className="mb-6 animate-pulse rounded-lg border border-brand-primary/20 bg-brand-primary/5 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-brand-primary">
          <span className="mr-2">⚡</span> Target Ready: Select Archive
        </div>
      )}

      {showCreate && (
        <form onSubmit={handleCreate} className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <input
            autoFocus
            className="w-full rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white outline-none focus:border-brand-primary/40"
            placeholder="Archive Name (e.g. City SUVs)"
            value={newName}
            onChange={e => {
              setNewName(e.target.value);
              setNameError('');
            }}
          />
          {nameError && <span className="mt-2 block text-[9px] font-bold text-red-500 uppercase">{nameError}</span>}
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-full bg-brand-primary py-2 text-[9px] font-black uppercase tracking-widest text-black" type="submit">
              Confirm
            </button>
            <button
              className="flex-1 rounded-full border border-white/10 py-2 text-[9px] font-black uppercase tracking-widest text-white"
              type="button"
              onClick={() => {
                setShowCreate(false);
                onClearPending();
                setNameError('');
              }}
            >
              Abort
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {shortlists.length === 0 && !showCreate && (
          <p className="py-8 text-center text-[10px] font-bold uppercase tracking-widest text-brand-muted opacity-30">
            No Active Archives
          </p>
        )}

        {shortlists.map(sl => (
          <div key={sl.id} className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.01]">
            <div className={`flex items-center justify-between gap-2 p-3 transition-colors ${expanded === sl.id ? 'bg-white/[0.03]' : ''}`}>
              <button
                className="flex flex-1 items-center gap-3 text-left group"
                onClick={() => setExpanded(expanded === sl.id ? null : sl.id)}
              >
                <div className="flex flex-col">
                  <strong className="text-xs font-black uppercase tracking-tight text-white group-hover:text-brand-primary transition-colors">{sl.name}</strong>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">{sl.car_ids.length} Units</span>
                </div>
              </button>
              
              <div className="flex gap-2">
                {pendingCarId && (
                  <button
                    className="rounded-full bg-brand-primary px-3 py-1 text-[9px] font-black uppercase text-black"
                    onClick={() => handleAddToExisting(sl.id)}
                  >
                    + Add
                  </button>
                )}
                <button
                  className="rounded-full p-2 text-brand-muted hover:text-red-500 transition-colors"
                  onClick={() => handleDelete(sl.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {expanded === sl.id && (
              <div className="border-t border-white/5 bg-black/20 p-3 space-y-2">
                {(sl.cars ?? []).length === 0 && (
                  <p className="py-2 text-center text-[9px] italic text-brand-muted">Registry Empty</p>
                )}
                {(sl.cars ?? []).map(car => (
                  <div key={car.id} className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white">{car.brand} {car.model}</span>
                      <span className="text-[9px] text-brand-primary/70">{fmtPrice(car.price_inr)}</span>
                    </div>
                    <button
                      className="text-[9px] font-black uppercase text-red-500/50 hover:text-red-500 transition-colors"
                      onClick={() => handleRemoveCar(sl.id, car.id)}
                    >
                      Delist
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}