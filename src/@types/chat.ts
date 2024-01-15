import { User } from './user';

export interface Chat {
  id: string; // 채팅방 ID
  userIds: string[]; // 참여중인 유저들 ID
  users: User[]; // 참여중인 유저들 정보
}

export interface Message {
  id: string;
  user: User;
  text: string | null;
  imageUrl: string | null;
  createdAt: Date;
}

export interface FirestoreMessageData {
  text: string;
  user: User;
  createdAt: Date;
}
