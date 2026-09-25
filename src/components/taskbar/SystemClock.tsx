'use client';

import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { ICON_STROKE } from '@/components/system/AppIcon';

export default function SystemClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-1 px-2 py-0.5 bg-white/10 border-l border-white/20 text-white text-xs">
      <Volume2 size={14} strokeWidth={ICON_STROKE} role="img" aria-label="Volume" />
      <span>{time}</span>
    </div>
  );
}
