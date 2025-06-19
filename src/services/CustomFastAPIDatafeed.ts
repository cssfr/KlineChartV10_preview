import { KLineData } from 'klinecharts';
import { Datafeed, SymbolInfo, Period, DatafeedSubscribeCallback } from '@klinecharts/pro';

/**
 * Custom Datafeed implementation for FastAPI backend
 */
export class CustomFastAPIDatafeed implements Datafeed {
    private readonly baseUrl: string;
    private readonly token: string;

    constructor(baseUrl: string, token: string) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    private async fetchWithAuth(url: string) {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async searchSymbols(search?: string): Promise<SymbolInfo[]> {
        // Static implementation - extend this if you need dynamic symbol search
        return [{
            ticker: 'ES',
            name: 'E-mini S&P 500',
            shortName: 'ES',
            exchange: 'CME',
            market: 'FUTURES'
        }];
    }

    async getHistoryKLineData(symbol: SymbolInfo, period: Period, from: number, to: number): Promise<KLineData[]> {
        // Convert timestamps to YYYY-MM-DD format
        const startDate = new Date(from).toISOString().split('T')[0];
        const endDate = new Date(to).toISOString().split('T')[0];
        
        // Convert period to API's expected format
        const timeframe = `${period.multiplier}${period.timespan.charAt(0)}`;
        
        const url = `${this.baseUrl}/api/ohlcv/data/${symbol.ticker}?` + 
                   `start_date=${startDate}&end_date=${endDate}&` +
                   `timeframe=${timeframe}&source_resolution=1Y`;

        console.log('Fetching data from:', url); // Debug log
        const response = await this.fetchWithAuth(url);
        console.log('Response data first item:', response.data[0]); // Debug log
        
        // Transform the FastAPI response format to KLineData format
        return response.data.map(([timestamp, open, high, low, close, volume]: number[]) => {
            const dataPoint = {
                timestamp: timestamp * 1000, // Convert seconds to milliseconds
                open,
                high,
                low,
                close,
                volume
            };
            console.log('Transformed data point:', dataPoint); // Debug log
            return dataPoint;
        });
    }

    // No-op implementations for real-time methods as they're not needed
    subscribe(symbol: SymbolInfo, period: Period, callback: DatafeedSubscribeCallback): void {}
    unsubscribe(symbol: SymbolInfo, period: Period): void {}
} 