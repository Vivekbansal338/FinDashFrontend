import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Home/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AppLayout.css";

const AppLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [issidebaropen, setissidebaropen] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="applayout">
      <Header setissidebaropen={setissidebaropen} />
      <Sidebar
        issidebaropen={issidebaropen}
        setissidebaropen={setissidebaropen}
      />
      <div
        className={`app-main-container ${issidebaropen ? "expandsidebar" : ""}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
