import { ThemeCard } from "@/components/themes/ThemeCard";
import { themes } from "@/lib/themes";

export default function ThemesPage() {
  return (
    <div className="pt-24 max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Theme Gallery</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Pick a theme, copy the config, paste it in. Done. All themes work with{" "}
          <code className="text-indigo-400 bg-white/5 px-1.5 py-0.5 rounded">
            apiEndpoint
          </code>{" "}
          as the only required prop.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </div>
  );
}
