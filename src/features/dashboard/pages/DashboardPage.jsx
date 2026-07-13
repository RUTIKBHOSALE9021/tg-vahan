/**
 * DashboardPage — PLACEHOLDER.
 *
 * Build the "Dashboard Overview" here: stat cards (Today's Certificates,
 * Today's Vehicle, Total Certificates, Active Dealers, Users), the Material &
 * Brand breakdown, and the distribution charts.
 *
 * Fetch data via an injected RTK Query endpoint, e.g.
 *   src/features/dashboard/dashboardApi.js -> useGetDashboardStatsQuery()
 * following the pattern in @features/auth/authApi.js.
 */
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <p className="mt-1 text-gray-500">
        Welcome back, here is what&apos;s happening today.
      </p>

      <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-6 text-sm text-gray-500">
        TODO: stat cards + charts. Wire up a dashboardApi endpoint and render
        the metrics.
      </div>
    </div>
  );
}
