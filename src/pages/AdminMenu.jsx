import React from 'react'
import { NavLink } from "react-router-dom";
import Layout from '../components/form/Auth/Layout';
const AdminMenu = () => {   
  return (
    <Layout title={"Admin Dashboard"}>
        <div>
      <div>
        <div>
            <h3 className="text-2xl p-2 my-4 text-gray-800 font-semibold border-l-4 border-yellow-500">Admin Dashboard</h3>
        </div>
        <div className="flex flex-col">
                    <NavLink
                        to={`/dashboard/user`}
                        className="p-4 text-lg"
                    >
                        Users
                    </NavLink>
                    <NavLink
                        to={`/dashboard/category`}
                        className="p-4 text-lg"
                    >
                        Category
                    </NavLink>
                    <NavLink
                        to={`/dashboard/product`}
                        className="p-4 text-lg"
                    >
                        Product
                    </NavLink>
                    <NavLink
                        to={`/dashboard/order`}
                        className="p-4 text-lg"
                    >
                        Orders
                    </NavLink>
                    <NavLink
                        to={`/dashboard/review`}
                        className="p-4 text-lg"
                    >
                        Review
                    </NavLink>
                </div>
        </div>
    </div>
    </Layout>
  )
}

export default AdminMenu
