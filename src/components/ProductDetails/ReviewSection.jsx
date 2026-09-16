import { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  FiUser,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";

import api from "../../services/api";

const ReviewSection = ({ product }) => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [hoverRating, setHoverRating] = useState(0);

  const loadReviews = async () => {
    if (!product?.id) return;

    setLoading(true);

    const response = await api.get(
      `/reviews/product/${product.id}`,
      {
        auth: false,
      }
    );

    if (response?.success) {
      setReviews(response.reviews || []);
    } else {
      setReviews([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, [product?.id]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return "0.0";

    const total = reviews.reduce(
      (sum, review) =>
        sum + Number(review.rating || 0),
      0
    );

    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingCount = (star) =>
    reviews.filter(
      (review) =>
        Number(review.rating) === star
    ).length;

  const submitReview = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write your review.");
      return;
    }

    setSubmitting(true);

    const response = await api.post(
      "/reviews",
      {
        productId: product.id,
        rating,
        comment: comment.trim(),
      }
    );

    if (response?.success) {
      setMessage(
        response.message ||
          "Review submitted successfully."
      );

      setRating(0);
      setHoverRating(0);
      setComment("");

      await loadReviews();
    } else {
      setError(
        response?.message ||
          "Unable to submit your review."
      );
    }

    setSubmitting(false);
  };

  return (
    <section>
      {/* ====================================================
          RATING SUMMARY
      ==================================================== */}

      <div className="grid gap-12 lg:grid-cols-2">
        {/* LEFT */}
        <div className="rounded-3xl border border-gray-200 p-8">
          <h2 className="text-3xl font-black text-brand-dark">
            Customer Reviews
          </h2>

          <div className="mt-6 flex items-end gap-4">
            <span className="text-6xl font-black text-brand-dark">
              {averageRating}
            </span>

            <div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <FaStar
                      key={star}
                      className={`text-xl ${
                        star <=
                        Math.round(
                          Number(averageRating)
                        )
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  )
                )}
              </div>

              <p className="mt-2 text-gray-500">
                Based on {reviews.length}{" "}
                {reviews.length === 1
                  ? "Review"
                  : "Reviews"}
              </p>
            </div>
          </div>
        </div>

        {/* BREAKDOWN */}
        <div className="rounded-3xl border border-gray-200 p-8">
          {[5, 4, 3, 2, 1].map(
            (star) => {
              const count = ratingCount(star);

              const percentage =
                reviews.length > 0
                  ? (count / reviews.length) *
                    100
                  : 0;

              return (
                <div
                  key={star}
                  className="mb-5 flex items-center gap-4"
                >
                  <span className="w-8 font-semibold">
                    {star}★
                  </span>

                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <span className="w-8 text-right text-gray-500">
                    {count}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* ====================================================
          REVIEWS LIST
      ==================================================== */}

      <div className="mt-14 space-y-8">
        {loading ? (
          <>
            {[1, 2].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-3xl border border-gray-200 p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gray-200" />

                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                    <div className="h-3 w-24 rounded bg-gray-200" />
                  </div>
                </div>

                <div className="mt-6 h-4 w-full rounded bg-gray-200" />
                <div className="mt-3 h-4 w-4/5 rounded bg-gray-200" />
              </div>
            ))}
          </>
        ) : reviews.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <h3 className="text-2xl font-bold text-brand-dark">
              No reviews yet
            </h3>

            <p className="mt-3 text-gray-500">
              Be the first customer to review
              this product.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {/* HEADER */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white">
                    {review.userName ? (
                      review.userName
                        .charAt(0)
                        .toUpperCase()
                    ) : (
                      <FiUser />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-brand-dark">
                        {review.userName ||
                          "Orbit Buy Customer"}
                      </h3>

                      {review.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          <FiCheckCircle size={13} />
                          Verified Purchase
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {review.date}
                    </p>
                  </div>
                </div>

                {/* RATING */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <FaStar
                        key={star}
                        className={`text-lg ${
                          star <=
                          Number(review.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    )
                  )}
                </div>
              </div>

              {/* COMMENT */}
              <p className="mt-6 leading-8 text-gray-600">
                {review.comment}
              </p>

              {/* STAFF REPLY */}
              {review.reply?.text && (
                <div className="mt-7 rounded-2xl border border-brand-primary/10 bg-brand-primary/[0.04] p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                      O
                    </div>

                    <div>
                      <p className="font-bold text-brand-dark">
                        Orbit Buy
                      </p>

                      <p className="text-xs uppercase tracking-wider text-gray-400">
                        {review.reply.authorRole ===
                        "admin"
                          ? "Admin"
                          : "Manager"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 leading-7 text-gray-600">
                    {review.reply.text}
                  </p>
                </div>
              )}

              {/* FOOTER */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold transition-all duration-300 hover:bg-brand-primary hover:text-white"
                >
                  👍 Helpful ({review.helpful || 0})
                </button>

                <span className="text-sm text-gray-400">
                  Orbit Buy Customer
                </span>
              </div>
            </article>
          ))
        )}
      </div>

      {/* ====================================================
          WRITE REVIEW
      ==================================================== */}

      <div className="mt-20">
        <form
          onSubmit={submitReview}
          className="rounded-3xl border border-gray-200 bg-gray-50 p-8"
        >
          <h2 className="mb-8 text-3xl font-black text-brand-dark">
            Write a Review
          </h2>

          {/* RATING */}
          <div className="mb-7">
            <label className="mb-3 block font-semibold text-brand-dark">
              Your Rating
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() =>
                      setHoverRating(star)
                    }
                    onMouseLeave={() =>
                      setHoverRating(0)
                    }
                    onClick={() =>
                      setRating(star)
                    }
                    className="transition hover:scale-110"
                    aria-label={`Rate ${star} star`}
                  >
                    <FaStar
                      className={`text-3xl ${
                        star <=
                        (hoverRating ||
                          rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* REVIEW */}
          <div className="mb-7">
            <label className="mb-2 block font-semibold text-brand-dark">
              Your Review
            </label>

            <textarea
              rows="6"
              value={comment}
              onChange={(event) =>
                setComment(event.target.value)
              }
              maxLength={1000}
              placeholder="Share your experience with this product..."
              className="w-full resize-none rounded-xl border border-gray-300 px-5 py-4 outline-none transition focus:border-brand-primary"
            />

            <p className="mt-2 text-right text-xs text-gray-400">
              {comment.length}/1000
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {message && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {message}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-brand-primary py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-brand-brown disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSend />

            {submitting
              ? "Submitting..."
              : "Submit Review"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Please log in to submit a review.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ReviewSection;