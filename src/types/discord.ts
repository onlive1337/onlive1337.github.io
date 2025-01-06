export interface DiscordStatus {
    status: 'online' | 'idle' | 'dnd' | 'offline';
  }
  
  export const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500'
  } as const;