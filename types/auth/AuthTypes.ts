import { User } from "@/types/User";
import { ReactNode } from "react";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
};

export interface ProtectedRouteProps {
  children: ReactNode;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginValues {
  email: string;
  password: string;
}
