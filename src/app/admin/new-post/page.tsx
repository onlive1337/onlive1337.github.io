"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import matter from 'gray-matter';
import dynamic from 'next/dynamic';

const Markdown = dynamic(() => import('@/components/Markdown'), { ssr: false });

export default function NewPostPage() {
 const router = useRouter();
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [content, setContent] = useState('');
 const [tags, setTags] = useState('');
 const [isPreview, setIsPreview] = useState(false);
 const [isWideScreen, setIsWideScreen] = useState(false);
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
    setMounted(true);
    setIsWideScreen(window.innerWidth >= 1024);
    
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();

   const postData = {
     title,
     description,
     tags: tags.split(',').map(tag => tag.trim()),
     date: new Date().toISOString(),
   };

   const fileContent = matter.stringify(content, postData);
   const slug = title.toLowerCase().replace(/\s+/g, '-');

   try {
     await fetch('/api/posts/create', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         slug,
         content: fileContent,
       }),
     });

     router.push(`/blog/${slug}`);
   } catch (error) {
     console.error('Error creating post:', error);
   }
 };

 return (
   <main className="min-h-screen bg-white dark:bg-black">
     <div className="container mx-auto px-4 py-8">
       <div className="flex items-center justify-between mb-8">
         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
         <button
           type="button"
           onClick={() => setIsPreview(!isPreview)}
           className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors lg:hidden"
         >
           {isPreview ? 'Edit' : 'Preview'}
         </button>
       </div>

       {/* Форма и превью */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Форма */}
         <form onSubmit={handleSubmit} className={`space-y-6 ${isPreview ? 'hidden lg:block' : ''}`}>
           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               Title
             </label>
             <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Enter post title"
               className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               Description
             </label>
             <input
               type="text"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="Brief description of your post"
               className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               Tags
             </label>
             <input
               type="text"
               value={tags}
               onChange={(e) => setTags(e.target.value)}
               placeholder="tag1, tag2, tag3"
               className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
             />
             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
               Separate tags with commas
             </p>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               Content
             </label>
             <textarea
               value={content}
               onChange={(e) => setContent(e.target.value)}
               rows={20}
               placeholder="Write your post content in Markdown..."
               className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-mono"
             />
           </div>

           <div className="flex justify-end">
             <button
               type="submit"
               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
             >
               Create Post
             </button>
           </div>
         </form>

         {/* Превью */}
         {(isPreview || isWideScreen) && (
           <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-800">
             <h1>{title || 'Post Title'}</h1>
             {tags && (
               <div className="flex flex-wrap gap-2 mb-4">
                 {tags.split(',').map((tag) => (
                   <span
                     key={tag.trim()}
                     className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                   >
                     {tag.trim()}
                   </span>
                 ))}
               </div>
             )}
             {description && (
               <p className="text-lg text-gray-600 dark:text-gray-400">
                 {description}
               </p>
             )}
             {content && <Markdown content={content} />}
             {!content && (
               <p className="text-gray-500 dark:text-gray-400 italic">
                 Preview will appear here...
               </p>
             )}
           </div>
         )}
       </div>
     </div>
   </main>
 );
}