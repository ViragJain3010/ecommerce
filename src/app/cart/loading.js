// components/ProductSkeleton.js
import CartSkeleton from '@/components/cartSkeleton';

export default function Loading(){
  return (
    <div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <CartSkeleton />
        </div>
      </div>
  );
};

