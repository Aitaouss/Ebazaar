import { useEffect, useRef } from "react";
import Seller from "../Card/CardSeller";
import CustomerReviews from "../CustomerReviews/CustomerReviews";

interface ItemInterface {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
}

export default function ExploreTreasure() {
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

  const DummyDataCardSeller: ItemInterface[] = [
    {
      id: 1,
      title: "Handmade Pottery",
      description:
        "Harvested from organically grown turmeric roots, this vibrant golden-yellow powder is renowned for its earthy flavor and powerful anti-inflammatory properties. Used traditionally in .",
      location: "Fez, Morocco",
      category: "Pottery",
    },
    {
      id: 2,
      title: "Traditional Moroccan Rugs",
      description:
        "Crafted by skilled artisans, these rugs showcase intricate designs and vibrant colors, perfect for adding warmth to any space.",
      location: "Marrakech, Morocco",
      category: "Rugs",
    },
    {
      id: 3,
      title: "Handwoven Baskets",
      description:
        "These eco-friendly baskets are perfect for storage or as decorative pieces, made from natural fibers sourced sustainably.",
      location: "Essaouira, Morocco",
      category: "Baskets",
    },
    {
      id: 4,
      title: "Leather Goods",
      description:
        "Explore our collection of handcrafted leather bags and accessories, combining traditional techniques with modern design.",
      location: "Casablanca, Morocco",
      category: "Leather",
    },
    {
      id: 5,
      title: "Ceramic Tiles",
      description:
        "Brighten up your home with our colorful ceramic tiles, each piece telling a story of Moroccan heritage and craftsmanship.",
      location: "Tangier, Morocco",
      category: "Ceramics",
    },
    {
      id: 6,
      title: "Moroccan Spices",
      description:
        "Experience the rich flavors of Morocco with our selection of spices, perfect for enhancing your culinary creations.",
      location: "Rabat, Morocco",
      category: "Spices",
    },
    {
      id: 7,
      title: "Artisan Jewelry",
      description:
        "Discover unique, handcrafted jewelry pieces that reflect the beauty and culture of Morocco, made with care by local artisans.",
      location: "Agadir, Morocco",
      category: "Jewelry",
    },
    {
      id: 8,
      title: "Traditional Clothing",
      description:
        "Shop our range of traditional Moroccan clothing, including kaftans and djellabas, made from high-quality fabrics.",
      location: "Ouarzazate, Morocco",
      category: "Clothing",
    },
    {
      id: 9,
      title: "Handcrafted Lamps",
      description:
        "Illuminate your space with our stunning handcrafted lamps, featuring intricate designs that cast beautiful shadows.",
      location: "Chefchaouen, Morocco",
      category: "Lamps",
    },
  ];

  return (
    <div className="bg-[#FDF9F4] h-full w-full pt-20 bg-overlay relative mb-20">
      <div className="flex flex-col gap-30">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center px-6 sm:px-10 lg:px-20">
            Explore the Treasures of Morocco
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 px-6 sm:px-10 lg:px-20">
            Shop by category and uncover handmade excellence from every corner
            of the kingdom
          </p>
        </div>
        <div className="relative w-full">
          <div
            ref={scrollRef}
            className="w-full flex flex-nowrap overflow-x-auto gap-x-12 scroll-smooth scroll-hide py-3"
          >
            {DummyDataCardSeller.map((item) => (
              <Seller
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                location={item.location}
                category={item.category}
              />
            ))}
          </div>

          <div className=" absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#FDF9F4] to-transparent pointer-events-none z-10" />

          <div className=" absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#FDF9F4] to-transparent pointer-events-none z-10" />
        </div>
        <CustomerReviews />
      </div>
    </div>
  );
}
