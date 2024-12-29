import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { BlogPostContent } from '@/components/BlogPostContent';
import Link from 'next/link';
import { ArrowLeft } from "lucide-react";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);

  try {
    const content = await fs.readFile(filePath, 'utf8');
    const { data, content: markdownContent } = matter(content);

    return (
        <div>
          <div className="fixed top-6 left-6 z-50">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          <BlogPostContent
            title={data.title}
            description={data.description}
            tags={data.tags}
            content={markdownContent}
          />
        </div>
      );
    } catch (error) {
    console.error('Error reading blog post:', error);
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The requested blog post could not be found.
        </p>
      </div>
    );
  }
}