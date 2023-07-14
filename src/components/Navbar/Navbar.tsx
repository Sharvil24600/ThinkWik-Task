import React from "react";
import { Menubar } from "primereact/menubar";
import "./Navbar.css";

interface NavbarProps {
  username: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
  const items = [
    {
      label: username,
      icon: "pi pi-user",
      className: "p-mr-auto",
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: onLogout,
    },
  ];

  return <Menubar model={items} className="navbar-wrapper" />;
};

export default Navbar;
