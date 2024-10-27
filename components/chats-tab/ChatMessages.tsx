import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { ChatMessagesProps } from "@/types/Chat";
import { useFormattedDate } from "@/hooks/useFormattedDate";

const ChatMessages = ({ messages, onSendMessage }: ChatMessagesProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [translate, setTranslate] = useState(false);
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
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const toggleTranslate = () => setTranslate((prev) => !prev);

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
                  style={[
                    styles.senderLabel,
                    { color: message.isSent ? "#fff" : "#333" },
                  ]}
                >
                  {message.isSent ? "You" : "Sender"}
                </Text>
                <View
                  style={
                    message.isSent ? styles.sentBubble : styles.receivedBubble
                  }
                >
                  <Text
                    style={
                      message.isSent
                        ? styles.sentMessageText
                        : styles.messageText
                    }
                  >
                    {message.text}
                  </Text>
                  <View style={styles.messageInfo}>
                    <Text
                      style={[
                        styles.messageDate,
                        message.isSent && styles.sentMessageDate,
                      ]}
                    >
                      {formatDate(message.createdAt)}
                    </Text>
                    {message.isSent && (
                      <Text style={styles.checkmarks}>
                        {message.readAt ? "✔✔" : "✔"}
                      </Text>
                    )}
                  </View>
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
        <TouchableOpacity style={styles.attachmentButton}>
          <Ionicons name="attach" size={24} color="#5A5A5A" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
          placeholderTextColor="#A9A9A9"
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity
          onPress={toggleTranslate}
          style={styles.translateButton}
        >
          <MaterialIcons
            name={translate ? "g-translate" : "translate"}
            size={24}
            color={translate ? "#3D99FF" : "#5A5A5A"}
          />
          {translate && (
            <Text style={styles.translateText}>AI Para traducir</Text>
          )}
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
    backgroundColor: "#fff",
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
  senderLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  sentBubble: {
    backgroundColor: "#5dade2",
    padding: 12,
    borderRadius: 20,
    borderTopRightRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  receivedBubble: {
    backgroundColor: "#f0f0f5",
    padding: 12,
    borderRadius: 20,
    borderTopLeftRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  sentMessageText: {
    color: "#fff",
    fontSize: 16,
  },
  messageText: {
    color: "#333",
    fontSize: 16,
  },
  messageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  messageDate: {
    fontSize: 12,
    color: "#000",
  },
  sentMessageDate: {
    fontWeight: "bold",
    color: "#1b4f72",
  },
  checkmarks: {
    fontSize: 14,
    color: "#1b4f72",
    marginLeft: 5,
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
  attachmentButton: {
    marginLeft: 8,
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
  translateButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  translateText: {
    marginLeft: 4,
    color: "#3D99FF",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default ChatMessages;
