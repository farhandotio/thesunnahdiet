import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext'; // Context ইম্পোর্ট করুন
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'দ্য সুন্নাহ ডায়েট | Sunnah Based Healthy Lifestyle',
  description:
    'রাসূল ﷺ এর সুন্নাহ অনুযায়ী খেজুর ও প্রাকৃতিক হালাল খাদ্যপণ্য। সুস্থ দেহ, শান্ত মন—এই আমাদের লক্ষ্য।',
  keywords: [
    'Sunnah Diet',
    'Islamic Dates',
    'Khejur Bangladesh',
    'Halal Food',
    'Ajwa Dates',
    'Cash on Delivery Bangladesh',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 3000,
              }}
            />
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
