import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "../../axios-client";

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get("/cart");
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({productId, quantity}, {rejectWithValue}) => {
    try {
      const payload = {
        product_id: productId,
        quantity: quantity,
      };
      const response = await axiosClient.post("/cart", payload);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({cartId, newQuantity}, {rejectWithValue}) => {
    try {
      const payload = {
        quantity: newQuantity,
      };
      const response = await axiosClient.put(`/cart/${cartId}`, payload);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const clearAll = createAsyncThunk(
  "cart/clearCart",
  async (userId, {rejectWithValue}) => {
    try {
      const response = await axiosClient.delete(`/cart/${userId}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

export const clearItem = createAsyncThunk(
  "cart/clearItem",
  async ({userId, cartId}, {rejectWithValue}) => {
    try {
      const response = await axiosClient.delete(
        `/cart/${userId}/items/${cartId}`
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }
      throw err;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    cartItems: [],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserCart.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data;
        state.cartTotalQuantity = action.payload.total_quantity;
        state.cartTotalAmount = action.payload.total_amount;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(addToCart.pending, state => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data;
        state.cartTotalQuantity = action.payload.total_quantity;
        state.cartTotalAmount = action.payload.total_amount;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      state.cartItems = action.payload.data;
      state.cartTotalQuantity = action.payload.total_quantity;
      state.cartTotalAmount = action.payload.total_amount;
    });
    builder.addCase(clearAll.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.data;
      state.cartTotalQuantity = action.payload.total_quantity;
      state.cartTotalAmount = action.payload.total_amount;
    });
    builder.addCase(clearItem.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.data;
      state.cartTotalQuantity = action.payload.total_quantity;
      state.cartTotalAmount = action.payload.total_amount;
    });
  },
});

export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;
