const TableSkeleton = ({ rows = 6, cols = 5 }) => {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-6 px-6 py-5">
          {Array.from({ length: cols }).map((__, c) => (
            <div
              key={c}
              className={`skeleton h-4 rounded ${c === 0 ? "w-40" : "w-20"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
