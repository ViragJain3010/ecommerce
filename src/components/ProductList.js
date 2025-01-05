// components/ProductList.js
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import ProductSkeleton from './ProductSkeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { getProducts, getProductsByCategory, searchProductsAsync } from '@/store/slices/ProductSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filters, pagination } = useSelector(state => state.products);
  const { currentPage, totalPages, itemsPerPage } = pagination;

  const handlePageChange = (newPage) => {
    if (filters.category) {
      dispatch(getProductsByCategory({ 
        category: filters.category, 
        page: newPage,
        limit: itemsPerPage 
      }));
    } else if (filters.search) {
      dispatch(searchProductsAsync({ 
        query: filters.search, 
        page: newPage,
        limit: itemsPerPage 
      }));
    } else {
      dispatch(getProducts({ 
        page: newPage,
        limit: itemsPerPage 
      }));
    }
  };
  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Error loading products</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        <Button 
          variant="outline" 
          className="mt-2"
          onClick={() => dispatch(getProducts({ page: 1, limit: itemsPerPage }))}
        >
          Retry
        </Button>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(15)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  const sortedItems = [...items].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {sortedItems.map(product => (
          <ProductCard 
            key={product.id} 
            product={{
              ...product,
              image: product.thumbnail, // Map thumbnail to image for compatibility
              rating: { rate: product.rating } // Map rating for compatibility
            }} 
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default ProductList;
