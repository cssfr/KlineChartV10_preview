import { KLineChartPro } from '@klinecharts/pro'
import { CustomFastAPIDatafeed } from './services/CustomFastAPIDatafeed'

export default function setupApp (root: HTMLDivElement) {
  let locale = 'en-US'
    root.innerHTML = `
    <div class="github"></div>
    <div id="container">
    </div>
  `
  const options = {
    container: 'container',
    locale,
    watermark: `<svg
        class="logo"
        viewBox="0 0 160 160">
      </svg>`,
    symbol: {
      exchange: 'CME',
      market: 'FUTURES',
      name: 'E-mini S&P 500',
      shortName: 'ES',
      ticker: 'ES',
      type: 'FUT',
    },
    period: { multiplier: 1, timespan: 'minute', text: '1m' },
    subIndicators: ['VOL'],
    datafeed: new CustomFastAPIDatafeed(
      import.meta.env.VITE_API_BASE_URL,
      import.meta.env.VITE_API_TOKEN
    )
  }
  new KLineChartPro(options)
}

