import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  throw new Error('Missing Shopify credentials');
}

export const shopify = shopifyApi({
  apiVersion: LATEST_API_VERSION,
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  isEmbeddedApp: false,
});