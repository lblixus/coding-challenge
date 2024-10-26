import React, { useState, useEffect, useCallback, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useWindowDimensions } from "react-native";

import { TabView, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import { Chat } from "@/types/Chat";
import { getClients } from "@/services/clientService";

const ChatsTab = memo(
  ({
    onSelectChat,
    selectedChatId,
  }: {
    onSelectChat: (chat: Chat) => void;
    selectedChatId: string | null;
  }) => {
    const [chatData, setChatData] = useState<Chat[]>([]);

    useEffect(() => {
      const loadClients = async () => {
        const clients = await getClients();
        const formattedChats = clients.map((client: any) => ({
          id: client._id,
          name: client.name,
          message: "Hola",
          time: new Date(parseInt(client.updatedAt)).toLocaleString(),
          status: "active",
          user: { name: client.name, phoneNumber: "+528123462787" },
          messages: [],
        }));
        setChatData(formattedChats);
      };
      loadClients();
    }, []);

    const renderItem = useCallback(
      ({ item }: { item: Chat }) => (
        <TouchableOpacity
          style={[
            styles.chatItem,
            selectedChatId === item.id && styles.selectedChat,
          ]}
          onPress={() => onSelectChat(item)}
        >
          <View style={styles.chatItemContent}>
            <Image
              source={require("../../assets/images/avatar-svgrepo-com.png")}
              style={styles.avatar}
            />
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage}>{item.message}</Text>
            </View>
            <Text style={styles.chatTime}>{item.time}</Text>
          </View>
        </TouchableOpacity>
      ),
      [selectedChatId, onSelectChat]
    );

    return (
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.chatList}
      />
    );
  }
);

export default function ChatTabView({
  onSelectChat,
  selectedChatId,
}: {
  onSelectChat: (chat: Chat) => void;
  selectedChatId: string | null;
}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "chats", title: "Chats" },
    { key: "history", title: "Historial" },
  ]);

  const renderScene = useCallback(
    ({ route }: any) => {
      switch (route.key) {
        case "chats":
        case "history":
          return (
            <ChatsTab
              onSelectChat={onSelectChat}
              selectedChatId={selectedChatId}
            />
          );
        default:
          return null;
      }
    },
    [onSelectChat, selectedChatId]
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderIcon={({ route, color }) =>
            route.key === "chats" ? (
              <Ionicons name="chatbubble-outline" size={20} color={color} />
            ) : (
              <Ionicons name="time-outline" size={20} color={color} />
            )
          }
          indicatorStyle={{ backgroundColor: "#4CAF50" }}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  chatList: {
    paddingHorizontal: 10,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  chatItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
    justifyContent: "center",
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  chatMessage: {
    fontSize: 14,
    color: "#666",
  },
  chatTime: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
  selectedChat: {
    backgroundColor: "#e0f2f1",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  tabBar: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  tabLabel: {
    color: "#333",
    fontWeight: "bold",
  },
});
