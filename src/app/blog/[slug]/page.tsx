import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { BlogPostContent } from '@/components/BlogPostContent';
import { Metadata } from 'next';

interface PageProps {
 params: {
   slug: string;
 };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
 const { slug } = params;
 const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);

 try {
   const content = await fs.readFile(filePath, 'utf8');
   const { data } = matter(content);

   return {
     title: data.title,
     description: data.description,
   };
 } catch {
   return {
     title: 'Blog Post Not Found',
   };
 }
}

export default async function BlogPost({ params }: PageProps) {
 const { slug } = params;
 const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);

 try {
   const content = await fs.readFile(filePath, 'utf8');
   const { data, content: markdownContent } = matter(content);

   return (
     <article className="container mx-auto px-4 py-16">
       <div className="max-w-4xl mx-auto">
         <BlogPostContent
           title={data.title}
           description={data.description}
           tags={data.tags}
           date={data.date}
           content={markdownContent}
         />
       </div>
     </article>
   );
 } catch {
   return (
     <div className="container mx-auto px-4 py-16">
       <div className="max-w-4xl mx-auto">
         <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
         <p className="text-gray-600 dark:text-gray-400">
           The requested blog post could not be found.
         </p>
       </div>
     </div>
   );
 }
}