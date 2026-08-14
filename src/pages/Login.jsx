import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaArrowRight,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const {
    signIn,
    signInWithGoogle,
    user,
    loading: authLoading,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // REDIRECT WHEN AUTHENTICATION IS SUCCESSFUL
  // =====================================================

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // =====================================================
  // EMAIL LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await signIn(
        email.trim(),
        password
      );

      if (error) {
        setError(error.message);
        return;
      }

      /*
       * Supabase has successfully created the session.
       *
       * AuthContext will update `user`.
       * The useEffect above will then redirect
       * to /dashboard.
       *
       * We also navigate here as an immediate fallback.
       */
      navigate("/dashboard", { replace: true });

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err?.message ||
          "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleLogin = async () => {
    setError("");

    try {
      setGoogleLoading(true);

      const { error } = await signInWithGoogle();

      if (error) {
        setError(error.message);
        setGoogleLoading(false);
        return;
      }

      /*
       * IMPORTANT:
       *
       * Do NOT call navigate() here.
       *
       * signInWithOAuth() redirects the browser to Google.
       * After Google authentication, Supabase sends the
       * user back to the redirectTo URL configured inside
       * AuthContext.
       */

    } catch (err) {
      console.error("Google login error:", err);

      setError(
        err?.message ||
          "Google sign-in failed. Please try again."
      );

      setGoogleLoading(false);
    }
  };

  // =====================================================
  // SHOW LOADING WHILE AUTH STATE IS BEING RESTORED
  // =====================================================

  if (authLoading) {
    return (
      <main className="login-main">
        <div className="login-logo">
          Skillora<span>AI</span>
        </div>

        <section className="login-card">
          <div className="login-form-area auth-loading-container">
            <span className="button-loader dark" />
          </div>
        </section>

        <p className="login-footer">
          © 2026 Skillora AI
        </p>
      </main>
    );
  }

  // =====================================================
  // LOGIN PAGE
  // =====================================================

  return (
    <div className="auth-page">

      {/* =========================
          MAIN LOGIN CONTENT
      ========================= */}

      <main className="login-main">

        {/* Logo */}

        <div className="login-logo">
          Skillora<span>AI</span>
        </div>

        {/* Login Card */}

        <section className="login-card">

          <div className="login-form-area">

            {/* Heading */}

            <div className="login-heading">

              <p>WELCOME BACK</p>

              <h1>Sign in</h1>

            
            </div>

            {/* Form */}

            <form onSubmit={handleLogin}>

              {/* Email */}

              <div className="input-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  disabled={loading}
                />

              </div>

              {/* Password */}

              <div className="input-group password-group">

                <div className="password-label">

                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-button"
                    onClick={() =>
                      navigate("/forgot-password")
                    }
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="password-input">

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
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

              </div>

              {/* Error */}

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              {/* Sign In */}

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="signin-button"
              >

                {loading ? (
                  <span className="button-loader" />
                ) : (
                  <>
                    <span>Sign in</span>
                    <FaArrowRight />
                  </>
                )}

              </button>

            </form>

            {/* Divider */}

            <div className="login-divider">

              <span></span>

              <p>OR</p>

              <span></span>

            </div>

            {/* Google */}

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={
                googleLoading || loading
              }
              className="google-button"
            >

              {googleLoading ? (
                <span className="button-loader dark" />
              ) : (
                <>
                  <FaGoogle />
                  <span>
                    Continue with Google
                  </span>
                </>
              )}

            </button>

            {/* Register */}

            <p className="create-account">

              <span>
                Don't have an account?
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate("/register")
                }
              >
                Create account
              </button>

            </p>

          </div>

        </section>

        {/* Footer */}

        <p className="login-footer">
          © 2026 Skillora AI
        </p>

      </main>

    </div>
  );
}

export default Login;