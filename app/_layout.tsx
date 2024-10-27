import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider, useSelector } from "react-redux";
import "../config/i18n";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import queryClient from "@/services/queryClient";
import AppWrapper from "@/store/AppWrapper";
import store, { RootState } from "@/store/store";
import { Image, Text, View, Platform, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLogout } from "@/hooks/useLogout";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <StackWithCustomHeader />
            <AppWrapper />
          </SafeAreaProvider>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

function StackWithCustomHeader() {
  const handleLogout = useLogout();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Stack
      screenOptions={{
        headerShown: !!user,
        headerStyle: {
          backgroundColor:
            Platform.OS === "ios" || Platform.OS === "android"
              ? "#4A90E2"
              : "#fff",
        },
        headerTitle: () =>
          Platform.OS === "web" ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("@/assets/images/svgviewer-png-output.png")}
                style={{
                  height: 40,
                  width: 160,
                  resizeMode: "contain",
                  alignSelf: "flex-start",
                }}
              />
            </View>
          ) : (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#ffffff",
                letterSpacing: 0.5,
                padding: 8,
              }}
            >
              HeyCenter WhatsChat
            </Text>
          ),
        headerRight: () =>
          Platform.OS === "web" &&
          user && (
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 15,
                backgroundColor: "#0a7ea4",
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                marginRight: 15,
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  marginLeft: 8,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          ),
        headerTitleAlign: "left",
      }}
    >
      {Platform.OS === "web" || user ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="auth/login" />
      )}
    </Stack>
  );
}
