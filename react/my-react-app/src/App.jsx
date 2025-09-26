import React from "react";
import Rule from "./components/Rule";
import Interpolation from "./components/Interpolation";
import Header from "./components/Hedaer";
import Footer from "./components/Footer";
import UserCard from "./components/UserCard/UserCard";

export default function App() {
  return (
    <>
      <Header></Header>
      <UserCard></UserCard>
      <Footer></Footer>
    </>
  );
}
