# Data Models

## User
```typescript
interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  profile: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
}

enum UserRole {
  ADMIN = 'admin',
  CREATOR = 'creator',
  MODERATOR = 'moderator',
  VIEWER = 'viewer'
}
```

## Video
```typescript
interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  duration: number;
  status: VideoStatus;
  visibility: Visibility;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  creator: User;
  sponsorships: VideoSponsor[];
  impressions: number;
}

enum VideoStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  PROCESSING = 'PROCESSING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  FAILED = 'FAILED',
  READY = 'READY'
}

enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  UNLISTED = 'UNLISTED'
}
```

## Sponsor & VideoSponsor
```typescript
interface Sponsor {
  id: string;
  name: string;
  email: string;
  website: string;
  logoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface VideoSponsor {
  id: string;
  sponsorId: string;
  videoId: string;
  placementType: PlacementType;
  amount: number;
  startDate: Date;
  endDate: Date;
  status: SponsorshipStatus;
}

enum PlacementType {
  PRE_ROLL = 'PRE_ROLL',
  MID_ROLL = 'MID_ROLL',
  POST_ROLL = 'POST_ROLL',
  OVERLAY = 'OVERLAY',
  DESCRIPTION = 'DESCRIPTION'
}
```

## PPVEvent
```typescript
interface PPVEvent {
  id: string;
  title: string;
  description: string;
  price: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  accesses: PPVEventAccess[];
}

interface PPVEventAccess {
  id: string;
  eventId: string;
  userId: string;
  purchasedAt: Date;
  stripeId: string;
}
```

## Product
```typescript
interface Product {
  id: string;
  shopifyId: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  creator: User;
  variants: ProductVariant[];
}

interface ProductVariant {
  id: string;
  productId: string;
  title: string;
  price: number;
  sku: string;
  inventory: number;
}
```

## PartnerLead & SponsorLead
```typescript
interface PartnerLead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface SponsorLead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  budget: number;
  message: string;
  status: LeadStatus;
}

enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  CONVERTED = 'CONVERTED',
  REJECTED = 'REJECTED'
}
```

## Impression
```typescript
interface Impression {
  id: string;
  videoId: string;
  userId: string;
  watchDuration: number;
  watchPercentage: number;
  deviceType: string;
  browser: string;
  country: string;
  region: string;
  createdAt: Date;
}
```