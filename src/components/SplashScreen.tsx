import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000); // نمایش صفحه برای ۳ ثانیه

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-pink-500">
      <img src="/vite.svg" alt="Logo" className="w-32 h-32 animate-bounce" />
    </div>
  );
};

export default SplashScreen;
