const props = [
  {
    name: "apiEndpoint",
    type: "string",
    required: true,
    default: "—",
    desc: "URL of your RAG server",
  },
  {
    name: "botName",
    type: "string",
    required: false,
    default: '"Assistant"',
    desc: "Name shown in chat header",
  },
  {
    name: "botAvatar",
    type: "string",
    required: false,
    default: "Robot icon",
    desc: "URL to custom avatar image",
  },
  {
    name: "buttonColor",
    type: "string",
    required: false,
    default: '"#6366f1"',
    desc: "FAB button and header color (any CSS color)",
  },
  {
    name: "theme",
    type: '"light" | "dark"',
    required: false,
    default: '"light"',
    desc: "Color scheme of the chat window",
  },
  {
    name: "welcomeMessage",
    type: "string",
    required: false,
    default: '"Hi! How can I help?"',
    desc: "First message shown before any chat",
  },
  {
    name: "systemPrompt",
    type: "string",
    required: false,
    default: '"You are a helpful assistant."',
    desc: "Instructions sent to the LLM on every request",
  },
  {
    name: "placeholder",
    type: "string",
    required: false,
    default: '"Type a message..."',
    desc: "Input field placeholder text",
  },
  {
    name: "floatPosition",
    type: '"bottom-right" | "bottom-left"',
    required: false,
    default: '"bottom-right"',
    desc: "Initial position of the FAB button",
  },
  {
    name: "knowledgeBaseEnabled",
    type: "boolean",
    required: false,
    default: "false",
    desc: "Show PDF/DOCX upload button in the chat",
  },
  {
    name: "enableVoice",
    type: "boolean",
    required: false,
    default: "false",
    desc: "Enable microphone input and text-to-speech output",
  },
  {
    name: "persistHistory",
    type: "boolean",
    required: false,
    default: "true",
    desc: "Save chat history to localStorage across sessions",
  },
];

export function PropsTable() {
  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Prop
            </th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium">
              Type
            </th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium hidden md:table-cell">
              Default
            </th>
            <th className="text-left px-4 py-3 text-gray-400 font-medium hidden lg:table-cell">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr
              key={p.name}
              className={`border-b border-white/5 ${i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}
            >
              <td className="px-4 py-3">
                <code className="text-indigo-400 font-mono">{p.name}</code>
                {p.required && (
                  <span className="ml-2 text-[10px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded-full">
                    required
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <code className="text-emerald-400 font-mono text-xs">
                  {p.type}
                </code>
              </td>
              <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell font-mono">
                {p.default}
              </td>
              <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
                {p.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
