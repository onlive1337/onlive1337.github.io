import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-static';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const { slug, content } = await req.json();
    const postsDirectory = path.join(process.cwd(), 'src/content/blog');
    
    await fs.mkdir(postsDirectory, { recursive: true });
    
    await fs.writeFile(
      path.join(postsDirectory, `${slug}.mdx`),
      content
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}