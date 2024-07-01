import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import StaffMenu from "./StaffMenu";

const StaffOrder = () => {
    const [activeTab, setActiveTab] = React.useState("html");
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const { data } = await axios.get(
                "https://api-nhaxinh.onrender.com/api/order/getAll"
            );
            setOrders(data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filterOrder = async (statusOrder) =>{
        if (statusOrder != "All") {
            const { data } = await axios.get(
                "https://api-nhaxinh.onrender.com/api/order/getAll"
            );
            const filteredOrders = data?.data.filter(order => order.status === statusOrder);
            setOrders(filteredOrders);
        } else {
            getOrders();
        }
    };

    // Hàm convert giá trị total sang định dạng tiền tệ VND (Ví dụ: 203.400.000 VND)
    const formatCurrency = (total) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
    };

    // Hàm convert thời gian đơn hàng sang định dạng ngày/tháng/năm (Ví dụ: 29/3/2024)
    const formatDate = (orderTime) => {
        const date = new Date(orderTime);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getProductImage = (order) => {
        if (order && order.products && order.products.length > 0) {
            const product = order.products[0];
            if (product && product.product && product.product.images && product.product.images.length > 0) {
                return product.product.images[0].url;
            }
        }
        // Nếu không tìm thấy hình ảnh hợp lệ, trả về URL của hình ảnh mặc định
        return '../src/assets/imgs/product-test2.jpeg';
    };
    const data = [
        {
          label: "Tất cả đơn hàng",
          value: "All",
          desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people 
          who are like offended by it, it doesn't matter.`,
        },
        {
          label: "Đang xử lí",
          value: "Pending",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
          label: "Đang giao",
          value: "Processing",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
        {
          label: "Đã hoàn thành",
          value: "Delivered",
          desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
          label: "Trả lại",
          value: "Cancelled",
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
      ];
  return (
    <div className="flex flex-row h-auto m-8 mx-24">
        <div class="basis-1/6 h-100% bg-slate-100">
            <StaffMenu />
        </div>
        <div class="basis-4/6 text-center m-4 flex flex-col">
            <h1 className="text-center w-full text-3xl">Staff Orders</h1>
            <Tabs value={activeTab} className="m-4">
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                    className:
                        "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                    }}
                >
                    {data.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => {
                            filterOrder(value);
                            setActiveTab(value);
                        }}
                        className={activeTab === value ? "text-purple-400" : ""}
                    >
                        {label}
                    </Tab>
                    ))}
                </TabsHeader>
                    <TabsBody>
                        <div className="w-full md:flex md:flex-wrap md:justify-between">
                            {orders?.map((p, index) => (
                                <>
    
                                <div className="w-full h-44 bg-gray-300 m-4 rounded-lg flex flex-row justify-between">
                                    <button className="basic 1/6 flex items-center">
                                        <img
                                        src={getProductImage(p)}
                                        //src={imageUrl}
                                        alt="Product"
                                        className="bg-cover h-full w-full group-hover:hidden p-4"
                                        />
                                    </button>
                                    <div className="basic 3/6 flex flex-col m-4 justify-around">
                                        <h3 className="text-xl font-bold">Status: <span className="text-2xl text-blue-600">{p.status}</span></h3>
                                        <h3 className="text-xl font-bold">Total Price: <span className="text-2xl">{formatCurrency(p.total)}</span></h3>
                                        <h3 className="text-xl font-bold">Order Day: <span className="text-2xl">{formatDate(p.orderTime)}</span></h3>
                                    </div>
                                    <div className="basic 2/6 flex flex-col m-4 justify-around">
                                        <button className="bg-blue-500 rounded-lg text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4"
                                            onClick={() => navigate(`${p._id}`)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                </>
                            ))}
                        </div>
                    </TabsBody>
            </Tabs>
        </div>
    </div>
  )
}

export default StaffOrder
