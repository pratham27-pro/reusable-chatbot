export interface Theme {
  id: string;
  name: string;
  description: string;
  props: {
    botName: string;
    buttonColor: string;
    theme: "light" | "dark";
    welcomeMessage: string;
    systemPrompt: string;
  };
  tags: string[];
  previewBg: string; // background color for the preview card
}

export const themes: Theme[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean black and white. Works with any design system.",
    props: {
      botName: "Assistant",
      buttonColor: "#18181b",
      theme: "light",
      welcomeMessage: "Hello. How can I assist you?",
      systemPrompt: "You are a helpful, concise assistant.",
    },
    tags: ["minimal", "clean", "professional"],
    previewBg: "#fafafa",
  },
  {
    id: "corporate",
    name: "Corporate Blue",
    description: "Professional SaaS look. Perfect for B2B products.",
    props: {
      botName: "Support",
      buttonColor: "#0ea5e9",
      theme: "light",
      welcomeMessage: "Hi! How can our support team help you today?",
      systemPrompt: "You are a professional customer support assistant.",
    },
    tags: ["corporate", "saas", "support"],
    previewBg: "#f0f9ff",
  },
  {
    id: "dark-pro",
    name: "Dark Pro",
    description: "For developer tools and dark-themed dashboards.",
    props: {
      botName: "AI",
      buttonColor: "#8b5cf6",
      theme: "dark",
      welcomeMessage: "Hey dev 👋 What are you building today?",
      systemPrompt: "You are a helpful coding assistant.",
    },
    tags: ["dark", "developer", "dashboard"],
    previewBg: "#0f0f17",
  },
  {
    id: "green-nature",
    name: "Green Nature",
    description: "Calm and friendly. Great for health and wellness apps.",
    props: {
      botName: "Helper",
      buttonColor: "#10b981",
      theme: "light",
      welcomeMessage: "Welcome! I'm here to help you today 🌿",
      systemPrompt: "You are a warm and supportive assistant.",
    },
    tags: ["green", "health", "friendly"],
    previewBg: "#f0fdf4",
  },
  {
    id: "warm-sunset",
    name: "Warm Sunset",
    description: "Bold and energetic. Great for creative and lifestyle brands.",
    props: {
      botName: "Buddy",
      buttonColor: "#f97316",
      theme: "dark",
      welcomeMessage: "Hey there! What's on your mind? 🔥",
      systemPrompt: "You are a fun, energetic assistant.",
    },
    tags: ["warm", "creative", "lifestyle"],
    previewBg: "#1a0f00",
  },
  {
    id: "playful",
    name: "Playful Pink",
    description: "Fun and vibrant. Perfect for consumer apps and games.",
    props: {
      botName: "Luna",
      buttonColor: "#ec4899",
      theme: "light",
      welcomeMessage: "Heyy! ✨ I'm Luna, what can I do for you?",
      systemPrompt: "You are a fun, playful and friendly assistant.",
    },
    tags: ["playful", "fun", "consumer"],
    previewBg: "#fdf2f8",
  },
];
