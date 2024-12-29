import { BlogPost } from "@/types";
import Link from "next/link";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="block group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-black/40 dark:hover:bg-black/60"
    >
      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-500 dark:text-white">
        {post.title}
      </h3>
      
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {post.description}
      </p>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {new Date(post.date).toLocaleDateString()}
      </div>
    </Link>
  );
}