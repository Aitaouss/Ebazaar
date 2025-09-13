import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

interface ReviewStats {
  rating_breakdown: { rating: number; count: number }[];
  average_rating: number;
  total_reviews: number;
}

interface BuyerReviewsProps {
  userId: string | number;
}

export default function BuyerReviews({ userId }: BuyerReviewsProps) {
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewStats = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/stats/${userId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch review statistics");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching review stats:", err);
        setError("Failed to load review statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewStats();
  }, [userId]);

  // Calculate percentage for each rating
  const getRatingPercentage = (rating: number) => {
    if (!stats || stats.total_reviews === 0) return 0;
    const ratingData = stats.rating_breakdown.find((r) => r.rating === rating);
    return ratingData
      ? Math.round((ratingData.count / stats.total_reviews) * 100)
      : 0;
  };

  if (loading) {
    return (
      <div className="bg-white bg-overlay relative rounded-4xl shadow p-4 sm:p-6 border border-gray-200 w-full max-w-full md:max-w-xs mx-auto">
        <h2 className="text-base font-semibold text-gray-700 mb-2">
          Buyer Reviews
        </h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-3 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white bg-overlay relative rounded-4xl shadow p-4 sm:p-6 border border-gray-200 w-full max-w-full md:max-w-xs mx-auto">
        <h2 className="text-base font-semibold text-gray-700 mb-2">
          Buyer Reviews
        </h2>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!stats || stats.total_reviews === 0) {
    return (
      <div className="bg-white bg-overlay relative rounded-4xl shadow p-4 sm:p-6 border border-gray-200 w-full max-w-full md:max-w-xs mx-auto">
        <h2 className="text-base font-semibold text-gray-700 mb-2">
          Buyer Reviews
        </h2>
        <div className="text-center py-4">
          <div className="flex gap-0.5 justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-gray-300 text-lg" />
            ))}
          </div>
          <p className="text-gray-500 text-sm">No reviews yet</p>
        </div>
      </div>
    );
  }

  const averageRating = Number(stats.average_rating).toFixed(1);
  const filledStars = Math.floor(stats.average_rating);
  const hasHalfStar = stats.average_rating % 1 >= 0.5;

  return (
    <div className="bg-white bg-overlay relative rounded-4xl shadow p-4 sm:p-6 border border-gray-200 w-full max-w-full md:max-w-xs mx-auto">
      <h2 className="text-base font-semibold text-gray-700 mb-2">
        Buyer Reviews
      </h2>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl font-bold text-gray-800">
          {averageRating}
        </span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-lg ${
                i < filledStars
                  ? "text-[#015B46]"
                  : i === filledStars && hasHalfStar
                  ? "text-[#015B46]"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">
          based on {stats.total_reviews} review
          {stats.total_reviews !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="w-full mt-2 space-y-1">
        {[5, 4, 3, 2, 1].map((star) => {
          const percentage = getRatingPercentage(star);
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-gray-600 w-4">{star}</span>
              <FaStar className="text-[#015B46] text-xs" />
              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 rounded bg-[#015B46] transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
