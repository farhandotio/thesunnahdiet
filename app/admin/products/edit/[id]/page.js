'use client';
import { useState, useEffect, useRef } from 'react';
import { Upload, Plus, Loader2, ArrowLeft, Trash2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { notify } from '@/lib/notification';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: '',
    category: '',
    image: '',
    description: '',
    variants: [{ weight: '', originalPrice: '', offerPrice: '', stock: '' }],
  });

  // পুরনো ডাটা লোড করা
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setForm(data);
        }
      } catch (error) {
        notify.error('ডাটা লোড করতে সমস্যা হয়েছে');
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProduct();
  }, [params.id]);

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...form.variants];
    updatedVariants[index][field] = value;
    setForm({ ...form, variants: updatedVariants });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const response = await fetch(`/api/upload?filename=${safeName}`, {
        method: 'POST',
        body: file,
      });
      const newBlob = await response.json();
      setForm((prev) => ({ ...prev, image: newBlob.url }));
      notify.success('ছবি আপডেট সফল');
    } catch (error) {
      notify.error('আপলোড ব্যর্থ');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        notify.success('আপডেট সফল হয়েছে');
        router.push('/admin/products');
      }
    } catch (error) {
      notify.error('সার্ভারে সমস্যা হয়েছে');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#2f5d50]" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> ফিরে যান
        </Link>
        <h1 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">
          পণ্য এডিট করুন
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-5">
            <InputField
              label="পণ্যের নাম"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <InputField
              label="ক্যাটাগরি"
              value={form.category}
              onChange={(v) => setForm({ ...form, category: v })}
            />
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
                বর্ণনা
              </label>
              <textarea
                rows="5"
                className="w-full border border-slate-200 rounded-2xl p-4 text-xs font-bold outline-none focus:border-[#2f5d50] bg-slate-50/50 italic"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-widest flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#2f5d50]" /> ভেরিয়েন্ট সমুহ
              </h3>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    variants: [
                      ...form.variants,
                      { weight: '', originalPrice: '', offerPrice: '', stock: '' },
                    ],
                  })
                }
                className="bg-[#2f5d50] text-white px-4 py-2 rounded-lg font-black text-[9px] uppercase flex items-center gap-1.5 shadow-md shadow-[#2f5d50]/10"
              >
                <Plus size={12} /> নতুন ভেরিয়েন্ট
              </button>
            </div>

            <div className="space-y-4">
              {form.variants.map((v, index) => (
                <div
                  key={index}
                  className="p-5 bg-slate-50 rounded-2xl border border-slate-200 relative group animate-in slide-in-from-right-2 duration-300"
                >
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <InputField
                      label="ওজন/সাইজ"
                      value={v.weight}
                      onChange={(val) => handleVariantChange(index, 'weight', val)}
                    />
                    <InputField
                      label="স্টক পরিমাণ"
                      type="number"
                      value={v.stock}
                      onChange={(val) => handleVariantChange(index, 'stock', val)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="৳ আসল মূল্য"
                      type="number"
                      value={v.originalPrice}
                      onChange={(val) => handleVariantChange(index, 'originalPrice', val)}
                    />
                    <InputField
                      label="৳ অফার মূল্য"
                      type="number"
                      value={v.offerPrice}
                      onChange={(val) => handleVariantChange(index, 'offerPrice', val)}
                    />
                  </div>
                  {form.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setForm({ ...form, variants: form.variants.filter((_, i) => i !== index) })
                      }
                      className="absolute -top-2 -right-2 bg-white text-red-500 border border-red-100 p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm sticky top-8">
            <div
              className="relative aspect-square border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden group"
              onClick={() => !uploading && fileInputRef.current.click()}
            >
              {form.image ? (
                <Image
                  src={form.image}
                  alt="Preview"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              ) : (
                <Upload size={32} className="text-slate-200" />
              )}
              {uploading && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                  <Loader2 className="animate-spin text-[#2f5d50]" />
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

            <button
              disabled={uploading || isSubmitting}
              className="w-full bg-[#2f5d50] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] mt-8 shadow-xl shadow-[#2f5d50]/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin mx-auto" size={18} />
              ) : (
                'আপডেট সেভ করুন'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, type = 'text', value = '', onChange, placeholder = '' }) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">
        {label}
      </label>
      <input
        type={type}
        className="w-full border border-slate-200 rounded-xl p-3.5 text-xs font-bold outline-none focus:border-[#2f5d50] bg-slate-50/30 uppercase transition-all"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
