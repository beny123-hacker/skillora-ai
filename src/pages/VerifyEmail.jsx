import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEnvelopeOpenText,
  FaArrowRight,
  FaRedo,
} from "react-icons/fa";

function VerifyEmail() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-6">

      {/* Background Glow */}

      <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-indigo-600/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[150px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          w-full
          max-w-lg
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-10
          text-center
          backdrop-blur-2xl
        "
      >

        {/* Icon */}

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-5xl text-white shadow-xl">

          <FaEnvelopeOpenText />

        </div>

        {/* Title */}

        <h1 className="mt-8 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-5xl font-black text-transparent">

          Verify Your Email

        </h1>

        {/* Description */}

        <p className="mt-6 text-lg leading-8 text-slate-300">

          We've sent a verification email to your registered email address.

          <br />

          Please verify your email before logging in to Skillora AI.

        </p>

        {/* Note */}

        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

          <p className="text-sm leading-7 text-slate-300">

            📬 If you don't see the email,

            please check your

            <span className="font-bold text-cyan-400">

              {" "}Spam / Junk

            </span>

            folder.

          </p>

        </div>

        {/* Buttons */}

        <div className="mt-10 space-y-4">

          <Link
            to="/login"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-gradient-to-r
              from-indigo-500
              to-purple-600
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-[1.02]
            "
          >

            Continue to Login

            <FaArrowRight />

          </Link>

          <button
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-white/5
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-white/10
            "
          >

            <FaRedo />

            Resend Verification Email

          </button>

        </div>

      </motion.div>

    </div>
  );
}

export default VerifyEmail;