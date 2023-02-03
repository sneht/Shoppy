import React, { lazy, Suspense } from "react";
import "./App.css";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
// import Navbar from "./components/Navbar";
// import Dashboard from "./components/Dashboard";
// import Categories from "./components/Categories";
import Cart from "./components/Cart";
// import Allproducts from "./components/AllProducts";
// import Checkout from "./components/Checkout";
// import Order from "./components/Order";
// import Verify from "./components/Verify";
// import ForgotPassword from "./components/ForgotPassword";
// import Confirmpassword from "./components/Confirmpassword";
import ProtectedRoute from "./components/protectedRoutes";
// import Successmail from "./components/successmail";
// import User from "./components/User";
import { QueryClient, QueryClientProvider } from "react-query";
import Loading from "./components/Loading";
import PageNotFound from "./components/PageNotFound";
import Wishlist from "./components/Wishlist";

// import Footer from "./components/Footer";
const Navbar = lazy(() => import("./components/Navbar"));
const Home = lazy(() => import("./Pages/Home"));
const Categories = lazy(() => import("./components/Categories"));
const Products = lazy(() => import("./Pages/Products"));
const User = lazy(() => import("./components/User"));
const Successmail = lazy(() => import("./components/successmail"));
const Confirmpassword = lazy(() => import("./components/Confirmpassword"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const Verify = lazy(() => import("./components/Verify"));
const Orders = lazy(() => import("./Pages/Orders"));
const Checkout = lazy(() => import("./components/Checkout"));

const queryClient = new QueryClient();
export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              </>
            }
          />
          <Route exact path="/cart" element={<ProtectedRoute />}>
            <Route
              path="/cart"
              element={
                <>
                  <Suspense fallback={<Loading />}>
                    <Navbar />
                    <Cart />
                  </Suspense>
                </>
              }
            />
          </Route>
          <Route
            path="/categories"
            element={
              <>
                <Suspense fallback={<Loading />}>
                  <Navbar />
                  <Categories />
                </Suspense>
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Suspense fallback={<Loading />}>
                  <Products />
                </Suspense>
              </>
            }
          />
          <Route exact path="/wishlist" element={<ProtectedRoute />}>
            <Route
              path="/wishlist"
              element={
                <>
                  <Suspense fallback={<Loading />}>
                    <Navbar />
                    <Wishlist />
                  </Suspense>
                </>
              }
            />
          </Route>
          <Route exact path="/checkout" element={<ProtectedRoute />}>
            <Route
              path="/checkout"
              element={
                <>
                  <Suspense fallback={<Loading />}>
                    <Navbar />
                    <Checkout />
                  </Suspense>
                </>
              }
            />
          </Route>
          <Route exact path="/order" element={<ProtectedRoute />}>
            <Route
              path="/order"
              element={
                <>
                  <Suspense fallback={<Loading />}>
                    <Orders />
                  </Suspense>
                </>
              }
            />
          </Route>
          <Route exact path="/user" element={<ProtectedRoute />}>
            <Route
              path="/user"
              element={
                <>
                  <Suspense fallback={<Loading />}>
                    <Navbar />
                    <User />
                  </Suspense>
                </>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <>
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Suspense fallback={<Loading />}>
                  <Register />
                </Suspense>
              </>
            }
          />
          <Route
            path="/verify"
            element={
              <>
                <Suspense fallback={<Loading />}>
                  <Verify />
                </Suspense>
              </>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <>
                <Suspense fallback={<Loading />}>
                  <ForgotPassword />
                </Suspense>
              </>
            }
          />
          <Route
            path="/confirmpassword"
            element={
              <>
                <Suspense fallback={<Loading />}>
                  <Confirmpassword />
                </Suspense>
              </>
            }
          />
          <Route
            path="/successmail"
            element={
              <>
                <Suspense fallback={<Loading />}>
                  <Successmail />
                </Suspense>
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Suspense fallback={<Loading />}>
                  <PageNotFound />
                </Suspense>
              </>
            }
          />
        </Routes>
      </QueryClientProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          style: {
            padding: "16px",
            color: "black",
            fontWeight: 600,
            fontFamily: "'Public Sans'",
            fontSize: "14px",
            background: "bisque",
          },
        }}
      />
    </BrowserRouter>
  );
}
