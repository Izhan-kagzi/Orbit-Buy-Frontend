const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="skeleton h-4 w-64 rounded mb-10" />

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="skeleton w-full aspect-square rounded-2xl" />

        <div className="space-y-5">
          <div className="skeleton h-8 w-3/4 rounded" />
          <div className="skeleton h-5 w-1/3 rounded" />
          <div className="skeleton h-10 w-1/2 rounded" />
          <div className="skeleton h-24 w-full rounded" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-11 w-11 rounded-lg" />
            ))}
          </div>
          <div className="flex gap-4 mt-8">
            <div className="skeleton h-14 flex-1 rounded-xl" />
            <div className="skeleton h-14 flex-1 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
