import ReviewsCard from "../ReviewsCard/ReviewsCard";

export default function CustomerReviews() {
  return (
    <div className=" flex flex-col gap-10">
      <div className="px-6 sm:px-10 lg:px-20">
        <div className="bg-[#015B46] w-[70px] h-[6px] rounded-full"></div>
        <h1 className="text-4xl font-bold w-[460px]">
          Customer <span className="text-[#13120F]/45">Reviews</span> around the
          world
        </h1>
      </div>
      <div className="flex gap-10 overflow-x-auto px-6 sm:px-10 lg:px-20 pt-6 relative">
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
        <ReviewsCard />
      </div>
    </div>
  );
}
