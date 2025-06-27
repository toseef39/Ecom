import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaClipboardList, FaStore, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // localStorage.removeItem("admin");
        navigate("/");
    }
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          ShopNex
        </Link>
      </div>
      <h2 className="text-xl  font-medium mb-6  text-center">
        Admin Dashboard
      </h2>

      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "
          }
        >
          <FaUsers className="" />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "
          }
        >
          <FaBoxOpen     className="" />
          <span>Products</span>
        </NavLink>
        
        {/* Oders  */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "
          }
        >
          <FaClipboardList className="" />
          <span>Orders</span>
        </NavLink>

        {/* Shop  */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2 "
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "
          }
        >
          <FaStore className="" />
          <span>Shop</span>
        </NavLink>
      </nav>

      {/* Logout  */}
      <div className="mt-6" >
        <button onClick={handleLogout} className=" w-full  bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2  " >
            <FaSignOutAlt className="" />
            <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
