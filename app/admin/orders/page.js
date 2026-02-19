'use client';
import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Trash2, Loader2, Calendar, Clock } from 'lucide-react';
import { notify } from '@/lib/notification';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('সব');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (error) {
      notify.error('অর্ডার লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        notify.success(`স্ট্যাটাস আপডেট সফল হয়েছে`);
        // লোকাল স্টেট আপডেট করা যাতে রিফ্রেশ ছাড়াই দেখা যায়
        setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
      } else {
        notify.error('আপডেট ব্যর্থ হয়েছে');
      }
    } catch (error) {
      notify.error('সার্ভারে সমস্যা হয়েছে');
    }
  };

  const deleteOrder = async (id) => {
    if (!confirm('আপনি কি নিশ্চিতভাবে এই অর্ডারটি ডিলিট করতে চান?')) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      if (res.ok) {
        notify.success('অর্ডার মুছে ফেলা হয়েছে');
        setOrders((prev) => prev.filter((o) => o._id !== id));
      }
    } catch (error) {
      notify.error('ডিলিট ব্যর্থ হয়েছে');
    }
  };

  const statusMap = {
    Pending: 'পেন্ডিং',
    Processing: 'প্রসেসিং',
    Shipped: 'শিপড',
    Delivered: 'ডেলিভারড',
    Cancelled: 'বাতিল',
  };

  const filteredOrders = orders.filter((order) => {
    const name = order.name?.toLowerCase() || '';
    const phone = order.phone || '';
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'সব' || statusMap[order.status] === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#2f5d50] text-white rounded-lg shadow-lg">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-slate-800">
              অর্ডার লিস্ট
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              ম্যানেজমেন্ট সিস্টেম
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <StatBox
            label="পেন্ডিং"
            value={orders.filter((o) => o.status === 'Pending').length}
            color="text-amber-500"
          />
          <StatBox label="মোট অর্ডার" value={orders.length} color="text-[#2f5d50]" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="নাম বা ফোন দিয়ে সার্চ করুন..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#2f5d50] text-xs font-bold transition-all shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {['সব', 'পেন্ডিং', 'প্রসেসিং', 'শিপড', 'ডেলিভারড', 'বাতিল'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border rounded transition-all shrink-0 ${
                statusFilter === s
                  ? 'bg-[#2f5d50] text-white border-[#2f5d50]'
                  : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-[10px] font-black uppercase text-slate-400 tracking-wide">
                <th className="px-6 py-4">অর্ডার আইডি ও তারিখ</th>
                <th className="px-6 py-4">কাস্টমার তথ্য</th>
                <th className="px-6 py-4 text-center">আইটেম</th>
                <th className="px-6 py-4 text-center">মূল্য</th>
                <th className="px-6 py-4 text-center">অবস্থা</th>
                <th className="px-6 py-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#2f5d50]" />
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition-all">
                    <td className="px-6 py-4">
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">
                        #{order._id.slice(-6)}
                      </p>
                      <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold mt-1 uppercase">
                        <Calendar size={10} />{' '}
                        {new Date(order.createdAt).toLocaleDateString('bn-BD')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <h4 className="font-bold text-xs text-slate-800">{order.name}</h4>
                      <p className="text-[9px] text-slate-400 font-bold">{order.phone}</p>
                      <p className="text-[8px] text-slate-400 truncate max-w-37.5">
                        {order.address}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded text-slate-600">
                        {order.items?.length || 0} টি
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-black text-slate-700 text-xs italic">
                        ৳{order.totalAmount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 transition-all">
                        <select
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="text-[9px] font-black bg-white border border-slate-300 rounded px-1.5 py-1 outline-none focus:border-[#2f5d50] uppercase cursor-pointer shadow-sm"
                          value={order.status}
                        >
                          <option value="Pending">পেন্ডিং</option>
                          <option value="Processing">প্রসেসিং</option>
                          <option value="Shipped">শিপড</option>
                          <option value="Delivered">ডেলিভারড</option>
                          <option value="Cancelled">বাতিল</option>
                        </select>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {!loading && filteredOrders.length === 0 && (
            <div className="p-20 text-center text-slate-300">
              <Clock size={40} className="mx-auto mb-4 stroke-1 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-widest">
                কোনো অর্ডার পাওয়া যায়নি
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: { class: 'bg-amber-50 text-amber-600 border-amber-100', label: 'পেন্ডিং' },
    Processing: { class: 'bg-blue-50 text-blue-600 border-blue-100', label: 'প্রসেসিং' },
    Shipped: { class: 'bg-purple-50 text-purple-600 border-purple-100', label: 'শিপড' },
    Delivered: { class: 'bg-[#2f5d50]/10 text-[#2f5d50] border-[#2f5d50]/20', label: 'ডেলিভারড' },
    Cancelled: { class: 'bg-red-50 text-red-600 border-red-100', label: 'বাতিল' },
  };
  const current = styles[status] || { class: 'bg-slate-50 text-slate-600', label: status };
  return (
    <span
      className={`px-2.5 py-1 rounded text-[9px] font-black uppercase border tracking-wider ${current.class}`}
    >
      {current.label}
    </span>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-5 py-2.5 shadow-sm text-center">
      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{label}</p>
      <p className={`text-lg font-black italic leading-none mt-1 ${color}`}>{value}</p>
    </div>
  );
}
