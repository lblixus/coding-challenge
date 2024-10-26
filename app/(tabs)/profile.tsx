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

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutAction());
    router.replace("/login");
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <View
          style={[
            styles.profileContainer,
            Platform.OS === "web" && styles.webContainer,
          ]}
        >
          <Image
            source={require("../../assets/images/avatar-svgrepo-com.png")}
            style={styles.avatar}
          />
          <Text style={styles.title}>¡Hola, Luis!</Text>
          <Text style={styles.subtitle}>
            Bienvenido de nuevo, gestiona tus ajustes de cuenta aquí.
          </Text>

          <View style={styles.profileInfo}>
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Información del perfil</Text>
              <Text style={styles.infoText}>
                Aquí puedes revisar y actualizar tu información personal.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Cerrar sesión</Text>
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
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
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
    backgroundColor: "#e5e7eb",
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginVertical: 8,
  },
  profileInfo: {
    marginTop: 32,
    width: "100%",
  },
  infoBox: {
    backgroundColor: "#f1f5f9",
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
    color: "#374151",
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 6,
  },
  logoutButton: {
    backgroundColor: "#0a7ea4",
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
    color: "#ffffff",
    fontWeight: "700",
  },
});

export default Profile;
