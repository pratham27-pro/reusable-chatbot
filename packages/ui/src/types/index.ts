export interface ChatBotProps {
  apiEndpoint?: string;
  apiKey?: string;
  botName?: string;
  botAvatar?: string;
  buttonColor?: string;
  floatPosition?: "bottom-right" | "bottom-left";
  systemPrompt?: string;
  welcomeMessage?: string;
  theme?: "light" | "dark";
  knowledgeBaseEnabled?: boolean;
  collectionId?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  enableVoice?: boolean;
  persistHistory?: boolean;
}

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}
