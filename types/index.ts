/**
 * Barrel export.
 * Letakkan di: src/types/index.ts
 *
 * Konvensi penamaan yang dipakai di seluruh file:
 *   Entity          → bentuk database, hanya menyimpan foreign key (PurchaseRequest)
 *   EntityDetail    → bentuk response, relasi dan nilai turunan sudah terlampir
 *   EntityListItem  → bentuk yang dipakai halaman daftar
 *   EntitySummary   → bentuk ringkas yang dilampirkan di dalam entity lain
 *   EntityRef       → potongan master data yang dilampirkan di dalam item
 *   *Payload        → body yang dikirim ke API
 *   *Filters        → query param untuk halaman daftar
 */

export * from "./common";
export * from "./master";
export * from "./purchase-request";
export * from "./purchase-order";
export * from "./goods-receipt";
export * from "./inventory";
export * from "./dashboard";
export * from "./api";