"use client"
import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { fetchFromAPI } from '@/utils/api';
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

  const fetchMessages = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchFromAPI<Message[]>('messages');
      if (data) {
        setMessages(data);
      } else {
        setError('Unable to load messages');
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setError('Unable to load messages at this time');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 15000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

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

      const data = await response.json() as CreateMessageResponse;

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      await fetchMessages();
      setNewMessage('');
    } catch (err) {
      const error = err as Error;
      console.error('Failed to send message:', error);
      setError(error.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400 text-sm">Terminal</span>
          </div>
          <span className="text-xs text-gray-500">{messages.length} messages</span>
        </div>

        <div className="p-4 font-mono text-sm">
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <span className="text-green-600 dark:text-green-500">$</span>
              <span className="ml-2">echo &ldquo;Send anonymous message&rdquo;</span>
            </div>
          </div>

          <div 
            className="h-[300px] overflow-y-auto mb-4 [&::-webkit-scrollbar]:w-2 
                      [&::-webkit-scrollbar-track]:bg-transparent
                      [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800 
                      [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />
                <span className="ml-2 text-gray-500">Loading messages...</span>
              </div>
            ) : error && messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <AlertCircle className="h-5 w-5 text-gray-500 mb-2" />
                <p className="text-gray-500">Message data unavailable</p>
              </div>
            ) : messages.length === 0 ? (
              <p className="text-gray-500 text-center h-full flex items-center justify-center">
                No messages found_
              </p>
            ) : (
              <div className="space-y-1">
                {messages.map((message) => (
                  <div key={message.id} className="text-gray-600 dark:text-gray-300">
                    <span className="text-green-600 dark:text-green-500">anon@</span>
                    <span className="text-gray-500">{formatDateTime(message.created_at)}</span>
                    <span className="text-gray-500">:</span>
                    {' '}{message.content}
                  </div>
                ))}
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
                className="flex-1 bg-transparent border-none outline-none text-gray-600 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
              <button
                type="submit"
                disabled={isSending || !newMessage.trim()}
                className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs whitespace-nowrap flex items-center gap-1"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send</span>
                )}
              </button>
            </div>
          </form>

          {error && newMessage && (
            <p className="mt-2 text-red-500 text-xs flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> 
              Error: {error}
            </p>
          )}
          
          <p className="mt-2 text-gray-400 dark:text-gray-600 text-xs">
            Characters remaining: {500 - newMessage.length}
          </p>
        </div>
      </div>
    </div>
  );
}