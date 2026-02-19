'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [key, setKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert('ভুল সিক্রেট কি! আবার চেষ্টা করুন।');
      }
    } catch (error) {
      alert('সিস্টেমে সমস্যা হয়েছে। পরে চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] p-4 font-sans">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-[#2f5d50] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="text-white" size={30} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">অ্যাডমিন প্যানেল</h2>
          <p className="text-gray-500 mt-2">প্রবেশ করতে আপনার সিক্রেট কী দিন</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white p-8 border border-gray-100 shadow-2xl rounded-3xl space-y-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Secret Key</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-4 pr-12 border border-gray-100 outline-none focus:border-[#2f5d50] bg-gray-50 rounded-2xl transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2f5d50] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#2f5d50] text-white py-4 rounded-2xl font-bold hover:bg-[#1e3d34] transition-all shadow-lg shadow-[#2f5d50]/20 flex items-center justify-center gap-2 disabled:bg-gray-300"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : null}
            {loading ? 'ভেরিফাই হচ্ছে...' : 'প্রবেশ করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}
