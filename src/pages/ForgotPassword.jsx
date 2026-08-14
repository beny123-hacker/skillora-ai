import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function ForgotPassword() {
  const navigate = useNavigate();

  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await resetPassword(
        email.trim()
      );

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(
        "Password reset link sent! Please check your email."
      );
    } catch (err) {
      console.error(err);
      setError(
        "Unable to send the reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      {/* Logo */}
      <div className="auth-logo">
        Skillora<span>AI</span>
      </div>

      {/* Forgot Password Card */}
      <section className="auth-card forgot-card">

        {/* Heading */}
        <div className="auth-heading">

          <p>ACCOUNT RECOVERY</p>

          <h1>Forgot Password?</h1>

          <span>
            Enter your email and we'll send you a
            secure password reset link.
          </span>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="auth-input-group">

            <label htmlFor="reset-email">
              Email Address
            </label>

            <div className="auth-input-wrapper">

              <FaEnvelope className="auth-input-icon" />

              <input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
              />

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
              {success}
            </div>
          )}

          {/* Send Reset */}
          <button
            type="submit"
            className="auth-primary-button"
            disabled={loading}
          >
            {loading ? (
              <span className="button-loader" />
            ) : (
              <>
                Send Reset Link
                <FaArrowRight />
              </>
            )}
          </button>

        </form>

        {/* Back */}
        <button
          type="button"
          className="auth-back-button"
          onClick={() => navigate("/login")}
        >
          <FaArrowLeft />
          Back to Sign in
        </button>

      </section>

      {/* Footer */}
      <p className="auth-footer">
        © 2026 Skillora AI
      </p>

    </main>
  );
}

export default ForgotPassword;