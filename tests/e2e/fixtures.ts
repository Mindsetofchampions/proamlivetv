import { test as base } from '@playwright/test';

export const test = base.extend({
  creator: async ({ page }, use) => {
    const creator = {
      email: 'creator@test.com',
      password: 'Test123!',
      name: 'Test Creator'
    };
    await use(creator);
  },
  subscriber: async ({ page }, use) => {
    const subscriber = {
      email: 'subscriber@test.com',
      password: 'Test123!',
      name: 'Test Subscriber'
    };
    await use(subscriber);
  },
  admin: async ({ page }, use) => {
    const admin = {
      email: 'admin@test.com',
      password: 'Test123!',
      name: 'Test Admin'
    };
    await use(admin);
  }
});

export { expect } from '@playwright/test';