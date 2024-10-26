// authService.ts
import { User } from "@/types/User";

export interface LoginResponse {
  token: string;
  user: User;
}

export const loginUser = async (user: any): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user.email === "testuser@email.com" && user.password === "testpass") {
        resolve({
          token: "fake-jwt-token",
          user: {
            id: 1,
            username: "testuser",
            name: "Test User",
            email: "testuser@email.com",
          },
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};
