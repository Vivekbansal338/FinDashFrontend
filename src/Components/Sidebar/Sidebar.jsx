import React from "react";
import "./Sidebar.css";
import {
  FaUsers,
  FaDollarSign,
  FaChartBar,
  FaCog,
  FaUser,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdOutlinePayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ issidebaropen, setissidebaropen }) => {
  const navigate = useNavigate();

  function handlenavigate(key) {
    if (key === "Dashboard") {
      navigate("/");
    } else if (key === "Borrowers") {
      navigate("/borrowers");
    } else if (key === "Loans") {
      navigate("/loans");
    } else if (key === "Payment") {
      navigate("/payments");
    } else if (key === "Report") {
      navigate("/reports");
    } else if (key === "Settings") {
      navigate("/settings");
    } else if (key === "Profile") {
      navigate("/profile");
    }
    setissidebaropen((prev) => !prev);
  }

  return (
    <div className={`app-sidebar ${issidebaropen ? "sidebaropen" : ""}`}>
      <ul>
        <li className="sidebarmenu" onClick={() => handlenavigate("Dashboard")}>
          <RxDashboard style={{ color: "#ff5733" }} />
          <span>DashBoard</span>
        </li>
        <li className="sidebarmenu" onClick={() => handlenavigate("Borrowers")}>
          <FaUsers style={{ color: "#33ff57" }} />
          <span>Borrowers</span>
        </li>
        <li className="sidebarmenu" onClick={() => handlenavigate("Loans")}>
          <FaDollarSign style={{ color: "#5733ff" }} />
          <span>Loans</span>
        </li>
        <li className="sidebarmenu" onClick={() => handlenavigate("Payment")}>
          <MdOutlinePayment style={{ color: "#ff3399" }} />
          <span>Payment</span>
        </li>
        <li className="sidebarmenu" onClick={() => handlenavigate("Report")}>
          <FaChartBar style={{ color: "#ff9933" }} />
          <span>Report</span>
        </li>
        <li className="sidebarmenu" onClick={() => handlenavigate("Profile")}>
          <FaUser style={{ color: "#33aaff" }} />
          <span>Profile</span>
        </li>
        <li className="sidebarmenu" onClick={() => handlenavigate("Settings")}>
          <FaCog style={{ color: "#ffcc00" }} />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
