import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import AddProductModal from "../AddProductModal";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import TableComponent from "../TableComponent/TableComponent";
import { Toast } from "primereact/toast";
import { loaderTimer, toastTimer } from "../../config/config";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";
import "./HomePage.css";
import { Card } from "primereact/card";

interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
}
const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const products = useSelector((state: RootState) => state.product.products); // Access the products from Redux store

  // displaying toast after user logs in
  useEffect(() => {
    if (localStorage.getItem("loginToastShown")) {
      toast.current?.show({
        severity: "success",
        summary: "Logged In",
        detail: "You have been successfully logged in!",
        life: toastTimer,
      });
      localStorage.removeItem("loginToastShown");
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // getting user email from redux state
  const useremail = useSelector((state: RootState) => {
    const user = state.user.user;
    return user ? user.email : "";
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
      localStorage.setItem("logoutToastShown", "true");
      navigate("/");
    }, loaderTimer);
  };

  const handleView = (product: Product) => {
    // ...
  };

  const handleEdit = (product: Product) => {
    // ...
  };

  const handleDelete = (product: Product) => {
    // ...
  };

  const showToast = () => {
    toast.current?.show({
      severity: "success",
      summary: "Product Added",
      detail: "The product has been added successfully",
      life: toastTimer,
    });
  };

  return (
    <div className="home-page">
      <Toast ref={toast} />
      <Navbar username={useremail} onLogout={handleLogout} />
      <div className="add-button-container">
        <Button
          label="New Product"
          icon="pi pi-plus-circle"
          style={{ fontSize: "14px", padding: "10px" }}
          onClick={openModal}
          severity="success"
          outlined
        />
      </div>
      <div className="table-container">
        <Card
          className="table-card p-shadow-2"
          title="Product List"
          style={{ textAlign: "center" }}
        >
          <TableComponent
            products={products}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>
      </div>
      {isModalOpen && (
        <AddProductModal closeModal={closeModal} showToast={showToast} />
      )}
      {loading && <Loader />}
    </div>
  );
};

export default HomePage;
