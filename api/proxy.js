export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api/, "");
  const target = `https://qttjklcdhofdawomaafd.supabase.co${path}${url.search}`;

  // إعداد الهيدرز
  const headers = new Headers(req.headers);
  headers.set('host', 'qttjklcdhofdawomaafd.supabase.co');

  // التعامل مع preflight request (OPTIONS) لمنع مشاكل CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, x-api-token"
      }
    });
  }

  // إرسال الطلب إلى Supabase
  const response = await fetch(target, {
    method: req.method,
    headers,
    body: req.body
  });

  // إضافة هيدرز CORS للرد النهائي
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set("Access-Control-Allow-Origin", "*");
  responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  responseHeaders.set("Access-Control-Allow-Headers", "Content-Type, x-api-token");

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders
  });
}
