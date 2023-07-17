import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
}

interface DataState {
  products: Product[];
}

const storedData = localStorage.getItem("products");
const initialProducts: Product[] = storedData ? JSON.parse(storedData) : [];

const initialState: DataState = {
  products: initialProducts.length > 0 ? initialProducts : [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const newProduct: Product = {
        ...action.payload,
      };
      state.products.push(newProduct);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const editedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === editedProduct.id
      );
      if (index !== -1) {
        state.products[index] = editedProduct;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
  },
});

export const { addProduct, deleteProduct, editProduct } = productSlice.actions;
export default productSlice.reducer;