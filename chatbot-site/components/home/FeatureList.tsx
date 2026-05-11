import { FileText, Github, Mic, Moon, Puzzle, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Zero Config",
    desc: "One prop required. Drop it in and it works.",
  },
  {
    icon: FileText,
    title: "RAG Knowledge Base",
    desc: "Upload text files — bot answers from them.",
  },
  {
    icon: Mic,
    title: "Voice Support",
    desc: "Speak to your bot. Hear it speak back. Web Speech API.",
  },
  { icon: Moon, title: "Light & Dark", desc: "Theme prop. Matches any app." },
  {
    icon: Puzzle,
    title: "Draggable",
    desc: "Users can move the chat button anywhere on screen.",
  },
  {
    icon: Github,
    title: "100% Free",
    desc: "No credit card. No paid tier. Groq + ChromaDB.",
  },
];

export function FeatureList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3 group-hover:bg-indigo-500/30 transition-colors">
            <Icon size={20} className="text-indigo-400" />
          </div>
          <h3 className="font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  );
}
