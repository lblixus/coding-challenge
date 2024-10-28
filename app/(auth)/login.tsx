import React, { useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  BackHandler,
  Image,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "@/store/store";
import { loginAction } from "@/store/authSlice";
import { LoginResponse, LoginValues } from "@/types/auth/AuthTypes";
import { loginUser } from "@/services/authService";
import { Colors } from "@/constants/Colors";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalido").required("Requerido"),
  password: Yup.string().min(6, "muy corto !").required("Requerido"),
});

export default function Login() {
  const dispatch = useDispatch();
  const mutation = useMutation<LoginResponse, unknown, LoginValues>({
    mutationFn: loginUser,
    mutationKey: ["login"],
  });
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const backAction = () => !user;
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [user]);

  const isMobile = Platform.OS !== "web";

  return (
    <View
      className={
        isMobile
          ? "flex-1 justify-center items-center px-6 bg-gray-100 relative"
          : null
      }
      style={!isMobile ? [styles.container, { position: "relative" }] : null}
    >
      <View style={styles.backgroundDecoration1} />
      <View style={styles.backgroundDecoration2} />

      <View
        className={isMobile ? "mb-8 flex items-center" : null}
        style={!isMobile ? styles.logoContainer : null}
      >
        <Image
          source={require("../../assets/images/svgviewer-png-output.png")}
          className={isMobile ? "w-48 h-48 mb-4" : null}
          style={!isMobile ? styles.logo : null}
          resizeMode="contain"
        />
        <Text
          className={isMobile ? "text-2xl font-bold text-[#5dade2] mb-1" : null}
          style={!isMobile ? styles.title : null}
        >
          Bienvenido a SelliaConnect
        </Text>
        <View style={styles.titleUnderline} />
        <Text
          className={isMobile ? "text-sm text-gray-500 mb-4" : null}
          style={!isMobile ? styles.subtitle : null}
        >
          Por favor, inicia sesión para continuar.
        </Text>
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          mutation
            .mutateAsync(values)
            .then((data) => {
              dispatch(loginAction(data));
              setSubmitting(false);
            })
            .catch(() => {
              setErrors({ email: "Invalid credentials" });
              setSubmitting(false);
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View
            className={isMobile ? "w-full max-w-md" : null}
            style={!isMobile ? styles.form : null}
          >
            <TextInput
              className={
                isMobile
                  ? "h-14 border border-gray-300 rounded-lg px-4 mb-3 bg-white text-base shadow-md focus:border-[#5dade2]"
                  : null
              }
              style={!isMobile ? styles.input : null}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              placeholderTextColor="#a1a1a1"
            />
            {errors.email && touched.email && (
              <Text
                className={isMobile ? "text-red-600 text-sm mb-2" : null}
                style={!isMobile ? styles.errorText : null}
              >
                {errors.email}
              </Text>
            )}
            <TextInput
              className={
                isMobile
                  ? "h-14 border border-gray-300 rounded-lg px-4 mb-3 bg-white text-base shadow-md focus:border-[#5dade2]"
                  : null
              }
              style={!isMobile ? styles.input : null}
              placeholder="Contraseña"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              placeholderTextColor="#a1a1a1"
            />
            {errors.password && touched.password && (
              <Text
                className={isMobile ? "text-red-600 text-sm mb-2" : null}
                style={!isMobile ? styles.errorText : null}
              >
                {errors.password}
              </Text>
            )}
            <TouchableOpacity
              className={`h-14 flex-row items-center justify-center rounded-lg mt-6 px-5 shadow-lg ${
                isSubmitting ? "opacity-50" : ""
              }`}
              style={[
                !isMobile ? styles.button : null,
                {
                  backgroundColor: isMobile
                    ? Colors.light.tint
                    : Colors.light.tint,
                },
              ]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.light.background}
                />
              ) : (
                <Ionicons
                  name="log-in-outline"
                  size={24}
                  color={Colors.light.background}
                />
              )}
              <Text
                className={
                  isMobile
                    ? "text-white text-lg font-semibold ml-3 uppercase tracking-wide"
                    : null
                }
                style={[
                  !isMobile ? styles.buttonText : null,
                  { color: Colors.light.buttonText },
                ]}
              >
                {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5dade2",
    marginBottom: 5,
    textAlign: "center",
  },
  titleUnderline: {
    width: 50,
    height: 4,
    backgroundColor: "#4CAF50",
    marginTop: 4,
    marginBottom: 12,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  input: {
    height: 55,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#5dade2",
    borderRadius: 12,
    marginTop: 16,
    paddingHorizontal: 20,
    shadowColor: "#50151A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginLeft: 10,
  },
  backgroundDecoration1: {
    position: "absolute",
    width: 150,
    height: 150,
    backgroundColor: "#e0f7fa",
    borderRadius: 75,
    top: -30,
    left: -30,
  },
  backgroundDecoration2: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "#f3e5f5",
    borderRadius: 50,
    bottom: -20,
    right: -20,
  },
});
