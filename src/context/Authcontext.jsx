import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../supabase/supabase";

const AuthContext = createContext(undefined);

// =======================================================
// AUTH PROVIDER
// =======================================================

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET USER PROFILE
  // =====================================================

  const getProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Profile fetch error:", error);
        setProfile(null);
        return null;
      }

      setProfile(data || null);

      return data || null;
    } catch (error) {
      console.error("Profile fetch exception:", error);
      setProfile(null);
      return null;
    }
  };

  // =====================================================
  // INITIAL AUTHENTICATION
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error);
        }

        if (!mounted) return;

        const currentUser = currentSession?.user || null;

        setSession(currentSession || null);
        setUser(currentUser);

        if (currentUser) {
          await getProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error(
          "Authentication initialization error:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // ===================================================
    // AUTH STATE LISTENER
    // ===================================================

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!mounted) return;

        const newUser = newSession?.user || null;

        setSession(newSession || null);
        setUser(newUser);

        if (newUser) {
          await getProfile(newUser.id);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // =====================================================
  // EMAIL / PHONE LOGIN
  // =====================================================

  const signIn = async (identifier, password) => {
    const value = identifier.trim();

    if (!value || !password) {
      return {
        data: null,
        error: new Error(
          "Email/phone and password are required."
        ),
      };
    }

    if (value.includes("@")) {
      return await supabase.auth.signInWithPassword({
        email: value,
        password,
      });
    }

    return await supabase.auth.signInWithPassword({
      phone: value,
      password,
    });
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const signInWithGoogle = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const signUp = async ({
    email,
    password,
    fullName,
    username,
    phone,
  }) => {
    try {
      const cleanEmail = email?.trim();
      const cleanFullName = fullName?.trim();
      const cleanUsername = username?.trim();
      const cleanPhone = phone?.trim() || "";

      if (!cleanEmail || !password || !cleanFullName) {
        return {
          data: null,
          profile: null,
          error: new Error(
            "Email, password and full name are required."
          ),
        };
      }

      // -------------------------------------------------
      // CREATE AUTH USER
      // -------------------------------------------------

      const {
        data: authData,
        error: authError,
      } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: cleanFullName,
            username: cleanUsername || "",
            phone: cleanPhone,
          },
        },
      });

      if (authError) {
        return {
          data: null,
          profile: null,
          error: authError,
        };
      }

      const createdUser = authData?.user;

      if (!createdUser) {
        return {
          data: authData,
          profile: null,
          error: new Error(
            "User registration failed."
          ),
        };
      }

      // -------------------------------------------------
      // CREATE PROFILE
      // -------------------------------------------------

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .insert([
          {
            id: createdUser.id,
            full_name: cleanFullName,
            username: cleanUsername || "",
            email: cleanEmail,
            phone: cleanPhone || null,
            email_verified: false,
            phone_verified: false,
            avatar_url: null,
          },
        ])
        .select()
        .single();

      if (profileError) {
        console.error(
          "Profile creation error:",
          profileError
        );

        return {
          data: authData,
          profile: null,
          error: profileError,
        };
      }

      setProfile(profileData);

      return {
        data: authData,
        profile: profileData,
        error: null,
      };
    } catch (error) {
      console.error("Registration error:", error);

      return {
        data: null,
        profile: null,
        error,
      };
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);

        return {
          error,
        };
      }

      setSession(null);
      setUser(null);
      setProfile(null);

      return {
        error: null,
      };
    } catch (error) {
      console.error("Logout exception:", error);

      return {
        error,
      };
    }
  };

  // =====================================================
  // RESET PASSWORD
  // =====================================================

  const resetPassword = async (email) => {
    return await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );
  };

  // =====================================================
  // UPDATE PASSWORD
  // =====================================================

  const updatePassword = async (newPassword) => {
    return await supabase.auth.updateUser({
      password: newPassword,
    });
  };

  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  const updateProfile = async (updates) => {
    if (!user?.id) {
      return {
        data: null,
        error: new Error(
          "User is not logged in."
        ),
      };
    }

    try {
      const {
        data,
        error,
      } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        console.error(
          "Profile update error:",
          error
        );

        return {
          data: null,
          error,
        };
      }

      setProfile(data);

      return {
        data,
        error: null,
      };
    } catch (error) {
      console.error(
        "Profile update exception:",
        error
      );

      return {
        data: null,
        error,
      };
    }
  };

  // =====================================================
  // REFRESH PROFILE
  // =====================================================

  const refreshProfile = async () => {
    if (!user?.id) {
      return null;
    }

    return await getProfile(user.id);
  };

  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const value = {
    session,
    user,
    profile,
    loading,

    signIn,
    signInWithGoogle,
    signUp,
    signOut,

    resetPassword,
    updatePassword,

    updateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// =======================================================
// USE AUTH
// =======================================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}

export default AuthContext;