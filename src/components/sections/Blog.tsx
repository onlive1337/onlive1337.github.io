"use client"
import { useState } from "react";
import { SearchBar } from "../ui/SearchBar";
import { BlogCard } from "../BlogCard";
import { useEffect } from "react";
import { BlogPost } from "@/types";

interface BlogProps {
  posts?: BlogPost[];
}

export function Blog({ posts: initialPosts = [] }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);
  
  const filteredPosts = posts.filter(post => 
    post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="blog" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Blog
        </h2>
        
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        {posts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No posts found
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}