/**
 * Master data: warehouse, supplier, user, product.
 * Letakkan di: src/types/master.ts
 */

import type { ID, Role, Unit } from "./common";

export interface Warehouse {
  id: ID;
  code: string; // JKT-01
  name: string; // Jakarta Warehouse
  city: string;
}

export interface Supplier {
  id: ID;
  code: string; // SUP-001
  name: string;
}

export interface User {
  id: ID;
  name: string;
  role: Role;
  email: string;
}

export interface Product {
  id: ID;
  sku: string; // OIL-001
  name: string; // Industrial Oil
  unit: Unit;
  category: string;
  /** Dipakai saat approval PR untuk menentukan supplier Purchase Order. */
  defaultSupplierId: ID;
}

/** Bentuk product pada response yang sudah menyertakan supplier default. */
export interface ProductDetail extends Product {
  defaultSupplier: Supplier;
}

/**
 * Potongan product yang dilampirkan di dalam item PR / PO / GR / inventory.
 * Sengaja tidak membawa defaultSupplierId agar payload tidak membengkak.
 */
export type ProductRef = Pick<Product, "id" | "sku" | "name" | "unit" | "category">;