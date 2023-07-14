import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { logout } from "../redux/authSlice";
import { loaderTimer } from "../config/config";
import Loader from "./Loader/Loader";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const ViewProduct: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const products = useSelector((state: RootState) => state.product.products);
  const product = products.find((p) => p.id === parseInt(productId || ""));
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const useremail = useSelector((state: RootState) => {
    const user = state.user.user;
    return user ? user.email : "";
  });

  //logout function
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
      localStorage.setItem("logoutToastShown", "true");
      navigate("/");
    }, loaderTimer);
  };

  // for going back to home page
  const handleBack = () => {
    navigate("/home");
  };
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Navbar username={useremail} onLogout={handleLogout} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          title="Product Details"
          className="p-shadow-8"
          style={{ width: "400px", textAlign: "center" }}
        >
          <div className="p-fluid">
            <div
              className="p-field input-margin"
              style={{ paddingBottom: "30px" }}
            >
              <span className="p-float-label">
                <InputText
                  placeholder="Product Code"
                  value={product.code}
                  readOnly
                />
                <label htmlFor="code">Product Code</label>
              </span>
            </div>
            <div
              className="p-field input-margin"
              style={{ paddingBottom: "30px" }}
            >
              <span className="p-float-label">
                <InputText
                  placeholder="Product Name"
                  value={product.name}
                  readOnly
                />
                <label htmlFor="name">Product Name</label>
              </span>
            </div>
            <div
              className="p-field input-margin"
              style={{ paddingBottom: "25px" }}
            >
              <span className="p-float-label">
                <InputText
                  placeholder="Product Description"
                  value={product.description}
                />
                <label htmlFor="description">Product Description</label>
              </span>
            </div>

            <Button
              severity="secondary"
              label="Back"
              style={{ width: "50%" }}
              onClick={handleBack}
            />
          </div>
        </Card>
        {loading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default ViewProduct;
