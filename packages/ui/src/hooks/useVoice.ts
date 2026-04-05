import { useCallback, useRef, useState } from "react";

// ── Fix: declare the missing global types ────────────────────────────────────
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start(): void;
  stop(): void;
}

interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

function getSpeechRecognition(): ISpeechRecognitionConstructor | undefined {
  if (typeof window === "undefined") return undefined;
  return (
    (window as unknown as { SpeechRecognition?: ISpeechRecognitionConstructor })
      .SpeechRecognition ??
    (
      window as unknown as {
        webkitSpeechRecognition?: ISpeechRecognitionConstructor;
      }
    ).webkitSpeechRecognition
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export function useVoice(onTranscript: (text: string) => void) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const startListening = useCallback(() => {
    const SpeechRecognitionAPI = getSpeechRecognition();
    if (!SpeechRecognitionAPI) {
      alert("Voice input not supported in this browser. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      onTranscript(transcript);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [onTranscript]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  return {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}
