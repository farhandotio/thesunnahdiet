import toast from 'react-hot-toast';

// নোটিফিকেশন সাউন্ড ফাংশন
const playNotificationSound = (type) => {
  const sounds = {
    success: 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
    error: 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3',
  };

  if (typeof window !== 'undefined') {
    const audio = new Audio(sounds[type] || sounds.success);
    audio.volume = 0.3; // ভলিউম হালকা রাখা হয়েছে
    audio.play().catch((err) => console.log('Audio error:', err));
  }
};

// কমন স্টাইল অবজেক্ট
const baseStyle = {
  background: '#ffffff',
  padding: '16px 24px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '900',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
};

export const notify = {
  success: (message) => {
    playNotificationSound('success');
    toast.success(message, {
      style: {
        ...baseStyle,
        color: '#2f5d50',
        border: '1px solid #2f5d50',
      },
      iconTheme: {
        primary: '#2f5d50',
        secondary: '#fff',
      },
    });
  },
  error: (message) => {
    playNotificationSound('error');
    toast.error(message, {
      style: {
        ...baseStyle,
        color: '#ff4b4b',
        border: '1px solid #ff4b4b',
      },
      iconTheme: {
        primary: '#ff4b4b',
        secondary: '#fff',
      },
    });
  },
};
