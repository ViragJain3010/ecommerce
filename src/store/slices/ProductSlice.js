// src/store/slices/ProductSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchCategories,
  fetchProductById,
  fetchProductsByCategory,
  searchProducts
} from "@/app/api/ProductAPI";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ page = 1, limit = 15 }) => {
    return await fetchProducts(page, limit);
  }
);

export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    return await fetchCategories();
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id) => {
    return await fetchProductById(id);
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async ({ category, page = 1, limit = 15 }) => {
    return await fetchProductsByCategory(category, page, limit);
  }
);

export const searchProductsAsync = createAsyncThunk(
  "products/searchProducts",
  async ({ query, page = 1, limit = 15 }) => {
    return await searchProducts(query, page, limit);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null,
    filters: {
      search: "",
      category: "",
      sortBy: "",
    },
    pagination: {
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 15,
      total: 0
    }
  },
  reducers: {
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.filters.search = "";
      state.filters.category = "";
      state.filters.sortBy = "";
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Products cases
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.pagination = {
          ...state.pagination,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get Categories cases
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get Product By ID cases
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        // console.log(selectedProduct)
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.selectedProduct = null;
      })

      // Get Products By Category cases
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.pagination = {
          ...state.pagination,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
        state.filters.category = action.payload.category;
      })

      // Search Products cases
      .addCase(searchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.pagination = {
          ...state.pagination,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        };
      })
      .addCase(searchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  setSearchFilter, 
  setCategoryFilter, 
  setSortBy, 
  setCurrentPage, 
  setTotalPages,
  setPaginationData,
  resetFilters
} = productSlice.actions;
export default productSlice.reducer;
