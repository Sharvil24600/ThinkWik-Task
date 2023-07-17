import React from "react";
import { Menubar } from "primereact/menubar";
import "./Navbar.css";
import { Button } from "primereact/button";

interface NavbarProps {
  username: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
  const start = (
    <div className="user-info">
      <i className="pi pi-user" style={{ marginRight: "0.5rem" }} />
      {username}
    </div>
  );

  const end = (
    <>
      <Button
        label="Logout"
        onClick={onLogout}
        severity="secondary"
        size="small"
        icon="pi pi-sign-out"
        style={{
          border: "none",
          WebkitBoxShadow: "none",
        }}
        className="custom-button"
        outlined
      />
    </>
  );

  return <Menubar start={start} end={end} className="navbar-wrapper" />;
};

export default Navbar;
