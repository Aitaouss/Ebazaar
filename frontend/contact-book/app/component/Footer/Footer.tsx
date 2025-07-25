import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { IoLogoYoutube } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="w-full h-[800px] bg-[#015B46] p-20 flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-[#FDF9F4] text-4xl font-bold ">eBazaar</h1>
          <h1 className="text-2xl text-[#FDF9F4] font-light">
            Your Moroccan Market, Online.
          </h1>
        </div>
        <div className="bg-[#FDF9F4] w-full h-[2px] rounded-full my-3"></div>
        <h1 className="text-[#FDF9F4] text-lg font-light w-[440px]">
          Your Moroccan Market, Online. Authentic, handcrafted goods from the
          soul of Morocco — delivered worldwide
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-6 mt-20">
            <h1 className="text-2xl font-bold text-[#FDF9F4]">Contact Us</h1>
            <div className="text-[#FDF9F4]">
              <h1 className="text-xl font-semibold">Address</h1>
              <p className="font-light">
                123 Rue des Artisans, Marrakech, Morocco
              </p>
            </div>
            <div className="text-[#FDF9F4]">
              <h1 className="text-xl font-semibold">Email</h1>
              <p className="font-light">support@ebazare.com</p>
            </div>
            <div className="text-[#FDF9F4]">
              <h1 className="text-xl font-semibold">Phone</h1>
              <p className="font-light">+212 6 39 47 33 51</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-20">
            <h1 className="text-2xl font-bold text-[#FDF9F4]">Useful Links</h1>

            <p className="text-[#FDF9F4] text-lg">Shop</p>
            <p className="text-[#FDF9F4] text-lg">About Us</p>
            <p className="text-[#FDF9F4] text-lg">Contact Us</p>
            <p className="text-[#FDF9F4] text-lg">FAQs</p>
            <p className="text-[#FDF9F4] text-lg">Blog</p>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-[#FDF9F4]">Stay Connected</h1>
            <div className="flex gap-4">
              <div className="w-[45px] h-[45px] bg-[#FDF9F4] rounded-lg flex items-center justify-center">
                <RiTwitterXLine className="text-[#015B46]" size={24} />
              </div>
              <div className="w-[45px] h-[45px] bg-[#FDF9F4] rounded-lg flex items-center justify-center">
                <FaFacebookSquare className="text-[#015B46]" size={24} />
              </div>
              <div className="w-[45px] h-[45px] bg-[#FDF9F4] rounded-lg flex items-center justify-center">
                <BiLogoInstagramAlt className="text-[#015B46]" size={24} />
              </div>
              <div className="w-[45px] h-[45px] bg-[#FDF9F4] rounded-lg flex items-center justify-center">
                <IoLogoYoutube className="text-[#015B46]" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-[#FDF9F4] w-full h-[2px] rounded-full my-3"></div>
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="text-[#FDF9F4]">
              © 2025 eBazare. All rights reserved. | Made with love in Morocco
              🇲🇦
            </h1>
          </div>
          <div className="flex text-[#FDF9F4] gap-30 text-lg">
            <h1>Term of Services</h1>
            <h1>Privacy Policy</h1>
            <h1>Cookies Policy</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
