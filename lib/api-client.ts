import { delay } from "@/mock/db";
import { getGeneralState } from "@/providers";
import { IResApi } from "@/types";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
  get isNetwork() {
    return this.status === 0;
  }
}

const BASE_URL = "/api"; 

export async function apiFetch<T extends IResApi>(path: string, init?: RequestInit): Promise<T> {
  if (getGeneralState()?.network === false) {
    await delay();
    throw new ApiError(0, "Can't reach the server. Check your connection.");
  }

  let res: Response;
  await delay()
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new ApiError(0, "Can't reach the server. Check your connection.");
  }
  const body = (await res.json().catch(() => null)) as T | null;
  if (!res.ok || !body || body.success === false) {
    throw new ApiError(res.status, body?.message ?? "Request failed");
  }
  return body;
}

export function toQueryString(params: any = {}) {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    sp.set(key, String(value));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}