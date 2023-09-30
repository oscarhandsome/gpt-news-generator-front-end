export default defineEventHandler((event) => {
  const headers = {
    // 'Access-Control-Allow-Origin': 'Same-Origin',
    // crossOriginResourcePolicy: 'same-origin',
    // crossOriginOpenerPolicy: 'same-origin',
    // crossOriginEmbedderPolicy: 'require-corp',
    // contentSecurityPolicy:
    //   "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
    // 'X-XSS-Protection': 1,
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  }
  setHeaders(event, headers)
})
