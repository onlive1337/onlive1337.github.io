"use client"
import dynamic from 'next/dynamic';

const Markdown = dynamic(() => import('@/components/Markdown'), { ssr: false });

interface BlogPostContentProps {
  title: string;
  description?: string;
  tags?: string[];
  date: string;
  content: string;
}

export function BlogPostContent({ title, description, tags, date, content }: BlogPostContentProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="mb-4">{title}</h1>
      
      {tags && tags.length > 0 && (
        <div className="flex gap-2 mb-4 not-prose">
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

      <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>

      <Markdown content={content} />
    </div>
  );
}