"use client"
import { useState, useEffect } from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react';
import type { Message, CreateMessageResponse } from '@/types';
import { cn } from '@/utils/cn';

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
    month: 'short',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  });
  
  return `${fullDate} at ${time}`;
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const visibleMessages = isExpanded ? messages : messages.slice(0, 3);
  const hasMoreMessages = messages.length > 3;

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="flex items-start gap-4">
          <MessageSquare className="h-5 w-5 mt-1 text-gray-400" />
          <div className="space-y-2 font-mono text-sm flex-1">
            <p className="text-gray-500 dark:text-gray-400">
              $ echo &ldquo;Send anonymous message&rdquo;
            </p>

            <form onSubmit={handleSubmit} className="pl-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">{'>'}</span>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  maxLength={500}
                  disabled={isSending}
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 font-mono placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  disabled={isSending || !newMessage.trim()}
                  className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Send
                </button>
              </div>
            </form>

            <div className="pl-4 space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400">
                  $ messages --list-recent
                </p>
                <span className="text-sm text-gray-400">
                  {messages.length} messages
                </span>
              </div>
              {isLoading ? (
                <p className="pl-4 text-gray-500 dark:text-gray-400">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="pl-4 text-gray-500 dark:text-gray-400">No messages found_</p>
              ) : (
                <div className="pl-4">
                  <div className={cn(
                    "space-y-2 transition-all duration-300",
                    isExpanded ? "max-h-96 overflow-y-auto" : "max-h-48"
                  )}>
                    {visibleMessages.map((message) => (
                      <div key={message.id}>
                        <p className="text-gray-700 dark:text-gray-300 break-words">
                          <span className="text-green-500 dark:text-green-400">anon@</span>
                          <span className="text-gray-400">{formatDateTime(message.created_at)}</span>
                          <span className="text-gray-400">:</span>
                          {' '}{message.content}
                        </p>
                      </div>
                    ))}
                  </div>
                  {hasMoreMessages && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded && "rotate-180"
                      )} />
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              )}
            </div>

            {error && (
              <p className="pl-4 text-red-500">
                Error: {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}