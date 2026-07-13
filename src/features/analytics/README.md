# Analytics feature

Covers: **Strategic Analytics**, **API Logs Summary**, dashboard charts
(Material Distribution, Brand Distribution).

Suggested structure:

```
analytics/
├── pages/          # StrategicAnalyticsPage.jsx, ApiLogsSummaryPage.jsx
├── components/     # charts (consider adding `recharts` or `chart.js` here)
└── analyticsApi.js # useGetAnalyticsQuery, useGetApiLogsQuery, ...
```

Charting library is intentionally NOT installed yet — pick one when you build
these pages (e.g. `recharts` for a React-friendly API).
