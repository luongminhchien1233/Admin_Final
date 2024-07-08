import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  import { useRef } from "react";

import { Line , getElementsAtEvent } from "react-chartjs-2";
const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [productCount, setProductCount] = useAuth("");
  const [userCount, setUserCount] = useAuth("");
  const [orderCount, setOrderCount] = useAuth("");
  const [orderInMonth, setOrderInMonth] = useAuth("");
  const [data, setData] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [selectDayData, setSelectDayData]= useState(null);   
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const options = {
    
  };
  const chartOverviewRef = useRef();
  useEffect(() => {
    //getStatistic();
    getOrderOverview();
  }, []);

  const onClickChart = (event) => {
    if(getElementsAtEvent(chartOverviewRef.current, event).length > 0){
        const dataPoint = getElementsAtEvent(chartOverviewRef.current, event)[0].index;
        console.log(dataPoint);
    }
  }

  const getStatistic = async () => {
    try {
        const { data } = await axios.get(
            "https://api-nhaxinh.onrender.com/api/statistical/"
        );
        
    } catch (error) {
        console.log(error);
    }
  };

  const getOrderByDate = async () => {
    try {
        const formatFDate = startDate.toISOString().split('T')[0];
        const formatEDate = endDate.toISOString().split('T')[0];
        if (new Date(formatFDate) > new Date(formatEDate)) {
            return;
        }
        const { data } = await axios.get(
            `https://api-nhaxinh.onrender.com/api/statistical/orderDate?startDate=${formatFDate}&endDate=${formatEDate}`
        );
        
        if(data.data.length > 0){
            const temp = {
                labels: data.data.map(day=>day?._id),
                datasets: [{
                    label: 'Day Overview',
                    data: data.data.map(day=>day?.totalAmount),
                    borderColor: 'aqua',
                    backgroundColor: 'aqua',
                }],
                
            };
            setSelectDayData(temp);        
        }
    } catch (error) {
        console.log(error);
    }
  };

  const getOrderOverview = async () => {
    try {
        const { data } = await axios.get(
            "https://api-nhaxinh.onrender.com/api/statistical/overviewOrder"
        );
        if(data.data.length > 0){
            const temp = {
                labels: data.data.map(month=>month?.month),
                datasets: [{
                    label: 'Amount Overview',
                    data: data.data.map(month=>month?.totalAmount),
                    borderColor: 'aqua',
                    backgroundColor: 'aqua',
                }],
                
            };
            setOrderData(temp);        
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div class="basis-4/6 text-center m-4 flex flex-col">
        {/* <div className="mt-8 h-auto flex flex-row">
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
        </div> */}
        <h1 className="text-3xl font-bold">Order Overview</h1>
        <div className="mt-8 h-auto flex flex-row">
            {orderData!==null?(
                <Line data={orderData} options={options} 
                    ref={chartOverviewRef}
                    onClick ={onClickChart}
                ></Line>
            ): (
                <>
                </>
            )}
        </div>
        <h1 className="text-3xl font-bold mt-16">Daily Page</h1>
        <div className="mt-8 h-auto flex flex-row">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <DatePicker className="ml-4" selected={endDate} onChange={(date) => setEndDate(date)} />
            <button className="bg-black border border-black text-[20px] px-6 py-1 uppercase text-white cursor-pointer rounded-lg ml-4 mb-4"
                    onClick={(e)=>{
                        e.preventDefault();
                        getOrderByDate();
                    }}
            >
                Refesh
            </button>
        </div>
        <div className="mt-8 h-auto flex flex-row">
            {selectDayData!==null?(
                <Line data={selectDayData} options={options} 
                ></Line>
            ): (
                <>
                    <div className="flex flex-row">
                        <h1 className="text-center m-auto">Data is Empty</h1>
                    </div>
                </>
            )}
        </div>
    </div>
  )
}

export default AdminDashboard
