import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'src/content/blog');
    const files = await fs.readdir(postsDirectory);

    const posts = await Promise.all(
      files.filter(file => file.endsWith('.mdx')).map(async (file) => {
        const filePath = path.join(postsDirectory, file);
        const content = await fs.readFile(filePath, 'utf8');
        const { data } = matter(content);
        
        return {
          slug: file.replace('.mdx', ''),
          title: data.title,
          description: data.description,
          tags: data.tags || [],
          date: data.date,
        };
      })
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}