import { FileText, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";

interface Props {
  apiEndpoint?: string;
  theme: "light" | "dark";
  collectionId?: string;
}

export function DocUploader({
  apiEndpoint,
  theme,
  collectionId = "default",
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "timeout" | "invalid" | "toobig"
  >("idle");
  const dark = theme === "dark";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    // reset input so same file can be re-selected after rejection
    e.target.value = "";

    if (!selected) return;

    if (!selected.name.endsWith(".txt")) {
      setFile(null);
      setStatus("invalid");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    if (selected.size > 2 * 1024 * 1024) {
      setFile(null);
      setStatus("toobig");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setFile(selected);
    setStatus("idle");
  };

  const handleUpload = async () => {
    if (!file || !apiEndpoint) {
      setStatus("error");
      return;
    }

    setUploading(true);
    setStatus("idle");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("collection_id", collectionId);

      const res = await fetch(`${apiEndpoint}/upload-doc`, {
        method: "POST",
        body: form,
        signal: controller.signal,
      });

      clearTimeout(timeout);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setStatus("success");
      setFile(null);
    } catch (err) {
      clearTimeout(timeout);
      setStatus((err as Error).name === "AbortError" ? "timeout" : "error");
    } finally {
      setUploading(false);
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  // status message config
  const statusMsg: Record<string, { text: string; color: string }> = {
    success: { text: "✓ Uploaded!", color: "text-green-500" },
    error: { text: "✗ Upload failed", color: "text-red-500" },
    timeout: { text: "⏱ Timed out — try again", color: "text-yellow-500" },
    invalid: { text: "✗ Only .txt files are supported", color: "text-red-400" },
    toobig: { text: "✗ File too large (max 2MB)", color: "text-red-400" },
  };

  return (
    <div
      className={cn(
        "px-3 py-2 border-t flex items-center gap-2 text-xs flex-wrap",
        dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50",
      )}
    >
      <label className="cursor-pointer flex items-center gap-1 text-indigo-500 hover:text-indigo-700 transition-colors shrink-0">
        <FileText size={14} />
        <span>Attach .txt</span>
        <input
          type="file"
          accept=".txt"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* File selected state */}
      {file && status === "idle" && (
        <>
          <span
            className={cn(
              "truncate max-w-25",
              dark ? "text-gray-300" : "text-gray-600",
            )}
          >
            {file.name}
          </span>
          <button
            onClick={() => setFile(null)}
            className="text-gray-400 hover:text-gray-600 border-0 bg-transparent cursor-pointer"
          >
            <X size={12} />
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="ml-auto flex items-center gap-1 bg-indigo-500 text-white px-2 py-1 rounded-md hover:bg-indigo-600 transition-colors disabled:opacity-50 border-0 cursor-pointer text-xs shrink-0"
          >
            <UploadCloud size={12} />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}

      {/* Status messages */}
      {status !== "idle" && statusMsg[status] && (
        <span className={cn("ml-auto shrink-0", statusMsg[status].color)}>
          {statusMsg[status].text}
        </span>
      )}
    </div>
  );
}
