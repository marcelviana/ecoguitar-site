import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret')

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    revalidatePath('/galeria')
    revalidatePath('/galeria/[slug]', 'page')

    return NextResponse.json({ revalidated: true, now: Date.now() }, { status: 200 })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
