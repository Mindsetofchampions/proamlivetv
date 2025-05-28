# API Specification

## Overview

PRO AM LIVE TV's backend API provides a comprehensive set of endpoints for managing video content, user interactions, payments, and administrative functions. The API follows REST principles and uses JSON for request/response payloads.

### Base Information
- Base URL: `/api`
- Content-Type: `application/json` (unless specified)
- Authentication: Bearer token (Clerk)
- Rate Limits: 100 requests/minute for authenticated users, 20 requests/minute for anonymous

### Error Responses
All error responses follow this format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {} // Optional additional information
  }
}
```

---

## Public Endpoints

### Health Check
```http
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "services": {
    "database": "connected",
    "storage": "connected",
    "stripe": "connected"
  }
}
```

---

## Authentication Endpoints

### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

Response:
```json
{
  "userId": "user_123",
  "email": "user@example.com",
  "sessionToken": "token_xyz"
}
```

### Sign In
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "sessionToken": "token_xyz",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "role": "viewer"
  }
}
```

### Clerk Webhook
```http
POST /api/auth/webhook
Clerk-Signature: t=timestamp,s=signature

{
  "type": "user.created",
  "data": {
    "id": "user_123",
    "email_addresses": ["user@example.com"]
  }
}
```

---

## Video Endpoints

### Upload Video
```http
POST /api/videos
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Data:
- file: <video file>
- title: "My Video Title"
- description: "Video description"
- category: "gaming"
- visibility: "public"
```

Response:
```json
{
  "id": "video_123",
  "status": "processing",
  "uploadUrl": "https://storage.example.com/upload/123",
  "thumbnailUploadUrl": "https://storage.example.com/thumbnail/123"
}
```

### Get Video Details
```http
GET /api/videos/{id}
Authorization: Bearer <token>
```

Response:
```json
{
  "id": "video_123",
  "title": "My Video Title",
  "description": "Video description",
  "status": "ready",
  "visibility": "public",
  "url": "https://stream.example.com/video_123/manifest.m3u8",
  "thumbnailUrl": "https://storage.example.com/thumbnails/123.jpg",
  "duration": 180,
  "views": 1234,
  "likes": 56,
  "creator": {
    "id": "user_123",
    "username": "creator123",
    "avatarUrl": "https://..."
  }
}
```

### Track Video Impression
```http
POST /api/videos/{id}/impression
Authorization: Bearer <token>

{
  "watchDuration": 120,
  "watchPercentage": 75,
  "quality": "1080p"
}
```

Response:
```json
{
  "success": true,
  "impressions": 1235
}
```

---

## PPV (Pay-Per-View) Endpoints

### Create Checkout Session
```http
POST /api/ppv/create-session
Authorization: Bearer <token>

{
  "eventId": "event_123",
  "priceId": "price_xyz"
}
```

Response:
```json
{
  "sessionId": "cs_123",
  "url": "https://checkout.stripe.com/pay/cs_123"
}
```

### Verify Access
```http
GET /api/ppv/{eventId}/verify-access
Authorization: Bearer <token>
```

Response:
```json
{
  "hasAccess": true,
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

---

## Subscription Endpoints

### Create Subscription Session
```http
POST /api/subscriptions/create-session
Authorization: Bearer <token>

{
  "planId": "plan_monthly",
  "successUrl": "https://example.com/success",
  "cancelUrl": "https://example.com/cancel"
}
```

Response:
```json
{
  "sessionId": "cs_sub_123",
  "url": "https://checkout.stripe.com/pay/cs_sub_123"
}
```

### Stripe Webhook Handler
```http
POST /api/stripe/webhook
Stripe-Signature: t=timestamp,v1=signature

{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_123",
      "customer": "cus_123",
      "subscription": "sub_123"
    }
  }
}
```

---

## Shop Endpoints

### List Products
```http
GET /api/shop/products?page=1&limit=20&category=gaming
```

Response:
```json
{
  "products": [
    {
      "id": "prod_123",
      "title": "Gaming PC",
      "price": 999.99,
      "thumbnailUrl": "https://...",
      "category": "gaming",
      "inStock": true
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "hasMore": true
  }
}
```

### Get Product Details
```http
GET /api/shop/product/{id}
```

Response:
```json
{
  "id": "prod_123",
  "title": "Gaming PC",
  "description": "High-performance gaming computer",
  "price": 999.99,
  "images": ["https://..."],
  "specs": {
    "processor": "AMD Ryzen 5",
    "gpu": "RTX 3060",
    "ram": "16GB"
  },
  "variants": [
    {
      "id": "var_123",
      "name": "Basic",
      "price": 999.99
    }
  ]
}
```

### Create Checkout
```http
POST /api/shop/checkout
Authorization: Bearer <token>

{
  "items": [
    {
      "productId": "prod_123",
      "variantId": "var_123",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "line1": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94105",
    "country": "US"
  }
}
```

Response:
```json
{
  "checkoutUrl": "https://checkout.shopify.com/..."
}
```

---

## Partner & Sponsor Endpoints

### Submit Partner Application
```http
POST /api/partners
Content-Type: application/json

{
  "companyName": "Tech Corp",
  "contactName": "Jane Smith",
  "email": "jane@techcorp.com",
  "phone": "+1234567890",
  "website": "https://techcorp.com",
  "partnershipType": "technology",
  "message": "Interested in platform integration"
}
```

Response:
```json
{
  "applicationId": "app_123",
  "status": "pending",
  "nextSteps": "Our team will contact you within 2 business days"
}
```

### Submit Sponsor Application
```http
POST /api/sponsors
Content-Type: multipart/form-data

Form Data:
- companyName: "Brand Co"
- contactName: "John Doe"
- email: "john@brandco.com"
- budget: 50000
- targetAudience: "13-17"
- logo: <file>
- brandGuidelines: <file>
```

Response:
```json
{
  "applicationId": "sponsor_123",
  "status": "pending",
  "uploadedFiles": {
    "logo": "https://...",
    "brandGuidelines": "https://..."
  }
}
```

---

## Admin Endpoints

### Approve Video
```http
POST /api/admin/videos/{id}/approve
Authorization: Bearer <token>

{
  "moderatorNotes": "Content follows guidelines",
  "featuredCategory": "trending"
}
```

Response:
```json
{
  "id": "video_123",
  "status": "approved",
  "moderatedBy": "admin_123",
  "moderatedAt": "2025-03-15T12:00:00Z"
}
```

### Assign Sponsor
```http
POST /api/admin/videos/{id}/sponsor
Authorization: Bearer <token>

{
  "sponsorId": "sponsor_123",
  "placementType": "pre_roll",
  "startDate": "2025-04-01T00:00:00Z",
  "endDate": "2025-04-30T23:59:59Z",
  "amount": 1000.00
}
```

Response:
```json
{
  "id": "sponsorship_123",
  "status": "active",
  "video": {
    "id": "video_123",
    "title": "Gaming Tournament Finals"
  },
  "sponsor": {
    "id": "sponsor_123",
    "name": "Brand Co"
  }
}
```