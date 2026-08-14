import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBell,
  FiMoon,
  FiGlobe,
  FiShield,
  FiLogOut,
  FiTrash2,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";
import DashboardLayout from "../layouts/DashboardLayout";
import { supabase } from "../supabase/supabase";
import { useAuth } from "../context/AuthContext";

const LANGUAGES = ["English", "Hindi", "Spanish", "French", "German"];
const THEMES = [
  { id: "light", label: "Light", swatch: "bg-white border border-gray-200" },
  { id: "dark", label: "Dark", swatch: "bg-gray-900" },
  {
    id: "system",
    label: "System",
    swatch: "bg-gradient-to-br from-white to-gray-900",
  },
];

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition shrink-0 ${
      checked
        ? "bg-gradient-to-r from-blue-600 to-indigo-600"
        : "bg-gray-300 dark:bg-gray-700"
    }`}
  >
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md ${
        checked ? "left-[22px]" : "left-0.5"
      }`}
    />
  </button>
);

const SettingRow = ({ icon: Icon, title, description, children }) => (
  <div className="flex items-center justify-between gap-4 py-4">
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 shrink-0 mt-0.5">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {title}
        </p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
    </div>
    {children}
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="rounded-2xl border border-white/40 dark:border-gray-700/40 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl shadow-md p-6">
    <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide mb-1">
      {title}
    </h2>
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {children}
    </div>
  </div>
);

const Settings = () => {
  const { signOut } = useAuth?.() || {};
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("light");
  const [profileVisible, setProfileVisible] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const flashSaved = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 1500);
  };

  const handleToggleDarkMode = (value) => {
    setDarkMode(value);
    document.documentElement.classList.toggle("dark", value);
    flashSaved();
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      signOut?.();
    } catch (err) {
      // logout failed
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await supabase.rpc("delete_user_account");
      await supabase.auth.signOut();
    } catch (err) {
      // deletion failed
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Manage your account preferences.
            </p>
          </div>

          {savedFeedback && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full"
            >
              <FiCheck size={12} />
              Saved
            </motion.span>
          )}
        </div>

        {/* Preferences */}
        <SectionCard title="Preferences">
          <SettingRow
            icon={FiBell}
            title="Notifications"
            description="Get reminders about your learning streak and new content."
          >
            <ToggleSwitch
              checked={notificationsEnabled}
              onChange={(v) => {
                setNotificationsEnabled(v);
                flashSaved();
              }}
            />
          </SettingRow>

          <SettingRow
            icon={FiMoon}
            title="Dark mode"
            description="Switch to a darker color scheme."
          >
            <ToggleSwitch checked={darkMode} onChange={handleToggleDarkMode} />
          </SettingRow>

          <SettingRow
            icon={FiGlobe}
            title="Language"
            description="Choose your preferred language."
          >
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                {language}
                <FiChevronDown size={14} />
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg py-1 z-10">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLanguageMenu(false);
                        flashSaved();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </SettingRow>
        </SectionCard>

        {/* Appearance */}
        <SectionCard title="Appearance">
          <div className="py-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Theme
            </p>
            <div className="grid grid-cols-3 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    flashSaved();
                  }}
                  className={`rounded-xl p-3 border-2 transition ${
                    theme === t.id
                      ? "border-indigo-500"
                      : "border-transparent"
                  }`}
                >
                  <div className={`h-12 w-full rounded-lg ${t.swatch}`} />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {t.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Privacy */}
        <SectionCard title="Privacy">
          <SettingRow
            icon={FiShield}
            title="Public profile"
            description="Allow other learners to see your progress and achievements."
          >
            <ToggleSwitch
              checked={profileVisible}
              onChange={(v) => {
                setProfileVisible(v);
                flashSaved();
              }}
            />
          </SettingRow>
        </SectionCard>

        {/* Account */}
        <SectionCard title="Account">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 shrink-0">
                <FiLogOut size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Log out
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Sign out of your account on this device.
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Log out
            </button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 shrink-0">
                <FiTrash2 size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                  Delete account
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Permanently remove your account and all learning data.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 shadow-2xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Delete your account?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              This action is permanent. All your roadmaps, notes, and progress
              will be lost.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Settings;