import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Dynamic On-Demand Revalidation Endpoint
 * Allows instant cache purging whenever new articles are inserted into Supabase
 *
 * Usage:
 * POST or GET /api/revalidate?secret=<REVALIDATE_SECRET>&slug=<article-slug>
 * or
 * POST or GET /api/revalidate?secret=<REVALIDATE_SECRET>&path=/
 */
export async function POST(request: NextRequest) {
  return handleRevalidation(request);
}

export async function GET(request: NextRequest) {
  return handleRevalidation(request);
}

async function handleRevalidation(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');
  const slug = searchParams.get('slug');

  const expectedSecret = process.env.REVALIDATE_SECRET || 'kampusfilter-revalidate-2026';

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { message: 'Invalid or missing secret token' },
      { status: 401 }
    );
  }

  try {
    if (slug) {
      // Purge specific article route, homepage feed, sitemap, and AI llms directory
      revalidatePath(`/articles/${slug}`);
      revalidatePath('/');
      revalidatePath('/sitemap.xml');
      revalidatePath('/llms.txt');
      return NextResponse.json({
        revalidated: true,
        type: 'single-article',
        slug,
        timestamp: new Date().toISOString(),
      });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        type: 'custom-path',
        path,
        timestamp: new Date().toISOString(),
      });
    }

    // Default: purge homepage, all article pages, sitemap, and llms.txt
    revalidatePath('/', 'page');
    revalidatePath('/articles/[slug]', 'page');
    revalidatePath('/sitemap.xml');
    revalidatePath('/llms.txt');

    return NextResponse.json({
      revalidated: true,
      type: 'all',
      message: 'Global cache and sitemap revalidated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { message: 'Error triggering revalidation', error: errorMessage },
      { status: 500 }
    );
  }
}
