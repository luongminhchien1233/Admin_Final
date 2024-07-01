import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth';
import axios from 'axios';
const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [productCount, setProductCount] = useAuth("");
  const [userCount, setUserCount] = useAuth("");
  const [orderCount, setOrderCount] = useAuth("");
  const [orderInMonth, setOrderInMonth] = useAuth("");
  const [data, setData] = useState({});  
  useEffect(() => {
    getStatistic();
  }, []);

  const getStatistic = async () => {
    try {
        const { data } = await axios.get(
            "https://api-nhaxinh.onrender.com/api/statistical/"
        );
        setData(data?.data);
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div className="flex flex-row h-auto m-8 mx-24">
        <div class="basis-1/6 h-100% bg-slate-100">
            <AdminMenu />
        </div>
        <div class="basis-4/6 text-center m-4 flex flex-col">
            <h1 className="text-center w-full text-3xl">Welcome Admin</h1>
            <div className="mt-8">
            </div>
            <div className="mt-8 h-auto flex flex-row">
                <div className="basis-1/4 h-36 bg-blue-400 rounded-lg flex-flex-col justify-evenly m-4">
                    <h2 className="mt-4 text-3xl text-white">Total Product</h2>
                    <h2 className="mt-4 text-3xl text-white">{data?.productCount}</h2>
                </div>
                <div className="basis-1/4 h-36 bg-blue-400 rounded-lg flex-flex-col justify-evenly m-4">
                    <h2 className="mt-4 text-3xl text-white">Total Order</h2>
                    <h2 className="mt-4 text-3xl text-white">{data?.order?.orderCount}</h2>
                </div>
                <div className="basis-1/4 h-36 bg-blue-400 rounded-lg flex-flex-col justify-evenly m-4">
                    <h2 className="mt-4 text-3xl text-white">Month Income</h2>
                    <h2 className="mt-4 text-3xl text-white">{data?.order?.orderPriceSumMonth}</h2>
                </div>
                <div className="basis-1/4 h-36 bg-blue-400 rounded-lg flex-flex-col justify-evenly m-4">
                    <h2 className="mt-4 text-3xl text-white">Total User</h2>
                    <h2 className="mt-4 text-3xl text-white">{data?.userCount}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard
