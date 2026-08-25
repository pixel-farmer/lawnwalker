export function getSiteUrl(request) {
  if (request) {
    const origin = request.headers.get('origin')
    if (origin) {
      return origin.replace(/\/$/, '')
    }

    const referer = request.headers.get('referer')
    if (referer) {
      try {
        return new URL(referer).origin
      } catch {
        // Fall through to env defaults.
      }
    }
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:3000'
}
