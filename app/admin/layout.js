'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBasket,
  ClipboardList,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f4f4f4] text-slate-900 font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <span className="font-black tracking-tighter text-xl text-[#2f5d50]">SUNNAH DIET</span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 border border-slate-200 shadow-sm"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-8 border-b border-slate-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-black tracking-tighter text-[#2f5d50]">ADMIN PANEL</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1">
              Sunnah Diet Management
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavItem
            href="/admin"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={pathname === '/admin'}
          />
          <NavItem
            href="/admin/products"
            icon={<ShoppingBasket size={18} />}
            label="Products"
            active={pathname === '/admin/products'}
          />
          <NavItem
            href="/admin/orders"
            icon={<ClipboardList size={18} />}
            label="Orders"
            active={pathname === '/admin/orders'}
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full p-3 text-red-600 hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-3 font-bold text-sm uppercase tracking-wider">
              <LogOut size={16} /> Logout
            </div>
            <ChevronRight
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex items-center justify-between px-10 py-5 bg-white border-b border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            System Operational
          </span>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700">Live Server</span>
          </div>
        </header>
        <div className="p-6 md:p-10 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between p-3 transition-all group ${active ? 'bg-[#2f5d50] text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-[#2f5d50]'}`}
    >
      <div className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-wider">
        {icon} {label}
      </div>
      {active && <div className="w-1 h-4 bg-white/40" />}
    </Link>
  );
}
