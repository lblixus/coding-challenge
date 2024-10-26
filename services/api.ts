// import axios from "axios";
// import { User } from "@/types/User";

// // URL de la API
// const API_URL =
//   "https://sellia-files.s3.us-east-2.amazonaws.com/challenge/clients.json";
// const BASE_URL = "https://sellia-files.s3.us-east-2.amazonaws.com/challenge";

// interface LoginResponse {
//   token: string;
//   user: User;
// }

// export const loginUser = async (user: any): Promise<LoginResponse> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (user.email === "testuser@email.com" && user.password === "testpass") {
//         resolve({
//           token: "fake-jwt-token",
//           user: {
//             id: 1,
//             username: "testuser",
//             name: "Test User",
//             email: "testuser@email.com",
//           },
//         });
//       } else {
//         reject(new Error("Invalid credentials"));
//       }
//     }, 1000);
//   });
// };

// export const getClients = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching clients:", error);
//     return [];
//   }
// };

// export const getMessages = async (clientId: string) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/${clientId}.json`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching messages for client ${clientId}:`, error);
//     return [];
//   }
// };
