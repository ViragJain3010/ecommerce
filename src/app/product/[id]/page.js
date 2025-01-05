// app/product/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "@/store/slices/ProductSlice";
import { addToCart } from "@/store/slices/CartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { Star } from "lucide-react";
import ImageWithShimmer from "@/components/Shimmer";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useParams } from "next/navigation";
import ProductSkeleton from "@/components/ProductSkeleton";
// import { ReloadIcon } from "@radix-ui/react-icons";

export default function ProductDetail() {
  const params = useParams(); // Gets params as a Promise
  const dispatch = useDispatch();
  const {selectedProduct: product, loading, error} = useSelector(state => state.products);
  const { toast } = useToast();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
      action: (
        <ToastAction
          altText="View cart"
          onClick={() => (window.location.href = "/cart")}
        >
          View cart
        </ToastAction>
      ),
    });
  };

  useEffect(() => {
    // If params is a Promise, unwrap it using `Promise.resolve` or `await`
    Promise.resolve(params).then((resolvedParams) => {
      const productId = resolvedParams.id; // Unwrap the id
      dispatch(getProductById(productId));
    });
  }, [params, dispatch]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ProductSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              {/* <ReloadIcon className="mr-2 h-4 w-4" /> */}
              Retry
            </Button>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96">
                <ImageWithShimmer
                  src={product?.thumbnail}
                  alt={product?.title}
                  className="object-contain w-full h-full rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{product?.title}</h1>
                <p className="text-gray-600">{product?.description}</p>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
                  <span>
                    {product?.rating} ({product?.stock} in stock)
                  </span>
                </div>
                <p className="text-2xl font-bold">${product?.price}</p>
                <p className="text-sm text-gray-500 capitalize">
                  Category: {product?.category}
                </p>
                <Button size="lg" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
