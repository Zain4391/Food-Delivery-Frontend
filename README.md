# Food Delivery System — Frontend

A multi-role food delivery web application built with Next.js 15, supporting Customer, Driver, and Admin user types.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth | NextAuth.js v4 (JWT, 3 credential providers) |
| Client State | Zustand v5 (localStorage persisted) |
| Server State | TanStack React Query v5 |
| HTTP | Axios v1 (with request/response interceptors) |
| Forms | React Hook Form v7 + Zod v4 |
| Icons | Lucide React |

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
│   ├── api/auth/[...nextauth]/   # NextAuth catch-all route
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page
│   └── provider.tsx              # SessionProvider + QueryClient + Zustand sync
├── components/
│   ├── ui/                       # shadcn/ui components (Button, ...)
│   └── shared/                   # Shared application components
├── hooks/                        # Custom React hooks
├── lib/
│   ├── auth.ts                   # NextAuth config (Customer / Driver / Admin providers)
│   ├── axios.ts                  # Axios instance with JWT interceptor
│   └── utils.ts                  # cn() utility (clsx + tailwind-merge)
├── schemas/                      # Zod validation schemas
│   ├── auth.schema.ts
│   ├── customer.schema.ts
│   ├── driver.schema.ts
│   ├── menu.schema.ts
│   ├── order.schema.ts
│   └── restaurant.schema.ts
├── services/                     # API service layer
│   ├── auth.service.ts
│   └── customer.service.ts
├── store/                        # Zustand stores
│   ├── auth.store.ts
│   ├── cart.store.ts
│   └── ui.store.ts
└── types/                        # TypeScript type definitions
    ├── api.types.ts
    ├── auth.types.ts
    ├── customer.types.ts
    ├── order.types.ts
    ├── restaurant.types.ts
    └── next-auth.d.ts
```

---

## Services

### `auth.service.ts`

Handles authentication for all three user roles.

| Method | Endpoint | Description |
| --- | --- | --- |
| `loginCustomer` | `POST /api/auth/customer/login` | Customer login |
| `loginDriver` | `POST /api/auth/driver/login` | Driver login |
| `loginAdmin` | `POST /api/auth/admin/login` | Admin login |
| `registerCustomer` | `POST /api/auth/customer/register` | Register customer |
| `registerDriver` | `POST /api/auth/driver/register` | Register driver |
| `registerAdmin` | `POST /api/auth/admin/register` | Register admin |

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

Three separate credential providers are configured in NextAuth:

- **Customer** — `jwt-customer` strategy
- **Driver** — `jwt-driver` strategy
- **Admin** — `jwt-admin` strategy

The JWT token is automatically attached to every API request via the Axios request interceptor. The Zustand `auth.store` is kept in sync with the NextAuth session through a provider bridge.

---

## State Management

| Store | Persisted | Contents |
| --- | --- | --- |
| `auth.store` | Yes (localStorage) | User, token, role, selectors |
| `cart.store` | Yes (localStorage) | Cart items, totals, actions |
| `ui.store` | No | Loading state, sidebar, modal visibility |

---

## Data Models

**User Roles:** `CUSTOMER` · `DRIVER` · `ADMIN`

**Order Statuses:** `pending` → `confirmed` → `preparing` → `ready` → `picked_up` → `delivered` · `cancelled`

**Menu Categories:** `appetizer` · `main` · `dessert` · `beverage`

**Vehicle Types:** `car` · `bike`
