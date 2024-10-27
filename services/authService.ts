import { User } from "@/types/User";

export interface LoginResponse {
  token: string;
  user: User;
}

export const loginUser = async (user: any): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const email = user.email.toLowerCase();

      if (email === "testuser@email.com" && user.password === "testpass") {
        resolve({
          token: "fake-jwt-token",
          user: {
            id: 1,
            username: "testuser",
            name: "Luis Tester - QA #0001263 ",
            email: "testuser@email.com",
          },
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};
