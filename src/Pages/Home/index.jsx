/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories";
import Dashboard from "../../components/Dashboard";
import Navbar from "../../components/Navbar";
import ProductList from "../../components/ProductList";
// import TopLoading from "../../components/TopLoading";

export default function Home() {
  const [topLoading, setTopLoading] = useState(true);
  const [navbar, setNavbar] = useState(true);
  const [dashboard, setDashboard] = useState(true);
  const [categories, setCategories] = useState(true);
  const [productList, setProductList] = useState(true);

  useEffect(() => {
    changeLoading();
    window.scrollTo(0, 0);
  }, [navbar, dashboard, categories, productList]);

  const changeLoading = () => {
    try {
      if (!navbar && !dashboard && !categories && !productList) {
        setTopLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Navbar setNavbar={setNavbar} topLoading={topLoading}  />
      <Dashboard setTopLoading={setDashboard} />
      <Categories setTopLoading={setCategories} />
      <ProductList setTopLoading={setProductList} />
    </>
  );
}
