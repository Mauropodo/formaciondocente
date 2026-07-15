import type { MiddlewareHandler } from "astro";

// Placeholder middleware to reserve this layer for the future SSR flow.
export const onRequest: MiddlewareHandler = async (_, next) => next();
