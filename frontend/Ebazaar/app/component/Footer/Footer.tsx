import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { IoLogoYoutube } from "react-icons/io5";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-[#015B46] p-6 sm:p-10 lg:p-20 flex flex-col justify-between gap-10">
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-[#FDF9F4] text-2xl lg:text-4xl font-bold">
            eBazaar
          </h1>
          <h1 className="text-lg lg:text-2xl text-[#FDF9F4] font-light">
            Your Moroccan Market, Online.
          </h1>
        </div>

        <div className="bg-[#FDF9F4] w-full h-[2px] rounded-full"></div>

        <h1 className="text-[#FDF9F4] text-sm lg:text-lg font-light max-w-md">
          Authentic, handcrafted goods from the soul of Morocco — delivered
          worldwide.
        </h1>

        <div className="flex flex-col lg:flex-row justify-between gap-10 mt-10">
          {/* Contact Us */}
          <div className="flex flex-col gap-4">
            <h1 className="text-lg lg:text-2xl font-bold text-[#FDF9F4]">
              Contact Us
            </h1>
            <div className="text-[#FDF9F4]">
              <h1 className="font-semibold text-base lg:text-lg">Address</h1>
              <p className="text-sm lg:text-base">
                123 Rue des Artisans, Marrakech, Morocco
              </p>
            </div>
            <div className="text-[#FDF9F4]">
              <h1 className="font-semibold text-base lg:text-lg">Email</h1>
              <p className="text-sm lg:text-base">support@ebazare.com</p>
            </div>
            <div className="text-[#FDF9F4]">
              <h1 className="font-semibold text-base lg:text-lg">Phone</h1>
              <p className="text-sm lg:text-base">+212 6 39 47 33 51</p>
            </div>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg lg:text-2xl font-bold text-[#FDF9F4]">
              Useful Links
            </h1>
            {["Shop", "About Us", "Contact Us", "FAQs", "Blog"].map((item) => (
              <p key={item} className="text-[#FDF9F4] text-sm lg:text-base">
                {item}
              </p>
            ))}
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl lg:text-2xl text-[#FDF9F4]">
              Stay Connected
            </h1>
            <div className="flex gap-4 flex-wrap">
              {[
                {
                  icon: <RiTwitterXLine size={20} />,
                  link: "https://twitter.com/taoussi_aimen",
                },
                {
                  icon: <FaFacebookSquare size={20} />,
                  link: "https://www.facebook.com/ebazare",
                },
                {
                  icon: <BiLogoInstagramAlt size={20} />,
                  link: "https://www.instagram.com/ebazare",
                },
                {
                  icon: <IoLogoYoutube size={20} />,
                  link: "https://www.youtube.com/ebazare",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] bg-[#FDF9F4] rounded-lg flex items-center justify-center hover:bg-[#015B46] hover:border-2 hover:border-[#FDF9F4] transition-colors duration-300"
                >
                  <span className="text-[#015B46] hover:text-[#FDF9F4]">
                    {item.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div>
        <div className="bg-[#FDF9F4] w-full h-[2px] rounded-full mb-4"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-[#FDF9F4] text-sm lg:text-base text-center">
            © 2025 eBazare. All rights reserved. | Made with love in Morocco 🇲🇦
          </h1>
          <div className="flex gap-4 text-[#FDF9F4] text-sm lg:text-base flex-wrap justify-center">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Cookies Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
