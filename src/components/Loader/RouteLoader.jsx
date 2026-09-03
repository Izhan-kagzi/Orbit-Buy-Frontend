// Suspense fallback shown only for the actual duration a lazy route
// chunk takes to download — no artificial delay is ever added here.
// Visually branded (not a generic spinner) but still cheap: pure
// CSS/SVG, no image requests, so it never becomes the bottleneck
// it's covering for.
const RouteLoader = () => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/70 backdrop-blur-sm animate-fadeIn">
      <div className="flex flex-col items-center gap-6">

        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-brand-tan/40" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-logo text-brand-primary text-2xl leading-none">O</span>
          </div>
        </div>

        <p className="text-[11px] uppercase tracking-[6px] text-brand-dark/70 font-semibold">
          Orbit Buy
        </p>

      </div>
    </div>
  );
};

export default RouteLoader;
