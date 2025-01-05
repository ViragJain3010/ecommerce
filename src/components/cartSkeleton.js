import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CartSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-4 py-4 border-b">
              <div className="relative w-24 h-24 bg-gray-200 rounded animate-pulse" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />
                <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4">
            <div className="h-6 bg-gray-200 rounded w-1/6 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
          </div>
          <div className="flex justify-end gap-4">
            <div className="w-40 h-10 bg-gray-200 rounded animate-pulse" />
            <div className="w-32 h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartSkeleton;

