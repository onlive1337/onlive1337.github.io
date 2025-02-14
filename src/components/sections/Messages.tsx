"use client"
import { useState, useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import type { Message, CreateMessageResponse } from '@/types';

function formatDateTime(dateString: string) {
 const date = new Date(dateString);
 const today = new Date();
 const yesterday = new Date(today);
 yesterday.setDate(yesterday.getDate() - 1);

 const time = date.toLocaleTimeString('en-US', { 
   hour: '2-digit', 
   minute: '2-digit',
   hour12: false 
 });

 if (date.toDateString() === today.toDateString()) {
   return `today at ${time}`;
 }
 if (date.toDateString() === yesterday.toDateString()) {
   return `yesterday at ${time}`;
 }
 
 const fullDate = date.toLocaleDateString('en-US', {
   day: 'numeric',
   month: 'short'
 });
 
 return `${fullDate} at ${time}`;
}

export function Messages() {
 const [messages, setMessages] = useState<Message[]>([]);
 const [newMessage, setNewMessage] = useState('');
 const [isLoading, setIsLoading] = useState(true);
 const [isSending, setIsSending] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const messagesEndRef = useRef<HTMLDivElement>(null);

 const scrollToBottom = () => {
   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 };

 useEffect(() => {
   scrollToBottom();
 }, [messages]);

 useEffect(() => {
   fetchMessages();
   const interval = setInterval(fetchMessages, 5000);
   return () => clearInterval(interval);
 }, []);

 async function fetchMessages() {
   try {
     const response = await fetch('https://portfolio-api-taupe-theta.vercel.app/api/messages');
     if (!response.ok) throw new Error('Failed to fetch messages');
     const data = await response.json();
     setMessages(data);
     setError(null);
   } catch (err) {
     console.error('Failed to fetch messages:', err);
     setError('Failed to load messages. Please try again later.');
   } finally {
     setIsLoading(false);
   }
 }

 async function handleSubmit(e: React.FormEvent) {
   e.preventDefault();
   if (!newMessage.trim() || isSending) return;

   setIsSending(true);
   setError(null);

   try {
     const response = await fetch('https://portfolio-api-taupe-theta.vercel.app/api/messages', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ content: newMessage }),
     });

     const data: CreateMessageResponse = await response.json();

     if (!response.ok) {
       throw new Error(data.error || 'Failed to send message');
     }

     await fetchMessages();
     setNewMessage('');
   } catch (err) {
     console.error('Failed to send message:', err);
     setError('Failed to send message. Please try again.');
   } finally {
     setIsSending(false);
   }
 }

 return (
   <div className="container mx-auto px-4 pb-8">
     <div className="rounded-xl border border-gray-800 bg-black overflow-hidden">
       <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-gray-800">
         <div className="flex items-center gap-2">
           <MessageSquare className="h-4 w-4 text-gray-400" />
           <span className="text-gray-400 text-sm">Terminal</span>
         </div>
         <span className="text-xs text-gray-500">{messages.length} messages</span>
       </div>

       <div className="p-4 font-mono text-sm">
         <div className="space-y-2 mb-4">
           <div className="flex items-center text-gray-400">
             <span className="text-green-500">$</span>
             <span className="ml-2">echo &ldquo;Send anonymous message&rdquo;</span>
           </div>
         </div>

         <div 
           className="h-[300px] overflow-y-auto mb-4 [&::-webkit-scrollbar]:w-2 
                      [&::-webkit-scrollbar-track]:bg-transparent
                      [&::-webkit-scrollbar-thumb]:bg-gray-800 
                      [&::-webkit-scrollbar-thumb]:rounded-full"
         >
           {isLoading ? (
             <p className="text-gray-500">Loading messages...</p>
           ) : messages.length === 0 ? (
             <p className="text-gray-500">No messages found_</p>
           ) : (
             <div className="space-y-1">
               {messages.map((message) => (
                 <div key={message.id} className="text-gray-300">
                   <span className="text-green-500">anon@</span>
                   <span className="text-gray-500">{formatDateTime(message.created_at)}</span>
                   <span className="text-gray-500">:</span>
                   {' '}{message.content}
                 </div>
               ))}
               <div ref={messagesEndRef} />
             </div>
           )}
         </div>

         <form onSubmit={handleSubmit} className="relative">
           <div className="flex items-center">
             <span className="text-gray-500 mr-2">&gt;</span>
             <input
               type="text"
               value={newMessage}
               onChange={(e) => setNewMessage(e.target.value)}
               placeholder="Type your message..."
               maxLength={500}
               disabled={isSending}
               className="flex-1 bg-transparent border-none outline-none text-gray-300 placeholder:text-gray-600"
             />
             <button
               type="submit"
               disabled={isSending || !newMessage.trim()}
               className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs whitespace-nowrap"
             >
               Send
             </button>
           </div>
         </form>

         {error && (
           <p className="mt-2 text-red-500 text-xs">
             Error: {error}
           </p>
         )}
       </div>
     </div>
   </div>
 );
}