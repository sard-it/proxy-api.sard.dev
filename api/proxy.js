export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api/, "");
  const target = `https://qttjklcdhofdawomaafd.supabase.co${path}${url.search}`;

  const headers = new Headers(req.headers);
  headers.set('host', 'qttjklcdhofdawomaafd.supabase.co');

  const response = await fetch(target, {
    method: req.method,
    headers,
    body: req.body
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers
  });
}
