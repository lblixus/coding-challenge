import { Tabs, useRouter } from "expo-router";
import React, { useState, Dispatch, SetStateAction } from "react";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface SidebarProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const router = useRouter();
  const activeColor = Colors.light.tint;
  const inactiveColor = "#A9A9A9";

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity
        style={styles.sidebarButton}
        onPress={() => {
          setActiveTab("Chat");
          router.push("/");
        }}
      >
        <FontAwesome
          name="comments"
          size={24}
          color={activeTab === "Chat" ? activeColor : inactiveColor}
        />
        <Text
          style={[
            styles.sidebarText,
            { color: activeTab === "Chat" ? activeColor : inactiveColor },
          ]}
        >
          Chat
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sidebarButton}
        onPress={() => {
          setActiveTab("Profile");
          router.push("/profile");
        }}
      >
        <FontAwesome
          name="user"
          size={24}
          color={activeTab === "Profile" ? activeColor : inactiveColor}
        />
        <Text
          style={[
            styles.sidebarText,
            { color: activeTab === "Profile" ? activeColor : inactiveColor },
          ]}
        >
          Mi Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? "light"].tint;
  const inactiveColor = "#A9A9A9";
  const [activeTab, setActiveTab] = useState<string>("Chat");

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <View style={styles.contentContainer}>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: activeColor,
              tabBarInactiveTintColor: inactiveColor,
              tabBarStyle: { display: "none" },
              headerShown: false,
            }}
          >
            <Tabs.Screen name="index" options={{ title: "Chat" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }} />
          </Tabs>
        </View>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#0a7ea4" : inactiveColor,
                fontSize: 12,
              }}
            >
              Chat
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="comments"
              size={30}
              color={focused ? "#0a7ea4" : inactiveColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#0a7ea4" : inactiveColor,
                fontSize: 12,
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="user"
              size={30}
              color={focused ? "#0a7ea4" : inactiveColor}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flexDirection: "row",
    flex: 1,
  },
  sidebar: {
    width: 80,
    backgroundColor: "#fff",
    paddingVertical: 20,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  sidebarButton: {
    alignItems: "center",
    marginVertical: 15,
  },
  sidebarText: {
    marginTop: 5,
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
  },
});
