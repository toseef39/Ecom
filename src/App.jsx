import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./Components/Layout/Userlayout";
import Home from "./Components/pages/Home";
import { Toaster } from "sonner";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import Profile from "./Components/pages/Profile";
import CollectionPage from "./Components/pages/CollectionPage";
import Productdetail from "./Components/Products/Productdetail";
import Checkout from "./Components/Cart/Checkout";
import OrderConfirmationPage from "./Components/pages/OrderConfirmationPage";
import OrderDetails from "./Components/pages/OrderDetails";
import MyOrder from "./Components/pages/MyOrder";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminHomePage from "./Components/Admin/AdminHomePage";
import UserManagement from "./Components/Admin/UserManagement";
import ProductManagement from "./Components/Admin/ProductManagement";
import EditProduct from "./Components/Admin/EditProduct";
import OrderManagement from "./Components/Admin/OrderManagement";

import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<Productdetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="order/:id" element={<OrderDetails />} />
            <Route path="my-orders" element={<MyOrder />} />
          </Route>

          {/* Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
