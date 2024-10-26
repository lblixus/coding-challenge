import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ChatMessagesProps } from "@/types/Chat";
import { useFormattedDate } from "@/hooks/useFormattedDate";

const ChatMessages = ({ messages, onSendMessage }: ChatMessagesProps) => {
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const formatDate = useFormattedDate();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer} ref={scrollViewRef}>
        <View style={styles.messages}>
          {messages && messages.length > 0 ? (
            messages.map((message, index) => (
              <View
                key={index}
                style={
                  message.isSent
                    ? styles.sentMessageContainer
                    : styles.receivedMessageContainer
                }
              >
                <Text
                  style={
                    message.isSent ? styles.sentMessage : styles.receivedMessage
                  }
                >
                  {message.text}
                </Text>
                <View style={styles.messageInfo}>
                  <Text style={styles.messageDate}>
                    {formatDate(message.createdAt)}
                  </Text>
                  {message.isSent && (
                    <Text style={styles.checkmarks}>
                      {message.readAt ? "✔✔" : "✔"}
                    </Text>
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noMessages}>No hay mensajes disponibles</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <MaterialIcons name="emoji-emotions" size={24} color="#5A5A5A" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
          placeholderTextColor="#A9A9A9"
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity>
          <MaterialIcons name="attach-file" size={24} color="#5A5A5A" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage}>
          <FontAwesome name="send" size={24} color="#3D99FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messages: {
    paddingVertical: 10,
  },
  sentMessageContainer: {
    alignSelf: "flex-end",
    maxWidth: "70%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  receivedMessageContainer: {
    alignSelf: "flex-start",
    maxWidth: "70%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  sentMessage: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  receivedMessage: {
    backgroundColor: "#e4e6eb",
    color: "#000",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  messageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  messageDate: {
    fontSize: 12,
    color: "#A9A9A9",
  },
  checkmarks: {
    fontSize: 14,
    color: "#3D99FF",
  },
  noMessages: {
    color: "#A9A9A9",
    fontSize: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    fontSize: 16,
  },
});

export default ChatMessages;
