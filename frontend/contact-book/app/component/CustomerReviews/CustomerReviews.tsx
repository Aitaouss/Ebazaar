import ReviewsCard from "../ReviewsCard/ReviewsCard";
import { useEffect, useRef } from "react";

interface ReviewInterface {
  id: number;
  name: string;
  rate: string;
  description: string;
  date: string;
  location: string;
  picture: string;
}

export default function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;

    const scroll = () => {
      if (!scrollContainer) return;

      scrollAmount += 1;
      scrollContainer.scrollLeft += 1;

      // Reset scroll if reached end
      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollContainer.scrollLeft = 0;
        scrollAmount = 0;
      }
    };

    const interval = setInterval(scroll, 20); // speed of scroll

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  const DummyData: ReviewInterface[] = [
    {
      id: 1,
      name: "John Doe",
      rate: "4.9",
      description:
        "eBazare is a hidden gem. Fast delivery, excellent support, and real Moroccan craftsmanship. I love the ceramic bowls I received — will definitely order again!",
      date: "May 1",
      location: "New York, USA",
      picture: "https://example.com/john_doe.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      rate: "4.9",
      description:
        "I had a fantastic experience with eBazare. The quality of the products is outstanding, and the customer service was very responsive. Highly recommend!",
      date: "June 15",
      location: "Los Angeles, USA",
      picture: "https://example.com/jane_smith.jpg",
    },
    {
      id: 3,
      name: "Alice Johnson",
      rate: "4.9",
      description:
        "Absolutely love my new Moroccan rug! The colors are vibrant and the quality is top-notch. eBazare exceeded my expectations.",
      date: "July 20",
      location: "Chicago, USA",
      picture: "https://example.com/alice_johnson.jpg",
    },
    {
      id: 4,
      name: "Bob Brown",
      rate: "4.9",
      description:
        "Great selection of products and fast shipping. The handmade pottery I ordered is beautiful and unique. Will shop here again!",
      date: "August 10",
      location: "Houston, USA",
      picture: "https://example.com/bob_brown.jpg",
    },
    {
      id: 5,
      name: "Charlie Davis",
      rate: "4.9",
      description:
        "I was impressed by the quality of the products and the speed of delivery. The customer service team was also very helpful. Highly recommend eBazare!",
      date: "September 5",
      location: "Phoenix, USA",
      picture: "https://example.com/charlie_davis.jpg",
    },
  ];
  return (
    <div className=" flex flex-col gap-10 relative">
      <div className="px-6 sm:px-10 lg:px-20">
        <div className="bg-[#015B46] w-[70px] h-[6px] rounded-full"></div>
        <h1 className="text-3xl lg:text-4xl font-bold w-[300px] xs:w-[350px] sm:w-[400px] lg:w-[460px]">
          Customer <span className="text-[#13120F]/45">Reviews</span> around the
          world
        </h1>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-10 overflow-x-auto px-6 sm:px-10 lg:px-20 pt-6 relative scroll-hide py-8"
      >
        {DummyData.map((review) => (
          <ReviewsCard
            key={review.id}
            id={review.id}
            name={review.name}
            rate={review.rate}
            description={review.description}
            date={review.date}
            location={review.location}
            picture={review.picture}
          />
        ))}
      </div>
      <div className=" absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#FDF9F4] to-transparent pointer-events-none z-10" />

      <div className=" absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#FDF9F4] to-transparent pointer-events-none z-10" />
    </div>
  );
}
