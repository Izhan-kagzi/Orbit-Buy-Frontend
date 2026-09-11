import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGridSkeleton = ({ count = 8, columns = "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" }) => {
  return (
    <div className={`grid grid-cols-1 ${columns} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
