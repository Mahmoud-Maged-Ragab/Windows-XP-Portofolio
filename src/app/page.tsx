'use client';

import dynamic from 'next/dynamic';

// Desktop uses browser APIs (window size), load client-side only
const Desktop = dynamic(() => import('@/components/desktop/Desktop'), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center w-screen h-screen"
      style={{ background: '#3a7ebf' }}
    >
      <div className="text-center text-white">
        <div className="text-5xl mb-4">⊞</div>
        <p className="text-lg font-bold">Loading Windows XP...</p>
        <div className="mt-4 flex gap-1 justify-center">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-white/60 animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default function Home() {
  return <Desktop />;
}
