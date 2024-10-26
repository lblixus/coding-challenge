import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./authSlice";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { RootState, AppDispatch } from "./store";

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" />
  </View>
);

const AppWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const router = useRouter();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      router.replace(user ? "/" : "/(auth)/login");
    }
  }, [user, loading, router]);

  if (loading) return <Loader />;

  return null;
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(AppWrapper);
