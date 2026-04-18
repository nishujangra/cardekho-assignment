import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recommendations } from '../api';
import type { Recommendation, UserNeed } from '../types';
import NeedForm from '../components/NeedForm';
import RecommendationCard from '../components/RecommendationCard';

export default function FindPage() {
  const navigate = useNavigate();
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());

  async function handleSubmit(need: UserNeed) {
    setLoading(true);
    setError('');
    setRecs([]);
    setCompareIds(new Set());
    try {
      const results = await recommendations.get(need);
      setRecs(results ?? []);
      if ((results ?? []).length === 0)
        setError('No cars matched your lifestyle criteria. Try adjusting your constraints.');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function toggleCompare(id: string) {
    setCompareIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function goToCompare() {
    const selected = recs.filter(r => compareIds.has(r.car.id));
    navigate('/compare', { state: { recs: selected } });
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Search Header Section */}
      <section className="mx-auto w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Define Your Needs</h2>
          <p className="mt-2 text-brand-muted">Our engine analyzes 1,000+ data points to find your match.</p>
        </div>
        
        <div className="rounded-2xl border border-white/5 bg-surface p-1 shadow-2xl">
           <NeedForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </section>

      {error && (
        <div className="mx-auto w-full max-w-2xl rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-center text-sm font-medium text-red-400">
          <span className="mr-2">⚠️</span> {error}
        </div>
      )}

      {recs.length > 0 && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-2xl font-black tracking-tighter text-white uppercase">Verified Matches</h2>
              <p className="text-sm text-brand-muted">Ranked by lifestyle compatibility score.</p>
            </div>
            
            {compareIds.size >= 1 && (
              <button
                onClick={goToCompare}
                disabled={compareIds.size < 2}
                className={`flex items-center gap-2 rounded-full px-6 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                  compareIds.size >= 2 
                    ? 'bg-brand-primary text-black shadow-glow' 
                    : 'bg-white/5 text-brand-muted border border-white/10 cursor-not-allowed'
                }`}
              >
                Compare Tool <span className="opacity-60">({compareIds.size}/3)</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {recs.map((rec, i) => (
              <RecommendationCard
                key={rec.car.id}
                rec={rec}
                rank={i + 1}
                isSelected={compareIds.has(rec.car.id)}
                onToggleCompare={() => toggleCompare(rec.car.id)}
                onAddToShortlist={() => navigate('/shortlists', { state: { pendingCarId: rec.car.id } })}
              />
            ))}
          </div>
        </div>
      )}

      {/* Persistent "Empty State" UI helper */}
      {!loading && recs.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-brand-muted opacity-20">
          <div className="mb-4 h-12 w-12 border-2 border-dashed border-brand-muted rounded-full" />
          <p className="text-sm font-bold uppercase tracking-widest">Awaiting Input Parameters</p>
        </div>
      )}
    </div>
  );
}