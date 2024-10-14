export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: Date;
}

export interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'video' | 'document';
}