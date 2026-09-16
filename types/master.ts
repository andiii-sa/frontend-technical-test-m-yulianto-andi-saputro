

import type { ID, Role, Unit } from "./common";

export interface Warehouse {
  id: ID;
  code: string;
  name: string;
  city: string;
}

export interface Supplier {
  id: ID;
  code: string;
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
  sku: string;
  name: string;
  unit: Unit;
  category: string;
  defaultSupplierId: ID;
}


export type ProductRef = Pick<Product, "id" | "sku" | "name" | "unit" | "category">;