import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  BackHandler,
  Image,
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

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

export default function Login() {
  const dispatch = useDispatch();

  const mutation = useMutation<LoginResponse, unknown, LoginValues>({
    mutationFn: loginUser,
    mutationKey: ["login"],
  });

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const backAction = () => {
      if (!user) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image
          source={require("")}
          style={styles.logo}
          resizeMode="contain"
        /> */}
      </View>
      <Formik
        initialValues={{
          email: "testuser@email.com",
          password: "testpass",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          mutation
            .mutateAsync(values)
            .then((data) => {
              dispatch(loginAction(data));
              setSubmitting(false);
            })
            .catch((err) => {
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
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              placeholderTextColor="#a1a1a1"
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              placeholderTextColor="#a1a1a1"
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              <Ionicons
                name="log-in-outline"
                size={24}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>
                {isSubmitting ? "Loading..." : "Login"}
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
    width: 250,
    height: 250,
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
    backgroundColor: "#90151A",
    borderRadius: 12,
    marginTop: 16,
    paddingHorizontal: 20,
    shadowColor: "#50151A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
});
