import { useState, useEffect, useCallback } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Loading from "../components/common/loading";

import "../styles/profile.css";

import ProfileHero from "../components/profile/ProfileHero";
import ProfileEditModal from "../components/profile/ProfileEditModal";
import Statistics from "../components/profile/Statistics";
import Achievements from "../components/profile/Achievements";
import Certificates from "../components/profile/Certificates";

import { supabase } from "../supabase/supabase";
import { useAuth } from "../context/Authcontext";

function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  /*
   * Fetch profile, achievements and certificates.
   *
   * IMPORTANT:
   * We intentionally do NOT use:
   *
   * achievements(*)
   * certificates(*)
   *
   * inside the profile query because Supabase is returning
   * 400 when those relationships cannot be resolved.
   */
  const fetchProfile = useCallback(
    async (showLoading = true) => {
      if (!user?.id) {
        setProfile(null);
        setAchievements([]);
        setCertificates([]);
        setIsLoading(false);
        return;
      }

      if (showLoading) {
        setIsLoading(true);
      }

      try {
        /*
         * STEP 1
         * Fetch the user's profile.
         */
        const {
          data: profileData,
          error: profileError,
        } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        /*
         * STEP 2
         * Fetch achievements separately.
         *
         * If your achievements table uses profile_id,
         * this query will work.
         */
        const {
          data: achievementsData,
          error: achievementsError,
        } = await supabase
          .from("achievements")
          .select("*")
          .eq("profile_id", user.id);

        /*
         * If achievements table does not exist or the
         * profile_id column is different, don't destroy
         * the entire profile page.
         */
        if (achievementsError) {
          console.warn(
            "Could not fetch achievements:",
            achievementsError
          );
          setAchievements([]);
        } else {
          setAchievements(achievementsData || []);
        }

        /*
         * STEP 3
         * Fetch certificates separately.
         */
        const {
          data: certificatesData,
          error: certificatesError,
        } = await supabase
          .from("certificates")
          .select("*")
          .eq("profile_id", user.id);

        /*
         * Same idea here — certificate errors should
         * not prevent the profile itself from loading.
         */
        if (certificatesError) {
          console.warn(
            "Could not fetch certificates:",
            certificatesError
          );
          setCertificates([]);
        } else {
          setCertificates(certificatesData || []);
        }

        /*
         * STEP 4
         * Store profile information.
         */
        setProfile(profileData || null);
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error
        );

        setProfile(null);
        setAchievements([]);
        setCertificates([]);
      } finally {
        if (showLoading) {
          setIsLoading(false);
        }
      }
    },
    [user?.id]
  );

  /*
   * Fetch profile when user changes.
   */
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /*
   * Called after ProfileEditModal successfully
   * updates the profile.
   */
  const handleProfileUpdate = async (updatedProfile) => {
    if (!updatedProfile) {
      return;
    }

    /*
     * Immediately update the UI.
     */
    setProfile((previousProfile) => ({
      ...(previousProfile || {}),
      ...updatedProfile,
    }));

    /*
     * Close modal.
     */
    setIsEditOpen(false);

    /*
     * Re-fetch latest profile data without
     * showing the full-page loading screen.
     */
    await fetchProfile(false);
  };

  /*
   * Initial loading state.
   */
  if (isLoading) {
    return (
      <DashboardLayout title="Profile">
        <Loading />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Profile">
      <div className="profile-page mx-auto max-w-7xl space-y-12 px-6 py-8">

        {/* ================================
            PROFILE HERO
        ================================= */}

        <ProfileHero
          profile={profile}
          user={user}
          onEdit={() => setIsEditOpen(true)}
        />

        {/* ================================
            LEARNING STATISTICS
        ================================= */}

        <section className="profile-section">
          <div className="profile-section-heading">
            <span className="profile-section-kicker">
              YOUR PERFORMANCE
            </span>

            <h2>Learning Statistics</h2>

            <p>
              Track your progress and celebrate every milestone.
            </p>
          </div>

          <Statistics
            profile={profile}
            achievements={achievements}
            certificates={certificates}
          />
        </section>

        {/* ================================
            ACHIEVEMENTS
        ================================= */}

        <section className="profile-section">
          <Achievements
            achievements={achievements}
          />
        </section>

        {/* ================================
            CERTIFICATES
        ================================= */}

        <section className="profile-section">
          <Certificates
            certificates={certificates}
          />
        </section>
      </div>

      {/* ================================
          PROFILE EDIT MODAL
      ================================= */}

      <ProfileEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        user={user}
        onProfileUpdate={handleProfileUpdate}
      />
    </DashboardLayout>
  );
}

export default Profile;