'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Trash2,
  Upload,
  Plus,
  Package,
  Loader2,
  Search,
  Filter,
  ShoppingBag,
  Edit3,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { notify } from '@/lib/notification'; // আপনার নোটিফিকেশন লাইব্রেরি

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
  });

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const fetchProducts = async () => {
    try {
      let url = `/api/products?search=${searchTerm}`;
      if (selectedCategory !== 'All') url += `&category=${selectedCategory}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Fetch error:', error);
      notify.error('পণ্য লোড করতে সমস্যা হয়েছে');
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => fetchProducts(), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) return notify.error('ফাইলটি ৪ এমবির ছোট হতে হবে।');

    setUploading(true);
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const newBlob = await response.json();
      setForm((prev) => ({ ...prev, image: newBlob.url }));
      notify.success('ছবি আপলোড সফল হয়েছে');
    } catch (error) {
      notify.error('ইমেজ আপলোড ব্যর্থ হয়েছে।');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return notify.error('দয়া করে একটি ছবি আপলোড করুন।');

    setIsSubmitting(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        notify.success(editingId ? 'আপডেট সম্পন্ন হয়েছে' : 'সফলভাবে যোগ হয়েছে');
        resetForm();
        fetchProducts();
      } else {
        notify.error('সংরক্ষণ করতে সমস্যা হয়েছে');
      }
    } catch (error) {
      notify.error('সার্ভারে সমস্যা হয়েছে।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ name: '', price: '', category: '', image: '', description: '' });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description || '',
    });
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const deleteProduct = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        notify.success('ডিলিট করা হয়েছে');
        fetchProducts();
      } else {
        notify.error('ডিলিট করা সম্ভব হয়নি');
      }
    } catch (error) {
      notify.error('ডিলিট ব্যর্থ হয়েছে');
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  return (
    <div className="max-w-7xl mx-auto space-y-6 min-h-screen text-slate-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#2f5d50] rounded text-white">
            <Package size={24} />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic text-slate-800">
            ইনভেন্টরি
          </h1>
        </div>

        <div className="relative w-full md:w-72 group">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2f5d50]"
          />
          <input
            type="text"
            placeholder="সার্চ..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded outline-none focus:border-[#2f5d50] text-xs font-bold transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-4" ref={formRef}>
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-300 rounded-md p-5 shadow-sm space-y-4 sticky top-6"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#2f5d50] flex items-center gap-2">
                {editingId ? <Edit3 size={12} /> : <Plus size={12} />}{' '}
                {editingId ? 'সম্পাদনা' : 'নতুন পণ্য'}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <InputField
                label="নাম"
                placeholder="পণ্যের নাম (যেমন: সুন্দরবনের মধু)"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="৳ মূল্য"
                  type="number"
                  placeholder="দাম"
                  value={form.price}
                  onChange={(v) => setForm({ ...form, price: v })}
                />
                <InputField
                  label="ক্যাটাগরি"
                  placeholder="যেমন: মধু"
                  value={form.category}
                  onChange={(v) => setForm({ ...form, category: v })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">
                  বর্ণনা
                </label>
                <textarea
                  rows="3"
                  placeholder="পণ্যের বিস্তারিত এখানে লিখুন..."
                  className="w-full border border-slate-300 rounded p-3 outline-none focus:border-[#2f5d50] text-xs font-bold bg-slate-50/50 resize-none placeholder:text-slate-400"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <div
                  onClick={() => !uploading && fileInputRef.current.click()}
                  className="border-2 border-dashed border-slate-300 rounded aspect-video flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden transition-all"
                >
                  {form.image ? (
                    <Image
                      src={form.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="text-center">
                      {uploading ? (
                        <Loader2 className="animate-spin text-[#2f5d50]" size={18} />
                      ) : (
                        <Upload size={18} className="mx-auto text-slate-300" />
                      )}
                      <p className="text-[8px] font-black uppercase text-slate-400 mt-1">
                        ছবি আপলোড করুন
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>

            <button
              disabled={uploading || isSubmitting}
              className="w-full bg-[#2f5d50] text-white py-3.5 rounded font-black uppercase tracking-widest text-[9px] hover:bg-slate-800 transition-all disabled:bg-slate-100 disabled:text-slate-400"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin mx-auto" size={16} />
              ) : editingId ? (
                'আপডেট করুন'
              ) : (
                'স্টকে যোগ করুন'
              )}
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-300 rounded-md shadow-sm overflow-hidden">
            {/* Filter */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-3 overflow-x-auto bg-slate-50/30 scrollbar-hide">
              <Filter size={10} className="text-slate-400 shrink-0" />
              <div className="flex gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-[10px] whitespace-nowrap font-medium uppercase tracking-widest border rounded transition-all ${selectedCategory === cat ? 'bg-[#2f5d50] text-white border-[#2f5d50]' : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[9px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3">পণ্য</th>
                    <th className="px-5 py-3 text-center">মূল্য</th>
                    <th className="px-5 py-3 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {products.map((p) => (
                    <tr key={p._id} className="group hover:bg-slate-50/40 transition-all">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded border border-slate-300 relative shrink-0 overflow-hidden">
                            {p.image && (
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs uppercase text-slate-800 truncate tracking-tight leading-tight">
                              {p.name}
                            </h4>
                            <span className="text-[10px] font-medium text-[#2f5d50]/90 uppercase tracking-tighter">
                              {p.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-center text-xs font-black text-slate-600 italic">
                        ৳{p.price}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => handleEdit(p)}
                            className="p-2 text-slate-500 hover:text-[#2f5d50] hover:bg-white rounded border border-transparent hover:border-slate-300 transition-all"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p._id)}
                            className="p-2 text-slate-500 hover:text-red-500 hover:bg-white rounded border border-transparent hover:border-slate-300 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <div className="p-16 text-center">
                  <ShoppingBag size={32} className="mx-auto text-slate-200 mb-3 stroke-1" />
                  <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest">
                    কোনো পণ্য পাওয়া যায়নি
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type = 'text', value, onChange, placeholder = '' }) {
  return (
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">
        {label}
      </label>
      <input
        type={type}
        className="w-full border border-slate-300 rounded p-2.5 outline-none focus:border-[#2f5d50] text-xs font-bold bg-slate-50/50 uppercase placeholder:text-slate-400 transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
