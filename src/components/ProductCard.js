// components/ProductCard.js
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/CartSlice";
import ImageWithShimmer from "./Shimmer";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';


const ProductCard = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleProductClick = (e) => {
    e.preventDefault();
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
      action: <ToastAction altText="View cart" onClick={() => router.push('/cart')}>View cart</ToastAction>,
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div onClick={handleProductClick} className="cursor-pointer">
          <div className="relative h-48 w-full mb-4">
            <ImageWithShimmer
              src={product.image}
              alt={product.title}
              className="object-contain w-full h-full"
            />
          </div>
          <h3 className="text-lg font-semibold truncate">{product.title}</h3>
          <p className="text-gray-600">${product.price}</p>
        </div>
        <div className="mt-1">
          <Badge variant="secondary">{product.category}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
