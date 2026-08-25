import Sidebar from "../components/common/sidebar";
import Navbar from "../components/common/navbar";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main application area */}
      <div className="dashboard-main">
        <Navbar />

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;