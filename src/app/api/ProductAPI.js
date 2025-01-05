// app/api/ProductAPI.js
const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (page = 1, limit = 15) => {
  try {
    const skip = (page - 1) * limit;
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return {
      products: data.products,
      total: data.total,
      currentPage: page,
      totalPages: Math.ceil(data.total / limit)
    };
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

export const searchProducts = async (query, page = 1, limit = 15) => {
  try {
    const skip = (page - 1) * limit;
    const response = await fetch(`${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return {
      products: data.products,
      total: data.total,
      currentPage: page,
      totalPages: Math.ceil(data.total / limit)
    };
  } catch (error) {
    throw new Error(`Failed to search products: ${error.message}`);
  }
};

export const fetchProductsByCategory = async (category, page = 1, limit = 15) => {
  try {
    const skip = (page - 1) * limit;
    const response = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return {
      products: data.products,
      total: data.total,
      currentPage: page,
      totalPages: Math.ceil(data.total / limit),
      category
    };
  } catch (error) {
    throw new Error(`Failed to fetch products by category: ${error.message}`);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const categories = await response.json();
    return categories.map(category => ({
      slug: category.slug,
      name: category.name,
      url: category.url
    }));
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
};