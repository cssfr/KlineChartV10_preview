import { useEffect, useRef } from 'react';
import { KLineChartPro } from '@klinecharts/pro';
import { CustomFastAPIDatafeed } from '../services/CustomFastAPIDatafeed';
import '@klinecharts/pro/dist/klinecharts-pro.css';

interface ChartComponentProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ 
  width = '100%', 
  height = '400px',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A flag to ensure initialization only happens once
    let initialized = true;
    if (containerRef.current && initialized) {
      new KLineChartPro({
        container: containerRef.current,
        locale: 'en-US',
        watermark: `<svg class="logo" viewBox="0 0 160 160"></svg>`,
        symbol: {
          exchange: 'CME',
          market: 'FUTURES',
          name: 'E-mini S&P 500',
          shortName: 'ES',
          ticker: 'ES',
          type: 'FUT',
        },
        period: { multiplier: 5, timespan: 'minute', text: '5m' },
        subIndicators: ['VOL'],
        datafeed: new CustomFastAPIDatafeed(
          import.meta.env.VITE_API_BASE_URL,
          import.meta.env.VITE_API_TOKEN
        )
      });
      console.log('Chart initialized');
    }
    return () => {
      // Since the library has no cleanup method, we prevent re-initialization
      // on hot-reloads by flipping the initialized flag.
      initialized = false;
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ width, height }}
      className={className}
    />
  );
};

export default ChartComponent; 