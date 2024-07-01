import React from 'react'
import { NavLink } from "react-router-dom";
import Layout from '../components/form/Auth/Layout';
const StaffMenu = () => {   
  return (
    <Layout title={"Staff Panel"}>
        <div>
      <div>
        <div>
            <h3 className="text-2xl p-2 my-4 text-gray-800 font-semibold border-l-4 border-yellow-500">Staff Dashboard</h3>
        </div>
        <div className="flex flex-col">
                    <NavLink
                        to={`/staff/user`}
                        className="p-4 text-lg"
                    >
                        Users
                    </NavLink>
                    <NavLink
                        to={`/staff/order`}
                        className="p-4 text-lg"
                    >
                        Orders
                    </NavLink>
                </div>
        </div>
    </div>
    </Layout>
  )
}

export default StaffMenu
