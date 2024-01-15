import { useCallback, useEffect, useState } from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import _ from 'lodash';

import { Chat, Message } from '../@types/chat';
import { Collections } from '../@types/firestore';
import { User } from '../@types/user';

const getChatKey = (userIds: string[]) => {
  return _.orderBy(userIds, userId => userId, 'asc');
};

const useChat = (userIds: string[]) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [loadingChat, setLoadingChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const addNewMessages = useCallback<(newMessages: Message[]) => void>(
    newMessages => {
      setMessages(prevMessages => {
        return _.uniqBy(newMessages.concat(prevMessages), m => m.id);
      });
    },
    [],
  );

  const loadUsers = async (uIds: string[]) => {
    const usersSnapshot = await firestore()
      .collection(Collections.USERS)
      .where('userId', 'in', uIds)
      .get();

    const users = usersSnapshot.docs.map<User>(doc => doc.data() as User);
    return users;
  };

  const loadChat = useCallback(async () => {
    try {
      setLoadingChat(true);
      const chatSnapshot = await firestore()
        .collection(Collections.CHATS)
        .where('userIds', '==', getChatKey(userIds))
        .get();

      if (chatSnapshot.docs.length > 0) {
        const doc = chatSnapshot.docs[0];

        const chatUserIds = doc.data().userIds as string[];
        const users = await loadUsers(chatUserIds);

        setChat({
          id: doc.id,
          userIds: chatUserIds,
          users: users,
        });
        return;
      }

      const users = await loadUsers(userIds);
      const data = {
        userIds: getChatKey(userIds),
        users,
      };

      const doc = await firestore().collection(Collections.CHATS).add(data);
      setChat({
        id: doc.id,
        ...data,
      });
    } finally {
      setLoadingChat(false);
    }
  }, [userIds]);

  const sendMessage = useCallback<(text: string, user: User) => Promise<void>>(
    async (text, user) => {
      if (chat === null) {
        throw new Error('Chat is not loaded');
      }

      try {
        setSending(true);

        const doc = await firestore()
          .collection(Collections.CHATS)
          .doc(chat.id)
          .collection(Collections.MESSAGES)
          .add({
            text,
            user,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });

        addNewMessages([
          {
            id: doc.id,
            text,
            imageUrl: null,
            user,
            createdAt: new Date(),
          },
        ]);
      } finally {
        setSending(false);
      }
    },
    [addNewMessages, chat],
  );

  useEffect(() => {
    loadChat();
  }, [loadChat]);

  useEffect(() => {
    if (chat?.id === null) {
      return;
    }

    setLoadingMessages(true);

    const unsubscribe = firestore()
      .collection(Collections.CHATS)
      .doc(chat?.id)
      .collection(Collections.MESSAGES)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        if (snapshot.metadata.hasPendingWrites) {
          return;
        }

        const newMessages = snapshot
          .docChanges()
          .filter(({ type }) => type === 'added')
          .map(docChange => {
            const { doc } = docChange;
            const docData = doc.data();
            const newMessage: Message = {
              id: doc.id,
              text: docData.text ?? null,
              imageUrl: docData.imageUrl ?? null,
              user: docData.user,
              createdAt: docData.createdAt.toDate(),
            };
            return newMessage;
          });

        addNewMessages(newMessages);
        setLoadingMessages(false);
      });

    return () => {
      unsubscribe();
    };
  }, [addNewMessages, chat?.id]);

  const updateMessageReadAt = useCallback<(userId: string) => Promise<void>>(
    async userId => {
      if (chat === null) {
        return;
      }

      firestore()
        .collection(Collections.CHATS)
        .doc(chat.id)
        .update({
          [`userToMessageReadAt.${userId}`]:
            firestore.FieldValue.serverTimestamp(),
        });
    },
    [chat],
  );

  const [userToMessageReadAt, userUserToMessageReadAt] = useState<{
    [userId: string]: Date;
  }>({});

  useEffect(() => {
    if (chat === null) {
      return;
    }

    const unsubscribe = firestore()
      .collection(Collections.CHATS)
      .doc(chat.id)
      .onSnapshot(snapshot => {
        if (snapshot.metadata.hasPendingWrites) {
          return;
        }

        const chatData = snapshot.data() ?? {};
        const userToMessageReadTimestamp = chatData.userToMessageReadAt as {
          [userId: string]: FirebaseFirestoreTypes.Timestamp;
        };

        const userToMessageReadDate = _.mapValues(
          userToMessageReadTimestamp,
          updateMessageReadTimestamp => updateMessageReadTimestamp.toDate(),
        );

        userUserToMessageReadAt(userToMessageReadDate);
      });

    return () => {
      unsubscribe();
    };
  }, [chat]);

  const sendImageMessage = useCallback<
    (filepath: string, user: User) => Promise<void>
  >(
    async (filepath, user) => {
      setSending(true);

      try {
        if (chat === null) {
          throw new Error('Undefined chat');
        }

        if (user === null) {
          throw new Error('Undefined user');
        }

        const originalFilename = _.last(filepath.split('/'));
        if (originalFilename === undefined) {
          throw new Error('Undefined filename');
        }

        const fileExt = originalFilename.split('.')[1];
        const fileName = `${Date.now()}.${fileExt}`;

        const storagePath = `chat/${chat.id}/${fileName}`;
        const snapshot = await storage().ref(storagePath).putFile(filepath);

        const url = await storage()
          .ref(snapshot.metadata.fullPath)
          .getDownloadURL();

        const doc = await firestore()
          .collection(Collections.CHATS)
          .doc(chat.id)
          .collection(Collections.MESSAGES)
          .add({
            imageUrl: url,
            user,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });

        addNewMessages([
          {
            id: doc.id,
            text: null,
            imageUrl: url,
            user,
            createdAt: new Date(),
          },
        ]);
      } finally {
        setSending(false);
      }
    },
    [addNewMessages, chat],
  );

  return {
    chat,
    loadingChat,
    sendMessage,
    messages,
    sending,
    loadingMessages,
    updateMessageReadAt,
    userToMessageReadAt,
    sendImageMessage,
  };
};

export default useChat;
