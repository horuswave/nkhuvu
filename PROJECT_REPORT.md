# 🎉 Nkhuvu — Invitation App: Complete Project Report

> **Generated:** June 16, 2026  
> **Project Name:** `invitation-app` (branded as **Nkhuvu**)  
> **Repository:** [github.com/horuswave/domingos-anastancia](https://github.com/horuswave/domingos-anastancia.git)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Brand & Identity](#3-brand--identity)
4. [System Architecture](#4-system-architecture)
5. [Database Schema](#5-database-schema)
6. [Routes & Pages](#6-routes--pages)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [Core Features & Flow](#8-core-features--flow)
9. [Monetization (Packages & Subscriptions)](#9-monetization-packages--subscriptions)
10. [M-Pesa Integration](#10-m-pesa-integration)
11. [Communication Channels (Twilio)](#11-communication-channels-twilio)
12. [Administration Dashboard](#12-administration-dashboard)
13. [Landing Page & Marketing](#13-landing-page--marketing)
14. [Internationalization (i18n)](#14-internationalization-i18n)
15. [Security & Guards](#15-security--guards)
16. [Deployment Guide](#16-deployment-guide)
17. [CI/CD Pipeline](#17-cicd-pipeline)
18. [Testing Strategy](#18-testing-strategy)
19. [Environment Variables](#19-environment-variables)
20. [Project Structure (Full Tree)](#20-project-structure-full-tree)
21. [Contribution Guide](#21-contribution-guide)

---

## 1. Project Overview

**Nkhuvu** (meaning *"celebration"* in Changana — a Mozambican Bantu language) is a comprehensive **event management platform** designed specifically for weddings, anniversaries, and large gatherings in Mozambique. It allows event organizers to:

- Create stunning **digital invitations** with custom branding
- **Manage guest lists** with companion tracking
- Send invitations via **SMS, WhatsApp, and Email** (via Twilio)
- Track **RSVPs in real-time**
- Organize **table seating**
- Manage **gift registries** (physical gifts & monetary contributions)
- Handle **subscriptions/payments** via M-Pesa (Mozambique's leading mobile money)
- Collect **visitor analytics** from the landing page

### Created By

- **Founder:** Anderson Macuche
- **Seed Super Admin:** andersonmacuche@gmail.com

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 16.2.0 |
| **Language** | TypeScript | 5.9.3 |
| **Database** | PostgreSQL (via Supabase) | — |
| **ORM** | Prisma | 7.5.0 |
| **Prisma Adapter** | @prisma/adapter-pg | 7.5.0 |
| **Authentication** | NextAuth.js (Auth.js v5) | 5.0.0-beta.30 |
| **Password Hashing** | bcryptjs | 3.0.3 |
| **Styling** | Tailwind CSS | 4.x |
| **UI Components** | Radix UI + shadcn/ui | Radix 1.4.3 |
| **Icons** | Lucide React | 0.577.0 |
| **Internationalization** | next-intl | 4.13.0 |
| **CSS Animations** | tw-animate-css | 1.4.0 |
| **Class Utility** | clsx + tailwind-merge | clsx 2.1.1 / tm 3.5.0 |
| **Messaging** | Twilio (SMS & WhatsApp) | 5.13.0 |
| **Document Generation** | docx (for table exports) | 9.6.1 |
| **Email** | Nodemailer (Gmail SMTP) | 7.0.13 |
| **Payment** | M-Pesa Mozambique (VM) | — |
| **Runtime** | tsx (for seed scripts) | 4.21.0 |
| **Package Manager** | npm | — |
| **Deployment Target** | Vercel (primary), Docker (alternative) | — |

---

## 3. Brand & Identity

- **Product Name:** Nkhuvu
- **Meaning:** "Celebration" in the Changana language
- **Tagline:** *Celebração* (Portuguese for "Celebration")
- **Target Market:** Mozambique (primary), Portuguese-speaking countries
- **Default Colors:**
  - Primary: `#c8890e` (gold/amber)
  - Accent: `#0e0b07` (near-black)
- **Default Fonts:**
  - Display: `Cormorant Garamond` (elegant serif)
  - Body: `Jost` (clean sans-serif)
- **Background Styles:** DARK, LIGHT, IMAGE
- **Metadata Title:** "Nkhuvu"

---

## 4. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Next.js 16 App Router                    │
├──────────────┬──────────────────────────────────────────────────┤
│  PUBLIC      │  ADMIN (Protected)                               │
│  ┌────────┐  │  ┌────────────┐ ┌────────────┐ ┌──────────┐   │
│  │Landing │  │  │ Super Admin│ │ Event Admin│ │  Guest   │   │
│  │ Page   │  │  │ Dashboard  │ │ Dashboard  │ │ RSVP     │   │
│  └────┬───┘  │  └─────┬──────┘ └─────┬──────┘ │ Page     │   │
│       │        │        │              │        └──────────┘   │
├───────┴────────┴────────┴──────────────┴───────────────────────┤
│                    ACTIONS Layer (Server Actions)                │
│  ┌────────┐ ┌───────┐ ┌──────────┐ ┌────────┐ ┌──────────┐   │
│  │ Events │ │Guests │ │Invitations│ │ RSVP   │ │ Tables   │   │
│  └────────┘ └───────┘ └──────────┘ └────────┘ └──────────┘   │
│  ┌──────────┐ ┌───────┐ ┌──────────┐ ┌──────────────┐        │
│  │Landing   │ │OTP    │ │MPesa     │ │Subscriptions │        │
│  │Leads     │ │       │ │          │ │              │        │
│  └──────────┘ └───────┘ └──────────┘ └──────────────┘        │
├────────────────────────────────────────────────────────────────┤
│                    LIB Layer (Utilities)                         │
│  ┌────────┐ ┌──────┐ ┌──────────┐ ┌────────┐ ┌──────────┐   │
│  │ Prisma │ │Twilio│ │Mailer    │ │MPesa   │ │ Guards   │   │
│  │ Client │ │      │ │(Nodemail)│ │Lib     │ │          │   │
│  └────────┘ └──────┘ └──────────┘ └────────┘ └──────────┘   │
├────────────────────────────────────────────────────────────────┤
│                          Prisma ORM                             │
├────────────────────────────────────────────────────────────────┤
│                       PostgreSQL (Supabase)                      │
└────────────────────────────────────────────────────────────────┘
```

### Key Patterns

- **Server Actions** (`actions/*.ts`): All business logic with `"use server"` directive
- **Server Components** by default; client components marked with `"use client"`
- **Data Flow:** Server Component → Server Action → Prisma → PostgreSQL
- **Cache:** Next.js `revalidatePath()` after mutations
- **Auth:** `auth()` from `auth.ts` protects admin routes in middleware and layouts
- **i18n:** `next-intl` plugin with locale parameter in route segments

---

## 5. Database Schema

**Provider:** PostgreSQL  
**Prisma Client Output:** `generated/prisma/`  
**Engine Type:** `client` (Driver Adapter pattern)

### Models (11 total)

| Model | Description | Key Fields |
|-------|-------------|------------|
| **AdminUser** | Platform admin accounts | email, passwordHash, isSuperAdmin |
| **EventAdmin** | Join table: admin ↔ events | adminUserId, eventId (unique pair) |
| **Event** | An event/wedding/celebration | title, coupleNames, date, time, venue, branding JSON fields |
| **Guest** | Invited person/household | token (UUID), maxAllowed, rsvpStatus, tableId |
| **Rsvp** | RSVP submission (1:1 with Guest) | attending, totalAttending, dietaryRestrictions, coupleMessage |
| **GuestCompanion** | Plus-ones of a guest | name, dietaryRestrictions |
| **Table** | Seating table for an event | name, capacity |
| **MessageLog** | Communication audit trail | channel, messageType, status, externalId |
| **LandingLead** | Landing page visitor analytics | sessionId, IP, device, browser, location, UTM params |
| **ContactLead** | Admin access request leads | email, isVerified, adminInviteToken |
| **ContactOtp** | OTP codes for email verification | code, expiresAt, usedAt |
| **Package** | Subscription packages | name, price, maxEvents, maxGuests, features (JSON) |
| **Subscription** | Admin → Package link | status, startDate, endDate, mpesaTransactionId |

### Enums (6)

| Enum | Values |
|------|--------|
| **RsvpStatus** | PENDING, ATTENDING, DECLINED, MAYBE |
| **ContactMethod** | EMAIL, WHATSAPP, SMS, MANUAL |
| **DeliveryStatus** | SENT, DELIVERED, FAILED, PENDING |
| **MessageType** | INVITATION, REMINDER, CONFIRMATION, CUSTOM |
| **SubscriptionStatus** | ACTIVE, EXPIRED, CANCELLED, PENDING |
| **BackgroundStyle** | DARK, LIGHT, IMAGE |

### Event JSON Fields (non-relational data stored as JSON)

- `programItems[]` — Timeline of activities (e.g., Ceremony → Cocktail → Dinner)
- `giftList[]` — Gift registry items with bank/MPesa details
- `rsvpFields{}` — Toggle visibility of RSVP form fields

---

## 6. Routes & Pages

### Public Routes

| Path | Purpose |
|------|---------|
| `/{locale}` | Landing / Marketing page |
| `/{locale}/pricing` | Pricing page |
| `/{locale}/pricing/checkout` | Checkout flow with M-Pesa payment |
| `/{locale}/create-event` | Create event after subscription (for new subscribers) |
| `/{locale}/convite/{token}` | Guest invitation page (Portuguese) |
| `/{locale}/invite/{token}` | Guest invitation page (English) |
| `/{locale}/confirmed` | RSVP confirmation success page |
| `/{locale}/declined` | RSVP declined page |

### Admin Routes (Protected)

| Path | Purpose | Access |
|------|---------|--------|
| `/{locale}/admin/login` | Admin login form | Public (unauthenticated) |
| `/{locale}/admin/onboarding` | First-time admin setup | Event Admin (no event) |
| `/{locale}/admin/create-account` | Create admin from invite link | Via token |
| `/{locale}/admin/dashboard` | Event admin dashboard | Event Admin |
| `/{locale}/admin/guests` | Guest list management | Event Admin |
| `/{locale}/admin/communications` | Message logs & sending | Event Admin |
| `/{locale}/admin/tables` | Table seating management | Event Admin |
| `/{locale}/admin/settings` | Event settings (branding, program, gifts) | Event Admin |

### Super Admin Routes

| Path | Purpose |
|------|---------|
| `/{locale}/super/dashboard` | Super admin overview |
| `/{locale}/super/events/...` | Manage all events |
| `/{locale}/super/leads` | View contact/access leads |
| `/{locale}/super/visitors` | Landing page visitor analytics |
| `/{locale}/super/subscriptions` | Manage packages & subscriptions |

### API Routes

| Route | Purpose |
|-------|---------|
| `POST /api/auth/[...nextauth]` | NextAuth authentication |
| `POST /api/rsvp` | Submit RSVP response |
| `POST /api/landing-lead` | Capture landing page visitor data |
| `POST /api/contact/send-otp` | Send OTP to email for admin requests |
| `POST /api/contact/verify-otp` | Verify OTP code |
| `POST /api/admin-access/request` | Request admin access |
| `POST /api/admin-access/create` | Create admin account |

### Locale Routing

- Supported locales: **en** (English), **pt** (Portuguese), **ch** (Changana)
- Default locale: **en**
- Middleware in `proxy.ts` handles locale detection and auth redirection

---

## 7. Authentication & Authorization

### Authentication (NextAuth.js v5)

- **Provider:** Credentials (email + password)
- **Session Strategy:** JWT (JSON Web Tokens)
- **Session Duration:** 8 hours
- **Password Hashing:** bcryptjs (12 rounds)
- **DB Model:** `AdminUser`

### Session Object

```typescript
interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  isSuperAdmin: boolean;
  eventId: string | null;  // null for super admins, event ID for event admins
}
```

### Roles & Permissions

#### 1. Super Admin
- Global access to all events
- Can create/manage events, create other admin users
- Access to `/super/*` routes
- Flag: `isSuperAdmin: true`

#### 2. Event Admin
- Scoped to specific events via `EventAdmin` join table
- First assigned event is attached to session on login
- Self-serve onboarding (new subscribers can create their first event)
- No cross-event access

### Route Protection (Middleware)

Handled in `proxy.ts`:
- `/super/*` → requires authenticated super admin
- `/admin/*` (except login/onboarding) → requires authenticated event admin
- Super admins are redirected away from `/admin/*` to `/super/*`
- Event admins without an event are redirected to `/onboarding`
- Logged-in users on `/admin/login` are redirected to their dashboard

### Server-side Guards (`lib/guards.ts`)

```typescript
requireSession()        // Must be logged in
requireSuperAdmin()     // Must be super admin
requireEventAccess()    // Must have event access (event admin or super admin)
```

---

## 8. Core Features & Flow

### 1. Invitation Lifecycle

```
Guest Added → Token Generated → Send Invitation → Guest Clicks Link → RSVP
```

1. **Guest Creation:** Admin adds guest with name, contact info, companion limit
2. **Token Generation:** Unique UUID assigned automatically
3. **Invitation Sending:** Via SMS/WhatsApp (Twilio) or Manual (copy link)
4. **Delivery Tracking:** Every send is logged in `MessageLog`
5. **RSVP Submission:** Guest responds via personalized link
6. **Status Update:** Guest → ATTENDING/DECLINED; RSVP record created

### 2. RSVP Submission Flow

1. Guest visits `https://{base_url}/invite/{token}`
2. Token lookup finds the guest and associated event
3. Dynamic form renders based on event RSVP field settings
4. Server validates `totalAttending ≤ maxAllowed`
5. `Rsvp` record upserted, `GuestCompanion` records refreshed
6. Guest status updated, cache revalidated

### 3. Guest Management

- CRUD operations with event-scope enforcement
- Bulk import/export capabilities
- Contact methods: EMAIL, WHATSAPP, SMS, MANUAL
- Max companion limit per guest
- VIP tagging
- Table assignment

### 4. Table Management

- Create/edit/delete tables per event
- Drag-and-drop guest assignment (via tableId)
- Capacity tracking with visual occupancy indicators
- Built-in DOCX export for seating charts
- Unassigned attending guests view

### 5. Event Branding

- Custom primary & accent colors
- Hero image & logo support
- Background style selection (Dark/Light/Image)
- Font customization (display & body)
- Program timeline editor
- Gift list editor (physical items + bank transfers + M-Pesa/MPay)

### 6. RSVP Form Configuration

Toggle visibility per event for:
- Companions/plus-ones
- Dietary restrictions
- Transport/logistics notes
- Message to the couple

---

## 9. Monetization (Packages & Subscriptions)

### Seed Packages

| Package | Price (MZN) | Max Events | Max Guests | Features |
|---------|-------------|------------|------------|----------|
| **Starter** | 1,500 | 1 | 50 | Basic customization, email invites, RSVP, 1 month support |
| **Professional** | 3,000 | 3 | 200 | Advanced customization, SMS & email, tables, gifts, 3 months |
| **Enterprise** | 6,000 | Unlimited | Unlimited | Full white-label, all channels, priority support, custom domain |

### Subscription Flow

1. Visitor selects package on Pricing page
2. Checkout form collects: name, email, password, phone (for M-Pesa payment)
3. M-Pesa C2B payment initiated (customer pays via mobile money)
4. On success → `AdminUser` created, `Subscription` activated (1 year), package limits applied
5. Admin can then create events within package limits
6. Event count checked via `EventAdmin` count against `Package.maxEvents`

---

## 10. M-Pesa Integration

### Provider: VM (Vodacom Moçambique) M-Pesa

### Architecture

- **API:** C2B (Customer-to-Business) single-stage payment
- **Encryption:** RSA public key encryption of API key for bearer token
- **Environment:** Sandbox (default) / Live
- **Host:** `api.sandbox.vm.co.mz:18352` / `api.vm.co.mz:18352`

### Key Files

| File | Purpose |
|------|---------|
| `lib/mpesa.ts` | Core M-Pesa client: config, RSA encryption, C2B payment initiation |
| `lib/mpesa-validation.ts` | Phone number normalization, request validation |
| `actions/mpesa.ts` | Server action wrapping payment initiation with reference generation |

### Payment Flow

```
User submits checkout form
  → processMpesaCheckoutPayment()
    → generateBearerToken() (RSA encrypts apiKey with publicKey)
    → POST to /ipg/v1x/c2bPayment/singleStage/
    → Check output_ResponseCode === "INS-0"
    → Return transactionId or error
  → processCheckout() creates admin + subscription with transaction ID
```

### Validation Rules

- Phone must be Mozambique format: 258XXXXXXXXX (84/85 prefix)
- References: 1-20 alphanumeric characters
- Amount: positive number
- Service provider code: 6 digits

---

## 11. Communication Channels (Twilio)

### Channels

| Channel | Tech | Use Case |
|---------|------|----------|
| **SMS** | Twilio Messages API | Plain text invitations & reminders |
| **WhatsApp** | Twilio Content API | Rich template-based invitations |
| **Email** | Nodemailer (Gmail SMTP) | OTP verification, admin notifications |
| **Manual** | Copy unique link | Physical invitations, word-of-mouth |

### Twilio WhatsApp Templates

The WhatsApp integration uses Twilio Content Templates with variables:
- `{{1}}` — Guest name
- `{{2}}` — Couple names
- `{{3}}` — Event date
- `{{4}}` — RSVP link

### Message Logging

Every communication is recorded in `MessageLog` with:
- Channel used
- Message type (INVITATION, REMINDER)
- Delivery status (SENT, FAILED, PENDING)
- External ID (Twilio SID)
- Error details on failure

### Rate Limiting

Bulk sends have a 150ms delay between messages to avoid Twilio rate limits.

---

## 12. Administration Dashboard

### Event Admin Dashboard

Accessible at `/{locale}/admin/dashboard`, features:

- **Stats Cards:** Total guests, Attending, Declined, Pending, Total headcount
- **Recent RSVPs:** Latest responses at a glance
- **Response rate** calculation
- Quick actions to manage guests, send invites, view tables

### Guest List Page

- Search/filter by name, email, phone
- Filter by RSVP status (All, Pending, Attending, Declined, Maybe)
- Bulk actions: Send invitations to all pending guests
- Individual guest management with full details

### Settings Page (Tabbed)

| Tab | Content |
|-----|---------|
| **Details** | Event title, couple names, date/time, venue, address, map, dress code, support contacts |
| **Branding** | Colors, fonts, background style, hero/logo images |
| **Program** | Timeline of event activities with time, label, type, location |
| **Gifts** | Physical gifts (with store links) + monetary contributions (IBAN, M-Pesa, PayPal) |
| **RSVP** | Toggle form field visibility |

### Super Admin Dashboard

Accessible at `/{locale}/super/dashboard`, features:

- All events overview with stats
- Event CRUD (create, update, delete)
- Admin user management per event
- **Visitor Analytics:** Total visitors, mobile/desktop split, country map, browser stats, UTM source tracking
- **Contact Leads:** Admin access requests with verification status
- **Subscription Management:** Package configuration, subscriber list

---

## 13. Landing Page & Marketing

### Page Structure (Conversion Funnel)

1. **Navbar** — Brand, navigation links, CTA, i18n switcher
2. **Hero** — Value proposition with live invitation preview
3. **Stats** — Social proof (response rate, events done, support, rating)
4. **Features** — 12 feature cards with icons
5. **How It Works** — 3-step process (template → personalize → share)
6. **Founder Story** — Personal narrative (the "why" behind Nkhuvu)
7. **Testimonial** — Social proof from a real couple
8. **Pricing** — 3-tier package comparison
9. **Final CTA** — Call to action with sign-up prompt
10. **Footer** — Links, contact, legal

### Visitor Analytics (`LandingLead` model)

Tracks for each visitor:
- Device/browser/OS info (for mobile optimization insights)
- Geolocation (country, city, region)
- UTM campaign parameters (marketing attribution)
- Session duration & scroll depth (engagement metrics)
- Referrer tracking

### Access Request Flow

1. Visitor clicks "Request Access" on landing page
2. Form collects name, email, message
3. OTP sent to email via Nodemailer (Gmail SMTP)
4. Visitor verifies OTP (6-digit code, 10-minute expiry)
5. Admin notified; can send invite link to create account

---

## 14. Internationalization (i18n)

### Framework: `next-intl` v4

### Supported Locales

| Code | Language | Status |
|------|----------|--------|
| `en` | English | Full |
| `pt` | Portuguese | Full |
| `ch` | Changana (Mozambican Bantu) | Partial |

### Implementation

- **Plugin:** `createNextIntlPlugin()` in `next.config.ts`
- **Routing:** Locale prefix in URL path (`/en/`, `/pt/`, `/ch/`)
- **Middleware:** Auto-detection and redirection in `proxy.ts`
- **Messages:** JSON files in `messages/{locale}.json`
- **Client-side hook:** `useTranslations(key)` returns `t()` function with dot-notation access
- **Server-side:** `getRequestConfig()` from next-intl/server

### Translation Coverage (~525 English keys)

Key sections: nav, common, dashboard, guests, guestForm, communications, tables, settings (details, branding, program, gifts, rsvp), rsvp, messageHistory, giftList, errors, validation, landing (full page), admin, contact

---

## 15. Security & Guards

### Authentication

- Credentials-based (email/password) via NextAuth
- JWT sessions (8-hour expiry)
- Password hashing with bcryptjs (12 salt rounds)

### Authorization Guards

All server actions use guard functions from `lib/guards.ts`:

```
auth() → session exists? → isSuperAdmin? → eventId scope?
```

### Row-Level Security (Application-Level)

- `requireEventAccess()` ensures admin can only access their assigned event
- Guest CRUD checks `eventId` match before operations
- Public RSVP endpoints rely on unguessable UUID tokens (36 chars)

### OTP Verification

- 6-digit codes, 10-minute expiry
- Single-use (marked `usedAt` after verification)
- Rate-limited by email lookup

### Environment Variables

Sensitive keys stored in `.env` (not committed):
- Database credentials
- Auth secret (32-byte base64)
- Twilio API credentials
- M-Pesa API keys (public/private)
- Gmail app password

---

## 16. Deployment Guide

### Primary: Vercel (Recommended)

1. Import Git repository into Vercel
2. Configure environment variables in Vercel dashboard
3. Build command: `npm run build` (runs Prisma generate + Next.js build)
4. Custom domain with CNAME

### Alternative: Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
```

### Alternative: Self-Hosted Node

```bash
npm run build
npm start   # or use PM2/systemd
```

### Post-Deployment Checklist

- [ ] Database migrations applied (`npx prisma db push`)
- [ ] Admin user exists (run `npm run db:seed`)
- [ ] Twilio phone numbers verified (sandbox mode for testing)
- [ ] M-Pesa credentials configured for production
- [ ] M-Pesa environment set to `live` in `.env`
- [ ] Custom domain DNS configured
- [ ] HTTPS enforced

---

## 17. CI/CD Pipeline

### GitHub Actions (recommended workflow)

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        ports: [5432:5432]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npx prisma generate
      - run: npx prisma db push
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test:ci
      - run: npx playwright test --headless
```

### Optional Extensions

- Docker image build & push to Docker Hub
- Vercel auto-deploy on push to `main`
- Security scanning (`npm audit`, Trivy)
- Performance benchmarking
- Release tagging for versioned deployments

---

## 18. Testing Strategy

### Unit Tests (Jest)

- **Location:** `tests/unit/`
- **Focus:** Pure functions (`lib/guards.ts`, `lib/mpesa-validation.ts`, helpers)
- **Run:** `npm run test` (watch) / `npm run test:ci` (CI mode)

### Integration / E2E Tests (Playwright)

- **Location:** `tests/e2e/`
- **Focus:** Login flow, invitation sending, RSVP submission, table management
- **Run:** `npx playwright test`

### Linting & Type Checking

- **ESLint:** `npm run lint`
- **TypeScript:** `tsc --noEmit` (via `npm run typecheck`)

---

## 19. Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ All | PostgreSQL connection (w/ pooling) | `postgresql://user:pass@host:5432/db` |
| `DIRECT_URL` | ✅ Migrations | Direct DB connection (no pooler) | `postgresql://user:pass@host:5432/db` |
| `AUTH_SECRET` | ✅ All | JWT signing secret (32-byte base64) | `4d603ca4...` |
| `NEXTAUTH_URL` | ✅ Production | App base URL for callbacks | `https://nkhuvu.com` |
| `NEXT_PUBLIC_BASE_URL` | ✅ Production | Public-facing URL for links | `https://nkhuvu.com` |
| `TWILIO_ACCOUNT_SID` | ✅ Production | Twilio account SID | `ACxxxxxxxx...` |
| `TWILIO_AUTH_TOKEN` | ✅ Production | Twilio auth token | `your_token` |
| `TWILIO_PHONE_NUMBER` | ✅ Production | SMS sender number | `+14155551234` |
| `TWILIO_WHATSAPP_NUMBER` | ✅ Production | WhatsApp sender number | `+14155551234` |
| `TWILIO_WHATSAPP_TEMPLATE_SID` | ✅ Production | WhatsApp template SID | `HX20cd2930...` |
| `GMAIL_USER` | ✅ Production | Gmail address for Nodemailer | `noreply@nkhuvu.com` |
| `GMAIL_APP_PASSWORD` | ✅ Production | Gmail app password | `xxxx xxxx xxxx xxxx` |
| `MPESA_API_KEY` | ✅ Payments | M-Pesa API key | `fwd2e6e8...` |
| `MPESA_PUBLIC_KEY` | ✅ Payments | M-Pesa RSA public key | `MIICIjAN...` |
| `MPESA_SERVICE_PROVIDER_CODE` | ✅ Live | 6-digit provider code | `171717` (sandbox) |
| `MPESA_ENV` | ✅ Payments | `sandbox` or `live` | `sandbox` |
| `MPESA_ORIGIN` | ⬜ Optional | API origin header | `developer.mpesa.vm.co.mz` |
| `RESEND_API_KEY` | ⬜ Optional | Resend API key (alt email) | `re_xxxxx` |
| `PORT` | ⬜ Optional | Server port | `3000` |

---

## 20. Project Structure (Full Tree)

```
invitation-app/
├── actions/
│   ├── events.ts              # Event CRUD + admin assignment
│   ├── guests.ts              # Guest CRUD + stats
│   ├── invitations.ts         # Send invitations (Twilio SMS/WhatsApp)
│   ├── landing-leads.ts       # Visitor analytics queries
│   ├── mpesa.ts               # M-Pesa payment processing
│   ├── otp.ts                 # OTP generation & verification
│   ├── rsvp.ts                # RSVP submission logic
│   ├── subscriptions.ts       # Subscription + admin creation
│   └── tables.ts              # Table CRUD + guest assignment
├── app/
│   ├── [locale]/
│   │   ├── globals.css
│   │   ├── layout.tsx         # Root layout with SessionProvider
│   │   ├── page.tsx           # Landing page (marketing)
│   │   ├── (public)/
│   │   │   ├── [confirmed|declined|invite|convite]/
│   │   ├── admin/
│   │   │   ├── (protected)/
│   │   │   │   └── layout.tsx # Admin sidebar + auth check
│   │   │   ├── create-account/
│   │   │   ├── login/
│   │   │   └── onboarding/
│   │   ├── create-event/
│   │   ├── pricing/
│   │   │   └── checkout/
│   │   └── super/
│   │       ├── layout.tsx     # Super admin sidebar
│   │       ├── dashboard/
│   │       ├── events/
│   │       ├── leads/
│   │       ├── subscriptions/
│   │       └── visitors/
│   └── api/
│       ├── admin-access/
│       ├── auth/[...nextauth]/
│       ├── contact/send-otp, verify-otp/
│       ├── landing-lead/
│       └── rsvp/
├── components/
│   ├── SessionProvider.tsx
│   ├── admin/
│   │   ├── AdminNavLink.tsx
│   │   ├── AdminPageShell.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminTopBar.tsx
│   │   ├── BulkSendButton.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── SendInviteButton.tsx
│   │   └── SuperAdminSidebar.tsx
│   ├── invitation/
│   │   ├── EventDetails.tsx
│   │   ├── Giftlistsection.tsx
│   │   ├── InvitationHero.tsx
│   │   ├── ProgramSection.tsx
│   │   └── RsvpForm.tsx
│   ├── landing/
│   │   ├── Features.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── Footer.tsx
│   │   ├── FounderStory.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── LandingTracker.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pricing.tsx
│   │   ├── Stats.tsx
│   │   └── Testimonial.tsx
│   └── ui/                    # 14 shadcn/ui components
├── docs/                      # Project documentation
│   ├── architecture.md
│   ├── authentication.md
│   ├── ci-cd.md
│   ├── database.md
│   ├── deployment.md
│   ├── env-reference.md
│   ├── getting-started.md
│   ├── logic-and-flow.md
│   ├── overview.md
│   └── testing.md
├── generated/prisma/          # Prisma client output
├── hooks/
│   └── use-mobile.ts          # Mobile detection hook
├── i18n/
│   ├── index.ts               # Client-side translation hook
│   ├── request.ts             # next-intl server config
│   └── routing.ts             # Locale definitions
├── lib/
│   ├── guards.ts              # Auth guards (requireSession, requireSuperAdmin, requireEventAccess)
│   ├── mailer.ts              # Gmail Nodemailer transporter
│   ├── mpesa.ts               # M-Pesa API client (RSA encryption, C2B)
│   ├── mpesa-validation.ts    # Phone normalization & validation
│   ├── prisma.ts              # Prisma client singleton
│   ├── twilio.ts              # Twilio client
│   └── utils.ts               # cn() utility (tailwind-merge)
├── messages/                  # i18n JSON files
│   ├── en.json                # English (525 keys)
│   ├── pt.json                # Portuguese
│   └── ch.json                # Changana
├── prisma/
│   ├── schema.prisma          # Database schema (13 models, 6 enums)
│   ├── seed.ts                # Seed super admin + 3 subscription packages
│   └── migrations/            # Database migration history
├── public/
├── types/
│   ├── index.ts               # Shared TypeScript types
│   └── next-auth.d.ts         # NextAuth type augmentation
├── .env                       # Environment variables (NOT committed)
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── auth.ts                    # NextAuth configuration
├── components.json            # shadcn/ui configuration
├── eslint.config.mjs
├── next.config.ts             # Next.js + next-intl plugin
├── package.json
├── postcss.config.mjs
├── prisma.config.ts           # Prisma CLI configuration
├── proxy.ts                   # Middleware (locale + auth protection)
├── tsconfig.json
└── README.md
```

---

## 21. Git History (Recent)

```
0ee6306 (HEAD -> main, origin/main) dandandna
9ca41ae ndanand
a784c05 mpesa integration
8457b5c sansansna
02fb7f3 damdadma
9c656c6 Smasmams
240882c damdamdam
d26ccef saadmamd
2853ccb danandna
e261b9d dandand
```

---

## Summary

**Nkhuvu** is a production-ready event management SaaS platform built for the Mozambican market. Key differentiators:

1. **Locally relevant** — Supports Portuguese and Changana languages, M-Pesa payments, Mozambican phone format
2. **Full lifecycle** — From landing page analytics → subscription checkout → event creation → guest management → invitation delivery → RSVP tracking → table seating
3. **Multi-channel** — SMS, WhatsApp, Email, and Manual invitation delivery
4. **Monetized** — 3-tier subscription packages (Starter, Professional, Enterprise) with M-Pesa payment
5. **Analytics-driven** — Visitor tracking, engagement metrics, marketing attribution (UTM)
6. **Highly customizable** — Per-event branding (fonts, colors, background), programmable program/gift lists
7. **Secure** — JWT auth, role-based access (super admin / event admin), unique guest tokens, OTP verification
8. **Modern stack** — Next.js 16 App Router, TypeScript, Tailwind CSS 4, Prisma, PostgreSQL (Supabase)