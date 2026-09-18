import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import api, {
  getImageUrl,
} from "../../services/api";

import {
  FiSearch,
  FiStar,
  FiMessageCircle,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [ratingFilter, setRatingFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [replyingId, setReplyingId] =
    useState(null);

  const [replyText, setReplyText] =
    useState("");

  const [savingReply, setSavingReply] =
    useState(false);

  const [actionLoading, setActionLoading] =
    useState(null);

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState("");

  const [counts, setCounts] = useState({
    pending: 0,
    unanswered: 0,
  });

  const loadReviews = async () => {
    setLoading(true);
    setError("");

    const params = new URLSearchParams();

    // The backend filters on `q`, `rating` and `approved`.
    if (search.trim()) {
      params.set("q", search.trim());
    }

    if (ratingFilter !== "all") {
      params.set("rating", ratingFilter);
    }

    if (statusFilter === "approved") {
      params.set("approved", "true");
    }

    if (statusFilter === "pending") {
      params.set("approved", "false");
    }

    if (statusFilter === "replied") {
      params.set("replied", "true");
    }

    if (statusFilter === "unanswered") {
      params.set("replied", "false");
    }

    const query = params.toString();

    try {
      const response = await api.get(
        `/reviews${query ? `?${query}` : ""}`
      );

      setReviews(response?.reviews || []);

      setCounts({
        pending: Number(response?.pending) || 0,
        unanswered: Number(response?.unanswered) || 0,
      });
    } catch (err) {
      setReviews([]);

      setError(
        err.message ||
          "Unable to load reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [ratingFilter, statusFilter]);

  const filteredReviews = useMemo(() => {
    if (!search.trim()) {
      return reviews;
    }

    const keyword =
      search.toLowerCase();

    return reviews.filter((review) =>
      [
        review.userName,
        review.userEmail,
        review.productName,
        review.comment,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(keyword)
        )
    );
  }, [reviews, search]);

  const showSuccess = (text) => {
    setSuccess(text);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const startReply = (review) => {
    setReplyingId(review.id);

    setReplyText(
      review.reply?.message || ""
    );

    setError("");
  };

  const cancelReply = () => {
    setReplyingId(null);
    setReplyText("");
  };

  const saveReply = async (reviewId) => {
    if (!replyText.trim()) {
      setError("Reply cannot be empty.");
      return;
    }

    setSavingReply(true);
    setError("");

    try {
      const response = await api.put(
        `/reviews/${reviewId}/reply`,
        {
          reply: replyText.trim(),
        }
      );

      showSuccess(
        response?.message ||
          "Reply saved successfully."
      );

      cancelReply();

      await loadReviews();
    } catch (err) {
      setError(
        err.message ||
          "Unable to save reply."
      );
    } finally {
      setSavingReply(false);
    }
  };

  const deleteReply = async (reviewId) => {
    const confirmed = window.confirm(
      "Delete this Orbit Buy reply?"
    );

    if (!confirmed) return;

    setActionLoading(
      `reply-delete-${reviewId}`
    );

    try {
      await api.delete(
        `/reviews/${reviewId}/reply`
      );

      showSuccess(
        "Reply deleted successfully."
      );

      await loadReviews();
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete reply."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const deleteReview = async (review) => {
    const confirmed = window.confirm(
      `Delete the review from ${
        review.userName ||
        "this customer"
      }?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setActionLoading(
      `review-delete-${review.id}`
    );

    try {
      await api.delete(
        `/reviews/${review.id}`
      );

      showSuccess(
        "Customer review deleted successfully."
      );

      // Drop it locally straight away so the row disappears even
      // if the refetch is slow.
      setReviews((previous) =>
        previous.filter(
          (item) => item.id !== review.id
        )
      );

      await loadReviews();
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete review."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const approveReview = async (
    reviewId,
    approved = true
  ) => {
    setActionLoading(
      `approve-${reviewId}`
    );

    try {
      const response = await api.put(
        `/reviews/${reviewId}/approve`,
        { approved }
      );

      showSuccess(
        response?.message ||
          (approved
            ? "Review approved successfully."
            : "Review hidden from the storefront.")
      );

      await loadReviews();
    } catch (err) {
      setError(
        err.message ||
          "Unable to update review."
      );
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-brand-primary">
              Customer Feedback
            </p>

            <h1 className="mt-2 text-4xl font-serif font-bold text-brand-dark">
              Reviews
            </h1>

            <p className="mt-2 text-gray-500">
              Manage customer product reviews and
              reply as Orbit Buy.
            </p>
          </div>

          <button
            type="button"
            onClick={loadReviews}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-brand-dark shadow-sm transition hover:border-brand-primary hover:text-brand-primary"
          >
            <FiRefreshCw
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>

        {/* ==================================================
            ALERTS
        ================================================== */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-4 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {/* ==================================================
            FILTERS
        ================================================== */}

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px]">
            <div className="relative">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    loadReviews();
                  }
                }}
                placeholder="Search customer, email, product or review..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-brand-primary"
              />
            </div>

            <select
              value={ratingFilter}
              onChange={(event) =>
                setRatingFilter(
                  event.target.value
                )
              }
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand-primary"
            >
              <option value="all">
                All Ratings
              </option>
              <option value="5">
                5 Stars
              </option>
              <option value="4">
                4 Stars
              </option>
              <option value="3">
                3 Stars
              </option>
              <option value="2">
                2 Stars
              </option>
              <option value="1">
                1 Star
              </option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand-primary"
            >
              <option value="all">
                All Status
              </option>
              <option value="approved">
                Approved
              </option>
              <option value="pending">
                Pending
              </option>
              <option value="replied">
                Replied
              </option>
              <option value="unanswered">
                Not replied
              </option>
            </select>
          </div>
        </div>

        {/* ==================================================
            SUMMARY
        ================================================== */}

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Total Reviews
            </p>

            <p className="mt-2 text-3xl font-black text-brand-dark">
              {filteredReviews.length}
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              5 Star Reviews
            </p>

            <p className="mt-2 text-3xl font-black text-brand-dark">
              {
                filteredReviews.filter(
                  (review) =>
                    Number(
                      review.rating
                    ) === 5
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              Replies
            </p>

            <p className="mt-2 text-3xl font-black text-brand-dark">
              {
                filteredReviews.filter(
                  (review) =>
                    review.reply?.message
                ).length
              }
            </p>

            {counts.unanswered > 0 && (
              <p className="mt-1 text-xs font-semibold text-amber-600">
                {counts.unanswered} awaiting a reply
              </p>
            )}
          </div>
        </div>

        {/* ==================================================
            REVIEWS
        ================================================== */}

        {loading ? (
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-3xl border border-gray-200 bg-white p-7"
              >
                <div className="h-5 w-1/3 rounded bg-gray-200" />
                <div className="mt-5 h-4 w-full rounded bg-gray-200" />
                <div className="mt-3 h-4 w-4/5 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-14 text-center">
            <FiMessageCircle
              className="mx-auto text-gray-300"
              size={45}
            />

            <h2 className="mt-5 text-2xl font-bold text-brand-dark">
              No reviews found
            </h2>

            <p className="mt-2 text-gray-500">
              Customer product reviews will appear
              here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map(
              (review) => (
                <article
                  key={review.id}
                  className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
                >
                  {/* TOP */}
                  <div className="border-b border-gray-100 p-7">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-primary font-bold text-white">
                          {(
                            review.userName ||
                            "C"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-lg font-bold text-brand-dark">
                              {review.userName ||
                                "Customer"}
                            </h2>

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                              {review.userEmail ||
                                "No email"}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-gray-400">
                            {formatDate(review.createdAt)}
                          </p>

                          <div className="mt-3 flex gap-1">
                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <FiStar
                                  key={star}
                                  className={
                                    star <=
                                    Number(
                                      review.rating
                                    )
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {review.approved ? (
                          <button
                            type="button"
                            disabled={
                              actionLoading ===
                              `approve-${review.id}`
                            }
                            onClick={() =>
                              approveReview(
                                review.id,
                                false
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-amber-400 hover:text-amber-600 disabled:opacity-60"
                            title="Hide this review from the storefront"
                          >
                            <FiX />

                            Hide
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={
                              actionLoading ===
                              `approve-${review.id}`
                            }
                            onClick={() =>
                              approveReview(
                                review.id,
                                true
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                          >
                            <FiCheck />

                            Approve
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            startReply(
                              review
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
                        >
                          {review.reply ? (
                            <FiEdit2 />
                          ) : (
                            <FiMessageCircle />
                          )}

                          {review.reply
                            ? "Edit Reply"
                            : "Reply"}
                        </button>

                        <button
                          type="button"
                          disabled={
                            actionLoading ===
                            `review-delete-${review.id}`
                          }
                          onClick={() =>
                            deleteReview(
                              review
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                        >
                          <FiTrash2 />

                          Delete
                        </button>
                      </div>
                    </div>

                    {/* PRODUCT */}
                    <div className="mt-6 flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                      {review.productImage ? (
                        <img
                          src={getImageUrl(
                            review.productImage
                          )}
                          alt={
                            review.productName ||
                            "Product"
                          }
                          className="h-16 w-16 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-xl bg-gray-200" />
                      )}

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                          Product
                        </p>

                        <p className="mt-1 font-bold text-brand-dark">
                          {review.productName ||
                            "Unknown Product"}
                        </p>
                      </div>
                    </div>

                    {/* COMMENT */}
                    <div className="mt-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Customer Review
                      </p>

                      <p className="mt-3 leading-8 text-gray-600">
                        {review.comment}
                      </p>
                    </div>
                  </div>

                  {/* REPLY */}
                  {replyingId ===
                  review.id ? (
                    <div className="border-t border-brand-primary/10 bg-brand-primary/[0.03] p-7">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-brand-dark">
                          {review.reply
                            ? "Edit Orbit Buy Reply"
                            : "Reply to Customer"}
                        </h3>

                        <button
                          type="button"
                          onClick={
                            cancelReply
                          }
                          className="rounded-full p-2 text-gray-400 hover:bg-white hover:text-gray-700"
                        >
                          <FiX />
                        </button>
                      </div>

                      <textarea
                        value={replyText}
                        onChange={(event) =>
                          setReplyText(
                            event.target.value
                          )
                        }
                        rows="5"
                        maxLength={1000}
                        placeholder="Write a professional reply to the customer..."
                        className="mt-5 w-full resize-none rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-brand-primary"
                      />

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-xs text-gray-400">
                          {replyText.length}/1000
                        </span>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={
                              cancelReply
                            }
                            className="rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            disabled={
                              savingReply
                            }
                            onClick={() =>
                              saveReply(
                                review.id
                              )
                            }
                            className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
                          >
                            {savingReply
                              ? "Saving..."
                              : "Save Reply"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    review.reply?.message && (
                      <div className="border-t border-gray-100 bg-gray-50 p-7">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                              Orbit Buy Reply
                            </p>

                            <p className="mt-3 leading-7 text-gray-600">
                              {review.reply.message}
                            </p>

                            <p className="mt-3 text-xs text-gray-400">
                              Replied by{" "}
                              <strong>
                                {review.reply
                                  .repliedByName ||
                                  "Orbit Buy"}
                              </strong>{" "}
                              (
                              {review.reply
                                .repliedByRole ||
                                "staff"}
                              )
                            </p>
                          </div>

                          <div className="flex shrink-0 gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                startReply(
                                  review
                                )
                              }
                              className="rounded-xl border border-gray-200 bg-white p-3 text-gray-500 transition hover:border-brand-primary hover:text-brand-primary"
                              title="Edit reply"
                            >
                              <FiEdit2 />
                            </button>

                            <button
                              type="button"
                              disabled={
                                actionLoading ===
                                `reply-delete-${review.id}`
                              }
                              onClick={() =>
                                deleteReply(
                                  review.id
                                )
                              }
                              className="rounded-xl border border-red-200 bg-white p-3 text-red-500 transition hover:bg-red-50 disabled:opacity-60"
                              title="Delete reply"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </article>
              )
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminReviews;