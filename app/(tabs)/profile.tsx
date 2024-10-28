import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { logoutAction } from "@/store/authSlice";
import ProtectedRoute from "@/store/ProtectedRoute";
import { Colors } from "@/constants/Colors";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutAction());
    router.replace("/login");
  };

  const themeColors = Colors.light;

  return (
    <ProtectedRoute>
      <View
        style={[styles.container, { backgroundColor: themeColors.background }]}
      >
        <View
          style={[
            styles.profileContainer,
            Platform.OS === "web" && styles.webContainer,
            { backgroundColor: themeColors.background },
          ]}
        >
          <Image
            source={require("../../assets/images/avatar-svgrepo-com.png")}
            style={[styles.avatar, { backgroundColor: themeColors.icon }]}
          />
          <Text style={[styles.title, { color: themeColors.text }]}>
            ¡Hola, Luis!
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.text }]}>
            Bienvenido de nuevo, gestiona tus ajustes de cuenta aquí.
          </Text>

          <View style={styles.profileInfo}>
            <View
              style={[
                styles.infoBox,
                { backgroundColor: themeColors.background },
              ]}
            >
              <Text style={[styles.infoTitle, { color: themeColors.text }]}>
                Información del perfil
              </Text>
              <Text style={[styles.infoText, { color: themeColors.text }]}>
                Aquí puedes revisar y actualizar tu información personal.
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.logoutButton,
                { backgroundColor: themeColors.buttonBackground },
              ]}
              onPress={handleLogout}
            >
              <Text
                style={[styles.logoutText, { color: themeColors.buttonText }]}
              >
                Cerrar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    width: "100%",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    alignItems: "center",
  },
  webContainer: {
    maxWidth: 600,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
  },
  profileInfo: {
    marginTop: 32,
    width: "100%",
  },
  infoBox: {
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Profile;
