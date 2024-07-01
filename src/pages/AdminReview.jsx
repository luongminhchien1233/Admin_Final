import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AdminReview = () => {
    const [reivews, setReviews] = useState([]);
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
            const { data } = await axios.put(
                `https://api-nhaxinh.onrender.com/api/review/${pId}`,{
                    enable: value
                }
            );
            await getReviews();
        } catch (error) {
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
    <div className="flex flex-row h-auto m-8 mx-24">
        <div class="basis-1/6 h-100% bg-slate-100">
            <AdminMenu />
        </div>
        <div class="basis-4/6 text-center m-4 flex flex-col">
            <h1 className="text-center w-full text-3xl">Admin Reviews</h1>
            <div className="w-full flex flex-col items-center mt-4">
                {reivews?.map((p, index) => (
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
                ))}
            </div>
        </div>
    </div>
  )
}

export default AdminReview
