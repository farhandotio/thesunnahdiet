export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">
          Real-time statistics of your business.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200">
        <StatCard label="Total Products" value="24" />
        <StatCard label="Pending Orders" value="12" />
        <StatCard label="Total Revenue" value="৳ 42,500" highlight />
      </div>

      {/* Table placeholder for recent activity */}
      <div className="bg-white border border-slate-200 p-8 shadow-sm">
        <h3 className="font-black uppercase tracking-wide text-xs text-slate-400 mb-6">
          Recent Activities
        </h3>
        <div className="h-40 flex items-center justify-center border border-dashed border-slate-200 text-slate-400 text-sm italic font-medium">
          No recent activity to display.
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <div className="bg-white p-10 border-r border-b border-slate-200 transition-colors hover:bg-slate-50 group">
      <p className="text-slate-400 font-black text-[10px] uppercase tracking-wide mb-4 group-hover:text-[#2f5d50] transition-colors">
        {label}
      </p>
      <h2
        className={`text-4xl font-black tracking-tighter ${highlight ? 'text-[#2f5d50]' : 'text-slate-900'}`}
      >
        {value}
      </h2>
    </div>
  );
}
