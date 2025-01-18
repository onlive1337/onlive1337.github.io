"use client"
import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import type { Message, CreateMessageResponse } from '@/types';

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="flex items-start gap-4">
          <MessageSquare className="h-5 w-5 mt-1 text-gray-400" />
          <div className="space-y-2 font-mono text-sm">
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
              <p className="text-gray-500 dark:text-gray-400">
                $ messages --list-recent
              </p>
              {isLoading ? (
                <p className="pl-4 text-gray-500 dark:text-gray-400">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="pl-4 text-gray-500 dark:text-gray-400">No messages found_</p>
              ) : (
                <div className="pl-4 space-y-2">
                  {messages.slice(0, 3).map((message) => (
                    <div key={message.id}>
                      <p className="text-gray-700 dark:text-gray-300 break-words">
                        <span className="text-green-500 dark:text-green-400">anon@</span>
                        <span className="text-gray-400">{new Date(message.created_at).toLocaleTimeString()}</span>
                        <span className="text-gray-400">:</span>
                        {' '}{message.content}
                      </p>
                    </div>
                  ))}
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