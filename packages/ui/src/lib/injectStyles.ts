let injected = false;

export function injectStyles(css: string) {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const style = document.createElement("style");
  style.setAttribute("data-chatbot-rag", "");
  style.textContent = css;
  document.head.appendChild(style);
}
