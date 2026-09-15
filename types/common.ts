/**
 * Tipe dasar yang dipakai seluruh domain.
 * Letakkan di: src/types/common.ts
 */

/**
 * Seluruh identitas record bertipe number (auto-increment, mulai dari 1).
 * Route param dan query param adalah string, jadi konversi lewat Number()
 * dilakukan satu kali di hook/loader — jangan di dalam komponen.
 */
export type ID = number;

/** Timestamp ISO-8601 dalam UTC, contoh: "2026-09-01T09:00:00Z". */
export type ISODateString = string;

// export type Role = "USER" | "APPROVER";
export type Role = "USER" | "APPROVER";

export type Unit = "PCS" | "BOX" | "LITER" | "KG" | "SET";

export const UNITS: readonly Unit[] = ["PCS", "BOX", "LITER", "KG", "SET"];