import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUniversity,
  FaBullseye,
  FaFire,
  FaAward,
  FaCode,
} from "react-icons/fa";
import { useAuth } from "../../context/Authcontext";

function ProfileSummaryCard() {
  const { user } = useAuth();

  const profile = user?.user_metadata || {};

  const fullName =
    profile.full_name ||
    profile.name ||
    "Skillora Learner";

  const avatar =
    profile.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=4f46e5&color=fff`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="
      h-full
      rounded-[32px]
      border
      border-white/10
      bg-gradient-to-br
      from-[#111827]
      via-[#0F172A]
      to-[#0B1220]
      p-7
      shadow-[0_25px_60px_rgba(0,0,0,0.45)]
      backdrop-blur-xl
      "
    >
      {/* Avatar */}

      <div className="flex flex-col items-center">

        <div className="relative">

          <img
            src={avatar}
            alt={fullName}
            className="
            h-28
            w-28
            rounded-full
            object-cover
            border-4
            border-indigo-500
            shadow-xl
          "
          />

          <span
            className="
            absolute
            bottom-2
            right-2
            h-5
            w-5
            rounded-full
            bg-green-400
            border-4
            border-[#111827]
          "
          />

        </div>

        <h2 className="mt-5 text-2xl font-bold text-white text-center">
          {fullName}
        </h2>

        <p className="mt-1 text-sm text-indigo-300">
          AI Learner
        </p>

      </div>

      {/* Divider */}

      <div className="my-7 h-px bg-white/10"></div>

      {/* Details */}

      <div className="space-y-4">

        <Info
          icon={<FaUniversity />}
          title="College"
          value="St. Mother Theresa Engineering College"
        />

        <Info
          icon={<FaGraduationCap />}
          title="Department"
          value="Computer Science & Engineering"
        />

        <Info
          icon={<FaBullseye />}
          title="Goal"
          value="Full Stack Developer"
        />

      </div>

      {/* Stats */}

      <div className="mt-8 grid grid-cols-3 gap-3">

        <SmallCard
          icon={<FaFire />}
          value="7"
          label="Streak"
        />

        <SmallCard
          icon={<FaAward />}
          value="12"
          label="Badges"
        />

        <SmallCard
          icon={<FaCode />}
          value="2450"
          label="XP"
        />

      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="flex justify-between text-sm">

          <span className="text-slate-400">
            Weekly Goal
          </span>

          <span className="font-semibold text-indigo-400">
            68%
          </span>

        </div>

        <div className="mt-3 h-3 rounded-full bg-slate-800 overflow-hidden">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "68%" }}
            transition={{ duration: 1 }}
            className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-indigo-500
            via-purple-500
            to-pink-500
          "
          />

        </div>

      </div>
    </motion.div>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4">

      <div
        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        bg-indigo-500/15
        text-indigo-400
      "
      >
        {icon}
      </div>

      <div>

        <p className="text-xs uppercase tracking-wider text-slate-500">
          {title}
        </p>

        <p className="text-sm font-semibold text-white">
          {value}
        </p>

      </div>

    </div>
  );
}

function SmallCard({ icon, value, label }) {
  return (
    <div
      className="
      rounded-2xl
      bg-white/5
      border
      border-white/5
      p-4
      text-center
    "
    >
      <div className="flex justify-center text-indigo-400 text-lg">
        {icon}
      </div>

      <h3 className="mt-2 text-xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default ProfileSummaryCard;