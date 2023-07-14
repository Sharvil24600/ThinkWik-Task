import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productSlice";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import EditProductModal from "./EditProductModal";
import { useNavigate } from "react-router-dom";
import { loaderTimer } from "../config/config";
import { ProgressSpinner as Loader } from "primereact/progressspinner";
import "./loader.css";

interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
}

interface TableComponentProps {
  products: Product[];
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  products,
  onView,
  onEdit,
  onDelete,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const dispatch = useDispatch();
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleView = (rowData: Product) => {
    setSelectedProduct(rowData);
    navigate(`/product/view/${rowData.id}`);
  };

  const handleEdit = (rowData: Product) => {
    setSelectedProduct(rowData);
    setIsEditModalOpen(true);
  };

  const showToast = () => {
    toast.current?.show({
      severity: "success",
      summary: "Product Saved",
      detail: "The product has been updated successfully",
      life: 3000,
    });
  };

  const handleDelete = async (rowData: any) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        setLoading(true); // Start the loading state

        try {
          onDelete(rowData); // Optional: Call the onDelete prop if needed
          await dispatch(deleteProduct(rowData.id)); // dispatching an asynchronous action

          // Simulate delay for 5 seconds before stopping the loader
          setTimeout(() => {
            setLoading(false); // Stop the loading state after 5 seconds
            toast.current?.show({
              severity: "success",
              summary: "Success",
              detail: "Record deleted successfully",
              life: 3000,
            });
          }, loaderTimer);
        } catch (error) {
          console.error("An error occurred while deleting the record:", error);
          setLoading(false); // Stop the loading state if an error occurred
        }
      },
      reject: () => {
        toast.current?.show({
          severity: "warn",
          summary: "Rejected",
          detail: "Delete operation cancelled",
          life: 3000,
        });
      },
    });
  };

  const totalRecords = products.length;
  console.log("total", totalRecords);

  return (
    <>
      <div>
        <Toast ref={toast} />
        <ConfirmDialog />
        <div className="tableContainer">
          <DataTable
            value={products}
            paginator
            rows={5}
            rowsPerPageOptions={[2, 5, 10]}
            responsiveLayout="scroll"
            editMode="row"
            dataKey="id"
            rowHover
            removableSort
            totalRecords={totalRecords}
          >
            <Column field="code" header="Code" sortable></Column>
            <Column field="name" header="Name" sortable></Column>

            <Column field="description" header="Description" sortable></Column>
            <Column
              field="actions"
              header="Actions"
              body={(rowData) => (
                <div style={{ display: "flex", gap: "15px" }}>
                  <span onClick={() => handleView(rowData)}>
                    <i
                      className="pi pi-eye"
                      style={{ fontSize: "1rem", cursor: "pointer" }}
                    ></i>
                  </span>
                  <span onClick={() => handleEdit(rowData)}>
                    <i
                      className="pi pi-file-edit"
                      style={{
                        fontSize: "1rem",
                        cursor: "pointer",
                        color: "slateblue",
                      }}
                    ></i>
                  </span>
                  <span onClick={() => handleDelete(rowData)}>
                    <i
                      className="pi pi-trash"
                      style={{
                        fontSize: "1rem",
                        cursor: "pointer",
                        color: "red",
                      }}
                    ></i>
                  </span>
                </div>
              )}
            ></Column>
          </DataTable>
        </div>
      </div>

      {isEditModalOpen && (
        <EditProductModal
          selectedProduct={selectedProduct}
          closeEditModal={closeEditModal}
          showToast={showToast}
        />
      )}
      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </>
  );
};

export default TableComponent;
