import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handlePaymentSelection = (method) => {
    if (method === "cod") {
      const { firstName, lastName, address, city, postalCode, country, phone } =
        shippingAddress;
      if (
        !firstName ||
        !lastName ||
        !address ||
        !city ||
        !postalCode ||
        !country ||
        !phone
      ) {
        alert("Please fill in all delivery details before proceeding.");
        return;
      }
      navigate("/order-confirmation");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!cart || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 ">
      {/* left Section  */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase  mb-6">Checkout</h2>
        <form className="">
          <h3 className="text-lg  mb-4">Contact Details</h3>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4 ">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                City
              </label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Phone
            </label>
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-1 border rounded"
              required
            />
          </div>
          <div className="mt-6">
            {/* payment method */}
            {!showPaymentOptions ? (
              <button
                type="button"
                onClick={() => setShowPaymentOptions(true)}
                className="bg-black text-white w-full py-3 rounded hover:bg-gray-800 transition-colors text-lg font-semibold"
              >
                Continue to Payment
              </button>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-bold mb-4">
                  Select Payment Method
                </h3>
                <button
                  type="button"
                  onClick={() => handlePaymentSelection("card")}
                  className="w-full py-3 px-4 rounded flex items-center justify-center text-lg font-semibold shadow-md"
                  style={{
                    background: "#FFC439",
                    color: "#222",
                    border: "none",
                  }}
                >
                  Payment through Debit/Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => handlePaymentSelection("cod")}
                  className="w-full py-3 px-4 rounded flex items-center justify-center text-lg font-semibold shadow-md"
                  style={{
                    background: "#222",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Cash on Delivery (COD)
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section  */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg mb-4">Order Summary</h2>
        <div className="border-l border-gray-300 py-4 mb-4">
          {cart.products &&
            cart.products.map((product, index) => {
              return (
                <div
                  key={index}
                  className="flex items-start justify-between py-2 border-b border-gray-300 "
                >
                  <div className="flex items-start">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-24 object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-md">{product.name}</h3>
                      <p className="text-gray-500">Size: {product.size}</p>
                      <p className="text-gray-500">Color: {product.color}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl">{product.price?.toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-between item-center text-lg  mb-4 ">
          <p className="">Subtotal</p>
          <p className="">{cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between item-center text-lg  mb-4 ">
          <p className="">Shipping</p>
          <p className="">Free</p>
        </div>
        <div className="flex justify-between item-center text-lg  mt-4 border-t pt-4 ">
          <p className="">Total</p>
          <p className="">{cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
