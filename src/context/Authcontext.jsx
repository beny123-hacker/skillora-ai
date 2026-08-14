import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../supabase/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET PROFILE FROM SUPABASE
  // =====================================================

  const getProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return null;
    }

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
  };

  // =====================================================
  // INITIAL SESSION
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      try {
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error);
        }

        if (!mounted) return;

        setSession(currentSession || null);
        setUser(currentSession?.user || null);

        if (currentSession?.user) {
          await getProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Authentication initialization error:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // ===================================================
    // AUTH STATE LISTENER
    // ===================================================

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!mounted) return;

        setSession(newSession || null);
        setUser(newSession?.user || null);

        if (newSession?.user) {
          await getProfile(newSession.user.id);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // =====================================================
  // EMAIL / PHONE LOGIN
  // =====================================================

  const signIn = async (identifier, password) => {
    const value = identifier.trim();

    // Check whether the user entered an email or phone number
    const isEmail = value.includes("@");

    if (isEmail) {
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
  // REGISTER USER
  // =====================================================

  const signUp = async ({
    email,
    password,
    fullName,
    username,
    phone,
  }) => {
    try {
      // -----------------------------------------------
      // 1. CREATE USER IN SUPABASE AUTH
      // -----------------------------------------------

      const {
        data: authData,
        error: authError,
      } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            username: username.trim(),
            phone: phone?.trim() || "",
          },
        },
      });

      if (authError) {
        return {
          data: null,
          error: authError,
        };
      }

      const createdUser = authData?.user;

      if (!createdUser) {
        return {
          data: authData,
          error: new Error("User registration failed."),
        };
      }

      // -----------------------------------------------
      // 2. CREATE PROFILE RECORD
      // -----------------------------------------------

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .insert([
          {
            id: createdUser.id,
            full_name: fullName.trim(),
            username: username.trim(),
            email: email.trim(),
            phone: phone?.trim() || null,
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

        // Do NOT delete the Auth account here.
        // The authentication account has already been created.

        return {
          data: authData,
          profile: null,
          error: profileError,
        };
      }

      // -----------------------------------------------
      // 3. STORE PROFILE IN STATE
      // -----------------------------------------------

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
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return { error };
    }

    setSession(null);
    setUser(null);
    setProfile(null);

    return { error: null };
  };

  // =====================================================
  // PASSWORD RESET EMAIL
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
        error: new Error("User is not logged in."),
      };
    }

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
      console.error("Profile update error:", error);
      return { data: null, error };
    }

    setProfile(data);

    return {
      data,
      error: null,
    };
  };

  // =====================================================
  // REFRESH PROFILE
  // =====================================================

  const refreshProfile = async () => {
    if (!user?.id) return null;

    return await getProfile(user.id);
  };

  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const value = {
    // Authentication state
    session,
    user,
    profile,
    loading,

    // Authentication functions
    signIn,
    signInWithGoogle,
    signUp,
    signOut,

    // Password functions
    resetPassword,
    updatePassword,

    // Profile functions
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
// USE AUTH HOOK
// =======================================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}

export default AuthContext;