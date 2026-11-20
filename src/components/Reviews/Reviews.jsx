import { useCallback, useEffect, useState } from "react";
import { FiChevronUp, FiChevronDown, FiPlay, FiPause, FiStar } from "react-icons/fi";
import reviews from "./reviewData";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % reviews.length);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (!isPlaying || reviews.length < 2) return undefined;
    const timer = window.setInterval(showNext, 5000);
    return () => window.clearInterval(timer);
  }, [isPlaying, showNext]);

  const visibleReviews = [-2, -1, 0, 1, 2].map((offset) => {
    const index = (activeIndex + offset + reviews.length) % reviews.length;
    return { review: reviews[index], index, offset };
  });

  const activeReview = reviews[activeIndex];

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#eef0f7] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
         <div className="mb-5 inline-flex items-center gap-3 text-center">
            <span className="h-px w-10  bg-brand-primary/40"  />
            <p className="text-[11px] font-bold uppercase tracking-[5px] text-brand-primary">
              Client Stories
            </p>
            <span className="h-px w-10 bg-brand-primary/40" />
          </div>
          <h2 className="font-serif text-4xl leading-tight text-brand-dark sm:text-5xl md:text-6xl text-center">
            Loved by those who
            <span className="block italic text-brand-primary">
              wear Orbit Buy.
            </span>
          </h2>

          

        <div className="orbit-review-panel relative grid min-h-[430px] overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_18px_55px_rgba(24,39,75,0.09)] md:min-h-[430px] md:grid-cols-[minmax(270px,0.82fr)_1.45fr]">
          {/* Customer arc */}
          <div className="relative flex min-h-[245px] items-center justify-center overflow-hidden px-5 py-8 md:min-h-0 md:justify-start md:pl-8 md:py-10">
            <div className="orbit-review-rail" aria-hidden="true" />
            <div className="relative z-10 flex w-full flex-col items-center gap-3 md:items-stretch md:gap-2">
              {visibleReviews.map(({ review, index, offset }) => {
                const isActive = offset === 0;
                return (
                  <button
                    key={`${review.id}-${offset}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show review by ${review.name}`}
                    aria-pressed={isActive}
                    className={`orbit-review-person group flex w-full items-center gap-4 rounded-full text-left transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09335a] focus-visible:ring-offset-4 ${
                      isActive
                        ? "is-active md:translate-x-3"
                        : "opacity-55 hover:opacity-90"
                    }`}
                  >
                    <span
                      className={`orbit-review-avatar relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold transition-all duration-500 ${
                        isActive
                          ? "h-[66px] w-[66px] bg-[#09335a] text-xl text-white shadow-[0_8px_22px_rgba(207,67,139,0.22)]"
                          : "h-[46px] w-[46px] bg-[#eef0f7] text-[13px] text-[#17213b]"
                      }`}
                    >
                      {getInitials(review.name)}
                    </span>
                    <span className="hidden min-w-0 flex-col md:flex">
                      <span className={`truncate text-sm ${isActive ? "text-[#101a32]" : "text-slate-500"}`}>
                        {review.name}
                      </span>
                      <span className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                        <FiStar className="fill-amber-400 text-amber-400" size={11} />
                        {review.rating.toFixed(1)} · {review.role || "Verified Customer"}
                      </span>
                    </span>
                    {isActive && (
                      <span className="ml-auto hidden h-2 w-2 rounded-full bg-[#09335a] md:block" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active testimonial */}
          <div className="flex flex-col justify-center px-7 pb-8 pt-2 sm:px-10 md:px-12 md:py-12 lg:px-14">
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
              <span className="font-semibold text-[#101a32]">
                {activeReview.rating.toFixed(1)} out of 5
              </span>
              <span className="text-slate-300">·</span>
              <span>{reviews.length} reviews</span>
            </div>

            <div className="mb-7 flex gap-1" aria-label={`${activeReview.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <FiStar
                  key={index}
                  size={15}
                  className={index < activeReview.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                />
              ))}
            </div>

            <blockquote
              key={activeReview.id}
              className="orbit-review-quote text-[23px] font-medium leading-[1.38] tracking-[-0.035em] text-[#17213b] sm:text-[27px] lg:text-[30px]"
            >
              “{activeReview.review}”
            </blockquote>

            <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#17213b]">{activeReview.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {activeReview.role || "Verified Orbit Buy Customer"}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous review"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#17213b] transition hover:border-[] hover:bg-[] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09335a]"
                >
                  <FiChevronUp size={17} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next review"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#17213b] transition hover:border-[] hover:bg-[] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09335a]"
                >
                  <FiChevronDown size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying((playing) => !playing)}
                  aria-label={isPlaying ? "Pause automatic reviews" : "Play automatic reviews"}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#17213b] transition hover:border-[#09335a] hover:bg-[#09335a] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#09335a]"
                >
                  {isPlaying ? <FiPause size={15} /> : <FiPlay size={15} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-1.5 md:hidden" aria-label="Select a review">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to review ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-6 bg-[#09335a]" : "w-1.5 bg-slate-300"}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .orbit-review-rail {
          position: absolute;
          left: 51px;
          top: 9%;
          bottom: 9%;
          width: 2px;
          background-image: radial-gradient(circle, #b9c1d5 1px, transparent 1.5px);
          background-size: 2px 9px;
          background-repeat: repeat-y;
          opacity: .9;
        }
        .orbit-review-person { min-height: 56px; }
        .orbit-review-person.is-active { min-height: 76px; }
        .orbit-review-quote { animation: orbitReviewFade .45s ease both; }
        @keyframes orbitReviewFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 767px) {
          .orbit-review-rail { display: none; }
          .orbit-review-person { width: auto; min-height: 0; }
          .orbit-review-person.is-active { transform: scale(1.08); }
          .orbit-review-avatar { border: 2px solid white; }
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-review-quote { animation: none; }
          .orbit-review-person, .orbit-review-avatar { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default Reviews;
