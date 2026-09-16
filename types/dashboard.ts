/**
 * Dashboard: angka ringkasan dan daftar aktivitas terbaru.
 * Keduanya nilai turunan — dihitung di layer service/mock API, bukan di komponen.
 * Letakkan di: src/types/dashboard.ts
 */


export interface DashboardSummary {
  label: string;
  value: number;
  description: string;
}

export interface DashboardRecentActivity {
  status: string;
  label: string;
  description: string;
  date: string;
}
