import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        }
    }
});

export const { setProducts } = productSlice.actions;

export const store = configureStore({
    reducer: {
        product: productSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
