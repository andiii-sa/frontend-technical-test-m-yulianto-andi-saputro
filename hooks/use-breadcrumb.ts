"use client"

import { useGeneralStore } from "@/providers";
import { useEffect } from "react";

export function useBreadcrumb(items: string[]) {
  const setBreadcrumb = useGeneralStore((s) => s.setBreadcrumb);

  useEffect(() => {
    setBreadcrumb(items);
  }, [items]);
}