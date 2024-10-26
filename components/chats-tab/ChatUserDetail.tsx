import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "@/types/User";

const UserDetails = ({ user }: { user: User }) => {
  const [note, setNote] = useState("");
  const { width } = useWindowDimensions();

  const handleSaveNote = () => {
    Alert.alert("Nota guardada", `Nota: ${note}`);
    setNote("");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { padding: width < 400 ? 12 : 20 }]}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/avatar-svgrepo-com.png")}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text
              style={styles.userName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user.name}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.mediaButton, { width: width < 400 ? "100%" : "70%" }]}
        >
          <View style={styles.mediaIconContainer}>
            <Ionicons name="image-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.mediaButtonText}>Media</Text>
          <View style={styles.mediaBadge}>
            <Text style={styles.mediaCount}>0</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.additionalInfo}>
          <Text style={styles.infoLabel}>Última incidencia reportada:</Text>
          <Text style={styles.infoValue}>25/10/2024</Text>

          <Text style={styles.infoLabel}>Tipo de incidencia:</Text>
          <Text style={styles.infoValue}>Soporte técnico</Text>

          <Text style={styles.infoLabel}>Prioridad:</Text>
          <Text style={[styles.infoValue, styles.priorityHigh]}>Alta</Text>

          <Text style={styles.infoLabel}>Notas sobre el caso:</Text>
          <Text style={styles.notes}>
            Cliente reportó fallos intermitentes en la aplicación móvil, aún en
            revisión por parte del equipo de desarrollo.
          </Text>
        </View>

        {/* Sección para agregar notas */}
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Agregar Nota:</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Escribe una nota..."
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
            <Text style={styles.saveButtonText}>Guardar Nota</Text>
          </TouchableOpacity>
        </View>

        {/* Acciones */}
        <View
          style={[
            styles.actions,
            { flexDirection: width < 400 ? "column" : "row" },
          ]}
        >
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="close-circle-outline" size={30} color="#ff5e5e" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons
              name="checkmark-circle-outline"
              size={30}
              color="#5ed17c"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons
              name="swap-horizontal-outline"
              size={30}
              color="#5eafff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  mediaIconContainer: {
    backgroundColor: "#3D5AFE",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  mediaButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    justifyContent: "center",
    width: "100%",
    elevation: 5,
  },
  mediaButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },

  spacer: {
    flex: 1,
  },
  mediaBadge: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  mediaCount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4A90E2",
  },
  additionalInfo: {
    marginTop: 20,
    width: "100%",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
    marginTop: 10,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  priorityHigh: {
    color: "#ff5e5e",
  },
  notes: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginTop: 4,
  },
  notesSection: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  notesTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontWeight: "bold",
  },
  noteInput: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  actions: {
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  actionButton: {
    padding: 10,
    alignItems: "center",
  },
});

export default UserDetails;
