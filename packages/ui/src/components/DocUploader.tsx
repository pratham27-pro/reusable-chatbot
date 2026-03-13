import { Paperclip, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";

interface Props {
  apiEndpoint: string;
  theme: "light" | "dark";
}

export function DocUploader({ apiEndpoint, theme }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
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
        "crb-px-3 crb-py-2 crb-border-t crb-flex crb-items-center crb-gap-2 crb-text-xs",
        theme === "dark"
          ? "crb-border-gray-700 crb-bg-gray-800"
          : "crb-border-gray-200 crb-bg-gray-50",
      )}
    >
      <label className="crb-cursor-pointer crb-flex crb-items-center crb-gap-1 crb-text-indigo-500 hover:crb-text-indigo-700 crb-transition-colors">
        <Paperclip size={14} />
        <span>Attach PDF/DOCX</span>
        <input
          type="file"
          accept=".pdf,.docx"
          className="crb-hidden"
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
              "crb-truncate crb-max-w-[100px]",
              theme === "dark" ? "crb-text-gray-300" : "crb-text-gray-600",
            )}
          >
            {file.name}
          </span>
          <button
            onClick={() => setFile(null)}
            className="crb-text-gray-400 hover:crb-text-gray-600"
          >
            <X size={12} />
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="crb-ml-auto crb-flex crb-items-center crb-gap-1 crb-bg-indigo-500 crb-text-white crb-px-2 crb-py-1 crb-rounded-md hover:crb-bg-indigo-600 crb-transition-colors disabled:crb-opacity-50"
          >
            <UploadCloud size={12} />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}

      {status === "success" && (
        <span className="crb-ml-auto crb-text-green-500">✓ Uploaded!</span>
      )}
      {status === "error" && (
        <span className="crb-ml-auto crb-text-red-500">✗ Failed</span>
      )}
    </div>
  );
}
