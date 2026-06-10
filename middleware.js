import { rewrite } from '@vercel/edge';

export const config = {
  matcher: '/tots/:path*',
};

export default function middleware(request) {
  const requestHeaders = new Headers(request.headers);

  const region = request.headers.get('x-vercel-ip-country-region') ?? '';
  const lat = request.headers.get('x-vercel-ip-latitude') ?? '';
  const long = request.headers.get('x-vercel-ip-longitude') ?? '';
  const city = decodeURIComponent(request.headers.get('x-vercel-ip-city') ?? '');

  requestHeaders.set('X-Forwarded-CountryRegion', region);
  requestHeaders.set('X-Forwarded-Geolocation', `latlong=${lat},${long};city=${city}`);

  const { pathname, search } = new URL(request.url);
  const destination = `https://AW-346554054.fps.goog${pathname}${search}`;

  return rewrite(destination, { request: { headers: requestHeaders } });
}
