/* eslint-disable react/no-unescaped-entities */
import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center px-6 bg-[#D9D9D9] text-black dark:bg-[#737373] dark:text-white mt-20">
      <div className="flex flex-col justify-center w-[400px] space-y-6 my-6 lg:grid lg:grid-cols-3 place-items-center lg:w-full lg:space-x-6">
        <div className="text-center flex flex-col">
          <h1   className="mb-4">ABOUT THE SHOP</h1>
          <p>
            Welcome to Animasive, your premier destination for anime-inspired
            fashion. Our curated collection merges style with the captivating
            world of anime, offering exclusive designs that let you wear your
            passion. Discover unique pieces that embody the essence of your
            favorite series, as we invite you to express your love for anime
            through fashion at Animasive.
          </p>
        </div>
        <div >
          <h1 className="mb-4">HELPFUL LINKS</h1>
          <div>
            <li>Sign In</li>
            <li>Earn Rewards</li>
            <li>Refer a Friend</li>
            <li>Gift Cards</li>
            <li>News</li>
            <li>About ANIMASIVE</li>
          </div>
        </div>
        <div >
          <h1 className="mb-4">CUSTOMER SERVICE</h1>
          <div>
            <li>FAQ's</li>
            <li>Order Tracking</li>
            <li>Reauest Returns or Exchanges</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
