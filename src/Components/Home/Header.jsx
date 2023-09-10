import React from "react";
import "./Header.css";
import logo from "../../assets/logo.jpg";
import { TbLogout } from "react-icons/tb";
import { CgMenuBoxed } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/AuthSlice.js";
import { useNavigate } from "react-router-dom";

const Header = ({ setissidebaropen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSidebar = () => {
    setissidebaropen((prev) => !prev);
  };

  const handlelogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="app-topbar">
      <div className="app-topbar-left">
        <img src={logo} alt="app-logo" className="app-logo" />
        <h2>FinDash</h2>
        <button
          className="sidebartopplebutton iconbutton topbarmenuicon"
          onClick={handleSidebar}
        >
          <CgMenuBoxed />
        </button>
      </div>

      <div className="app-topbar-right">
        <button
          className="sidebartopplebutton iconbutton"
          onClick={handlelogout}
        >
          <TbLogout />
        </button>
      </div>
    </div>
  );
};

export default Header;
