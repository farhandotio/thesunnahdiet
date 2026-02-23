'use client';
import { useState, useEffect } from 'react';
import { Trash2, Search, Filter, ShoppingBag, Edit3, Package, Plus } from 'lucide-react';
import Link from 'next/link';
import { notify } from '@/lib/notification';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchProducts = async () => {
    try {
      let url = `/api/products?search=${searchTerm}`;
      if (selectedCategory !== 'All') url += `&category=${selectedCategory}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      notify.error('পণ্য লোড করতে সমস্যা হয়েছে');
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => fetchProducts(), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory]);

  const deleteProduct = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত ভাবে এই পণ্যটি ডিলিট করতে চান?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        notify.success('ডিলিট সফল হয়েছে');
        fetchProducts();
      }
    } catch (error) {
      notify.error('ডিলিট ব্যর্থ হয়েছে');
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#2f5d50] rounded-xl text-white shadow-lg shadow-[#2f5d50]/20">
            <Package size={20} />
          </div>
          <h1 className="text-xl font-black uppercase tracking-tighter italic text-slate-800">
            প্রোডাক্ট লিস্ট
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="সার্চ করুন..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:border-[#2f5d50] outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            href="/admin/products/add"
            className="bg-[#2f5d50] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase flex items-center gap-2 shadow-lg shadow-[#2f5d50]/20 hover:scale-105 transition-transform"
          >
            <Plus size={16} /> নতুন পণ্য
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3 overflow-x-auto">
          <Filter size={14} className="text-slate-400" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-full border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2f5d50] text-white border-[#2f5d50]'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-[#2f5d50]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">পণ্য তথ্য</th>
                <th className="px-6 py-4 text-center">ক্যাটাগরি</th>
                <th className="px-6 py-4 text-center">ভেরিয়েন্ট</th>
                <th className="px-6 py-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.image}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm"
                        alt=""
                      />
                      <div>
                        <h4 className="font-black text-sm text-slate-800 uppercase tracking-tight leading-none mb-1">
                          {p.name}
                        </h4>
                        <p className="text-[10px] font-bold text-slate-400 truncate max-w-50 italic">
                          #{p._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-[#2f5d50]/5 text-[#2f5d50] px-3 py-1 rounded-full text-[10px] font-black uppercase italic">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-slate-600 italic">
                        {p.variants?.length} সাইজ
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                        স্টকে এভেলেবল
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/edit/${p._id}`}
                        className="p-2.5 text-slate-400 hover:text-[#2f5d50] hover:bg-[#2f5d50]/5 rounded-xl transition-all border border-transparent hover:border-[#2f5d50]/10"
                      >
                        <Edit3 size={16} />
                      </Link>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-20 text-center">
              <ShoppingBag size={48} className="mx-auto text-slate-200 mb-4 stroke-1" />
              <p className="font-black text-slate-300 uppercase tracking-widest text-xs">
                কোনো পণ্য পাওয়া যায়নি
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
