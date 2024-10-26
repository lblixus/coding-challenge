import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import "../config/i18n";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import queryClient from "@/services/queryClient";
import AppWrapper from "@/store/AppWrapper";
import store from "@/store/store";
import { Image, Text, View, Platform } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <Stack
              screenOptions={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTitle: () =>
                  Platform.OS === "web" ? (
                    <Image
                      source={require("@/assets/images/svgviewer-png-output.png")}
                      style={{
                        height: 40,
                        width: 160,
                        resizeMode: "contain",
                        alignSelf: "flex-start",
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      HeyCenter WhatsChat
                    </Text>
                  ),
                headerTitleAlign: "left",
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="auth/login" />
              <Stack.Screen name="index" />
            </Stack>

            <AppWrapper />
          </SafeAreaProvider>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
