// app/page.js
"use client";

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchFilter,
  setCategoryFilter,
  setSortBy,
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProductsAsync
} from "@/store/slices/ProductSlice";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import debounce from '@/utils/debouce';


export default function Home() {
  const dispatch = useDispatch();
  const { categories, filters, pagination, loading } = useSelector(
    (state) => state.products
  );
  const { itemsPerPage } = pagination;

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts({ page: 1, limit: itemsPerPage }));
  }, [dispatch, itemsPerPage]);

  // Using useCallback to maintain reference stability
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length > 0) {
        dispatch(searchProductsAsync({ query, page: 1, limit: itemsPerPage }));
      } else {
        dispatch(getProducts({ page: 1, limit: itemsPerPage }));
      }
    }, 300),
    [dispatch] // Dependency to ensure stability
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(setSearchFilter(query));
    debouncedSearch(query);
  };

  const handleCategoryChange = (value) => {
    if (value === "all") {
      dispatch(setCategoryFilter(""));
      dispatch(getProducts({ page: 1, limit: itemsPerPage }));
    } else {
      dispatch(
        getProductsByCategory({
          category: value,
          page: 1,
          limit: itemsPerPage,
        })
      );
    }
  };

  const handleSortChange = (value) => {
    dispatch(setSortBy(value === "default" ? "" : value));
  };

  const handleReset = () => {
    dispatch(setCategoryFilter(""));
    dispatch(setSortBy(""));
    dispatch(setSearchFilter(""));
    dispatch(getProducts({ page: 1, limit: itemsPerPage }));
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Search</h2>
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Categories</h2>
              <Select
                onValueChange={handleCategoryChange}
                value={filters.category || "all"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Sort by</h2>
              <Select
                onValueChange={handleSortChange}
                value={filters.sortBy || "default"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleReset}>Reset Filters</Button>
          </aside>
          <div className="w-full md:w-3/4">
            <ProductList />
          </div>
        </div>
      </div>
    </main>
  );
}
