import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { MdDeleteOutline } from "react-icons/md";
import { useLoading } from "../context/loading";
const AdminReview = () => {
    const [reivews, setReviews] = useState([]);
    const {showLoading, hideLoading} = useLoading();

    const navigate = useNavigate();

    useEffect(() => {
        getReviews();
    }, []);

    const getReviews = async () => {
        try {
            const { data } = await axios.get(
                "https://api-nhaxinh.onrender.com/api/review/all"
            );
            setReviews(data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    const toogleReview = async (pId, value) => {
        try {
            showLoading();
            const { data } = await axios.put(
                `https://api-nhaxinh.onrender.com/api/review/${pId}`, {
                enable: value
            }
            );
            if (data?.status == "success") {
                toast.success(data?.message);
                hideLoading();
                await getReviews();
            }
            hideLoading();
        } catch (error) {
            hideLoading();
            console.log(error);
        }
    };


    const deleteReview = async (pId, value) => {
        try {
            showLoading();
            const { data } = await axios.delete(
                `https://api-nhaxinh.onrender.com/api/review/${pId}`
            );
            await getReviews();
            if (data?.status == "success") {
                toast.success(data?.message);
                hideLoading();
                await getReviews();
            }
            hideLoading();
        } catch (error) {
            hideLoading();
            console.log(error);
        }
    };

    const formatDate = (orderTime) => {
        const date = new Date(orderTime);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div class="w-full m-4 flex flex-col justify-start">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Review</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the review of all users including their star rating, day, comment and status.
                        </p>
                    </div>
                </div>

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            User
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Product
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Image
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Star
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Review Day
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Comment
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {reivews.map((p) => (
                                        <tr key={p?._id}>
                                            <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {p.userID?.firstname} {p.userID?.lastname}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{p.productID.name}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900"><img className="h-14 w-14" src={p.productID?.images[0]?.url} alt="" /></td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{p.star}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(p.createdAt)}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.comment}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                {p?.enable ? (
                                                    <>
                                                        <button className="bg-red-500 rounded-lg text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4"
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                toogleReview(p._id, !p.enable)
                                                            }}
                                                        >
                                                            Disable
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button className="bg-blue-500 rounded-lg text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            toogleReview(p._id, !p.enable)
                                                        }}
                                                    >
                                                        Enable
                                                    </button>
                                                )}
                                                <button className="bg-red-300 rounded-lg text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        deleteReview(p._id, !p.enable)
                                                    }}
                                                >
                                                    <MdDeleteOutline size={22}/>
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* {reivews?.map((p, index) => (
                <>
                <div className="w-3/4 h-44 bg-gray-300 m-4 rounded-lg flex flex-row justify-between">
                    <div className="basic 2/6 flex flex-col m-4 justify-around">
                        <h3 className="text-xl font-bold">Star: <span className="text-2xl text-blue-600">{p.star}</span></h3>
                        <h3 className="text-xl font-bold">User: <span className="text-2xl">{p.userID?.firstname} {p.userID?.lastname}</span></h3>
                        <h3 className="text-xl font-bold">Review Day: <span className="text-2xl">{formatDate(p.createdAt)}</span></h3>
                    </div>
                    <div className="basic 2/6 flex flex-col m-4 justify-around">
                        <h3 className="text-xl font-bold">Comment:<span className="text-2xl text-blue-600"></span></h3>
                        <h3 className="text-xl font-bold"><span className="text-2xl">{p.comment}</span></h3>
                    </div>
                    <div className="basic 2/6 flex flex-col m-4 justify-around">
                        {p?.enable ? (
                        <>
                            <button className="bg-red-500 rounded-lg text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4"
                                onClick={(e)=>{
                                    e.preventDefault()
                                    toogleReview(p._id, !p.enable)
                                }}
                            >
                                Disable
                            </button>
                        </>
                        ) : (
                            <button className="bg-blue-500 rounded-lg text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4"
                                onClick={(e)=>{
                                    e.preventDefault()
                                    toogleReview(p._id, !p.enable)
                                }}
                            >
                                Enable
                            </button>
                        )}
                    </div>
                </div>
                </>
            ))} */}
        </div>
    )
}

export default AdminReview
