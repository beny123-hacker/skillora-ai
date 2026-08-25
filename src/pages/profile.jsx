import { useState, useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import Loading from "../components/common/loading";

import ProfileHero from "../components/profile/ProfileHero";
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

  useEffect(() => {

    const fetchProfile = async () => {

      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {

        const { data, error } = await supabase
          .from("profiles")
          .select(`
            *,
            achievements(*),
            certificates(*)
          `)
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        setProfile(data);

        setAchievements(
          data?.achievements || []
        );

        setCertificates(
          data?.certificates || []
        );

      } catch (error) {

        console.error(error);

        setProfile(null);

        setAchievements([]);

        setCertificates([]);

      } finally {

        setIsLoading(false);

      }

    };

    fetchProfile();

  }, [user]);

  if (isLoading) {

    return (

      <DashboardLayout title="Profile">

        <Loading />

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout title="Profile">

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        {/* ================================
            HERO
        ================================= */}

        <ProfileHero
          profile={profile}
          user={user}
        />

        {/* ================================
            STATISTICS
        ================================= */}

        <Statistics
          profile={profile}
          achievements={achievements}
          certificates={certificates}
        />

        {/* ================================
            ACHIEVEMENTS
        ================================= */}

        <Achievements
          achievements={achievements}
        />

        {/* ================================
            CERTIFICATES
        ================================= */}

        <Certificates
          certificates={certificates}
        />

      </div>

    </DashboardLayout>

  );

}

export default Profile;