import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

interface AdSenseProps {
  adSlot: string;
  className?: string;
  adFormat?: 'auto' | 'fluid' | 'display' | 'rectangle';
  adLayoutKey?: string;
}

const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  className = '',
  adFormat = 'auto',
}) => {
  const adRef = useRef<HTMLDivElement | null>(null);
  const hasPushed = useRef(false);

  useEffect(() => {
    const adElement = adRef.current;
    if (!adElement) return;

    const pushAd = () => {
      if (hasPushed.current) return;
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          hasPushed.current = true;
        }
      } catch (e) {
        console.error('AdSense push() error:', e);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          pushAd();
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );
    
    observer.observe(adElement);

    return () => {
      observer.disconnect();
    };
  }, [adSlot]);

  return (
    <div ref={adRef} className={`text-center my-6 ${className}`} aria-hidden="true">
      <ins
        key={adSlot}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2405284034870884"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSense;
