import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { chatWithAI } from "../services/api";
import { colors, radius } from "../components/theme";

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
  const quickPrompts = [
    "Cheapest Delhi to Mumbai flight",
    "Morning flights from Delhi",
    "How can I book a ticket?",
  ];

  const toChatHistory = (items) =>
    items
      .filter((item) => item.id !== "welcome")
      .map((item) => ({
        role: item.sender === "user" ? "user" : "assistant",
        content: item.text,
      }));

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
      const history = toChatHistory(messages);
      const response = await chatWithAI(trimmedMessage, history);
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

  const handleQuickPrompt = (prompt) => {
    setMessage(prompt);
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Chat Assistant</Text>
          <Text style={styles.subtitle}>Ask routes, prices, and cheapest options instantly.</Text>
          <View style={styles.promptRow}>
            {quickPrompts.map((prompt) => (
              <Pressable key={prompt} style={styles.promptChip} onPress={() => handleQuickPrompt(prompt)}>
                <Text style={styles.promptText}>{prompt}</Text>
              </Pressable>
            ))}
          </View>
        </View>

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
            <ActivityIndicator size="small" color={colors.success} />
            <Text style={styles.loadingText}>AI is typing...</Text>
          </View>
        ) : null}

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor={colors.textMuted}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 6,
  },
  header: {
    paddingHorizontal: 14,
    paddingBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 13,
  },
  promptRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  promptChip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  promptText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: "600",
  },
  chatList: {
    paddingHorizontal: 14,
    paddingBottom: 10,
    gap: 9,
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
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: colors.primaryDark,
    borderBottomRightRadius: 2,
  },
  aiBubble: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
  userMessageText: {
    color: colors.surface,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 110,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: colors.surfaceSoft,
  },
  sendButton: {
    backgroundColor: colors.success,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  sendButtonDisabled: {
    backgroundColor: "#a7e3c5",
  },
  sendText: {
    color: colors.surface,
    fontWeight: "700",
  },
});

export default ChatScreen;
