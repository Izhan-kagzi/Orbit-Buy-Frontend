import { useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const ReviewSection = ({ product }) => {
  const [reviews] = useState(
    product.reviewList || [
      {
        id: 1,
        name: "Rahul Sharma",
        rating: 5,
        comment:
          "Excellent quality! Fabric feels premium and the fitting is perfect. Definitely worth the price.",
        date: "12 July 2026",
        verified: true,
        helpful: 18,
      },
      {
        id: 2,
        name: "Priya Patel",
        rating: 4,
        comment:
          "Very comfortable to wear. Delivery was quick and packaging was excellent.",
        date: "08 July 2026",
        verified: true,
        helpful: 11,
      },
      {
        id: 3,
        name: "Aman Verma",
        rating: 5,
        comment:
          "Looks exactly like the photos. Highly recommended!",
        date: "02 July 2026",
        verified: false,
        helpful: 7,
      },
    ]
  );

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    return (
      reviews.reduce((sum, item) => sum + item.rating, 0) /
      reviews.length
    ).toFixed(1);
  }, [reviews]);

  const ratingCount = (rating) =>
    reviews.filter((item) => item.rating === rating).length;

  return (
    <section>

      {/* Rating Summary */}

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Left */}

        <div
          className="
            rounded-3xl
            border
            border-gray-200
            p-8
          "
        >

          <h2 className="text-3xl font-black">
            Customer Reviews
          </h2>

          <div className="flex items-end gap-4 mt-6">

            <span className="text-6xl font-black">
              {averageRating}
            </span>

            <div>

              <div className="flex gap-1">

                {[...Array(5)].map((_, index) => (

                  <FaStar
                    key={index}
                    className={`text-xl ${
                      index < Math.round(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />

                ))}

              </div>

              <p className="text-gray-500 mt-2">
                Based on {reviews.length} Reviews
              </p>

            </div>

          </div>

        </div>

        {/* Rating Breakdown */}

        <div
          className="
            rounded-3xl
            border
            border-gray-200
            p-8
          "
        >

          {[5, 4, 3, 2, 1].map((star) => {

            const count = ratingCount(star);

            const percentage =
              reviews.length > 0
                ? (count / reviews.length) * 100
                : 0;

            return (

              <div
                key={star}
                className="flex items-center gap-4 mb-5"
              >

                <span className="w-8 font-semibold">
                  {star}★
                </span>

                <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-yellow-400 rounded-full"
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

          })}

        </div>

      </div>

      {/* Reviews List */}
            <div className="mt-14 space-y-8">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-300
            "
          >

            {/* Header */}

            <div className="flex items-start justify-between gap-5">

              <div className="flex items-center gap-4">

                {/* Avatar */}

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-brand-primary
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-lg
                  "
                >
                  {review.name
                    ? review.name.charAt(0).toUpperCase()
                    : <FiUser />}
                </div>

                <div>

                  <div className="flex items-center gap-3">

                    <h3 className="font-bold text-lg">
                      {review.name}
                    </h3>

                    {review.verified && (

                      <span
                        className="
                          bg-green-100
                          text-green-700
                          text-xs
                          px-3
                          py-1
                          rounded-full
                          font-semibold
                        "
                      >
                        ✓ Verified Purchase
                      </span>

                    )}

                  </div>

                  <p className="text-gray-500 text-sm mt-1">
                    {review.date}
                  </p>

                </div>

              </div>

              {/* Rating */}

              <div className="flex gap-1">

                {[...Array(5)].map((_, index) => (

                  <FaStar
                    key={index}
                    className={`text-lg ${
                      index < review.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />

                ))}

              </div>

            </div>

            {/* Comment */}

            <p className="text-gray-600 leading-8 mt-6">
              {review.comment}
            </p>

            {/* Footer */}

            <div className="flex items-center justify-between mt-8">

              <button
                className="
                  px-5
                  py-2
                  rounded-full
                  border
                  border-gray-300
                  hover:bg-brand-primary
                  hover:text-white
                  transition-all
                  duration-300
                  text-sm
                  font-semibold
                "
              >
                👍 Helpful ({review.helpful})
              </button>

              <span className="text-sm text-gray-400">
                Orbit Buy Customer
              </span>

            </div>

          </div>

        ))}

      </div>

      {/* Write Review */}
            <div className="mt-20">

        <div
          className="
            bg-gray-50
            border
            border-gray-200
            rounded-3xl
            p-8
          "
        >

          <h2 className="text-3xl font-black mb-8">
            Write a Review
          </h2>

          {/* Rating */}

          <div className="mb-6">

            <label className="block font-semibold mb-3">
              Your Rating
            </label>

            <div className="flex gap-2">

              {[1, 2, 3, 4, 5].map((star) => (

                <button
                  key={star}
                  type="button"
                  className="
                    text-3xl
                    text-yellow-400
                    hover:scale-110
                    transition
                  "
                >
                  <FaStar />
                </button>

              ))}

            </div>

          </div>

          {/* Name */}

          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Your Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-5
                py-4
                outline-none
                focus:border-brand-primary
                transition
              "
            />

          </div>

          {/* Email */}

          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-5
                py-4
                outline-none
                focus:border-brand-primary
                transition
              "
            />

          </div>

          {/* Review */}

          <div className="mb-8">

            <label className="block font-semibold mb-2">
              Your Review
            </label>

            <textarea
              rows="6"
              placeholder="Share your experience with this product..."
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-5
                py-4
                resize-none
                outline-none
                focus:border-brand-primary
                transition
              "
            />

          </div>

          {/* Submit */}

          <button
            type="button"
            className="
              w-full
              bg-brand-primary
              text-white
              py-4
              rounded-xl
              text-lg
              font-bold
              hover:bg-brand-brown
              transition-all
              duration-300
            "
          >
            Submit Review
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Your review will appear after approval.
          </p>

        </div>

      </div>

    </section>
  );
};

export default ReviewSection;