import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner as Loader } from "primereact/progressspinner";
import { loaderTimer } from "../config/config";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { InputText } from "primereact/inputtext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./loader.css";

interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
}

interface AddProductModalProps {
  closeModal: () => void;
  showToast: () => void; // Add showToast prop
}

const validationSchema = Yup.object({
  code: Yup.string().required("Product Code is required"),
  name: Yup.string().required("Product Name is required"),
  description: Yup.string().required("Product Description is required"),
});

const AddProductModal: React.FC<AddProductModalProps> = ({
  closeModal,
  showToast,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.product.products); // Access the products from Redux store
   const [loading, setLoading] = useState(false); // Add loading state

  const saveDataToLocalstorage = (productData: Product) => {
    const storedData = localStorage.getItem("products");
    let products: Product[] = storedData ? JSON.parse(storedData) : [];

    products.push(productData);
    localStorage.setItem("products", JSON.stringify(products));
  };
  const handleSubmit = (values: Product) => {
    setLoading(true); // Start the loading state

    const newProduct: Product = {
      ...values,
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1, // Increment the ID
    };

    // Simulate delay for 5 seconds before adding the product
    setTimeout(() => {
      dispatch(addProduct(newProduct));
      showToast();
      saveDataToLocalstorage(newProduct);
      closeModal();
      navigate("/home");
      setLoading(false); // Stop the loading state after adding the product
    }, loaderTimer);
  };

  return (
    <Dialog
      header="Add a New Product"
      visible
      style={{ width: "40vw", textAlign: "center" }}
      onHide={closeModal}
      className="p-dialog-sm"
    >
      <div>
        <Formik
          initialValues={{
            id: 0,
            code: "",
            name: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="p-fluid">
              <div
                className="p-field input-margin"
                style={{ paddingTop: "20px" }}
              >
                <span className="p-float-label">
                  <Field
                    type="text"
                    id="code"
                    name="code"
                    as={InputText}
                    className="p-inputtext"
                  />
         <label htmlFor="code">Product Code</label>
                </span>
                <ErrorMessage
                  name="code"
                  component="small"
                  className="p-error"
                />
              </div>
              <div
                className="p-field input-margin"
                style={{ paddingTop: "25px" }}
              >
                <span className="p-float-label">
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    as={InputText}
                    className="p-inputtext"
                  />
                  <label htmlFor="name">Product Name</label>
                </span>
                <ErrorMessage
                  name="name"
                  component="small"
                  className="p-error"
                />
              </div>
              <div
                className="p-field input-margin"
                style={{ paddingTop: "25px" }}
              >
                <span className="p-float-label">
                  <Field
                    type="text"
                    id="description"
                    name="description"
                    as={InputText}
                    className="p-inputtext"
                  />
                  <label htmlFor="description">Product Description</label>
                </span>
                <ErrorMessage
                  name="description"
                  component="small"
                  className="p-error"
                />
              </div>
            </div>

            <div
              className="p-d-flex p-jc-center"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                paddingTop: "30px",
              }}
            >
              <Button type="submit" label="Add" className="p-button-success" />
              <Button
                type="button"
                label="Cancel"
                className="p-button-secondary"
                onClick={closeModal}
              />
            </div>
          </Form>
        </Formik>
        {loading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
      </div>
    </Dialog>
  );

};

export default AddProductModal;


