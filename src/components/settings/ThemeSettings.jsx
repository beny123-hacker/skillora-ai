import React, { useState } from "react";

function ThemeSettings() {
  const [theme, setTheme] = useState("light");

  const themes = [
    {
      id: "light",
      title: "Light",
      description: "Use the light appearance for Skillora AI.",
      icon: "☀️",
    },
    {
      id: "dark",
      title: "Dark",
      description: "Use the dark appearance for a comfortable experience.",
      icon: "🌙",
    },
    {
      id: "system",
      title: "System Default",
      description: "Automatically follow your device's theme.",
      icon: "💻",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Theme Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Customize the appearance of your Skillora AI experience.
        </p>
      </div>

      {/* Theme Options */}
      <div className="space-y-3">
        {themes.map((item) => {
          const selected = theme === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTheme(item.id)}
              className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                selected
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-4">

                {/* Icon */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${
                    selected ? "bg-blue-100" : "bg-white"
                  }`}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-semibold text-slate-700">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>

              </div>

              {/* Radio */}
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  selected
                    ? "border-blue-600"
                    : "border-slate-300"
                }`}
              >
                {selected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                )}
              </div>

            </button>
          );
        })}
      </div>

      {/* Current Theme */}
      <div className="mt-6 rounded-xl border border-purple-100 bg-purple-50 p-4">
        <div className="flex gap-3">

          <div className="text-xl">
            🎨
          </div>

          <div>
            <h3 className="font-semibold text-purple-800">
              Current Theme
            </h3>

            <p className="mt-1 text-sm text-purple-700">
              {theme === "light" && "Light theme is currently selected."}
              {theme === "dark" && "Dark theme is currently selected."}
              {theme === "system" &&
                "Your system theme preference is currently selected."}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default ThemeSettings;