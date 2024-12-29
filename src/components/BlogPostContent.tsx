"use client"
import dynamic from 'next/dynamic';

const Markdown = dynamic(() => import('@/components/Markdown'), { ssr: false });

interface BlogPostContentProps {
  title: string;
  description?: string;
  tags?: string[];
  content: string;
}

export function BlogPostContent({ title, description, tags, content }: BlogPostContentProps) {
    return (
        <article className="container mx-auto px-4 py-16 prose prose-lg dark:prose-invert">
          <div className="mt-12">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            
            {tags && tags.length > 0 && (
              <div className="flex gap-2 mb-8">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
    
            {description && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {description}
              </p>
            )}
    
            <div className="mt-8">
              <Markdown content={content} />
            </div>
          </div>
        </article>
      );
    }