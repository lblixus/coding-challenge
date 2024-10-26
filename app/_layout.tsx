import { Stack } from "expo-router";

import { QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";

import "../config/i18n";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import queryClient from "@/services/queryClient";
import AppWrapper from "@/store/AppWrapper";
import store from "@/store/store";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <AppWrapper />
          </SafeAreaProvider>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
