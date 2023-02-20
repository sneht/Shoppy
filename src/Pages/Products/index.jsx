/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Allproducts from "../../components/AllProducts";
import Navbar from "../../components/Navbar";
// import TopLoading from "../../components/TopLoading";

export default function Products() {
  const [topLoading, setTopLoading] = useState(true);
  const [navbar, setNavbar] = useState(true);
  const [products, setProducts] = useState(true);
  useEffect(() => {
    chnageLoading();
    window.scrollTo(0, 0);
  }, [navbar, products]);
  const chnageLoading = () => {
    try {
      if (!navbar && !products) {
        setTopLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      {/* {topLoading ? <TopLoading /> : <></>} */}
      <Navbar setNavbar={setNavbar} topLoading={topLoading} />
      <Allproducts setTopLoading={setProducts} />
    </>
  );
}
