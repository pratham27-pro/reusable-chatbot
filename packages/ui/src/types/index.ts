export interface ChatBotProps {
  apiEndpoint: string;
  botName?: string;
  botAvatar?: string;
  buttonColor?: string;
  floatPosition?: "bottom-right" | "bottom-left";
  systemPrompt?: string;
  welcomeMessage?: string;
  theme?: "light" | "dark";
  knowledgeBaseEnabled?: boolean;
  placeholder?: string;
  width?: number;
  height?: number;
}

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}
