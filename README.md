# Food Delivery System — Frontend

A multi-role food delivery web application built with Next.js, supporting Customer, Driver, and Admin dashboards.

---

## Tech Stack

| Layer        | Technology                               |
| ------------ | ---------------------------------------- |
| Framework    | Next.js 16 (App Router, no `src/`)       |
| Language     | TypeScript 5 (strict)                    |
| Styling      | Tailwind CSS v4 + shadcn/ui              |
| Auth         | NextAuth.js v5 (beta)                    |
| Client State | Zustand v5 (localStorage persisted)      |
| Server State | TanStack React Query v5                  |
| HTTP         | Axios v1 (request/response interceptors) |
| Forms        | React Hook Form v7 + Zod v4              |
| Icons        | Lucide React                             |

---

## Prerequisites

- Node.js >= 18
- The [backend API](../Food_Delivery_System) running on `http://localhost:3000`

---

## Getting Started

```bash
npm install
npm run dev
```

Runs on **http://localhost:4200**.

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:4200
```

---

## Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Development server (port 4200) |
| `npm run build` | Production build               |
| `npm run start` | Production server              |
| `npm run lint`  | ESLint                         |

---

## Project Structure

```
food-delivery-frontend/
├── app/
│   ├── (auth)/                         # Login + register pages (customer, driver, admin)
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # Shared dashboard shell (Sidebar + Header)
│   │   └── dashboard/
│   │       ├── page.tsx               # Role-based redirect hub
│   │       ├── admin/                 # Admin pages (overview, orders, customers, drivers, settings)
│   │       ├── customer/              # Customer pages (overview, orders, settings)
│   │       └── driver/                # Driver pages (overview, settings)
│   ├── (legal)/                        # Public legal pages (terms, privacy)
│   ├── (store)/                        # Public store/menu exploration (customer view)
│   ├── api/auth/[...nextauth]/         # NextAuth route handler
│   ├── layout.tsx
│   ├── page.tsx                        # Global landing page with CTAs
│   └── provider.tsx                    # SessionProvider + QueryClient + AsyncBridge
├── components/
│   ├── ui/                             # shadcn/ui primitives
│   ├── auth/                           # Auth-specific components (AuthLayout, AuthFormField, etc.)
│   ├── sidebar/                        # Sidebar, Header, MobileSidebar
│   └── shared/                         # AvatarUpload and other shared components
├── hooks/
│   ├── queries/                        # useOrders, useCustomer, useDriver, useAdmin, useProfileImage
│   └── mutations/                      # useOrderMutations, useCustomerMutations, useDriverMutations, useAdminMutations
├── lib/
│   ├── auth.ts                         # NextAuth config (3 providers)
│   ├── axios.ts                        # Axios instance (JWT interceptor, upload timeout bypass)
│   ├── axios.server.ts                 # Server-side Axios (used by NextAuth authorize())
│   └── utils.ts                        # cn(), getInitials(), formatCurrency(), formatDate()
├── schemas/                            # Zod schemas (auth, customer, driver, order, etc.)
├── services/                           # API service layer
│   ├── auth.service.ts
│   ├── admin.service.ts
│   ├── customer.service.ts
│   ├── driver.service.ts
│   ├── order.service.ts
│   └── restaurant.service.ts
├── store/                              # Zustand stores
│   ├── auth.store.ts                   # User, token, isHydrated, role selectors
│   ├── cart.store.ts
│   └── ui.store.ts                     # Sidebar open state, modals
└── types/
    ├── api.types.ts                    # PaginatedResponse, AppException, ApiSuccessResponse
    ├── auth.types.ts
    ├── customer.types.ts
    ├── driver.types.ts
    ├── order.types.ts
    ├── restaurant.types.ts
    ├── map.ts                          # PROVIDER_MAP, REDIRECT_MAP, STATUS_VARIANT, NEXT_STATUS
    └── next-auth.d.ts                  # NextAuth module augmentation
```

---

## Completed Pages

### Public

| Route                | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| `/`                  | Landing page: Hero, How it Works, Value props, Customer & Driver CTAs |
| `/login`             | Universal login page with role tab switching                          |
| `/register/customer` | Customer sign-up flow                                                 |
| `/register/driver`   | Driver sign-up flow                                                   |
| `/terms`             | Terms of Service document                                             |
| `/privacy`           | Privacy Policy document                                               |

### Admin

| Route                        | Description                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| `/dashboard/admin`           | Overview: revenue, active orders, customer count, driver availability |
| `/dashboard/admin/orders`    | All orders with status filter, advance/cancel/delete actions          |
| `/dashboard/admin/customers` | All customers with search, pagination, delete                         |
| `/dashboard/admin/drivers`   | All drivers with search, pagination, delete                           |
| `/dashboard/admin/settings`  | Profile picture upload, profile update, password change               |

### Customer

| Route                          | Description                                             |
| ------------------------------ | ------------------------------------------------------- |
| `/dashboard/customer`          | Overview: total/active/delivered/cancelled order stats  |
| `/dashboard/customer/orders`   | Order history with status filter, cancel action         |
| `/dashboard/customer/settings` | Profile picture upload, profile update, password change |

### Driver

| Route                        | Description                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| `/dashboard/driver`          | Overview: delivery stats, availability toggle                         |
| `/dashboard/driver/settings` | Profile picture upload, profile update, vehicle type, password change |

---

## Key Architecture Decisions

### `isHydrated` gate on all query hooks

All React Query hooks have `enabled: isHydrated` where `isHydrated` is a Zustand flag set by `AsyncBridge` only after NextAuth resolves the session. Without this, queries fire immediately on mount before the JWT token is in the Zustand store, sending requests with no `Authorization` header and receiving 403s from the backend.

```ts
export function useOrders(params?: OrderListParams) {
  const isHydrated = useIsHydrated();
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => orderService.getAllOrders(params),
    enabled: isHydrated, // ← blocks until token is ready
  });
}
```

### Role-specific profile hooks gated by `userType`

`useCustomerProfile`, `useDriverProfile`, and `useAdminProfile` each gate on both `isHydrated && userType === "role"`. This prevents a customer from accidentally hitting the driver profile endpoint or vice versa when all three hooks are called inside `useProfileImage`.

### `AsyncBridge` — syncing NextAuth → Zustand

NextAuth manages the session; Zustand manages the token for Axios. `AsyncBridge` in `provider.tsx` runs a `useEffect` on every session status change and calls `setAuth` or `clearAuth` accordingly. `setHydrated()` is called once the status is no longer `"loading"` — signalling all queries to fire.

### Multipart upload timeout bypass

The Axios instance has a 10-second global timeout. File uploads go through the backend to Supabase Storage and regularly exceed 10s. The request interceptor detects `config.data instanceof FormData` and sets `config.timeout = 0` (unlimited) for those requests only.

```ts
if (config.data instanceof FormData) {
  config.timeout = 0;
}
```

### `PaginatedResponse<T>` matches `nestjs-typeorm-paginate`

The backend uses `nestjs-typeorm-paginate` which returns `{ items, meta, links }`. All pages access `.items` for the array and `.meta.totalItems` for the count.

---

## Services

### `admin.service.ts`

| Method               | Endpoint                                        | Description             |
| -------------------- | ----------------------------------------------- | ----------------------- |
| `getAllCustomers`    | `GET /customer/all`                             | Paginated customer list |
| `getCustomerById`    | `GET /customer/:id`                             | Single customer         |
| `deleteCustomer`     | `DELETE /customer/delete/:id`                   | Delete customer         |
| `getProfile`         | `GET /customer/admin/profile`                   | Admin own profile       |
| `updateProfile`      | `PUT /customer/admin/update/:id`                | Update admin profile    |
| `updatePassword`     | `PUT /customer/admin/update-password/:id`       | Change admin password   |
| `uploadProfileImage` | `POST /customer/admin/upload-profile-image/:id` | Upload admin picture    |
| `getAllDrivers`      | `GET /driver/all`                               | Paginated driver list   |
| `getDriverById`      | `GET /driver/:id`                               | Single driver           |
| `deleteDriver`       | `DELETE /driver/delete/:id`                     | Delete driver           |

### `customer.service.ts`

| Method               | Endpoint                                  | Description            |
| -------------------- | ----------------------------------------- | ---------------------- |
| `getProfile`         | `GET /customer/profile`                   | Own profile            |
| `updateProfile`      | `PUT /customer/update/:id`                | Update profile         |
| `updatePassword`     | `PUT /customer/update-password/:id`       | Change password        |
| `uploadProfileImage` | `POST /customer/upload-profile-image/:id` | Upload picture         |
| `getOrders`          | `GET /customer/orders/:id`                | Own orders (paginated) |

### `driver.service.ts`

| Method               | Endpoint                                | Description         |
| -------------------- | --------------------------------------- | ------------------- |
| `getProfile`         | `GET /driver/profile`                   | Own profile         |
| `updateProfile`      | `PUT /driver/update/:id`                | Update profile      |
| `updatePassword`     | `PUT /driver/update-password/:id`       | Change password     |
| `uploadProfileImage` | `POST /driver/upload-profile-image/:id` | Upload picture      |
| `toggleAvailability` | `PATCH /driver/toggle-availability/:id` | Toggle availability |
| `getAllOrders`       | `GET /driver/orders/all/:id`            | All assigned orders |

### `order.service.ts`

| Method                | Endpoint                         | Description                 |
| --------------------- | -------------------------------- | --------------------------- |
| `getAllOrders`        | `GET /order/all`                 | Admin: all orders           |
| `getOrdersByCustomer` | `GET /order/customer/:id`        | Customer/Admin: by customer |
| `getOrdersByDriver`   | `GET /order/driver/:id`          | Driver/Admin: by driver     |
| `updateOrderStatus`   | `PATCH /order/update-status/:id` | Admin: advance status       |
| `cancelOrder`         | `PATCH /order/cancel/:id`        | Customer: cancel            |
| `deleteOrder`         | `DELETE /order/delete/:id`       | Admin: delete               |

---

## Authentication

Three credential providers in `lib/auth.ts`: `customer-login`, `driver-login`, `admin-login`. Each calls the corresponding backend login endpoint, receives a JWT, and stores it in the NextAuth session. The JWT is injected into every Axios request via the request interceptor.

### Redirect after login

| Role     | Redirects to          |
| -------- | --------------------- |
| customer | `/dashboard/customer` |
| driver   | `/dashboard/driver`   |
| admin    | `/dashboard/admin`    |

`/dashboard/page.tsx` acts as a redirect hub — reads `userType` from Zustand and immediately `router.replace()`s to the correct path.

---

## State Management

| Store        | Persisted | Contents                                               |
| ------------ | --------- | ------------------------------------------------------ |
| `auth.store` | Yes       | `user`, `accessToken`, `isAuthenticated`, `isHydrated` |
| `cart.store` | Yes       | Cart items, restaurantId, totals                       |
| `ui.store`   | No        | `isSidebarOpen`, `activeModal`, `isLoading`            |

---

## Bug Fixes & Lessons Learned

> These were discovered March 2026 while building the frontend against a backend written in December 2025 without integration tests. **Lesson: write unit + integration tests early. Don't discover backend bugs via frontend symptoms six weeks later.**

### Bug 1 — 403s on every dashboard load (race condition)

**Problem:** React Query hooks fired immediately on component mount. At that moment, `AsyncBridge`'s `useEffect` hadn't run yet, so `accessToken` in Zustand was `null`. Axios sent requests with no `Authorization` header → 403 from every guarded endpoint.

**Root cause:** `useEffect` runs after paint; React Query fires on mount — there's always a gap.

**Fix:** Added `isHydrated: boolean` to `auth.store`. `AsyncBridge` sets `isHydrated = true` after NextAuth resolves. Every query hook gates on `enabled: isHydrated`.

---

### Bug 2 — Wrong backend endpoint URLs in service files

**Problem:** Multiple service methods used URLs that didn't exist:

- `order.service.ts`: `/order/admin/customer/:id`, `/order/admin/driver/:id`, `/order/admin/:id`
- `customer.service.ts`: `/customer/admin/orders/:id`

**Fix:** Corrected to actual backend paths: `/order/customer/:id`, `/order/driver/:id`, `/order/:id`, `/customer/orders/:id`. Traced root cause to the backend README not clearly documenting paths with their role guards.

---

### Bug 3 — `PaginatedResponse` shape mismatch (all lists showed empty)

**Problem:** Frontend `PaginatedResponse<T>` was typed as `{ data: T[], total: number }`. The backend returns `nestjs-typeorm-paginate`'s `{ items: T[], meta: { totalItems, currentPage, ... }, links }`. Every list page accessed `data?.data` (undefined) and `data?.total` (undefined), so all tables showed the empty state even with data in the database.

**Fix:** Updated `PaginatedResponse<T>` to match the library's actual shape. Updated all pages to use `.items` and `.meta.totalItems`.

---

### Bug 4 — Profile image never showed (DTO field name mismatch)

**Problem:** DB entity field: `profile_image_url`. DTO property: `profile_img_url`. DTO constructor did `Object.assign(this, partial)` which copies the entity key `profile_image_url` — but the DTO property `profile_img_url` was never set. API response always had `profile_img_url: undefined`.

**Fix:** Added explicit mapping in `CustomerResponseDTO` and `DriverResponseDTO` constructors.

---

### Bug 5 — Profile endpoints returned JWT payload without `profile_img_url`

**Problem:** `GET /customer/profile` etc. return `@CurrentUser()` which is the `AuthenticatedUser` object from the JWT strategy. All three strategies did a DB query per request but only mapped `id`, `email`, `name`, `role`, `userType` — silently dropping `profile_image_url`.

**Fix:** Added `profile_img_url` to `AuthenticatedUser` interface and mapped it in all three strategies.

---

### Bug 6 — File upload timed out (10s Axios timeout too short for Supabase)

**Problem:** Axios global timeout was 10 seconds. Image uploads route through the backend to Supabase Storage — two hops. This regularly exceeded 10s.

**Fix:** Request interceptor now detects `config.data instanceof FormData` and sets `config.timeout = 0` (unlimited) for those requests only.

---

### Bug 7 — `syncedRef` in `AsyncBridge` prevented re-sync after hydration failure

**Problem:** The original `AsyncBridge` used a `syncedRef` to only run the sync once. If the session wasn't ready on the first effect run, the token was never synced on subsequent renders.

**Fix:** Removed `syncedRef`. `AsyncBridge` now re-syncs on every session status change. `setHydrated()` is called once status is no longer `"loading"`.

---

## Data Models

**Roles:** `CUSTOMER` · `DRIVER` · `ADMIN`

**Order statuses:** `pending` → `confirmed` → `preparing` → `ready` → `picked_up` → `delivered` / `cancelled`

**Vehicle types:** `car` · `bike`
