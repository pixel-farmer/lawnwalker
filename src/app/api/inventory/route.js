import { getSoldSlugs } from '@/lib/inventory'

export async function GET() {
  const soldSlugs = await getSoldSlugs()
  return Response.json({ soldSlugs })
}
