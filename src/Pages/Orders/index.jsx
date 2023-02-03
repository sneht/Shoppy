import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Order from "../../components/Order";
import TopLoading from "../../components/TopLoading";

export default function Orders() {
  const [topLoading, setTopLoading] = useState(true);
  const [navbar, setNavbar] = useState(true);
  const [Orders, setOrders] = useState(true);
  useEffect(() => {
    chnageLoading();
  }, [navbar, Orders]);
  const chnageLoading = () => {
    try {
      if (!navbar && !Orders) {
        setTopLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      {topLoading ? <TopLoading /> : <></>}
      <Navbar setTopLoading={setNavbar} />
      <Order setTopLoading={setOrders} />
    </>
  );
}
