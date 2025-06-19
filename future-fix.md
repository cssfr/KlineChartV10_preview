Great observation! Handling data boundaries (earliest and latest available dates) is important for a smooth charting experience. Here's a plan to address this:
Plan for Handling Data Boundaries
1. Expose Data Boundaries from FastAPI
Add an endpoint (e.g., /api/ohlcv/bounds/{symbol}) that returns:

'''
  {
    "earliest": "2020-01-01",
    "latest": "2024-06-13"
  }
'''


Apply to app.ts
earliest: The first available date for the symbol.
latest: The last available date (should be today - 1 day).
2. Fetch Boundaries in the Datafeed
In CustomFastAPIDatafeed, add logic to fetch and cache these boundaries per symbol.
3. Clamp Requests in getHistoryKLineData
Before making a data request, clamp the from and to dates to the available range.
If the user scrolls past the earliest or latest, return an empty array or handle gracefully.
4. (Optional) Inform the Chart of Boundaries
If the charting library supports it, set the visible range or show a message when the user tries to view unavailable data.
Example Implementation Steps
FastAPI Side
Add a new endpoint:

Apply to app.ts
Frontend Side (TypeScript)
Add a method in CustomFastAPIDatafeed to fetch and cache boundaries.
In getHistoryKLineData, clamp the from and to dates.
Next Steps
Would you like a code example for the frontend logic to fetch and use these boundaries?
Do you want to handle the FastAPI endpoint yourself, or need a code snippet for that as well?
Let me know how you'd like to proceed!