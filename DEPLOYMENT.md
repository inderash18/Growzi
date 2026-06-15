# Production Deployment Guide: Growzi SaaS Platform

Growzi is built to be modular and scalable, allowing deployment entirely on free tiers (Vercel, Supabase, Resend) during MVP validation.

---

## 1. Database & Backend: Supabase Setup

### Step 1: Create a Supabase Project
1. Sign up on [Supabase.com](https://supabase.com) and create a new project.
2. Set a strong database password and choose your regional data center.

### Step 2: Extract Database Strings
In your Supabase project settings under **Settings > Database > Connection strings**:
* **Pooled URL (Transaction Mode)**: Select port `6543`. This will be your `DATABASE_URL` for the Next.js runtime.
* **Direct URL (Session Mode)**: Select port `5432`. This will be your `DIRECT_URL` used for Prisma Migrations.

### Step 3: Setup Storage Buckets
In the Supabase Console under **Storage**:
1. Create a bucket named `resources`. Set it to **Public** so students can access learning files.
2. Create a bucket named `logos`. Set it to **Public** for institutional custom logos.

---

## 2. ORM Schema Deployment: Prisma Migrations

Once your Supabase database is active, apply the Postgres schema migrations from your local CLI:

```bash
# Push the Prisma schema directly to your production database
npx prisma db push
```

To initialize default mock data (Apex Engineering College, pre-loaded resources, logical MCQs) in production:
```bash
# Seed the database
npx tsx prisma/seed.ts
```

---

## 3. Frontend & API Hosting: Vercel Setup

### Step 1: Link Repository
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Set the framework preset to **Next.js**.

### Step 2: Configure Environment Variables
Under Vercel project settings, add the following environment keys:

| Environment Variable | Description / Source | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | Supabase Transaction Connection String | `postgresql://postgres.[id]:[pass]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | Supabase Direct Connection String | `postgresql://postgres:[pass]@db.[id].supabase.co:5432/postgres` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API URL endpoint | `https://[id].supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client anon public key | `eyJhbGciOiJIUzI1NiIsInR5c...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin secret key | `eyJhbGciOiJIUzI1NiIsInR5c...` |
| `RESEND_API_KEY` | Resend SMTP API Key | `re_a1B2c3D4...` |
| `NEXT_PUBLIC_APP_URL` | Vercel production deployment URL | `https://growzi.vercel.app` |

### Step 3: Deploy
Click **Deploy**. Vercel will build your Next.js components, compile server actions, and deploy globally.

---

## 4. Verification Checklists
* Access `https://[your-app].vercel.app/login` and check that quick preset accounts function correctly.
* Modify branding colors in settings and verify changes propagate immediately in layout sidebars.
* Run an MCQ assessment to confirm automated scoring is functional.
* Edit a resume profile, hit print, and verify print-layout rendering.
