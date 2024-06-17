import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-04";
import prisma from "./db.server";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY || "fec7682697c167c100175f0378fb91e2",
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "caccf31dc6a72be2335df44bd6c85d1f",
  apiVersion: ApiVersion.April24,
  scopes: process.env.SCOPES?.split(",") || ['read_products', 'write_products', 'read_orders', 'write_orders', 'read_customers', 'write_customers', 'read_draft_orders', 'write_draft_orders', 'read_inventory', 'write_inventory', 'read_script_tags', 'write_script_tags', 'read_fulfillments', 'write_fulfillments', 'read_shipping', 'write_shipping', 'read_checkouts', 'write_checkouts', 'read_reports', 'write_reports', 'read_price_rules', 'write_price_rules', 'read_marketing_events', 'write_marketing_events', 'read_resource_feedbacks', 'write_resource_feedbacks', 'read_shopify_payments_payouts', 'write_shopify_payments_payouts', 'read_shopify_payments_disputes', 'write_shopify_payments_disputes', 'read_locales', 'write_locales', 'read_order_edits', 'write_order_edits', 'read_discounts', 'write_discounts', 'read_translations', 'write_translations', 'read_gift_cards', 'write_gift_cards', 'read_price_rules', 'write_price_rules', 'read_inventory_locations', 'write_inventory_locations', 'read_script_tags', 'write_script_tags', 'read_fulfillment_orders', 'write_fulfillment_orders', 'read_assigned_fulfillment_orders', 'write_assigned_fulfillment_orders', 'read_merchant_managed_fulfillment_orders', 'write_merchant_managed_fulfillment_orders', 'read_third_party_fulfillment_orders', 'write_third_party_fulfillment_orders', 'read_fulfillment_order_edits', 'write_fulfillment_order_edits', 'read'],
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
    },
  },
  future: {
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.April24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
