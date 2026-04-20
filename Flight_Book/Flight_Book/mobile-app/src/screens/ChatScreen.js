import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { chatWithAI } from "../services/api";

const ChatScreen = () => {
  const listRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      text: "Hi! Ask me about flights, for example: Find cheapest flight from Delhi to Mumbai.",
      sender: "ai",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const extractAIText = (apiResponse) => {
    const payload = apiResponse?.data || apiResponse;

    if (payload?.response) return payload.response;
    if (payload?.message && payload?.intent !== "find_cheapest_flight") return payload.message;

    return JSON.stringify(payload, null, 2);
  };

  const handleSend = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      text: trimmedMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      setLoading(true);
      const response = await chatWithAI(trimmedMessage);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        text: extractAIText(response),
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: `err-${Date.now()}`,
        text: `Error: ${error.message}`,
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === "user";

    return (
      <View style={[styles.messageRow, isUser ? styles.userRow : styles.aiRow]}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <Text style={styles.title}>Chat Assistant</Text>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatList}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color="#16a34a" />
          <Text style={styles.loadingText}>AI is typing...</Text>
        </View>
      ) : null}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, (!message.trim() || loading) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim() || loading}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingTop: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  chatList: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
  },
  messageRow: {
    width: "100%",
    marginBottom: 6,
  },
  userRow: {
    alignItems: "flex-end",
  },
  aiRow: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "82%",
    borderRadius: 10,
    padding: 10,
  },
  userBubble: {
    backgroundColor: "#2563eb",
    borderBottomRightRadius: 2,
  },
  aiBubble: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#111827",
  },
  userMessageText: {
    color: "#ffffff",
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  loadingText: {
    color: "#4b5563",
    fontSize: 13,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 110,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#16a34a",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default ChatScreen;
