import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth';
import axios from 'axios';
import ProductItem from "../components/product/ProductItem";
import { useNavigate } from "react-router-dom";
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
}, []);

const getProducts = async () => {
    try {
        const { data } = await axios.get(
            "https://api-nhaxinh.onrender.com/api/product/admin/getAll"
        );
        setProducts(data?.data);
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
            <h1 className="text-center w-full text-3xl">Admin Products</h1>
              <div class="flex justify-start mb-8 mt-16">
                <button className="bg-blue-500 p-8 text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4 rounded-lg"
                    onClick={() => {
                      navigate(`/dashboard/create-product`);
                    }}
                >Create Product</button>
              </div>
            <div className="w-full md:flex md:flex-wrap md:justify-self-center mt-4">
                {products?.map((p, index) => (
                    <>
                        <ProductItem product={p} images={p.images}/>
                    </>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AdminProducts
