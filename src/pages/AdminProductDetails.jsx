import React, { useState, useEffect, useRef } from "react";
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth';
import axios from 'axios';
import { toast } from "react-toastify";
import Layout from "../components/form/Auth/Layout";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "../components/button/FileInput";

const AdminProductDetails = () => {
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
    const [id, setId] = useState("");

    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const params = useParams();

    const getAllRoom = async() =>{
        try{
            const { data } = await axios.get("https://api-nhaxinh.onrender.com/api/room/all");
            setRooms(data?.data);
        }catch(error){
            console.log(error);
        }
    };
    const handleDeleteImage = (index) => {
        const image = images[index];
        console.log(image);
        const url = `https://api-nhaxinh.onrender.com/api/product/updateImageDelete?id_Product=${id}&url_image=${image.url}&id_image=${image._id}`;
        axios.delete(url)
            .then(response => {
                const data = response.data;
                if (data?.status === "success") {
                    onUpdateProduct();
                } else {
                    
                }
            })
            .catch(error => {
                console.error('There was an error deleting the image!', error);
            });
    };

    const onUpdateProduct = async () => {
        toast.success("Update Product Image Success!");
        await getProduct();
    };

    
    const handleDelete = async ()=>{
        try{
            const { data } = await axios.delete(`https://api-nhaxinh.onrender.com/api/product/${id}`,
                
            );
            if(data?.status == "success"){
                //toast.success(data?.message);
                navigate(`/dashboard/product`);
            }
        }catch(error){
            console.log(error);
        }
    };

    const handleUpdate = async()=>{
        // console.log(JSON.stringify([
        //     { k: "dimensions", v: dimensions },
        //     { k: "collection", v: collection },
        //     { k: "materials", v: materials }
        // ]))
        try{
            const { data } = await axios.put(`https://api-nhaxinh.onrender.com/api/product/updateProduct/${id}`,
                {
                    name: name,
                    code: code,
                    description: desc,
                    shortDescription: shortDesc,
                    category: category,
                    room: room,
                    specs: [
                        { k: "dimensions", v: dimensions },
                        { k: "collection", v: collection },
                        { k: "materials", v: materials }
                    ],
                    price: price,
                    quantity: quantity,
                } 
            );
            if(data?.status == "success"){
                toast.success(data?.message);
            }
        }catch(error){
            console.log(error);
        }
    };

    const getProduct = async () => {
        console.log("closeModal");
        try {
            const { data } = await axios.get(
                `https://api-nhaxinh.onrender.com/api/product/${params.slug}`
            );
            setImages(data?.data?.images);
            setCategory(data?.data?.category?._id);
            setRoom(data?.data?.room?._id);
            setName(data?.data?.name);
            setCode(data?.data?.code);
            setDesc(data?.data?.description);
            setShortDesc(data?.data?.shortDescription);
            setDimensions(data?.data?.specs[0]?.v);
            setCollection(data?.data?.specs[1]?.v);
            setMaterials(data?.data?.specs[2]?.v);
            setQuantity(data?.data?.quantity);
            setPrice(data?.data?.price);
            setId(data?.data?._id);
            
        } catch (error) {
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

    useEffect(() => {
        if(room != "")
            getCategoryByRoom(room);
    }, [room]);

    useEffect(() => {
        if (params?.slug){
            getProduct();
        }
    }, [params?.slug]);

    useEffect(() => {
        descRef.current.style.height = "auto";
        descRef.current.style.height = descRef.current.scrollHeight + "px";
    }, [desc])

    useEffect(() => {
        shortDescRef.current.style.height = "auto";
        shortDescRef.current.style.height = shortDescRef.current.scrollHeight + "px";
    }, [shortDesc])

    useEffect(()=>{
        getAllRoom();
    }, []);

    return (
        <div className="flex flex-row h-auto justify-center">
            <div class="basis-4/6 text-center m-4 flex flex-col items-center">
                <h1 className="text-center w-full text-3xl">Edit Product</h1>
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
                <div class="flex flex-col mt-4 w-1/2">
                    <button className="bg-blue-500 p-8 text-[20px] px-2 py-2 uppercase text-white cursor-pointer mt-2 mx-4 rounded-lg w-auto"
                        onClick={handleUpdate}
                    >Update Product</button>
                </div>
                <div class="flex flex-col mt-4 w-1/2">
                    <button className="bg-red-500 p-8 text-[20px] px-2 py-2 uppercase text-white cursor-pointer mt-2 mx-4 rounded-lg w-auto"
                        onClick={handleDelete}
                    >Delete Product</button>
                </div>
                <div className="flex flex-col mt-4 w-3/4 mx-auto">
                    <h1 className="text-center w-full text-3xl mt-8">Edit Product Image</h1>
                    <label className="text-left text-lg mb-4"for="">Images<span class="required">*</span></label>
                    <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                        <img 
                            src={image.url} 
                            alt={`upload-${index}`} 
                            className="w-full h-32 object-cover rounded"
                        />
                        <FileInput
                            productId={id}
                            imgId={image._id}
                            onUploadSuccess = {onUpdateProduct}
                        >

                        </FileInput>
                        <button 
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-4 py-2"
                        >
                            X
                        </button>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>      
    )
}

export default AdminProductDetails
