# ProcureFlow — Inventory Procurement Web Application

Frontend Technical Test — **M. Yulianto Andi Saputro**

|                |                                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| **Repository** | https://github.com/andiii-sa/frontend-technical-test-m-yulianto-andi-saputro |
| **Live Demo**  | https://andi-technical-evindo-global.netlify.app/                            |

---

## Project Overview

Web application internal untuk menjalankan proses procurement barang antar warehouse, dari permintaan sampai stok bertambah:

```text
Purchase Request → Approval → Purchase Order → Goods Receipt → Inventory Updated
```

Application mensimulasikan dua role (**USER** dan **APPROVER**) melalui role switcher di navbar, tanpa authentication sungguhan. Action yang tersedia di setiap halaman berubah mengikuti role aktif dan status dokumen.

**Halaman yang tersedia:**

| Halaman                                                         | Isi                                                                                                                               |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Dashboard** (`/`)                                             | 4 summary card (Total PR, Waiting Approval, Active PO, Partially Received), recent activity, dan shortcut review Purchase Request |
| **Purchase Requests** (`/purchase-requests`)                    | List + search + filter status/warehouse + pagination, create/edit/view via dialog, approve & reject                               |
| **Purchase Orders** (`/purchase-orders`)                        | List + search + filter status, detail per PO dengan receiving progress                                                            |
| **Purchase Order Detail** (`/purchase-orders/[id]`)             | Order information, item panel (ordered/received/remaining), progress panel, receipt history, action Receive Goods                 |
| **Goods Receipts** (`/goods-receipts`)                          | Riwayat penerimaan barang + detail per receipt                                                                                    |
| **Inventory** (`/inventory`)                                    | Stok per produk per warehouse + search + warehouse filter                                                                         |
| **Inventory Movement** (`/inventory/[productId]/[warehouseId]`) | Current stock + movement history (`+60 PURCHASE_RECEIPT GR-2026-000001`)                                                          |

Seluruh UI state ditangani: **loading (skeleton), empty, error + retry, submitting, disabled, success (toast/dialog)**.

---

## Tech Stack

| Area         | Pilihan                                    | Catatan                                              |
| ------------ | ------------------------------------------ | ---------------------------------------------------- |
| Language     | **TypeScript**                             | Seluruh entity & API response di-type di `types/`    |
| Framework    | **Next.js 16 (App Router)** + **React 19** | Routing file-based sekaligus host untuk mock API     |
| Server State | **TanStack Query v5**                      | Caching, retry, invalidation, `keepPreviousData`     |
| UI State     | **Zustand** (+ `persist`)                  | Role aktif, breadcrumb, network toggle               |
| Styling      | **Tailwind CSS v4**                        | Design token dari design system di `app/globals.css` |
| Component    | **shadcn/ui** + **Base UI**                | Button, Dialog, Select, Table, Toast, Sidebar, dsb.  |
| Form         | **React Hook Form** + **Zod**              | Schema validation + inline error                     |
| Testing      | **Vitest** + **React Testing Library**     | jsdom environment                                    |
| Icon / Date  | **lucide-react**, **moment**               |                                                      |

> Requirement menyebut Vite + TanStack Router sebagai _point plus_. Alasan memilih Next.js dijelaskan di [Engineering Decisions](#engineering-decisions).

---

## Project Structure

```text
frontend-evindo/
├── app/                        # Routing (App Router) + mock API
│   ├── api/                    # Route Handlers = mock backend (HTTP asli)
│   │   ├── purchase-requests/  # GET, POST, PUT, DELETE, /[id]/approval
│   │   ├── purchase-orders/    # GET, /[id], /[id]/receive
│   │   ├── goods-receipts/
│   │   ├── inventory/          # list + /[productId]/[warehouseId]/movement
│   │   └── dashboard/          # summary, recent-activity
│   ├── layout.tsx              # Shell: Sidebar + Navbar + Providers + Toaster
│   ├── providers.tsx           # QueryClientProvider
│   └── (pages)/                # page.tsx tipis, hanya compose feature component
│
├── features/                   # Feature component + business logic per domain
│   ├── dashboard/
│   ├── purchase-requests/      # Table, DialogForm, Detail, usePurchaseRequests
│   ├── purchase-orders/        # Table, detail/* (Header, ItemsPanel, ReceiveGoodsDialog, …)
│   ├── goods-recepits/
│   └── inventory/
│
├── components/
│   ├── ui/                     # Design system primitives (shadcn) — jangan ditulis ulang
│   ├── base/                   # Shared app component: AppTable, AppSidebar, Navbar, Badge, BaseSelect
│   └── shared/                 # DialogConfirmation, ErrorState
│
├── services/                   # Data layer (satu folder per domain)
│   ├── <domain>/index.ts       # Fungsi request murni (fetch + path + payload)
│   └── <domain>/queries.ts     # Query key, useQuery, useMutation, invalidation
│
├── lib/api-client.ts           # apiFetch: base URL, error mapping (ApiError), network simulation
├── mock/                       # "Database" in-memory + business rule + paginate/search/sort
├── constants/data-detail.json  # Seed data: products, warehouses, users, PR, PO, GR, stocks
├── types/                      # Entity, payload, dan response type
├── helpers/                    # Derived state murni (progress PO, format movement)
├── hooks/, stores/, providers/ # UI state & utility hook
└── test/                       # Automated test (Vitest + RTL)
```

**Prinsip pembagiannya:**

```text
page.tsx      → routing & layout saja
features/*    → orkestrasi business flow (hook per feature: use<Domain>.tsx)
services/*    → satu-satunya tempat yang tahu bentuk API
components/ui → design system, tidak tahu business
```

---

## Setup

Prasyarat: **Node.js 20+** dan npm.

```bash
git clone https://github.com/andiii-sa/frontend-technical-test-m-yulianto-andi-saputro.git
cd frontend-technical-test-m-yulianto-andi-saputro
npm install
```

---

## Environment Variables

**Tidak ada.** Application berjalan tanpa konfigurasi tambahan — mock API satu origin dengan frontend (`/api/...`), jadi tidak ada `.env` yang perlu dibuat.

Ketika nanti dihubungkan ke backend sungguhan, satu-satunya yang berubah adalah `BASE_URL` di [lib/api-client.ts](lib/api-client.ts#L14):

```ts
const BASE_URL = "/api"; // → process.env.NEXT_PUBLIC_API_URL
```

---

## Run Application

```bash
npm run dev      # development server → http://localhost:3000
npm run build    # production build
npm run start    # jalankan hasil build
npm run lint     # ESLint
```

---

## Testing

```bash
npm run test     # vitest run
```

Test berada di [test/](test/) menggunakan Vitest + React Testing Library (jsdom). Fokusnya **behavior**, bukan sekadar render.

[test/DialogFormPurchaseRequest.test.tsx](test/DialogFormPurchaseRequest.test.tsx) mencakup:

| Skenario                              | Yang diverifikasi                                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Submit dengan data lengkap            | `handleSubmit` dipanggil **sekali** dengan payload yang benar, dan unit produk terisi otomatis dari master data                            |
| Submit dengan form kosong             | Inline error muncul (`Please select a warehouse`, `Please select a product`, `Quantity must be at least 1`) dan submit **tidak** dipanggil |
| Warehouse terisi tapi quantity kosong | Tetap tertahan di validation, submit **tidak** dipanggil                                                                                   |

---

## Mock API / Data Strategy

Data **tidak** ditaruh langsung di dalam component. Alurnya melewati boundary HTTP yang sama seperti backend sungguhan:

```text
Component
   ↓  (hook)
features/*/use<Domain>.tsx
   ↓
services/<domain>/queries.ts      ← TanStack Query: key, cache, invalidation
   ↓
services/<domain>/index.ts        ← fungsi request murni
   ↓
lib/api-client.ts                 ← fetch + error mapping
   ↓  HTTP /api/...
app/api/**/route.ts               ← Route Handler (mock backend)
   ↓
mock/db.ts  +  mock/paginate.ts   ← business rule, validation, search/filter/sort/pagination
   ↓
constants/data-detail.json        ← seed data
```

**Tiga hal yang membuat mock ini berperilaku seperti backend:**

1. **Business rule ada di sisi server, bukan di component.** `mock/db.ts` yang memutuskan bahwa quantity receive harus `1..remaining`, bahwa PO berstatus `RECEIVED`/`CANCELLED` tidak boleh menerima barang lagi, dan bahwa status berpindah `ORDERED → PARTIALLY_RECEIVED → RECEIVED`. Semuanya melempar `HttpError` dengan status code yang wajar (`404`, `409`, `422`), bukan `alert` di UI.
2. **Response shape konsisten.** Semua endpoint mengembalikan `{ success, message, data }`; endpoint list menambahkan `stats: { currentPage, perPage, totalData, totalPage }`. `mock/paginate.ts` menangani `q`, `page`, `perPage`, `sortBy`, `sortOrder` secara generik untuk semua list.
3. **Network simulation.** Setiap request lewat `delay()` ±500 ms agar loading dan submitting state benar-benar terlihat, bukan hanya berkedip.

**Demo error state:** toggle **Success/Error Mode** di navbar (kanan atas). Saat dimatikan, `apiFetch` langsung melempar `ApiError(0, …)` sebelum request keluar, lalu `queryClient.resetQueries()` dipanggil — jadi seluruh halaman menampilkan error state + tombol _Try Again_ tanpa perlu mematikan koneksi internet sungguhan.

---

## Engineering Decisions

### 1. Next.js Route Handlers sebagai mock API, bukan MSW atau JSON Server

Requirement meminta abstraction yang jelas antara UI dan data layer, dan mock yang mudah ditukar dengan backend sungguhan.

Route Handlers memberi **boundary HTTP yang sungguhan** — ada request, status code, dan error body — bukan interceptor di dalam bundle frontend. Konsekuensinya:

- Frontend tidak pernah tahu bahwa backend-nya mock. Mengganti ke API sungguhan cukup mengubah satu konstanta `BASE_URL`, tanpa menyentuh satu pun component atau hook.
- Mock ikut ter-deploy dan berjalan di demo URL, tanpa perlu menjalankan proses kedua (`json-server`) atau service worker yang tidak aktif di production build.
- Validation dan status transition bisa ditulis di sisi server, sehingga UI tidak "mempercayai dirinya sendiri". Ketika backend asli menerapkan rule yang sama, UI sudah siap menampilkan error 422 tanpa perubahan.

Ini juga alasan tidak memakai Vite + TanStack Router meski disebut sebagai _point plus_: keduanya tidak bisa meng-host mock API dalam satu artifact deploy. Trade-off-nya diambil sadar — satu stack, satu deploy, satu boundary.

### 2. Pemisahan tegas server state dan UI state

Dua jenis state ditangani dua tool berbeda karena karakternya memang berbeda:

|       | Server state                           | UI state                                                           |
| ----- | -------------------------------------- | ------------------------------------------------------------------ |
| Tool  | TanStack Query                         | Zustand + `useState` lokal                                         |
| Isi   | PR, PO, GR, inventory, dashboard       | Role aktif, breadcrumb, network toggle, state dialog, draft filter |
| Sifat | Milik server, bisa basi, perlu refetch | Milik browser, tidak pernah basi                                   |

Yang dihindari: menyalin hasil API ke dalam global store, karena itu menciptakan dua sumber kebenaran yang harus disinkronkan manual.

Konsekuensi praktisnya terlihat pada flow Goods Receipt. Setelah receive berhasil, mutation meng-invalidate query key terkait — detail PO, list PO, goods receipt, dan inventory — sehingga **Received/Remaining quantity, progress bar, status PO, dan stok inventory ikut berubah tanpa reload browser**, sesuai requirement. Tidak ada satu pun `window.location.reload()` di codebase.

Query key disusun hierarkis supaya invalidation bisa presisi:

```ts
purchaseRequestKeys.all; // ["purchase-requests"]
purchaseRequestKeys.lists(); // [..., "list"]         → invalidate semua list
purchaseRequestKeys.list(p); // [..., "list", params] → satu kombinasi filter
purchaseRequestKeys.detail(id);
```

Mutation juga menulis hasilnya langsung ke cache detail (`setQueryData`) supaya dialog yang masih terbuka langsung menampilkan status terbaru tanpa menunggu refetch.

### 3. `AppTable` sebagai satu table component berbasis konfigurasi

Empat halaman list (PR, PO, Goods Receipt, Inventory) memiliki anatomi identik: header, loading, empty, error, pagination. Menulis ulang empat kali berarti empat tempat yang harus diperbaiki setiap kali empty state atau pagination berubah.

[components/base/AppTable.tsx](components/base/AppTable.tsx) menerima array `headers` dengan `renderItem` per kolom, dan **memiliki seluruh UI state di dalam dirinya**:

- `isLoading` → skeleton row sebanyak `perPage` (tinggi tabel tidak melompat saat data datang);
- data kosong → `ErrorState` yang membedakan _"belum ada data"_ (disertai tombol create) dari _"tidak ada hasil untuk filter ini"_ (disertai tombol reset filter) dan dari _gagal fetch_ (disertai _Try Again_);
- pagination + page size di satu tempat.

Efeknya, feature component hanya perlu mendeskripsikan **kolom apa** yang ditampilkan, bukan mengurus lagi bagaimana setiap state digambar. Definisi kolom pun tinggal di hook feature (`usePurchaseRequests`), sehingga logic action per-row (siapa boleh Edit, siapa boleh Approve) berada satu file dengan aturan role-nya.

Untuk responsive, table tetap dipertahankan sebagai table dengan **horizontal scroll pada container**, bukan diubah menjadi card di mobile. Alasannya: data procurement bersifat komparatif (membandingkan ordered/received/remaining antar baris) dan kolomnya banyak — mengubahnya jadi card justru menghilangkan kemampuan membandingkan antar baris. Yang diadaptasi untuk layar kecil adalah area di sekitarnya: sidebar menjadi sheet, filter menjadi stack vertikal, dan pagination turun ke bawah.

### 4. Satu `DialogConfirmation` untuk semua destructive & important action

Requirement meminta Approve, Reject, dan Submit tidak bisa terjadi karena tidak sengaja. Alih-alih membuat dialog terpisah untuk tiap action, dipakai satu component yang dikendalikan state (`useDialogConfirm`) dengan `action` sebagai penentu: `ADD`, `EDIT`, `DELETE`, `APPROVE`, `REJECT`, `LEAVE`, `SUCCESS`.

Keuntungannya, seluruh action penting otomatis mewarisi perilaku yang sama: `persistent` (tidak tertutup karena klik di luar), tombol dalam loading state selama mutation berjalan sehingga double submit tidak mungkin, dan success feedback yang konsisten. Dialog yang sama juga dipakai untuk **unsaved-changes protection** — menutup form yang sudah kotor (`dirty`) memunculkan konfirmasi _Leave_, bukan langsung membuang isian user.

### 5. Form dengan React Hook Form + Zod, dan business rule yang tidak bisa dilanggar dari UI

Purchase Request memiliki item dinamis (tambah/hapus produk) dan aturan lintas-field: produk yang sama tidak boleh dipilih dua kali, quantity harus `> 0`. Zod menangani ini secara deklaratif sebagai satu schema, dan `useFieldArray` menangani baris dinamis — tanpa state manual untuk array item.

Yang disengaja di sini: **unit produk tidak bisa diisi user**, melainkan diturunkan otomatis dari master data produk saat produk dipilih (field-nya read-only). Unit adalah properti produk, bukan input transaksi; membiarkannya diketik membuka peluang `100 BOX` untuk produk yang satuannya `PCS`. Hal yang sama diterapkan di form Goods Receipt: input quantity dibatasi `max = remaining` sekaligus divalidasi ulang di server.

### 6. Role sebagai turunan, bukan flag yang di-set manual

Store hanya menyimpan `user`. `isUser` dan `isApprover` dihitung dari `user.role` di dalam `setUser`, sehingga tidak mungkin ada kondisi role dan flag saling bertentangan. Gating action memakai turunan ini:

- Approve/Reject hanya muncul untuk APPROVER dan hanya pada PR berstatus `SUBMITTED`;
- Edit hanya muncul untuk USER dan hanya pada PR berstatus `DRAFT`;
- tombol Receive Goods diputuskan oleh satu fungsi murni, `getReceiveAction(role, status)` di [helpers/purchase-order.ts](helpers/purchase-order.ts), yang mengembalikan `visible`, `enabled`, dan `reason`.

Pembedaan `visible` dan `enabled` itu disengaja: action yang **tidak relevan untuk role** disembunyikan, sedangkan action yang **relevan tapi sedang tidak valid** ditampilkan dalam keadaan disabled disertai alasan (contoh: _"All items have been received"_). Menyembunyikan keduanya akan membuat user bertanya-tanya ke mana tombolnya pergi.

Role disimpan dengan `persist` ke localStorage supaya refresh saat demo tidak mengembalikan role ke awal.

---
