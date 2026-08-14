import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// =========================
// AUTH PAGES
// =========================
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// =========================
// MAIN PAGES
// =========================
import Dashboard from "./pages/dashboard";
import Learn from "./pages/learn";
import Roadmap from "./pages/roadmap";
import Notes from "./pages/notes";
import Quiz from "./pages/quiz";
import Assistant from "./pages/assistant";

// =========================
// USER PAGES
// =========================
import Profile from "./pages/profile";
import Settings from "./pages/settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================================
            AUTHENTICATION
        ========================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* =========================================
            MAIN DASHBOARD
        ========================================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* =========================================
            MAIN FEATURES
        ========================================= */}

        <Route
          path="/learn"
          element={<Learn />}
        />

        <Route
          path="/roadmap"
          element={<Roadmap />}
        />

        <Route
          path="/notes"
          element={<Notes />}
        />

        <Route
          path="/quiz"
          element={<Quiz />}
        />

        <Route
          path="/assistant"
          element={<Assistant />}
        />


        {/* =========================================
            USER
        ========================================= */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />


        {/* =========================================
            DEFAULT ROUTE
        ========================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* =========================================
            UNKNOWN ROUTES
        ========================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;