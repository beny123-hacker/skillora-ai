import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { supabase } from "../supabase/supabase";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  // =========================
  // UPDATE PASSWORD
  // =========================

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    // Validation

    if (!password || !confirmPassword) {
      setError(
        "Please enter and confirm your new password."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await supabase.auth.updateUser({
          password: password,
        });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(true);

      // Give the user a moment to see success message

      setTimeout(() => {
        navigate("/login");
      }, 1800);

    } catch (err) {
      console.error(err);

      setError(
        "Unable to update your password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      {/* Background decoration */}

      <div className="auth-glow auth-glow-one"></div>
      <div className="auth-glow auth-glow-two"></div>

      <div className="auth-container">

        {/* Logo */}

        <div className="auth-brand">
          Skillora<span>AI</span>
        </div>

        {/* Card */}

        <section className="auth-card reset-card">

          {/* Icon */}

          <div className="reset-icon">
            <FaLock />
          </div>

          {/* Heading */}

          <div className="auth-heading">

            <p className="auth-eyebrow">
              ACCOUNT SECURITY
            </p>

            <h1>
              Reset your password
            </h1>

            <p className="auth-description">
              Create a new secure password for your
              Skillora AI account.
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleUpdatePassword}
            className="auth-form"
          >

            {/* New password */}

            <div className="auth-field">

              <label htmlFor="new-password">
                New Password
              </label>

              <div className="auth-password-wrapper">

                <input
                  id="new-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              <small className="auth-hint">
                Use at least 8 characters.
              </small>

            </div>

            {/* Confirm password */}

            <div className="auth-field">

              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              <div className="auth-password-wrapper">

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* Error */}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {/* Success */}

            {success && (
              <div className="auth-success">
                Password updated successfully.
                Redirecting to login...
              </div>
            )}

            {/* Update */}

            <button
              type="submit"
              disabled={loading || success}
              className="auth-primary-button"
            >

              {loading ? (
                <span className="button-loader"></span>
              ) : (
                <>
                  <span>Update Password</span>
                  <FaArrowRight />
                </>
              )}

            </button>

          </form>

          {/* Back to login */}

          <div className="auth-switch reset-back">

            <span>
              Remember your password?
            </span>

            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
            >
              Back to sign in
            </button>

          </div>

        </section>

        {/* Footer */}

        <p className="auth-footer">
          © 2026 Skillora AI
        </p>

      </div>

    </main>
  );
}

export default ResetPassword;