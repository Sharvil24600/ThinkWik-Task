import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { editProduct } from "../redux/productSlice";
import { loaderTimer } from "../config/config";
import Loader from "./Loader/Loader";
import { InputText } from "primereact/inputtext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
}

interface EditProductModalProps {
  selectedProduct: Product | null;
  closeEditModal: () => void;
  showToast: () => void; // Add showToast prop
}

const validationSchema = Yup.object({
  code: Yup.string().required("Product Code is required"),
  name: Yup.string().required("Product Name is required"),
  description: Yup.string().required("Product Description is required"),
});

const EditProductModal: React.FC<EditProductModalProps> = ({
  selectedProduct,
  closeEditModal,
  showToast,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const [initialValues, setInitialValues] = useState<Product>({
    id: 0,
    code: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setInitialValues(selectedProduct);
    }
  }, [selectedProduct]);

  const handleSubmit = (values: Product) => {
    setLoading(true); // Start the loading state
    const editedProduct: Product = {
      ...values,
      id: selectedProduct ? selectedProduct.id : 0,
    };
    if (isFormValid(values)) {
      setTimeout(() => {
        dispatch(editProduct(editedProduct));
        showToast();
        closeEditModal();
        setLoading(false);
      }, loaderTimer);
    } else {
      setLoading(false);
    }
  };

  const isFormValid = (values: Product) => {
    return (
      values.code.trim() !== "" &&
      values.name.trim() !== "" &&
      values.description.trim() !== ""
    );
  };

  const isFormEdited = (values: Product) => {
    return (
      values.code !== selectedProduct?.code ||
      values.name !== selectedProduct?.name ||
      values.description !== selectedProduct?.description
    );
  };

return (
    <Dialog
      header="Edit Product"
      visible
      onHide={closeEditModal}
      style={{ width: "40vw", textAlign: "center" }}
      className="p-dialog-sm"
      closeOnEscape={false}
      closable={!loading} 
      draggable={false}
    >
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
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

              {/* Buttons */}
              <div
                className="p-d-flex p-jc-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  paddingTop: "30px",
                }}
              >
                <Button
                  type="submit"
                  label="Edit"
                  className="p-button-success"
                  disabled={!isFormValid(values) || !isFormEdited(values)}
                />
                <Button
                  type="button"
                  label="Cancel"
                  className="p-button-secondary"
                  onClick={closeEditModal}
                />
              </div>
            </Form>
          )}
        </Formik>

        {loading && <Loader />}
      </div>
    </Dialog>
  );
};

export default EditProductModal;
