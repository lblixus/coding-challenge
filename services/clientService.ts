// clientService.ts
import axios from "axios";

const API_URL_BASE =
  "https://sellia-files.s3.us-east-2.amazonaws.com/challenge";

export const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL_BASE}/clients.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
};

export const getMessages = async (clientId: string) => {
  try {
    const response = await axios.get(`${API_URL_BASE}/${clientId}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching messages for client ${clientId}:`, error);
    return [];
  }
};
