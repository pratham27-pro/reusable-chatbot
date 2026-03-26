export interface Config {
  botName: string;
  buttonColor: string;
  theme: "light" | "dark";
  welcomeMessage: string;
  systemPrompt: string;
  floatPosition: "bottom-right" | "bottom-left";
  placeholder: string;
}

export const DEFAULT: Config = {
  botName: "Assistant",
  buttonColor: "#6366f1",
  theme: "dark",
  welcomeMessage: "Hi! How can I help you today?",
  systemPrompt: "You are a helpful assistant.",
  floatPosition: "bottom-right",
  placeholder: "Type a message...",
};

export const PRESETS: {
  label: string;
  emoji: string;
  config: Partial<Config>;
}[] = [
  {
    label: "Minimal",
    emoji: "◻️",
    config: {
      botName: "Ash",
      buttonColor: "#18181b",
      theme: "light",
      welcomeMessage: "Hello. How can I assist you?",
      systemPrompt:
        "You are a concise, precise assistant. Answer directly, skip filler phrases.",
      placeholder: "Ask me anything...",
    },
  },
  {
    label: "Dev Tool",
    emoji: "⚡",
    config: {
      botName: "Volt",
      buttonColor: "#8b5cf6",
      theme: "dark",
      welcomeMessage: "Hey dev 👋 What are you building?",
      systemPrompt:
        "You are an expert coding assistant. Prefer code examples. Ask clarifying questions if the problem is ambiguous.",
      placeholder: "Ask about code, bugs, or architecture...",
    },
  },
  {
    label: "Support",
    emoji: "💬",
    config: {
      botName: "Nexus",
      buttonColor: "#0ea5e9",
      theme: "light",
      welcomeMessage: "Hi! How can our support team help you today?",
      systemPrompt:
        "You are a professional customer support assistant. Be polite, solution-focused, and escalate if needed.",
      placeholder: "Describe your issue...",
    },
  },
  {
    label: "Wellness",
    emoji: "🌿",
    config: {
      botName: "Sage",
      buttonColor: "#10b981",
      theme: "light",
      welcomeMessage: "Welcome! I'm here to support you 🌿",
      systemPrompt:
        "You are a warm wellness assistant. Speak gently. Always recommend a healthcare provider for serious concerns.",
      placeholder: "How are you feeling today?",
    },
  },
  {
    label: "Playful",
    emoji: "✨",
    config: {
      botName: "Luna",
      buttonColor: "#ec4899",
      theme: "light",
      welcomeMessage: "Heyy! ✨ I'm Luna — what can I do for you?",
      systemPrompt:
        "You are Luna, a fun shopping assistant. Help find products, answer shipping questions, use light emojis.",
      placeholder: "What are you looking for?",
    },
  },
];

// Shared hex → rgba helper
export function makeAccent(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (a: number) => `rgba(${r},${g},${b},${a})`;
}
