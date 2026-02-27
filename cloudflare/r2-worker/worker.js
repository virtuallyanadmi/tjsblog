addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

const SANITY_CDN = 'https://cdn.sanity.io';

async function handle(request) {
  const url = new URL(request.url);
  // Use the path as the R2 object key (strip leading slash)
  const key = url.pathname.replace(/^\/+/, '');
  if (!key) return new Response('Not found', { status: 404 });

  try {
    // Try to get from R2
    const obj = await IMAGES.get(key);
    if (obj) {
      const headers = new Headers(obj.httpMetadata?.headers || {});
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      const body = await obj.arrayBuffer();
      return new Response(body, { status: 200, headers });
    }

    // Fetch from Sanity CDN
    const target = `${SANITY_CDN}/${key}${url.search}`;
    const upstream = await fetch(target);
    if (!upstream.ok) return new Response('Upstream fetch failed', { status: upstream.status });

    const arrayBuffer = await upstream.arrayBuffer();
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';

    // Store in R2 for subsequent requests
    await IMAGES.put(key, arrayBuffer, {
      httpMetadata: { contentType },
    });

    const headers = new Headers(upstream.headers);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new Response(arrayBuffer, { status: upstream.status, headers });
  } catch (err) {
    return new Response('Worker error: ' + String(err), { status: 500 });
  }
}
