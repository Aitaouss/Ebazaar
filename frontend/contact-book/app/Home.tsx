// App.jsx"
"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import UserLanding from "./component/UserLanding/UserLanding";
import ExploreTreasure from "./component/ExploreTreasure/ExploreTreasure";
import MainPage from "./component/MainPage.tsx/Main";
import Footer from "./component/Footer/Footer";

export default function App() {
  return (
    <>
      <MainPage />
      <UserLanding />
      <ExploreTreasure />
      <Footer />
    </>
  );
}

// https://i.ibb.co/4n9cV1JG/background.jpg
