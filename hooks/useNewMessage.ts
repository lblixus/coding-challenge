import { useState } from "react";

const useNewMessage = (onSendMessage: (message: string) => void) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return { newMessage, setNewMessage, handleSendMessage };
};

export default useNewMessage;
