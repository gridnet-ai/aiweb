/**
 * Local Stripe Checkout API for Vite dev (`npm run dev:api`).
 * Uses Stripe REST (no SDK) so install stays light.
 */
import http from 'node:http';

const PORT = Number(process.env.API_PORT || 8787);
const SITE_ORIGIN = process.env.SITE_ORIGIN || 'http://localhost:5174';

const PRICE_BY_PLAN = {
  business: process.env.STRIPE_PRICE_BUSINESS,
  agency: process.env.STRIPE_PRICE_AGENCY,
  agency_pro: process.env.STRIPE_PRICE_AGENCY_PRO,
};

function randomSuffix(len = 8) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let out = '';
  for (let i = 0; i < len; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function createCheckoutSession({ planId, priceId, secret }) {
  const params = new URLSearchParams();
  params.set('mode', 'subscription');
  params.set('success_url', `${SITE_ORIGIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', `${SITE_ORIGIN}/checkout/canceled`);
  params.set('allow_promotion_codes', 'true');
  params.set('billing_address_collection', 'auto');
  params.set('integration_identifier', `publisher-pricing-${randomSuffix()}`);
  params.set('line_items[0][price]', priceId);
  params.set('line_items[0][quantity]', '1');
  params.set('metadata[planId]', planId);
  params.set('metadata[product]', 'aiweb-publisher');
  params.set('subscription_data[metadata][planId]', planId);
  params.set('subscription_data[metadata][product]', 'aiweb-publisher');

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || `Stripe error ${res.status}`);
  }
  return data;
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', SITE_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  if (req.method === 'POST' && url.pathname === '/api/create-checkout-session') {
    try {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const planId = String(body.planId || '');
      const priceId = PRICE_BY_PLAN[planId];
      const secret = process.env.STRIPE_SECRET_KEY;

      if (!secret) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'STRIPE_SECRET_KEY is not set' }));
        return;
      }
      if (!priceId) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unknown plan or missing STRIPE_PRICE_* env' }));
        return;
      }

      const session = await createCheckoutSession({ planId, priceId, secret });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ url: session.url }));
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Checkout failed' }));
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Stripe API listening on http://localhost:${PORT}`);
});
