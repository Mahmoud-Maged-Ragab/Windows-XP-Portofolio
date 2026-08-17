'use client';

import dynamic from 'next/dynamic';
import BootScreen from '@/components/system/BootScreen';

// Desktop uses browser APIs (window size), load client-side only
const Desktop = dynamic(() => import('@/components/desktop/Desktop'), {
  ssr: false,
  loading: () => <BootScreen />,
});

export default function Home() {
  return <Desktop />;
}
