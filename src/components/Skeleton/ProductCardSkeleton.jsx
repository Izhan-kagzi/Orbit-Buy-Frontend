const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="skeleton w-full h-96" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="flex gap-3 mt-4">
          <div className="skeleton h-11 flex-1 rounded-lg" />
          <div className="skeleton h-11 flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
