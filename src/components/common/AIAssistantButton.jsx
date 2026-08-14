import { FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AIAssistantButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 right-8 z-50 group">

      {/* Tooltip */}

      <div className="absolute right-16 top-3 opacity-0 group-hover:opacity-100 transition duration-300">

        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg whitespace-nowrap border border-slate-700">

          🤖 Ask Skillora AI

        </div>

      </div>

      {/* Pulse Ring */}

      <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20"></div>

      {/* Button */}

      <button
        onClick={() => navigate("/assistant")}
        className="relative w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-all duration-300"
      >
        <FaRobot />
      </button>

    </div>
  );
}

export default AIAssistantButton;