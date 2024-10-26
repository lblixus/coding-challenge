import { User } from "./User";

export interface Message {
  id: string;
  text: string;
  isSent: boolean;
  createdAt: string;
  readAt?: string | null;
}

export interface Chat {
  id: string;
  name: string;
  message: string;
  time: string;
  status?: string;
  user: User;
  messages: Message[];
}

export interface ChatMessagesProps {
  messages: Message[] | null;
  onSendMessage: (newMessage: string) => void;
}
