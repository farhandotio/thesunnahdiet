'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBasket,
  ClipboardList,
  LogOut,
  Menu,
  X,
  PlusCircle,
  List,
  ChevronDown,
  UserCircle,
  Settings,
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 shadow-xl md:shadow-none`}
      >
        {/* Sidebar Brand */}
        <div className="h-20 flex items-center px-6 border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2f5d50] rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-[#2f5d50]/20">
              SD
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-slate-800 leading-none">
                SUNNAH DIET
              </h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Management System
              </p>
            </div>
          </div>
        </div>

        {/* User Profile Info */}
        <div className="px-6 py-6 border-b border-slate-50 shrink-0">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="bg-white p-1 rounded-full shadow-sm">
              <UserCircle size={28} className="text-slate-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-slate-700 truncate uppercase">Admin Panel</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[9px] font-bold text-[#2f5d50] uppercase tracking-tighter">
                  Online Now
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide">
          <NavItem
            href="/admin"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={pathname === '/admin'}
          />

          <div className="space-y-1">
            <button
              onClick={() => setIsProductOpen(!isProductOpen)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                pathname.includes('/admin/products')
                  ? 'bg-[#2f5d50]/5 text-[#2f5d50]'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 text-[13px] font-black uppercase tracking-wider">
                <ShoppingBasket size={18} /> Products
              </div>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isProductOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isProductOpen && (
              <div className="pl-4 space-y-1 mt-1">
                <SubNavItem
                  href="/admin/products"
                  label="All Products"
                  icon={<List size={14} />}
                  active={pathname === '/admin/products'}
                />
                <SubNavItem
                  href="/admin/products/add"
                  label="Add New Product"
                  icon={<PlusCircle size={14} />}
                  active={pathname === '/admin/products/add'}
                />
              </div>
            )}
          </div>

          <NavItem
            href="/admin/orders"
            icon={<ClipboardList size={18} />}
            label="Orders"
            active={pathname === '/admin/orders'}
          />
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-100 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3.5 text-red-500 hover:bg-red-50 rounded-xl transition-all font-black text-[11px] uppercase tracking-widest"
          >
            <LogOut size={16} strokeWidth={2.5} /> Logout Session
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-30 shadow-sm shadow-slate-100/50">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
          >
            <Menu size={22} />
          </button>

          {/* Left Side Status (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">
                System Active
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-l pl-4 border-slate-200">
              Satkhira Node: SD-01
            </span>
          </div>

          {/* Right Side Info */}
          <div className="flex items-center gap-5">
            <div className="text-right border-r pr-5 border-slate-100 hidden sm:block">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Live Clock
              </p>
              <p className="text-xs font-black text-slate-700 italic">{currentTime}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 border border-slate-200">
                <UserCircle size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 md:p-10">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// --- Reusable Navigation Components ---

function NavItem({ href, icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3.5 rounded-xl transition-all font-black text-[13px] uppercase tracking-wider group ${
        active
          ? 'bg-[#2f5d50] text-white shadow-lg shadow-[#2f5d50]/25 translate-x-1'
          : 'text-slate-500 hover:bg-slate-50 hover:text-[#2f5d50]'
      }`}
    >
      <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-[#2f5d50]'}`}>
        {icon}
      </span>
      {label}
    </Link>
  );
}

function SubNavItem({ href, label, icon, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all text-[11px] font-black uppercase tracking-widest border-l-2 ml-2 ${
        active
          ? 'text-[#2f5d50] bg-[#2f5d50]/5 border-[#2f5d50]'
          : 'text-slate-400 border-transparent hover:text-[#2f5d50] hover:bg-slate-50'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
