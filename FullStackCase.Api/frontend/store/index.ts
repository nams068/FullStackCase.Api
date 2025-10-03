import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

// ------------------ Product Slice ------------------
interface ProductState {
    products: Product[];
}

const initialProductState: ProductState = {
    products: []
};

const productSlice = createSlice({
    name: "product",
    initialState: initialProductState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        }
    }
});

// ------------------ Auth Slice ------------------
interface AuthState {
    token: string | null;
    email: string | null;
}

const initialAuthState: AuthState = {
    token: null,
    email: null
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        setAuth(state, action: PayloadAction<{ token: string; email: string }>) {
            state.token = action.payload.token;
            state.email = action.payload.email;
        },
        logout(state) {
            state.token = null;
            state.email = null;
        }
    }
});

// ------------------ Store ------------------
export const { setProducts } = productSlice.actions;
export const { setAuth, logout } = authSlice.actions;

export const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        auth: authSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
