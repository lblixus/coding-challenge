import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ChatTabView from "@/components/chats-tab/ChatsTab";
import ChatMessages from "@/components/chats-tab/ChatMessages";
import UserDetails from "@/components/chats-tab/ChatUserDetail";

import { Chat, Message } from "@/types/Chat";
import { getMessages } from "@/services/clientService";

const Sidebar = ({ onSelectChat, selectedChatId }: any) => (
  <View style={styles.sidebar}>
    <ChatTabView onSelectChat={onSelectChat} selectedChatId={selectedChatId} />
  </View>
);

const ChatArea = ({ selectedChat, messages, onSendMessage }: any) => (
  <View style={styles.chatArea}>
    <Text style={styles.header}>Chat Actual</Text>
    {selectedChat ? (
      <ChatMessages messages={messages} onSendMessage={onSendMessage} />
    ) : (
      <Text>No hay mensajes disponibles.</Text>
    )}
  </View>
);

const UserDetailsArea = ({ selectedChat }: any) => (
  <View style={styles.details}>
    {selectedChat ? (
      <UserDetails user={selectedChat.user} />
    ) : (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>
          Seleccionar chat para ver detalles del usuario.
        </Text>
      </View>
    )}
  </View>
);

function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedChat) {
        const fetchedMessages = await getMessages(selectedChat.id);
        const formattedMessages = fetchedMessages.map(formatMessage);
        setMessages(formattedMessages);
      }
    };
    loadMessages();
  }, [selectedChat]);

  const formatMessage = (msg: any): Message => ({
    id: msg._id,
    text: msg.message.text,
    isSent: msg.message.typeUser === "Client",
    createdAt: msg.message.createdAt || null,
    readAt: msg.message.readAt || null,
  });

  const handleSendMessage = (newText: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: newText,
      isSent: true,
      createdAt: new Date().toISOString(),
      readAt: null,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <View style={styles.container}>
      <Sidebar
        onSelectChat={setSelectedChat}
        selectedChatId={selectedChat?.id}
      />
      <ChatArea
        selectedChat={selectedChat}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
      <UserDetailsArea selectedChat={selectedChat} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f0f4f8",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  chatArea: {
    flex: 2,
    backgroundColor: "#ffffff",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    overflow: "hidden",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  details: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    width: "90%",
    textAlign: "center",
  },
  placeholderImage: {
    width: 60,
    height: 60,
    marginBottom: 20,
    tintColor: "#b0bec5",
  },
  placeholderText: {
    fontSize: 16,
    color: "#7a7a7a",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default ChatLayout;
