/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { editProduct } from "../redux/productSlice";
import { loaderTimer } from "../config/config";
import Loader from "./Loader/Loader";
import { InputText } from "primereact/inputtext";

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

const EditProductModal: React.FC<EditProductModalProps> = ({
  selectedProduct,
  closeEditModal,
  showToast,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const [code, setCode] = useState(selectedProduct ? selectedProduct.code : "");
  const [name, setName] = useState(selectedProduct ? selectedProduct.name : "");
  const [description, setDescription] = useState(
    selectedProduct ? selectedProduct.description : ""
  );
  const [initialCode, setInitialCode] = useState(code); // Track initial code value
  const [initialName, setInitialName] = useState(name); // Track initial name value
  const [initialDescription, setInitialDescription] = useState(description); // Track initial description value

  
  const isFormValid = () => {
    return (
      code.trim() !== "" && name.trim() !== "" && description.trim() !== ""
    );
  };

  const isFormEdited = () => {
    return (
      code !== initialCode ||
      name !== initialName ||
      description !== initialDescription
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start the loading state
    const editedProduct: Product = {
      id: selectedProduct ? selectedProduct.id : 0,
      code,
      name,
      description,
    };

    if (isFormValid()) {
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

  return (
    <>
      <Dialog
        header="Edit Product"
        visible
        onHide={closeEditModal}
        style={{ width: "40vw", textAlign: "center" }}
        className="p-dialog-sm"
      >
        <div>
          <form onSubmit={handleSubmit}>
            <div className="p-fluid">
              <div
                className="p-field input-margin"
                style={{ paddingTop: "20px" }}
              >
                <span className="p-float-label">
                  <InputText
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="p-inputtext"
                  />
                  <label htmlFor="code">Product Code</label>
                </span>
              </div>
              <div
                className="p-field input-margin"
                style={{ paddingTop: "25px" }}
              >
                <span className="p-float-label">
                  <InputText
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-inputtext"
                  />
                  <label htmlFor="name">Product Name</label>
                </span>
              </div>
              <div
                className="p-field input-margin"
                style={{ paddingTop: "25px" }}
              >
                <span className="p-float-label">
                  <InputText
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-inputtext"
                  />
                  <label htmlFor="description">Product Description</label>
                </span>
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
                disabled={!isFormValid() || !isFormEdited()}
              />
              <Button
                type="button"
                label="Cancel"
                className="p-button-secondary"
                onClick={closeEditModal}
              />
            </div>
          </form>

          {loading && <Loader />}
        </div>
      </Dialog>
    </>
  );
};

export default EditProductModal;
