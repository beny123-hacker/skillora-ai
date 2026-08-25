import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaArrowRight,
  FaUser,
  FaAt,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import { useAuth } from "../context/Authcontext";

function Register() {
  const navigate = useNavigate();

  const { signUp, signInWithGoogle } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.fullName.trim() ||
      !form.username.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.username.length < 3) {
      setError("Username must contain at least 3 characters.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await signUp(
        form.email.trim(),
        form.password,
        form.fullName.trim(),
        form.username.trim(),
        form.phone.trim()
      );

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(
        "Account created successfully! Please check your email to verify your account."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      console.error(err);
      setError("Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");

    try {
      setGoogleLoading(true);

      const { error } = await signInWithGoogle();

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      console.error(err);
      setError("Google sign-up failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="auth-page">

      {/* Logo */}
      <div className="auth-logo">
        Skillora<span>AI</span>
      </div>

      {/* Register Card */}
      <section className="auth-card register-card">

        {/* Heading */}
        <div className="auth-heading">
          <p>CREATE ACCOUNT</p>

          <h1>Join Skillora</h1>

          <span>
            Start your personalized learning journey.
          </span>
        </div>

        <form onSubmit={handleRegister}>

          {/* Full Name */}
          <div className="auth-input-group">
            <label htmlFor="fullName">
              Full Name
            </label>

            <div className="auth-input-wrapper">
              <FaUser className="auth-input-icon" />

              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
          </div>

          {/* Username */}
          <div className="auth-input-group">
            <label htmlFor="username">
              Username
            </label>

            <div className="auth-input-wrapper">
              <FaAt className="auth-input-icon" />

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-input-group">
            <label htmlFor="email">
              Email Address
            </label>

            <div className="auth-input-wrapper">
              <FaEnvelope className="auth-input-icon" />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="auth-input-group">
            <label htmlFor="phone">
              Mobile Number
              <span className="optional-label">
                Optional
              </span>
            </label>

            <div className="auth-input-wrapper">
              <FaPhone className="auth-input-icon" />

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-input-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="auth-input-wrapper">
              <FaLock className="auth-input-icon" />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            <small>
              Minimum 6 characters.
            </small>
          </div>

          {/* Confirm Password */}
          <div className="auth-input-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="auth-input-wrapper">
              <FaLock className="auth-input-icon" />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
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
              {success}
            </div>
          )}

          {/* Create Account */}
          <button
            type="submit"
            className="auth-primary-button"
            disabled={loading}
          >
            {loading ? (
              <span className="button-loader" />
            ) : (
              <>
                Create Account
                <FaArrowRight />
              </>
            )}
          </button>

        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span />
          <p>OR</p>
          <span />
        </div>

        {/* Google */}
        <button
          type="button"
          className="auth-google-button"
          onClick={handleGoogleRegister}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <span className="button-loader dark" />
          ) : (
            <>
              <FaGoogle />
              Continue with Google
            </>
          )}
        </button>

        {/* Login */}
        <p className="auth-switch">
          Already have an account?

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </p>

      </section>

      {/* Footer */}
      <p className="auth-footer">
        © 2026 Skillora AI
      </p>

    </main>
  );
}

export default Register;