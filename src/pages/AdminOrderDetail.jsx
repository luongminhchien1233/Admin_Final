import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { useLoading } from "../context/loading";
const AdminOrderDetail = () => {
    const params = useParams();
    const [order, setOrder] = useState({});
    const [updateStatus, setUpdateStatus] = useState("");
    const [initStatus, setInitStatus] = useState("");
    const {showLoading, hideLoading} = useLoading();



    useEffect(() => {
        if (params?.id) {
            getOrder();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [params?.id]);

    const getOrder = async () => {
        console.log("closeModal");
        try {
            const { data } = await axios.get(
                `https://api-nhaxinh.onrender.com/api/order/detail/${params.id}`
            );
            setOrder(data.data);
            setUpdateStatus(data.data?.status);
            setInitStatus(data.data?.status);
        } catch (error) {
            console.log(error);
        }
    };

    const updateOrder = async () => {
        try {
            showLoading();
            const { data } = await axios.put(
                `https://api-nhaxinh.onrender.com/api/order/admin/${order?.orderId}`, {
                status: updateStatus,
            }
            );
            if (data?.status == "success") {
                toast.success(data?.message);
                hideLoading();
                await getOrder();
            } else {
                hideLoading();
                toast.error(data?.message);
            }
        } catch (error) {
            hideLoading();
            toast.error(error.response.data.message);
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

    return (
        <div class="basis-4/6 text-center m-4 flex flex-col justify-start">
            <h1 className="text-center w-full text-3xl">Order Detail</h1>
            <div class="flex flex-col w-1/2 mt-8">
                <h1 className="text-left w-full text-3xl my-2">Địa chỉ giao hàng</h1>
                <h1 className="text-left w-full text-lg my-2">Tỉnh, thành phố : {order?.addressShipping?.province}</h1>
                <h1 className="text-left w-full text-lg my-2">Quận, huyện : {order?.addressShipping?.district}</h1>
                <h1 className="text-left w-full text-lg my-2">Xã, thị trấn : {order?.addressShipping?.ward}</h1>
                <h1 className="text-left w-full text-lg my-2">Ghi chú : {order?.addressShipping?.note}</h1>
            </div>
            <div class="flex flex-col w-full mt-2">
                <h1 className="text-left w-full text-3xl my-2">Thông tin đơn hàng</h1>
                <h1 className="text-left w-full text-lg my-2">OrderId : {order?.orderId}</h1>
                <h1 className="text-left w-full text-lg my-2">Phương thức thanh toán : {order?.PaymentMethod}</h1>
                <h1 className="text-left w-full text-lg my-2">Trạng thái thanh toán thanh toán : {order?.PaymentStatus}</h1>
                <h1 className="text-left w-full text-lg my-2">Họ và tên người đặt hàng : {order?.name}</h1>
                <h1 className="text-left w-full text-lg my-2">Số điện thoại đặt hàng : {order?.phoneNumber}</h1>
                <h1 className="text-left w-full text-lg my-2">Email đặt hàng : {order?.email}</h1>
                <div class="flex flex-col justify-center items-center my-8">
                    {order?.products?.map((c) => (
                        <>
                            <div class="w-4/5 bg-blue-gray-100 rounded-lg flex flex-row justify-between my-4">
                                <div className="w-1/5 flex items-center justify-center">
                                    <img src={c?.product.images[0].url} alt="" className="w-full rounded-lg" />
                                </div>
                                <div className="w-2/5 flex flex-col items-center justify-evenly text-xl font-semibold">
                                    <h1>{c?.product.name}</h1>
                                    <h1>Đơn giá: {formatCurrency(c?.product?.priceSale)}</h1>
                                </div>
                                <div className="w-1/5 flex items-center justify-center text-xl">
                                    <h1>x {c.quantity}</h1>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <div class="flex flex-col w-full mt-2">
                {order.coupon && (
                    <h1 className="text-left w-full text-2xl my-2">
                        Giảm giá: <span className="text-red-500">{order.coupon.discount}% </span>
                        (Code: {order.coupon.code})
                    </h1>
                )}
                <h1 className="text-left w-full text-2xl my-2">Tổng: {formatCurrency(order.total)}</h1>
                <h1 className="text-left w-full text-2xl my-2">Order Time : {formatDate(order.orderTime)}</h1>
                <h1 className="text-left w-full text-2xl my-2">Status</h1>
                <div class="flex flex-col  mt-4 w-1/3">
                    <select id="status" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        disabled={(order.status == "Cancelled" || order.status == "Delivered") ? true : false}
                        onChange={(e) => setUpdateStatus(e.target.value)}
                        value={updateStatus}
                    >
                        <option key={"Processing"} value={"Processing"}>Processing</option>
                        <option key={"Dispatched"} value={"Dispatched"}>Dispatched</option>
                        <option key={"Delivered"} value={"Delivered"}>Delivered</option>
                        <option key={"Cancelled"} value={"Cancelled"}>Cancelled</option>
                    </select>
                </div>
                {!(initStatus == "Cancelled" || initStatus == "Delivered") ? (
                    <>
                        <div class="flex flex-col mt-4 w-32">
                            <button className="bg-black border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 rounded-lg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateOrder();
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </>
                ) : (
                    <>

                    </>
                )}
            </div>
        </div>
    )
}

export default AdminOrderDetail
