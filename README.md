# Food Delivery System — Frontend

A multi-role food delivery web application built with Next.js 16, supporting Customer, Driver, and Admin user types.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth | NextAuth.js v4 (JWT, 3 credential providers) |
| Client State | Zustand v5 (localStorage persisted) |
| Server State | TanStack React Query v5 |
| HTTP | Axios v1 (with request/response interceptors) |
| Forms | React Hook Form v7 + Zod v4 |
| Icons | Lucide React |
| Runtime | React 19 |

---

## Prerequisites

- Node.js >= 18
- The [backend API](../Food_Delivery_System) running on <http://localhost:3000>

---

## Getting Started

```bash
npm install
npm run dev
```

The app runs on **<http://localhost:4200>**.

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:4200
```

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server (port 4200) |
| `npm run build` | Build for production |
| `npm run start` | Start production server (port 4200) |
| `npm run lint` | Run ESLint |

---

## Project Structure

```text
food-delivery-frontend/
├── app/
│   ├── api/auth/[...nextauth]/   # NextAuth catch-all route (GET, POST handlers)
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page
│   └── provider.tsx              # SessionProvider + QueryClient + Zustand sync bridge
├── components/
│   ├── ui/                       # shadcn/ui components (Button, ...)
│   └── shared/                   # Shared application components (in progress)
├── hooks/
│   ├── useLogin.ts               # Universal login hook (wraps NextAuth signIn)
│   └── useRegister.ts            # Registration hooks for Customer, Driver, Admin
├── lib/
│   ├── auth.ts                   # NextAuth config (Customer / Driver / Admin providers)
│   ├── axios.ts                  # Axios instance with JWT interceptor + AppException handling
│   └── utils.ts                  # cn() utility (clsx + tailwind-merge)
├── schemas/                      # Zod validation schemas
│   ├── auth.schema.ts
│   ├── customer.schema.ts
│   ├── driver.schema.ts
│   ├── menu.schema.ts
│   ├── order.schema.ts
│   └── restaurant.schema.ts
├── services/                     # API service layer
│   ├── auth.service.ts           # Auth methods (reference implementation)
│   └── customer.service.ts       # Customer profile and order methods
├── store/                        # Zustand stores
│   ├── interfaces/               # Store state interface definitions
│   │   ├── auth.state.interface.ts
│   │   ├── cart.state.interface.ts
│   │   └── ui.state.interface.ts
│   ├── auth.store.ts
│   ├── cart.store.ts
│   └── ui.store.ts
└── types/                        # TypeScript type definitions
    ├── api.types.ts              # ApiSuccessResponse, ApiErrorResponse, AppException, PaginatedResponse
    ├── auth.types.ts             # ROLES, VEHICLE_TYPE, UserType, DTOs
    ├── customer.types.ts         # Customer, UpdateCustomerDTO, UpdatePasswordDTO, ForgotPasswordDTO
    ├── map.ts                    # PROVIDER_MAP and REDIRECT_MAP for auth routing
    ├── next-auth.d.ts            # NextAuth module augmentation (Session, JWT, User)
    ├── order.types.ts
    └── restaurant.types.ts
```

---

## Hooks

### `useLogin`

Universal login hook accepting a `UserType` (`"customer"`, `"driver"`, `"admin"`). Uses `PROVIDER_MAP` to select the correct NextAuth credential provider and `REDIRECT_MAP` for post-login navigation.

```typescript
const { login, isLoading, error } = useLogin("customer");
```

### `useRegisterCustomer` / `useRegisterDriver` / `useRegisterAdmin`

React Query mutation hooks for user registration. On success each hook redirects to `/login?registered=<role>`.

```typescript
const mutation = useRegisterCustomer();
mutation.mutate(formValues);
```

---

## Services

### `auth.service.ts`

Reference implementation for authentication. The actual auth flow goes through NextAuth providers in `lib/auth.ts`. This file demonstrates how to call the auth endpoints directly.

| Method | Endpoint | Description |
| --- | --- | --- |
| `loginCustomer` | `POST /auth/login/customer` | Customer login |
| `loginDriver` | `POST /auth/login/driver` | Driver login |
| `loginAdmin` | `POST /auth/login/admin` | Admin login |
| `registerCustomer` | `POST /auth/register/customer` | Register customer |
| `registerDriver` | `POST /auth/register/driver` | Register driver |
| `registerAdmin` | `POST /auth/register/admin` | Register admin |

### `customer.service.ts`

Manages customer profile and order data.

| Method | Endpoint | Description |
| --- | --- | --- |
| `getProfile` | `GET /customer/profile` | Get own profile |
| `updateProfile` | `PUT /customer/update/:id` | Update profile details |
| `updatePassword` | `PUT /customer/update-password/:id` | Change password |
| `uploadProfileImage` | `POST /customer/upload-profile-image/:id` | Upload profile picture |
| `forgotPassword` | `POST /customer/forgot-password` | Initiate password reset |
| `getOrders` | `GET /customer/admin/orders/:id` | Get own orders (paginated) |

---

## Authentication

Three separate credential providers are configured in `lib/auth.ts`:

- **Customer** — `customer-login` provider
- **Driver** — `driver-login` provider
- **Admin** — `admin-login` provider

The JWT token is automatically attached to every API request via the Axios request interceptor in `lib/axios.ts`. The Zustand `auth.store` is kept in sync with the NextAuth session through the `AsyncBridge` component in `provider.tsx`.

### Auth Routing Maps (`types/map.ts`)

| Map | Purpose |
| --- | --- |
| `PROVIDER_MAP` | Maps `UserType` → NextAuth provider ID |
| `REDIRECT_MAP` | Maps `UserType` → post-login dashboard path |

---

## State Management

| Store | Persisted | Contents |
| --- | --- | --- |
| `auth.store` | Yes (localStorage) | User, token, role, selectors |
| `cart.store` | Yes (localStorage) | Cart items, restaurantId, totals, actions |
| `ui.store` | No | Loading state, sidebar, modal visibility |

Each store exposes fine-grained selector hooks (e.g. `useUser`, `useIsCustomer`, `useCartItems`, `useIsLoading`).

---

## HTTP Client (`lib/axios.ts`)

The `apiClient` wraps Axios with:
- **Request interceptor** — reads the NextAuth session and injects `Authorization: Bearer <token>`
- **Response interceptor** — unwraps the backend's `ApiSuccessResponse.data` payload; on error, throws a typed `AppException`

```typescript
export const apiClient = { get, post, put, patch, delete };
```

---

## Data Models

**User Roles:** `CUSTOMER` · `DRIVER` · `ADMIN`

**Order Statuses:** `pending` → `confirmed` → `preparing` → `ready` → `picked_up` → `delivered` · `cancelled`

**Menu Categories:** `appetizer` · `main` · `dessert` · `beverage`

**Vehicle Types:** `car` · `bike`
