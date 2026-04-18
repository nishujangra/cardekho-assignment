import { NavLink, Outlet } from 'react-router-dom';

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-semibold transition-all duration-200 ${
    isActive 
      ? 'text-brand-primary border-b-2 border-brand-primary pb-1' 
      : 'text-brand-muted hover:text-white'
  }`;

export default function RootLayout() {
  return (
    // Updated to use the 'background' token from your config
    <div className="min-h-screen bg-background text-slate-200 antialiased">
      
      {/* Header with glassmorphism and subtle border */}
      <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          
          <NavLink to="/" className="group flex items-center gap-2">
            {/* Minimalist Logo Accent */}
            <div className="h-6 w-1 bg-brand-primary rounded-full group-hover:scale-y-110 transition-transform" />
            <span className="text-xl font-black text-white uppercase tracking-tighter">
              Shift
            </span>
          </NavLink>

          <nav className="flex items-center gap-8">
            <NavLink to="/find" className={linkCls}>
              Match Engine
            </NavLink>
            <NavLink to="/shortlists" className={linkCls}>
              My Shortlist
            </NavLink>

          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-border mt-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-xs font-black uppercase tracking-tighter text-white">Shift</span>
          <span className="text-[11px] text-brand-muted">Built for CarDekho Assignment · {new Date().getFullYear()}</span>
        </div>
      </footer>

      {/* Subtle background glow for dark mode depth */}
      <div className="fixed top-0 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-secondary/5 blur-[120px]" />
    </div>
  );
}