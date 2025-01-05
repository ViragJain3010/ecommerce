// components/ProductSkeleton.js
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const ProductSkeleton = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="relative h-48 w-full mb-4 bg-gray-200 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
      </CardContent>
      <CardFooter>
        <div className="h-9 bg-gray-200 rounded w-full animate-pulse" />
      </CardFooter>
    </Card>
  );
};

export default ProductSkeleton;
