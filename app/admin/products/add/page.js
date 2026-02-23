'use client';
import { useState, useRef } from 'react';
import { Upload, Plus, Loader2, ArrowLeft, X, Trash2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notify } from '@/lib/notification';

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: '',
    image: '',
    description: '',
    variants: [{ weight: '', originalPrice: '', offerPrice: '', stock: '' }],
  });

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...form.variants];
    updatedVariants[index][field] = value;
    setForm({ ...form, variants: updatedVariants });
  };

  const addVariantField = () => {
    setForm({
      ...form,
      variants: [...form.variants, { weight: '', originalPrice: '', offerPrice: '', stock: '' }],
    });
  };

  const removeVariantField = (index) => {
    if (form.variants.length > 1) {
      setForm({ ...form, variants: form.variants.filter((_, i) => i !== index) });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const newBlob = await response.json();
      setForm((prev) => ({ ...prev, image: newBlob.url }));
      notify.success('ছবি আপলোড সফল হয়েছে');
    } catch (error) {
      notify.error('ছবি আপলোড ব্যর্থ');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return notify.error('দয়া করে একটি ছবি যোগ করুন');

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        notify.success('সফলভাবে যোগ হয়েছে');
        router.push('/admin/products');
      }
    } catch (error) {
      notify.error('সার্ভারে সমস্যা হয়েছে');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-slate-400 hover:text-[#2f5d50] transition-colors font-black text-[10px] uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> ফিরে যান
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
            নতুন পণ্য যোগ করুন
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Side: General Info */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <InputField
              label="পণ্যের নাম"
              placeholder="যেমন: প্রিমিয়াম সুক্কারি খেজুর"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <InputField
              label="ক্যাটাগরি"
              placeholder="যেমন: খেজুর / মধু"
              value={form.category}
              onChange={(v) => setForm({ ...form, category: v })}
            />

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">
                বিস্তারিত বর্ণনা
              </label>
              <textarea
                rows="5"
                className="w-full border border-slate-200 rounded-2xl p-4 text-xs font-bold outline-none focus:border-[#2f5d50] bg-slate-50/50 italic resize-none"
                placeholder="পণ্যের গুণাগুণ এখানে লিখুন..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          {/* Variant Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-widest flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#2f5d50]" /> ভেরিয়েন্ট সমুহ
              </h3>
              <button
                type="button"
                onClick={addVariantField}
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
                      placeholder="1kg"
                      value={v.weight}
                      onChange={(val) => handleVariantChange(index, 'weight', val)}
                    />
                    <InputField
                      label="স্টক পরিমাণ"
                      type="number"
                      placeholder="00"
                      value={v.stock}
                      onChange={(val) => handleVariantChange(index, 'stock', val)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="৳ আসল মূল্য"
                      type="number"
                      placeholder="0.00"
                      value={v.originalPrice}
                      onChange={(val) => handleVariantChange(index, 'originalPrice', val)}
                    />
                    <InputField
                      label="৳ অফার মূল্য"
                      type="number"
                      placeholder="0.00"
                      value={v.offerPrice}
                      onChange={(val) => handleVariantChange(index, 'offerPrice', val)}
                    />
                  </div>
                  {form.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariantField(index)}
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

        {/* Right Side: Image & Submit */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] block text-center">
                পণ্যের ছবি
              </label>
              <div
                className="relative aspect-square border-4 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all overflow-hidden group"
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
                  <div className="text-center p-6">
                    {uploading ? (
                      <Loader2 className="animate-spin text-[#2f5d50] mx-auto" />
                    ) : (
                      <Upload size={32} className="mx-auto text-slate-200 mb-2" />
                    )}
                    <p className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">
                      Click to upload HD Image
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

            <button
              disabled={uploading || isSubmitting}
              className="w-full bg-[#2f5d50] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] mt-8 shadow-xl shadow-[#2f5d50]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin mx-auto" size={18} />
              ) : (
                'পণ্যটি স্টকে যোগ করুন'
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
        className="w-full border border-slate-200 rounded-xl p-3.5 text-xs font-bold outline-none focus:border-[#2f5d50] bg-slate-50/30 uppercase transition-all placeholder:text-slate-300"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
