/**
 * Creates Stripe Products + monthly Prices for Publisher plans.
 * Usage: node --env-file=.env scripts/create-stripe-catalog.mjs
 */
import { Stripe } from 'stripe';

const secret = process.env.STRIPE_SECRET_KEY;
if (!secret) {
  console.error('Set STRIPE_SECRET_KEY');
  process.exit(1);
}

const stripe = new Stripe(secret);

const plans = [
  { id: 'business', name: 'AIWEB Publisher Business', amount: 4900 },
  { id: 'agency', name: 'AIWEB Publisher Agency', amount: 49900 },
  { id: 'agency_pro', name: 'AIWEB Publisher Agency Pro', amount: 149900 },
];

const out = {};

for (const plan of plans) {
  const product = await stripe.products.create({
    name: plan.name,
    metadata: { planId: plan.id, product: 'aiweb-publisher' },
  });
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: plan.amount,
    currency: 'usd',
    recurring: { interval: 'month' },
    metadata: { planId: plan.id },
  });
  out[plan.id] = { productId: product.id, priceId: price.id };
  console.log(`${plan.id}: ${price.id}`);
}

console.log('\nAdd to .env / Firebase params:');
console.log(`STRIPE_PRICE_BUSINESS=${out.business.priceId}`);
console.log(`STRIPE_PRICE_AGENCY=${out.agency.priceId}`);
console.log(`STRIPE_PRICE_AGENCY_PRO=${out.agency_pro.priceId}`);
