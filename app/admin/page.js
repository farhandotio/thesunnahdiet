'use client';
import { useState, useEffect } from 'react';
import { ShoppingBag, Package, BadgeDollarSign, ArrowUpRight, Loader2, Wallet } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingOrders: 0,
    deliveredRevenue: 0,
    totalPotentialRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [prodRes, orderRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
        ]);

        const products = await prodRes.json();
        const orders = await orderRes.json();

        // ক্যালকুলেশন
        const pending = orders.filter((o) => o.status === 'Pending').length;

        // ১. শুধুমাত্র ডেলিভারড অর্ডারের টাকা (আসল ক্যাশ ইন)
        const deliveredRev = orders
          .filter((o) => o.status === 'Delivered')
          .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        // ২. সব অর্ডারের মোট মূল্য (শিপড, পেন্ডিং সহ সব মিলিয়ে সম্ভাব্য আয়)
        const totalPotential = orders
          .filter((o) => o.status !== 'Cancelled') // বাতিলগুলো বাদে
          .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        setStats({
          totalProducts: products.length,
          pendingOrders: pending,
          deliveredRevenue: deliveredRev,
          totalPotentialRevenue: totalPotential,
        });
      } catch (error) {
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#2f5d50]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-medium text-slate-900 tracking-tight uppercase italic">
          ড্যাশবোর্ড ওভারভিউ
        </h1>
        <p className="text-slate-500 text-xs mt-1 font-bold uppercase tracking-wide">
          আপনার ব্যবসার বর্তমান অবস্থা একনজরে
        </p>
      </div>

      {/* Stats Grid - Now 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          label="মোট পণ্য"
          value={stats.totalProducts}
          icon={<Package size={20} />}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="পেন্ডিং অর্ডার"
          value={stats.pendingOrders}
          icon={<ShoppingBag size={20} />}
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="সম্ভাব্য আয়"
          value={`৳ ${stats.totalPotentialRevenue.toLocaleString()}`}
          icon={<BadgeDollarSign size={20} />}
          color="bg-purple-50 text-purple-600"
        />
        <StatCard
          label="সংগৃহীত আয়"
          value={`৳ ${stats.deliveredRevenue.toLocaleString()}`}
          icon={<Wallet size={20} />}
          color="bg-[#2f5d50]/10 text-[#2f5d50]"
          highlight
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-medium uppercase tracking-wide text-[12px] text-slate-500">
              সাম্প্রতিক অ্যাক্টিভিটি
            </h3>
            <ArrowUpRight size={14} className="text-slate-300" />
          </div>
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Package className="text-slate-200" size={24} />
            </div>
            <p className="text-slate-500 text-[12px] font-medium uppercase tracking-wide">
              আপাতত কোনো তথ্য নেই
            </p>
          </div>
        </div>

        <div className="bg-[#2f5d50] rounded-xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h3 className="text-2xl font-medium italic uppercase tracking-tighter mb-2">
              প্রো টিপস!
            </h3>
            <p className="text-gray-100 text-sm font-bold leading-relaxed max-w-[250px]">
              শিপমেন্ট দ্রুত করতে নিয়মিত পেন্ডিং অর্ডার চেক করুন এবং স্ট্যাটাস আপডেট করুন।
            </p>
          </div>
          <ShoppingBag className="absolute -bottom-6 -right-6 text-white/10 w-32 h-32 rotate-12" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, highlight }) {
  return (
    <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-2xl shadow-sm transition-all hover:shadow-md group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </div>
      <p className="text-slate-500 font-medium text-[11px] md:text-[12px] uppercase tracking-wide mb-1 group-hover:text-[#2f5d50] transition-colors">
        {label}
      </p>
      <h2
        className={`text-xl md:text-3xl font-medium tracking-tighter ${highlight ? 'text-[#2f5d50]' : 'text-slate-900'}`}
      >
        {value}
      </h2>
    </div>
  );
}
