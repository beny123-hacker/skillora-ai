import React, { useState } from "react";

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [learningReminders, setLearningReminders] = useState(true);
  const [quizReminders, setQuizReminders] = useState(false);
  const [progressUpdates, setProgressUpdates] = useState(true);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Notification Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose which notifications you want to receive.
        </p>
      </div>

      <div className="space-y-4">

        {/* Email Notifications */}
        <NotificationOption
          title="Email Notifications"
          description="Receive important updates and account notifications."
          enabled={emailNotifications}
          setEnabled={setEmailNotifications}
        />

        {/* Learning Reminders */}
        <NotificationOption
          title="Learning Reminders"
          description="Get reminders to continue your learning journey."
          enabled={learningReminders}
          setEnabled={setLearningReminders}
        />

        {/* Quiz Reminders */}
        <NotificationOption
          title="Quiz Reminders"
          description="Receive reminders about pending quizzes and assessments."
          enabled={quizReminders}
          setEnabled={setQuizReminders}
        />

        {/* Progress Updates */}
        <NotificationOption
          title="Progress Updates"
          description="Get updates about your learning progress and achievements."
          enabled={progressUpdates}
          setEnabled={setProgressUpdates}
        />

      </div>

    </div>
  );
}

function NotificationOption({
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

export default NotificationSettings;