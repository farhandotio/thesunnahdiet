import toast from 'react-hot-toast';

const playNotificationSound = (type) => {
  const sounds = {
    success: 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
    error: 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3',
  };

  const audio = new Audio(sounds[type] || sounds.success);
  audio.play().catch((err) => console.log('Sound play error:', err));
};

export const notify = {
  success: (message) => {
    playNotificationSound('success');
    toast.success(message, {
      style: {
        border: '1px solid #2f5d50',
        padding: '16px',
        color: '#2f5d50',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: '14px',
        letterSpacing: '1px',
        borderRadius: '0px',
      },
      iconTheme: {
        primary: '#2f5d50',
        secondary: '#FFFAEE',
      },
    });
  },
  error: (message) => {
    playNotificationSound('error');
    toast.error(message, {
      style: {
        border: '1px solid #ff4b4b',
        padding: '16px',
        color: '#ff4b4b',
        fontWeight: '900',
        borderRadius: '0px',
      },
    });
  },
};
