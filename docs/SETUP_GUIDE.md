# Setup Guide

## Prerequisites
- Node.js >= 18.17.0
- Git
- AWS Account with S3 and Lambda access
- Stripe account for payments
- Clerk account for authentication
- PostgreSQL database
- Shopify Partner account

## Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Payments (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

# Shopify
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SHOPIFY_STORE_DOMAIN=

# SendGrid
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# Application
NEXT_PUBLIC_APP_URL=
```

## Installation
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Create admin user
npm run create:admin
```

## Running Locally
```bash
# Start development server
npm run dev

# Start media server (separate terminal)
npm run server:dev
```

### Seeding Test Data
```bash
# Seed database with test data
npx prisma db seed
```

## Testing
```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Run all validation
npm run validate
```

## Building & Deployment

### Local Build
```bash
# Create production build
npm run build

# Start production server
npm start
```

### CI/CD Setup
1. Configure GitHub Actions
2. Set up environment secrets
3. Configure deployment platform (Vercel/AWS)
4. Set up database migrations

### Database Migrations
```bash
# Create new migration
npx prisma migrate dev --name description

# Deploy migrations in production
npx prisma migrate deploy
```