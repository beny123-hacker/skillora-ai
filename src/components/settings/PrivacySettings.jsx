import React, { useState } from "react";

function PrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [personalizedRecommendations, setPersonalizedRecommendations] =
    useState(true);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Privacy Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Control how your information is used and displayed.
        </p>
      </div>

      <div className="space-y-4">

        {/* Profile Visibility */}
        <PrivacyOption
          title="Profile Visibility"
          description="Allow other users to view your basic profile information."
          enabled={profileVisibility}
          setEnabled={setProfileVisibility}
        />

        {/* Learning Progress */}
        <PrivacyOption
          title="Show Learning Progress"
          description="Allow your learning progress to be displayed on your profile."
          enabled={showProgress}
          setEnabled={setShowProgress}
        />

        {/* Personalized Recommendations */}
        <PrivacyOption
          title="Personalized Recommendations"
          description="Use your learning activity to provide better recommendations."
          enabled={personalizedRecommendations}
          setEnabled={setPersonalizedRecommendations}
        />

      </div>

      {/* Privacy Notice */}
      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">

        <div className="flex gap-3">

          <div className="text-xl">
            🔐
          </div>

          <div>
            <h3 className="font-semibold text-blue-800">
              Your Privacy Matters
            </h3>

            <p className="mt-1 text-sm leading-6 text-blue-700">
              Skillora AI uses your learning information to personalize
              your learning experience. You can control your preferences
              using the options above.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

function PrivacyOption({
  title,
  description,
  enabled,
  setEnabled,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">

      <div>
        <h3 className="font-semibold text-slate-700">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 ${
          enabled ? "bg-blue-600" : "bg-slate-300"
        }`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

    </div>
  );
}

export default PrivacySettings;