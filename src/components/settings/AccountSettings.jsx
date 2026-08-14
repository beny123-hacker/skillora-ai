import React from "react";
import { useAuth } from "../../context/AuthContext";

function AccountSettings() {
  const { session } = useAuth();

  const email = session?.user?.email || "Not available";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Account Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your Skillora AI account information.
        </p>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Email Address
        </label>

        <input
          type="email"
          value={email}
          disabled
          className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600 outline-none"
        />

        <p className="mt-2 text-xs text-slate-400">
          Your email is connected to your Google account.
        </p>
      </div>

      {/* Account Status */}
      <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

        <div>
          <h3 className="font-semibold text-slate-700">
            Account Status
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Your Skillora AI account is active.
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          Active
        </span>

      </div>

    </div>
  );
}

export default AccountSettings;