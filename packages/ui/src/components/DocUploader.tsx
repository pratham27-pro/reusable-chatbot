import { Paperclip, UploadCloud, X } from "lucide-react";
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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const dark = theme === "dark";

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("collection_id", collectionId);
      const res = await fetch(`${apiEndpoint}/upload-doc`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFile(null);
    } catch {
      setStatus("error");
    } finally {
      setUploading(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div
      className={cn(
        "px-3 py-2 border-t flex items-center gap-2 text-xs",
        dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50",
      )}
    >
      <label className="cursor-pointer flex items-center gap-1 text-indigo-500 hover:text-indigo-700 transition-colors">
        <Paperclip size={14} />
        <span>Attach PDF/DOCX</span>
        <input
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setStatus("idle");
          }}
        />
      </label>
      {file && (
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
            className="ml-auto flex items-center gap-1 bg-indigo-500 text-white px-2 py-1 rounded-md hover:bg-indigo-600 transition-colors disabled:opacity-50 border-0 cursor-pointer text-xs"
          >
            <UploadCloud size={12} />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}
      {status === "success" && (
        <span className="ml-auto text-green-500">✓ Uploaded!</span>
      )}
      {status === "error" && (
        <span className="ml-auto text-red-500">✗ Failed</span>
      )}
    </div>
  );
}
