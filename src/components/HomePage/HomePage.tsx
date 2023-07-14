import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";


const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useremail = useSelector((state: RootState) => {
    const user = state.user.user;
    return user ? user.email : "";
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="home-page">
      <h1>{useremail}</h1>
      <button onClick={handleLogout}></button>
    </div>
  );
};

export default HomePage;
