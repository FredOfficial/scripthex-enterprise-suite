import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-wrapper">
        <Topbar />

        <main>{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
