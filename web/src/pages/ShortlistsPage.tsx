import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { shortlists as api } from '../api';
import type { Shortlist } from '../types';

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ShortlistsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const pendingCarId: string | null = location.state?.pendingCarId ?? null;

  const [list, setList] = useState<Shortlist[]>([]);
  const [error, setError] = useState('');
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const [showCreate, setShowCreate] = useState(!!pendingCarId);

  async function load() {
    try {
      setList(await api.list() ?? []);
    } catch {
      setError('System could not retrieve your collections.');
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) { setNameError('Identity tag required'); return; }
    setNameError('');
    try {
      const sl = await api.create(newName.trim(), pendingCarId ? [pendingCarId] : []);
      setNewName('');
      setShowCreate(false);
      navigate(`/shortlists/${sl.id}`, { replace: true });
    } catch {
      setError('Archive creation failed.');
    }
  }

  async function handleAddToExisting(slId: string) {
    if (!pendingCarId) return;
    const sl = list.find(s => s.id === slId);
    if (!sl) return;
    const updated = sl.car_ids.includes(pendingCarId) ? sl.car_ids : [...sl.car_ids, pendingCarId];
    try {
      await api.update(slId, sl.name, updated);
      navigate(`/shortlists/${slId}`, { replace: true });
    } catch {
      setError('Update failed.');
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this collection?")) return;
    try {
      await api.delete(id);
      await load();
    } catch {
      setError('Removal failed.');
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header Section */}
      <div className="flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">Saved Archives</h1>
          <p className="text-brand-muted text-sm">Your data-driven roadmaps to a final purchase.</p>
        </div>
        <button
          onClick={() => { setShowCreate(true); setNameError(''); }}
          className="rounded-full bg-brand-primary px-6 py-2.5 text-xs font-black uppercase tracking-widest text-black shadow-glow transition hover:scale-105"
        >
          + Create New
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-400">
          {error}
        </div>
      )}

      {pendingCarId && (
        <div className="animate-pulse rounded-xl border border-brand-primary/20 bg-brand-primary/5 px-6 py-4">
          <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
            Target Identification Active
          </p>
          <p className="text-xs text-brand-muted mt-1">Select an archive below or initialize a new one to save your match.</p>
        </div>
      )}

      {/* Creation Modal/Form Overlay */}
      {showCreate && (
        <form onSubmit={handleCreate} className="rounded-2xl border border-brand-primary/30 bg-surface p-8 shadow-2xl ring-1 ring-brand-primary/10">
          <h2 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Initialize New Collection</h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              autoFocus
              placeholder="e.g. Urban Commuter SUV"
              value={newName}
              onChange={e => { setNewName(e.target.value); setNameError(''); }}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50"
            />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-black hover:bg-brand-primary transition-colors">
                Initialize
              </button>
              <button
                type="button"
                onClick={() => { setShowCreate(false); setNameError(''); }}
                className="rounded-full border border-white/10 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </div>
          {nameError && <p className="mt-3 text-[10px] font-bold uppercase text-red-500">{nameError}</p>}
        </form>
      )}

      {/* List State */}
      {list.length === 0 && !showCreate ? (
        <div className="flex flex-col items-center gap-6 py-24 text-center opacity-40">
          <div className="h-20 w-px bg-gradient-to-b from-transparent via-brand-muted to-transparent" />
          <p className="text-xs font-black uppercase tracking-[0.4em] text-brand-muted">Archives Empty</p>
          <button
            onClick={() => navigate('/find')}
            className="text-xs font-bold text-white underline underline-offset-8 decoration-brand-primary/50 hover:text-brand-primary transition-colors"
          >
            Execute Match Engine
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {list.map(sl => (
            <div 
              key={sl.id} 
              className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/5 bg-surface p-6 transition-all hover:border-brand-primary/20 hover:bg-white/[0.02]"
            >
              <div
                className="flex flex-1 cursor-pointer flex-col"
                onClick={() => navigate(`/shortlists/${sl.id}`)}
              >
                <span className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors leading-tight">
                  {sl.name}
                </span>
                <span className="mt-1 text-[10px] font-black uppercase tracking-widest text-brand-muted">
                  {sl.car_ids.length} Units · Logged {fmtDate(sl.created_at)}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {pendingCarId && (
                  <button
                    onClick={() => handleAddToExisting(sl.id)}
                    className="rounded-full bg-brand-primary/10 border border-brand-primary/30 px-4 py-2 text-[10px] font-black uppercase tracking-tighter text-brand-primary hover:bg-brand-primary hover:text-black transition-all"
                  >
                    + Add
                  </button>
                )}
                <button
                  onClick={() => handleDelete(sl.id)}
                  className="p-2 text-brand-muted hover:text-red-500 transition-colors"
                  title="Delete Archive"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}