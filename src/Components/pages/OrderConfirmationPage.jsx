import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slice/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  // Fallback: get last order from localStorage if Redux state is empty
  const order =
    checkout && checkout._id
      ? checkout
      : JSON.parse(localStorage.getItem("lastOrder"));

  // Clear the cart when the order is confirmed
  useEffect(() => {
    if (order && order._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
      // Save last order for refresh persistence
      localStorage.setItem("lastOrder", JSON.stringify(order));
    } else {
      navigate("/my-orders");
    }
  }, [order, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 10);
    return deliveryDate.toLocaleDateString();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700  mb-8">
        Thanks For Your Order!
      </h1>
      {order && (
        <div className="p-6 rounded-lg border border-gray-300">
          <div className="flex justify-between mb-20  ">
            {/* order id and Date  */}
            <div>
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
              <p className="text-gray-500">
                order date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(order.createdAt)}
              </p>
            </div>
          </div>
          {/* Order Items */}
          <div className="mb-20">
            {order.checkoutItems.map((item) => (
              <div key={item.productId} className="flex item-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">{item.price}</p>
                  <p className="text-sm text-gray-500">qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Payment and Delivery info  */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2  ">Payment</h4>
              <p className="text-gray-600">paypal</p>
            </div>
            {/* delivery Info  */}
            <div>
              <h4 className="text-lg font-semibold mb-2 ">Delivery</h4>
              <p className="text-gray-600">{order.shippingAddress.address}</p>
              <p className="text-gray-600">
                {order.shippingAddress.city}, ,{order.shippingAddress.country}{" "}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
