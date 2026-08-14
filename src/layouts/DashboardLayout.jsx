import Sidebar from "../components/common/sidebar";
import Navbar from "../components/common/navbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#070B18] text-white">

      <Sidebar />

      <div
        className="min-h-screen"
        style={{
          marginLeft: "288px",
        }}
      >
        <Navbar />

        <main className="w-full px-8 py-8 overflow-x-hidden">

          <div className="w-full">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;