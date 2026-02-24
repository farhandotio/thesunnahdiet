'use client';
import { useState, useEffect } from 'react';
import { Trash2, Search, Filter, ShoppingBag, Edit3, Package, Plus } from 'lucide-react';
import Link from 'next/link';
import { notify } from '@/lib/notification';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = `/api/products?search=${searchTerm}`;
      if (selectedCategory !== 'All') url += `&category=${selectedCategory}`;
      const res = await fetch(url);
      const data = await res.json();

      // API response structure handle করা (Array না হলে products ফিল্ড চেক করা)
      const productsArray = Array.isArray(data) ? data : data.products || [];
      setProducts(productsArray);
    } catch (error) {
      notify.error('পণ্য লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
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
        notify.success('ডিলিট সফল হয়েছে');
        fetchProducts();
      }
    } catch (error) {
      notify.error('ডিলিট ব্যর্থ হয়েছে');
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:row justify-between items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#2f5d50] rounded-2xl text-white shadow-lg shadow-[#2f5d50]/20">
            <Package size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter italic text-slate-800 leading-none mb-1">
              প্রোডাক্ট ইনভেন্টরি
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              মোট {products.length} টি পণ্য
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="পণ্যের নাম দিয়ে খুঁজুন..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-xs font-bold focus:bg-white focus:border-[#2f5d50] outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            href="/admin/products/add"
            className="bg-[#2f5d50] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 shadow-xl shadow-[#2f5d50]/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus size={18} /> যোগ করুন
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        {/* Category Filter - scrollbar-hide applied */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 mr-2 border-r border-slate-200 pr-4">
            <Filter size={14} className="text-slate-400" />
            <span className="text-[9px] font-black uppercase text-slate-400">ফিল্টার:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-[10px] font-black uppercase rounded-xl border-2 whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2f5d50] text-white border-[#2f5d50] shadow-lg shadow-[#2f5d50]/10'
                  : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
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
                <th className="px-8 py-5">Product Info</th>
                <th className="px-6 py-5 text-center">Category</th>
                <th className="px-6 py-5 text-center">Variants & Pricing</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
                        <img
                          src={p.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt=""
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-[15px] text-slate-800 uppercase tracking-tighter italic leading-tight mb-1 truncate">
                          {p.name}
                        </h4>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span> ID:{' '}
                          {p._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-slate-200/50">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex -space-x-2">
                        {p.variants?.slice(0, 3).map((v, i) => (
                          <div
                            key={i}
                            className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[9px] font-black text-[#2f5d50] shadow-sm"
                          >
                            {v.weight}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-slate-800 mt-1 italic">
                        ৳{p.variants?.[0]?.offerPrice.toLocaleString('bn-BD')} - ৳
                        {p.variants?.[p.variants.length - 1]?.offerPrice.toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/products/edit/${p._id}`}
                        className="p-3 text-slate-400 hover:text-[#2f5d50] hover:bg-[#2f5d50]/10 rounded-2xl transition-all border border-slate-100 hover:border-[#2f5d50]/20 shadow-sm bg-white"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-slate-100 hover:border-red-200 shadow-sm bg-white"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && !loading && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <ShoppingBag size={32} className="text-slate-200 stroke-1" />
              </div>
              <p className="font-black text-slate-300 uppercase tracking-[0.2em] text-[10px]">
                আপনার ইনভেন্টরি একদম খালি
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
