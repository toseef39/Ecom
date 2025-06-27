import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../../redux/slice/orderSlice";

const MyOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowclick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 ">
      <h2 className=" text-xl sm:text-2xl font-bold mb-4">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="py-2 px-4 sm:py-3 ">Image</th>
              <th className="py-2 px-4 sm:py-3 ">Order ID</th>
              <th className="py-2 px-4 sm:py-3 ">Created</th>
              <th className="py-2 px-4 sm:py-3 ">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3 ">Item</th>
              <th className="py-2 px-4 sm:py-3 ">Price</th>
              <th className="py-2 px-4 sm:py-3 ">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowclick(order._id)}
                  className="border-b hover:border-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:pyx-4 ">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 ">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 ">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A "}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 ">
                    {order.orderItems.length}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 ">
                    {order.totalPrice}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 ">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center px-4 py-4  text-gray-500 "
                >
                  {" "}
                  You Have No orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
