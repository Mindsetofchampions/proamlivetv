# Staging Deployment Checklist

## Environment
- Staging URL: https://staging.proamtv.com
- Branch: `staging`
- Environment: `.env.staging`

## Pre-Deployment Checks
- [x] All E2E tests passing
- [x] Environment variables configured
- [x] Database migrations applied
- [x] Media server configured

## Critical Flows to Verify
1. Authentication
   - [ ] Sign up
   - [ ] Sign in
   - [ ] Password reset

2. Video Platform
   - [ ] Video upload
   - [ ] Video playback
   - [ ] Admin approval flow

3. Live Events
   - [ ] Event creation
   - [ ] Stream connection
   - [ ] Viewer access

4. Monetization
   - [ ] Subscription checkout
   - [ ] PPV purchase
   - [ ] Creator payouts

## Post-Deployment Checks
- [ ] SSL certificate valid
- [ ] CDN caching working
- [ ] Error monitoring active
- [ ] Analytics tracking
- [ ] Email notifications

## Notes
- Remember to verify Stripe test mode
- Check SendGrid delivery
- Monitor server resources