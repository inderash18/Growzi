"use client";

import { useState } from "react";
import { 
  Settings2, 
  Save, 
  Palette, 
  Upload, 
  Globe, 
  Sparkles,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";

export default function AdminSettings() {
  const { currentTenant, setCurrentTenant } = useTenantStore();

  const [name, setName] = useState(currentTenant?.name || "");
  const [logoUrl, setLogoUrl] = useState(currentTenant?.logoUrl || "");
  const [primaryColor, setPrimaryColor] = useState(currentTenant?.primaryColor || "#0f172a");
  const [secondaryColor, setSecondaryColor] = useState(currentTenant?.secondaryColor || "#3b82f6");
  const [isSaved, setIsSaved] = useState(false);

  if (!currentTenant) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updated = {
      ...currentTenant,
      name,
      logoUrl,
      primaryColor,
      secondaryColor
    };

    setCurrentTenant(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const presetSecondaryColors = [
    { name: "Blue (Default)", value: "#3b82f6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Emerald", value: "#10b981" },
    { name: "Violet", value: "#8b5cf6" },
    { name: "Rose", value: "#f43f5e" },
    { name: "Amber", value: "#f59e0b" }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in relative z-10 pb-16">
      {/* Page Header */}
      <div className="border-b border-slate-900 pb-5 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Settings2 className="h-6 w-6 text-indigo-500" style={{ color: currentTenant.secondaryColor }} />
          Branding settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Customize your workspace name, upload institutional logos, and define accent colors.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl text-emerald-400 flex items-center gap-2.5 text-xs font-semibold">
          <CheckCircle className="h-4.5 w-4.5" /> Branding updates saved and applied successfully.
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSave} className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-6 shadow-xl">
        
        {/* Workspace Name */}
        <div className="space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-900 pb-3">
            <Globe className="h-4 w-4 text-indigo-400" /> Workspace Identity
          </h3>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Workspace / Institution Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Logo Image URL
            </label>
            <input
              type="url"
              value={logoUrl || ""}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Workspace Accents */}
        <div className="space-y-4 pt-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-900 pb-3">
            <Palette className="h-4 w-4 text-indigo-400" /> Color Accent Customization
          </h3>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Accent Secondary Color
            </label>
            <div className="flex flex-wrap items-center gap-4">
              {/* Color picker */}
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="h-10 w-10 bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-200 font-mono focus:outline-none w-28 text-center"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Color Accent Presets
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presetSecondaryColors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSecondaryColor(color.value)}
                  className={`p-2 bg-slate-950 border rounded-lg text-[10px] font-semibold flex flex-col items-center gap-1.5 hover:border-slate-700 transition-colors ${
                    secondaryColor === color.value ? 'border-slate-600' : 'border-slate-850'
                  }`}
                >
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: color.value }} />
                  <span className="text-slate-400 truncate w-full text-center">{color.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-900/60 flex justify-end shrink-0">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-lg border border-indigo-500/30 flex items-center gap-1.5"
            style={{ 
              backgroundColor: currentTenant.secondaryColor,
              boxShadow: `0 4px 14px ${currentTenant.secondaryColor}25`
            }}
          >
            <Save className="h-4 w-4" /> Save Configuration
          </button>
        </div>

      </form>
    </div>
  );
}
