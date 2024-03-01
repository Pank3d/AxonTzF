import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getProduct } from "../api/api";
import { Product } from "../type/type";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    try {
      const products = await getProduct();
      console.log(products);
      return products;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { setProducts, addProduct, editProduct, deleteProduct } = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.products;

export default productSlice.reducer;
