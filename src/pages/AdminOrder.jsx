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

const AdminOrder = () => {
    const [activeTab, setActiveTab] = React.useState("html");
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [foundOrders, setFoundOrders] = useState([]);

    const findOrdersByIdSubstring = (query) => {
        if (!query) return orders;
        return orders.filter(order => order.orderId != null && order.orderId.toString().includes(query));
    };

    const handleSearch = () => {
        const orders = findOrdersByIdSubstring(searchQuery);
        setFoundOrders(orders);
    };

    useEffect(() => {
        handleSearch();
    }, [orders]);

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

    const filterOrder = async (statusOrder) => {
        setSearchQuery('');
        handleSearch();
        if (statusOrder != "All") {
            // const { data } = await axios.get(
            //     "https://api-nhaxinh.onrender.com/api/order/getAll"
            // );
            const filteredOrders = orders.filter(order => order.status === statusOrder);
            setFoundOrders(filteredOrders);
        }
        // else {
        //     getOrders();
        // }
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
    const statuses = { Delivered: 'text-green-400', Processing: 'text-orange-400', Cancelled: 'text-red-400', Dispatched: 'text-yellow-400' };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const data = [
        {
            label: "All",
            value: "All",
            desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people 
          who are like offended by it, it doesn't matter.`,
        },
        {
            label: "Processing",
            value: "Processing",
            desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: "Dispatched",
            value: "Dispatched",
            desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
        {
            label: "Delivered",
            value: "Delivered",
            desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
        },
        {
            label: "Cancelled",
            value: "Cancelled",
            desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
    ];
    return (
        <div className="flex flex-row h-auto  w-full">
            <div class=" w-full flex flex-col">
                <Tabs value={activeTab} className="m-4">
                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 "
                        indicatorProps={{
                            className:
                                "bg-blue-500  shadow-none rounded-lg",
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
                                className={activeTab === value ? "text-white" : ""}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>

                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                </div>

                            </div>
                            <div className="mt-8 flow-root ml-4">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <form class="max-w-md mx-auto">
                                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                        <div class="relative">
                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 borde rounded-lg" placeholder="Search by Order Id" required
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)} />
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                handleSearch();
                                            }}
                                                type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                        </div>
                                    </form>


                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <div className="mt-8 flow-root">
                                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                                    <table className="min-w-full divide-y divide-gray-300">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                                                    OrderID
                                                                </th>
                                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                                                    Total
                                                                </th>
                                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-90">
                                                                    Date
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    PaymentMethod
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    PaymentStatus
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Status
                                                                </th>
                                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                                    <span className="sr-only">Edit</span>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                            {foundOrders.map((order) => (
                                                                <tr key={order.orderId}>
                                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black font-semibold">{order.orderId}</td>
                                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black">{formatCurrency(order.total)}</td>
                                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black">{formatDate(order.orderTime)}</td>
                                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black">{order.PaymentMethod}</td>
                                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black">{order.PaymentStatus}</td>
                                                                    <td className={classNames(statuses[order.status], 'whitespace-nowrap px-3 py-5 text-sm text-black')}>{order.status}</td>
                                                                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                        <a
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                navigate(`${order?._id}`)
                                                                            }}
                                                                            className="text-indigo-600 cursor-pointer hover:text-indigo-900">
                                                                            Edit
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsBody>
                </Tabs>
            </div>
        </div>
    )
}

export default AdminOrder
