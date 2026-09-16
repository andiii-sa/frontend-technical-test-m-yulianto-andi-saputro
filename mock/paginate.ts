import type { IResApiList } from "@/types/api";

export const MAX_PER_PAGE = 100;

export function parseListParams(
  url: string,
): Required<Omit<any, "sortBy">> & { sortBy?: string } {
  const sp = new URL(url).searchParams;
  const toInt = (v: string | null, fallback: number) => {
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : fallback;
  };
  const params:any = {
    page: 1,
    perPage: 5,
    q: "",
    sortBy: "",
    sortOrder: ""
  }
  for (const [key, value] of sp.entries()) {
    if(key === 'page'){
      params[key] = toInt(value, 1)
    } else if(key === 'perPage'){
      params[key] = Math.min(toInt(value, 5), MAX_PER_PAGE)
    } else if(key === 'q'){
      params[key] = value.trim()
    } else if(key === 'sortBy'){
      params[key] = value || undefined
    } else if(key === 'sortOrder'){
      params[key] = value === "1" ? 1 : -1
    } else{
        params[key] = value
    }
  }

  return params
}

interface PaginateOptions<T> {
  searchIn: (row: T) => (string | number | null | undefined)[];
  sortable?: Record<string, (row: T) => string | number | null>;
  defaultSortBy?: string;
}

export function paginate<T>(
  rows: T[],
  params: ReturnType<typeof parseListParams>,
  opts: PaginateOptions<T>,
): IResApiList<T> {
  const q = params.q.toLowerCase();
  const result = q
    ? rows.filter((r) =>
        opts.searchIn(r).some((v) =>
          String(v ?? "")
            .toLowerCase()
            .includes(q),
        ),
      )
    : [...rows];

  if (params.sortBy && opts.sortable && opts.defaultSortBy) {
    const sortBy =
      params.sortBy && opts.sortable[params.sortBy]
        ? params.sortBy
        : opts.defaultSortBy;
    const getter = opts.sortable[sortBy];
    result.sort((a, b) => {
      const va = getter(a);
      const vb = getter(b);
      if (va === vb) return 0;
      if (va === null) return 1; // null selalu di akhir
      if (vb === null) return -1;
      return (va > vb ? 1 : -1) * params.sortOrder;
    });
  }

  const totalData = result.length;
  const totalPage = Math.max(1, Math.ceil(totalData / params.perPage));
  const start = (params.page - 1) * params.perPage;

  return {
    success: true,
    message: "OK",
    data: result.slice(start, start + params.perPage),
    stats: {
      currentPage: params.page,
      perPage: params.perPage,
      totalData,
      totalPage,
    },
  };
}
