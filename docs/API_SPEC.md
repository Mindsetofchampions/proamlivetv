# API Specification

## Overview
- Purpose: Backend API for PRO AM LIVE TV platform
- Base URL: `/api`
- Authentication: Clerk tokens (Bearer authentication)
- Rate limiting and throttling policies

## Auth Endpoints
- `/api/auth/signup`
  - Method: POST
  - Purpose: Create new user account
  - Required fields: email, password
  - Response: User object with tokens

- `/api/auth/login`
  - Method: POST
  - Purpose: Authenticate existing user
  - Required fields: email, password
  - Response: Session tokens

- `/api/auth/webhook`
  - Method: POST
  - Purpose: Handle Clerk webhook events
  - Security: Webhook signature verification
  - Events: user.created, user.updated, user.deleted

## Video Endpoints
- `/api/videos`
  - Method: POST
  - Purpose: Upload new video
  - Authentication: Required
  - Request: Multipart form data
  - Response: Video metadata

- `/api/videos/[id]`
  - Method: GET, PATCH, DELETE
  - Purpose: Video metadata operations
  - Authentication: Required
  - Access control: Creator or Admin only

- `/api/videos/[id]/impression`
  - Method: POST
  - Purpose: Track video view
  - Authentication: Optional
  - Rate limiting: Per IP/user

## PPV Endpoints
- `/api/ppv/create-session`
  - Method: POST
  - Purpose: Create Stripe checkout for PPV event
  - Authentication: Required
  - Response: Checkout session URL

- `/api/ppv/[id]/verify-access`
  - Method: GET
  - Purpose: Verify user access to PPV content
  - Authentication: Required
  - Response: Access status

## Subscription Endpoints
- `/api/subscriptions/create-session`
  - Method: POST
  - Purpose: Create subscription checkout
  - Authentication: Required
  - Response: Checkout session URL

- `/api/stripe/webhook`
  - Method: POST
  - Purpose: Handle Stripe events
  - Security: Webhook signature verification
  - Events: subscription status changes

## Shopify Endpoints
- `/api/shop/products`
  - Method: GET
  - Purpose: List available products
  - Pagination: Cursor-based
  - Filtering: Category, price range

- `/api/shop/product/[id]`
  - Method: GET
  - Purpose: Get product details
  - Response: Full product information

- `/api/shop/checkout`
  - Method: POST
  - Purpose: Create Shopify checkout
  - Authentication: Required
  - Response: Checkout URL

## Partner & Sponsor Endpoints
- `/api/partners`
  - Method: POST
  - Purpose: Submit partner application
  - Validation: Company details
  - Response: Application ID

- `/api/sponsors`
  - Method: POST
  - Purpose: Submit sponsorship inquiry
  - Validation: Campaign details
  - Response: Inquiry ID

## Admin Endpoints
- `/api/admin/videos/[id]/approve`
  - Method: POST
  - Purpose: Approve video content
  - Authentication: Admin only
  - Response: Updated video status

- `/api/admin/videos/[id]/sponsor`
  - Method: POST
  - Purpose: Add sponsorship to video
  - Authentication: Admin only
  - Response: Sponsorship details

## Examples
### Upload Video
```typescript
const response = await fetch('/api/videos', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

### Create PPV Session
```typescript
const response = await fetch('/api/ppv/create-session', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    eventId: 'event_123',
    priceId: 'price_456'
  })
});
```