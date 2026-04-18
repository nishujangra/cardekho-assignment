import { useState, useEffect } from 'react';
import { shortlists as shortlistApi } from '../api';
import type { ShortlistDetail } from '../types';

interface Props {
  pendingCarId: string | null;
  onClearPending: () => void;
}

function fmtPrice(n: number) {
  if (n >= 10_00_000) return `₹${(n / 10_00_000).toFixed(2)} Cr`;
  return `₹${(n / 1_00_000).toFixed(1)}L`;
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
      setError('Failed to load shortlists');
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (pendingCarId) setShowCreate(true);
  }, [pendingCarId]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) {
      setNameError('Name is required');
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
      setError('Failed to create shortlist');
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
      setError('Failed to update shortlist');
    }
  }

  async function handleDelete(id: string) {
    try {
      await shortlistApi.delete(id);
      await load();
    } catch {
      setError('Failed to delete shortlist');
    }
  }

  async function handleRemoveCar(slId: string, carId: string) {
    const sl = shortlists.find(s => s.id === slId);
    if (!sl) return;
    try {
      await shortlistApi.update(slId, sl.name, sl.car_ids.filter(id => id !== carId));
      await load();
    } catch {
      setError('Failed to update shortlist');
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900">My Shortlists</h2>
        <button
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
          onClick={() => {
            setShowCreate(true);
            setNameError('');
          }}
        >
          + New
        </button>
      </div>

      {error && <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      {pendingCarId && (
        <div className="mb-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Adding car to shortlist. Pick one below or create a new shortlist.
        </div>
      )}

      {showCreate && (
        <form onSubmit={handleCreate} className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <input
            autoFocus
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-blue-500/40 transition focus:ring-2"
            placeholder="Shortlist name"
            value={newName}
            onChange={e => {
              setNewName(e.target.value);
              setNameError('');
            }}
          />
          {nameError && <span className="mt-1 block text-xs text-red-600">{nameError}</span>}
          <div className="mt-2 flex gap-2">
            <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700" type="submit">
              Create
            </button>
            <button
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
              type="button"
              onClick={() => {
                setShowCreate(false);
                onClearPending();
                setNameError('');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {shortlists.length === 0 && !showCreate && (
        <p className="text-sm text-slate-500">No shortlists yet. Create one after getting recommendations.</p>
      )}

      <div className="space-y-2">
        {shortlists.map(sl => (
          <div key={sl.id} className="rounded-lg border border-slate-200">
            <div className="flex items-center justify-between gap-2 p-2">
              <button
                className="flex flex-1 items-center gap-2 text-left"
                onClick={() => setExpanded(expanded === sl.id ? null : sl.id)}
              >
                <strong className="text-sm text-slate-800">{sl.name}</strong>
                <span className="text-xs text-slate-500">{sl.car_ids.length} cars</span>
                <span className="ml-auto text-xs text-slate-400">{expanded === sl.id ? '▲' : '▼'}</span>
              </button>
              <div className="flex gap-1">
                {pendingCarId && (
                  <button
                    className="rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-blue-700"
                    onClick={() => handleAddToExisting(sl.id)}
                  >
                    + Add
                  </button>
                )}
                <button
                  className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-600 hover:text-white"
                  onClick={() => handleDelete(sl.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {expanded === sl.id && (
              <div className="border-t border-slate-200 p-2">
                {(sl.cars ?? []).length === 0 && <p className="text-sm text-slate-500">No cars in this shortlist.</p>}
                <div className="space-y-1.5">
                  {(sl.cars ?? []).map(car => (
                    <div key={car.id} className="flex items-center justify-between gap-2 rounded-md bg-slate-50 px-2 py-1.5">
                      <div className="text-sm text-slate-700">
                        <strong className="text-slate-900">
                          {car.brand} {car.model}
                        </strong>
                        <span className="text-slate-500"> - {fmtPrice(car.price_inr)}</span>
                      </div>
                      <button
                        className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-600 hover:text-white"
                        onClick={() => handleRemoveCar(sl.id, car.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
