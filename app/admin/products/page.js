'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Trash2,
  Upload,
  Plus,
  Package,
  AlignLeft,
  Loader2,
  Search,
  Filter,
  ShoppingBag,
  Edit3,
  X,
} from 'lucide-react';
import Image from 'next/image';

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
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => fetchProducts(), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) return alert('ফাইলটি ৪ এমবির ছোট হতে হবে।');

    setUploading(true);
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const newBlob = await response.json();
      setForm((prev) => ({ ...prev, image: newBlob.url }));
    } catch (error) {
      alert('ইমেজ আপলোড ব্যর্থ হয়েছে।');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return alert('দয়া করে একটি ছবি আপলোড করুন।');

    setIsSubmitting(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/products/${editingId}` : '/api/products';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(editingId ? 'প্রোডাক্ট আপডেট হয়েছে!' : 'প্রোডাক্ট সফলভাবে যোগ হয়েছে!');
        resetForm();
        fetchProducts();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'অপারেশন ব্যর্থ হয়েছে।');
      }
    } catch (error) {
      alert('সার্ভারে সমস্যা হয়েছে।');
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
    // ফর্মের কাছে নিয়ে যাওয়ার জন্য
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const deleteProduct = async (id) => {
    if (!confirm('আপনি কি নিশ্চিতভাবে এটি ডিলিট করতে চান?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('সফলভাবে ডিলিট হয়েছে!');
        fetchProducts();
      }
    } catch (error) {
      alert('সার্ভারে সমস্যা হয়েছে।');
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic flex items-center gap-3">
            <Package size={32} className="text-[#2f5d50]" /> ইনভেন্টরি
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wide mt-2">
            পণ্য স্টক এবং তথ্য পরিচালনা করুন
          </p>
        </div>

        <div className="flex items-center bg-white border border-slate-200 px-4 py-3 w-full md:w-80 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="সার্চ করুন..."
            className="ml-3 w-full outline-none text-xs font-bold text-slate-600 placeholder:text-slate-300 uppercase tracking-wide"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Section */}
        <div className="lg:col-span-5" ref={formRef}>
          <form
            onSubmit={handleSubmit}
            className={`bg-white border transition-all duration-500 p-8 shadow-sm space-y-6 ${
              editingId ? 'border-[#2f5d50] ring-1 ring-[#2f5d50]/10' : 'border-slate-200'
            }`}
          >
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <h2 className="text-[11px] font-black uppercase tracking-wide text-[#2f5d50] flex items-center gap-2">
                {editingId ? <Edit3 size={14} /> : <Plus size={14} />}
                {editingId ? 'তথ্য পরিবর্তন করুন' : 'নতুন পণ্য যোগ করুন'}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="space-y-5">
              <InputField
                label="পণ্যের নাম"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="মূল্য (টাকা)"
                  type="number"
                  value={form.price}
                  onChange={(v) => setForm({ ...form, price: v })}
                />
                <InputField
                  label="ক্যাটাগরি"
                  value={form.category}
                  onChange={(v) => setForm({ ...form, category: v })}
                  placeholder="যেমন: মধু"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wide italic">
                  বিস্তারিত বর্ণনা
                </label>
                <textarea
                  rows="3"
                  className="w-full border border-slate-200 p-4 outline-none focus:border-[#2f5d50] text-sm font-medium bg-slate-50/30 transition-all resize-none"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wide italic">
                  ছবি আপলোড
                </label>
                <div
                  onClick={() => !uploading && fileInputRef.current.click()}
                  className="border border-dashed border-slate-200 aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-[#2f5d50] hover:bg-slate-50/50 transition-all relative overflow-hidden group bg-slate-50/20"
                >
                  {form.image ? (
                    <>
                      <Image
                        src={form.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-[#2f5d50]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                        <span className="text-white text-[10px] font-black uppercase tracking-tighter border border-white px-4 py-2">
                          পরিবর্তন করুন
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      {uploading ? (
                        <Loader2 className="animate-spin mx-auto text-[#2f5d50]" size={24} />
                      ) : (
                        <Upload size={24} className="mx-auto text-slate-300 mb-2" />
                      )}
                      <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-tighter">
                        ছবি সিলেক্ট করুন
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
              className={`w-full text-white py-4 font-black uppercase tracking-wide text-[10px] transition-all shadow-sm ${
                editingId ? 'bg-slate-800 hover:bg-black' : 'bg-[#2f5d50] hover:bg-slate-800'
              } disabled:bg-slate-100 disabled:text-slate-400`}
            >
              {isSubmitting
                ? 'প্রসেসিং...'
                : editingId
                  ? 'তথ্য আপডেট করুন'
                  : 'ইনভেন্টরি আপডেট করুন'}
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-4 overflow-x-auto no-scrollbar bg-slate-50/30">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wide flex items-center gap-2 shrink-0 italic">
                <Filter size={10} /> ফিল্টার:
              </span>
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-[9px] font-black uppercase tracking-wide transition-all border ${selectedCategory === cat ? 'bg-[#2f5d50] text-white border-[#2f5d50]' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wide">
                      পণ্য
                    </th>
                    <th className="px-6 py-4 text-center text-[10px] font-black uppercase text-slate-400 tracking-wide">
                      মূল্য
                    </th>
                    <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-slate-400 tracking-wide">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {products.map((p) => (
                    <tr key={p._id} className="group hover:bg-slate-50/50 transition-all">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-white border border-slate-100 relative shrink-0 overflow-hidden">
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
                            <h4 className="font-bold text-sm uppercase text-slate-800 truncate tracking-tight">
                              {p.name}
                            </h4>
                            <p className="text-[9px] font-black text-[#2f5d50] uppercase tracking-wide">
                              {p.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="font-black text-slate-700 text-sm italic">৳{p.price}</span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="p-2.5 text-slate-300 hover:text-[#2f5d50] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p._id)}
                            className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
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
                  <ShoppingBag size={40} className="mx-auto text-slate-100 mb-4" />
                  <p className="text-[10px] font-black uppercase text-slate-300 tracking-wide italic">
                    স্টক খালি
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
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wide italic">
        {label}
      </label>
      <input
        type={type}
        className="w-full border border-slate-200 p-3.5 outline-none focus:border-[#2f5d50] text-sm font-bold bg-slate-50/30 tracking-wide transition-all uppercase placeholder:text-slate-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
