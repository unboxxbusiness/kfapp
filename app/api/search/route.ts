import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, slug, title, category, reading_time_minutes, direct_answer')
      .or(
        `title.ilike.%${query}%,direct_answer.ilike.%${query}%,category.ilike.%${query}%`
      )
      .order('created_at', { ascending: false })
      .limit(8);

    if (error) {
      console.error('[Search API] Supabase search error:', error);
      return NextResponse.json({ results: [] }, { status: 500 });
    }

    return NextResponse.json({ results: data || [] });
  } catch (err) {
    console.error('[Search API] Exception searching articles:', err);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
