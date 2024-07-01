import React, { useState, useEffect, useRef } from "react";
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth';
import axios from 'axios';
import { toast } from "react-toastify";
import Layout from "../components/form/Auth/Layout";
import { useNavigate } from "react-router-dom";

const AdminCreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [rooms, setRooms] = useState([]);
    const descRef = useRef(null);
    const shortDescRef = useRef(null);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [collection, setCollection] = useState("");
    const [materials, setMaterials] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [shortDesc, setShortDesc] = useState("");
    const [category, setCategory] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const getAllRoom = async() =>{
        try{
        const { data } = await axios.get("https://api-nhaxinh.onrender.com/api/room/all");
        setRooms(data?.data);
        }catch(error){
            console.log(error);
        }
    };

    const getCategoryByRoom= async(pId) =>{
        try{
        const { data } = await axios.get(`https://api-nhaxinh.onrender.com/api/room/getCateByRoom/${pId}`);
        setCategories(data?.data?.categories);
        }catch(error){
            console.log(error);
        }
    };

    //create product function
    const handleCreate = async (e) => {
        try {
            const productData = new FormData();
            productData.append("code", code);
            productData.append("name", name);
            productData.append("description", desc);
            productData.append("shortDescription", shortDesc);
            productData.append("category", category);
            productData.append("room", room);
            productData.append("specs", JSON.stringify([
                { k: "dimensions", v: dimensions },
                { k: "collection", v: collection },
                { k: "materials", v: materials }
            ]));
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("enable", true);

            images.forEach((image, index) => {
                productData.append("images", image?.file); // Append images to the FormData
            });
            
            const { data } = axios.post(
                "https://api-nhaxinh.onrender.com/api/product/create-product",
                productData
            );

            if(data?.status == "success"){
                navigate(`/dashboard/product`);
            }
            
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    useEffect(()=>{
        getAllRoom();
    }, [])

    useEffect(() => {
        descRef.current.style.height = "auto";
        descRef.current.style.height = descRef.current.scrollHeight + "px";
    }, [desc])

    useEffect(() => {
        shortDescRef.current.style.height = "auto";
        shortDescRef.current.style.height = shortDescRef.current.scrollHeight + "px";
    }, [shortDesc])

    const [images, setImages] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => ({
        file,
        url: URL.createObjectURL(file),
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleDelete = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    
    return (
        <Layout>
            <div className="flex flex-row h-auto m-8 mx-24">
            <div class="basis-1/6 h-100% bg-slate-100">
                <AdminMenu />
            </div>
            <div class="basis-4/6 text-center m-4 flex flex-col items-center">
                <h1 className="text-center w-full text-3xl">Create New Product</h1>
                <div class="flex flex-col mt-4 w-3/4">
                    <label className="text-left text-lg"for="">Name<span class="required">*</span></label>
                    <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300 active:outline-none focus:outline-none"
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value);
                        }}
                    ></input>
                </div>
                <div class="flex flex-col mt-4 w-3/4">
                    <label className="text-left text-lg"for="">Code<span class="required">*</span></label>
                    <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300 active:outline-none focus:outline-none"
                        value={code}
                        onChange={(e)=>{
                            setCode(e.target.value);
                        }}
                    ></input>
                </div>
                <div class="flex flex-col mt-4 w-3/4">
                    <label className="text-left text-lg"for="">Descripttion<span class="required">*</span></label>
                    <textarea className="p-2 rounded border-2 border-gray-300 resize-none active:outline-none focus:outline-none
                        overflow-hidden text-lg
                    " placeholder="Type Desc"
                    value={desc} onChange={e => {
                        setDesc(e.target.value);
                    }} rows="2" ref={descRef}
                        
                    ></textarea>
                </div>
                <div class="flex flex-col mt-4 w-3/4">
                    <label className="text-left text-lg"for="">Short Descripttion<span class="required">*</span></label>
                    <textarea className="p-2 rounded border-2 border-gray-300 resize-none active:outline-none focus:outline-none
                        overflow-hidden text-lg
                    " placeholder="Type Desc"
                    value={shortDesc} onChange={e => {
                        setShortDesc(e.target.value);
                    }} rows="1" ref={shortDescRef}
                        
                    ></textarea>
                </div>
                <div class="flex flex-col  mt-4 w-3/4">
                    <label className="text-left my-4"for="district">Room&nbsp;<span class="required">*</span></label>
                    <select id="district" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => {
                            setRoom(e.target.value);
                            getCategoryByRoom(e.target.value);   
                        }} value={room}
                    >
                        <option selected>Choose Room</option>
                        {rooms && rooms.map((room) => (
                            <option key={room._id} value={room._id}>{room.nameRoom}</option>
                        ))}
                    </select>
                </div>
                <div class="flex flex-col  mt-4 w-3/4">
                    <label className="text-left my-4"for="district">Room&nbsp;<span class="required">*</span></label>
                    <select id="district" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }} value={category}
                    >
                        <option selected>Choose Category</option>
                        {categories && categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.nameCate}</option>
                        ))}
                    </select>
                </div>
                <div class="flex flex-col mt-4 w-3/4">
                    <label className="text-left text-lg"for="">Dimensions<span class="required">*</span></label>
                    <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300 active:outline-none focus:outline-none"
                        value={dimensions}
                        onChange={(e)=>{
                            setDimensions(e.target.value);
                        }}
                    ></input>
                </div>
                <div class="flex flex-col mt-4 w-3/4">
                    <label className="text-left text-lg"for="">Collection<span class="required">*</span></label>
                    <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300 active:outline-none focus:outline-none"
                        value={collection}
                        onChange={(e)=>{
                            setCollection(e.target.value);
                        }}
                    ></input>
                </div>
                <div class="flex flex-col mt-4 w-3/4">
                    <label className="text-left text-lg"for="">Materials<span class="required">*</span></label>
                    <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300 active:outline-none focus:outline-none"
                        value={materials}
                        onChange={(e)=>{
                            setMaterials(e.target.value);
                        }}
                    ></input>
                </div>
                <div class="flex flex-col mt-4 w-3/4">
                    <label className="text-left text-lg"for="">Price<span class="required">*</span></label>
                    <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300 active:outline-none focus:outline-none"
                        value={price}
                        onChange={(e)=>{
                            setPrice(e.target.value);
                        }}
                        type="number"
                    ></input>
                </div>
                <div class="flex flex-col mt-4 w-3/4">
                    <label className="text-left text-lg"for="">Quantity<span class="required">*</span></label>
                    <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300"
                        value={quantity}
                        onChange={(e)=>{
                            setQuantity(e.target.value);
                        }}
                        type="number"
                    ></input>
                </div>
                <div className="flex flex-col mt-4 w-3/4 mx-auto">
                    <label className="text-left text-lg mb-4"for="">Images<span class="required">*</span></label>
                    <input 
                    type="file" 
                    multiple 
                    onChange={handleImageChange}
                    className="mb-4"
                    />
                    <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                        <img 
                            src={image.url} 
                            alt={`upload-${index}`} 
                            className="w-full h-32 object-cover rounded"
                        />
                        <button 
                            onClick={() => handleDelete(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-4 py-2"
                        >
                            X
                        </button>
                        </div>
                    ))}
                    </div>
                </div>
                <div class="flex flex-col mt-4 w-1/2">
                    <button className="bg-blue-500 p-8 text-[20px] px-2 py-2 uppercase text-white cursor-pointer mt-2 mx-4 rounded-lg w-auto"
                        onClick={() => {
                            handleCreate();
                        }}
                    >Create Product</button>
                </div>
            </div>
        </div>
        </Layout>
        
    )
}

export default AdminCreateProduct
