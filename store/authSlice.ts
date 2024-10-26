import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppThunk } from "./store";
import { User } from "@/types/User";
import { initialState } from "@/types/auth/AuthTypes";

const setUserInStorage = async (user: User, token: string) => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify(user));
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error al guardar el usuario en el store", error);
  }
};

const removeUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("userInfo");
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error al eliminar el usuario del store", error);
  }
};

const getUserFromStorage = async (): Promise<{
  user: User | null;
  token: string | null;
}> => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    const token = await AsyncStorage.getItem("authToken");
    return { user: userInfo ? JSON.parse(userInfo) : null, token };
  } catch (error) {
    console.error("Error al cargar el usuario desde el store", error);
    return { user: null, token: null };
  }
};

export const loadUser = (): AppThunk => async (dispatch) => {
  const { user, token } = await getUserFromStorage();

  if (user && token) {
    dispatch(loginAction({ user, token }));
  } else {
    dispatch(setLoading(false));
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.loading = false;
      setUserInStorage(user, token);
    },
    logoutAction: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      removeUserFromStorage();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { loginAction, logoutAction, setLoading } = authSlice.actions;
export default authSlice.reducer;
