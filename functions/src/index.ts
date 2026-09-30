/**
 * Company site API. Publisher Subscribe does not run here — Checkout is
 * created on the signed-in Publisher account so Stripe webhooks attach a uid.
 *
 * Live Stripe URL (hostname on this site): POST /api/stripe/webhook
 * Forwards the raw Stripe payload to Publisher, which verifies the signature
 * and writes plan status. Corporate Firebase is Spark and cannot hold Stripe secrets.
 */
import { onRequest } from 'firebase-functions/v2/https';
import { defineString } from 'firebase-functions/params';

const siteOrigin = defineString('SITE_ORIGIN', {
  default: 'https://www.theaiwebcompany.com',
});

const publisherWebhook = defineString('PUBLISHER_STRIPE_WEBHOOK_URL', {
  default: 'https://publisher.theaiwebcompany.com/api/stripe/webhook',
});

function isStripeWebhookPath(path: string): boolean {
  return (
    path === '/api/stripe/webhook' ||
    path === '/stripe/webhook' ||
    path.endsWith('/api/stripe/webhook')
  );
}

export const api = onRequest(
  {
    cors: false,
    region: 'us-central1',
    memory: '256MiB',
    timeoutSeconds: 60,
  },
  async (req, res) => {
    const origin = siteOrigin.value();
    const path = req.path || '';

    if (isStripeWebhookPath(path)) {
      if (req.method !== 'POST') {
        res.status(405).send('Method not allowed');
        return;
      }
      const sig = req.headers['stripe-signature'];
      if (!sig || typeof sig !== 'string') {
        res.status(400).send('Missing stripe-signature');
        return;
      }
      const rawBody = req.rawBody;
      if (!rawBody) {
        res.status(400).send('Missing raw body');
        return;
      }
      try {
        const upstream = await fetch(publisherWebhook.value(), {
          method: 'POST',
          headers: {
            'content-type':
              typeof req.headers['content-type'] === 'string'
                ? req.headers['content-type']
                : 'application/json',
            'stripe-signature': sig,
          },
          body: new Uint8Array(rawBody),
        });
        const text = await upstream.text();
        const contentType = upstream.headers.get('content-type');
        if (contentType) res.set('Content-Type', contentType);
        res.status(upstream.status).send(text);
      } catch (err) {
        console.error('[api] stripe webhook forward failed', err);
        res.status(502).send('Webhook forward failed');
      }
      return;
    }

    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    const isCheckout =
      req.method === 'POST' &&
      (path === '/create-checkout-session' ||
        path === '/api/create-checkout-session' ||
        path.endsWith('/create-checkout-session'));

    if (isCheckout) {
      res.status(410).json({
        error: 'Subscribe from Publisher after choosing a plan on /pricing.',
        pricing: `${origin}/pricing`,
        publisher: 'https://publisher.theaiwebcompany.com/publisher',
      });
      return;
    }

    res.status(404).json({ error: 'Not found' });
  },
);
