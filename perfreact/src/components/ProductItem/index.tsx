import { memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  },

  onAddToWishlist: (id: number) => void;
}

export function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  return (
    <div>
      { product.title } - <strong>R$ {product.price}</strong>

      <button onClick={() => onAddToWishlist(product.id)}>Add to wishlist</button>
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
});