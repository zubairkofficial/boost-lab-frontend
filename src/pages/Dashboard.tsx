import { Sidebar } from "./../components/sidebar";
import { ProfileContent } from "./../components/profile";

const Dashboard = () => {
  const backgroundImageUrl =
    "https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0">
        <img
          src={backgroundImageUrl}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        <ProfileContent />
      </main>
    </div>
  );
};

export default Dashboard;
