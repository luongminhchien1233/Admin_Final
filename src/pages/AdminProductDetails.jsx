import React, { useState, useEffect, useRef } from "react";
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth';
import axios from 'axios';
import { toast } from "react-toastify";
import Layout from "../components/form/Auth/Layout";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "../components/button/FileInput";
import { MdDeleteOutline } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { useLoading } from "../context/loading";
const AdminProductDetails = () => {
    const [categories, setCategories] = useState([]);
    const {showLoading, hideLoading} = useLoading();
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
    const [sale, setSale] = useState(0);
    const [enable, setEnable] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [shortDesc, setShortDesc] = useState("");
    const [category, setCategory] = useState("");
    const [room, setRoom] = useState("");
    const [id, setId] = useState("");

    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const params = useParams();

    const getAllRoom = async () => {
        try {
            const { data } = await axios.get("https://api-nhaxinh.onrender.com/api/room/all");
            setRooms(data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteImage = (index) => {
        const image = images[index];
        console.log(image);
        showLoading();
        const url = `https://api-nhaxinh.onrender.com/api/product/updateImageDelete?id_Product=${id}&url_image=${image.url}&id_image=${image._id}`;
        axios.delete(url)
            .then(response => {
                const data = response.data;
                if (data?.status === "success") {
                    onUpdateProduct();
                } else {

                }
                hideLoading();
            })
            .catch(error => {
                hideLoading();
                console.error('There was an error deleting the image!', error);
            });
    };

    const onUpdateProduct = async () => {
        toast.success("Update Product Image Success!");
        await getProduct();
    };


    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`https://api-nhaxinh.onrender.com/api/product/${id}`,

            );
            if (data?.status == "success") {
                //toast.success(data?.message);
                navigate(`/dashboard/product`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async () => {
        // console.log(JSON.stringify([
        //     { k: "dimensions", v: dimensions },
        //     { k: "collection", v: collection },
        //     { k: "materials", v: materials }
        // ]))
        try {
            showLoading();
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
                    sale: sale,
                    enable: enable
                }
            );
            if (data?.status == "success") {
                toast.success(data?.message);
                hideLoading();
                await getProduct();
            }
            hideLoading();
        } catch (error) {
            hideLoading();
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
            setSale(data?.data?.sale)
            setEnable(data?.data?.enable);

        } catch (error) {
            console.log(error);
        }
    };

    const handleUpload = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const productData = new FormData();
            productData.append("images", files[0]); 
            showLoading();
            axios.post(
                `https://api-nhaxinh.onrender.com/api/product/updateImageAdd/${id}`,
                productData
            ).then(response => {
                const data = response.data;
                if (data?.status === "success") {
                    toast.success(data?.message);
                    hideLoading();
                    return getProduct();
                } else {
                    hideLoading();
                    toast.error(data?.message);
                }
            }).catch(error =>{
                hideLoading();
                toast.error(error.response.data.message);
            });
        }
    };

    const getCategoryByRoom = async (pId) => {
        try {
            const { data } = await axios.get(`https://api-nhaxinh.onrender.com/api/room/getCateByRoom/${pId}`);
            setCategories(data?.data?.categories);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (room != "")
            getCategoryByRoom(room);
    }, [room]);

    useEffect(() => {
        if (params?.slug) {
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

    useEffect(() => {
        getAllRoom();
    }, []);

    return (
        <div className="flex flex-row h-auto mx-auto">
            <div class="basis-4/6 m-4 flex flex-col">
                <h1 className="w-full text-3xl">Edit Product</h1>
                {/* <div class="flex flex-col mt-4 w-3/4">
                    <label className="text-left text-lg"for="">Name<span class="required">*</span></label>
                    <input className="form-control w-full mr-16 mt-4 p-4 border-2 border-gray-300 active:outline-none focus:outline-none"
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value);
                        }}
                    ></input>
                </div> */}
                <div className="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className="block w-full h-15 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">
                        Code <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="block w-full h-15 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                        }}
                    ></input>
                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">Descripttion <span className="text-red-500">*</span></label>
                    <textarea className="block w-full h-15 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Type Desc"
                        value={desc} onChange={e => {
                            setDesc(e.target.value);
                        }} rows="2" ref={descRef}

                    ></textarea>
                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">Short Descripttion <span className="text-red-500">*</span></label>
                    <textarea className="block w-full h-15 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Type Desc"
                        value={shortDesc} onChange={e => {
                            setShortDesc(e.target.value);
                        }} rows="1" ref={shortDescRef}

                    ></textarea>
                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold" for="district">Room&nbsp;<span className="text-red-500">*</span></label>
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
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold" for="district">Category&nbsp;<span className="text-red-500">*</span></label>
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
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">Images&nbsp;<span className="text-red-500">*</span></label>
                    <div className="w-auto h-auto">
                        {images.map((image, index) => (
                            <div key={index} className="relative mt-2 w-[450px] h-[300px]">
                                <img
                                    src={image.url}
                                    alt={`upload-${index}`}
                                    className="bg-cover"
                                />
                                <FileInput
                                    productId={id}
                                    imgId={image._id}
                                    onUploadSuccess={onUpdateProduct}
                                >
                                </FileInput>
                                <button
                                    onClick={() => handleDeleteImage(index)}
                                    className="right-0 top-0 absolute inline-flex items-center gap-x-1.5 rounded-md bg-red-300 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <MdDeleteOutline className="-ml-0.5 h-5 w-5" />
                                    Delete
                                </button>
                            </div>
                        ))}
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <FaImages className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleUpload} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">Price&nbsp;<span className="text-red-500">*</span></label>
                    <input
                        className="form-control block w-full h-15 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                        type="number"
                    ></input>
                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">Sale (%)&nbsp;<span className="text-red-500">*</span></label>
                    <input
                        className="form-control block w-full h-15 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={sale}
                        onChange={(e) => {
                            setSale(e.target.value);
                        }}
                        type="number"
                    ></input>
                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">Quantity&nbsp;<span className="text-red-500">*</span></label>
                    <input
                        className="form-control block w-full h-15 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}
                        type="number"
                    ></input>
                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">Enable&nbsp;<span className="text-red-500">*</span></label>
                    <select id="district" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => {
                            setEnable(e.target.value);
                        }} 
                        value={enable}
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">Dimensions&nbsp;<span className="text-red-500">*</span></label>
                    <input
                        className="form-control block w-full h-15 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={dimensions}
                        onChange={(e) => {
                            setDimensions(e.target.value);
                        }}

                    ></input>
                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">Collection&nbsp;<span className="text-red-500">*</span></label>
                    <input
                        className="form-control block w-full h-15 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={collection}
                        onChange={(e) => {
                            setCollection(e.target.value);
                        }}

                    ></input>
                </div>
                <div class="mt-5 w-3/4">
                    <label className="block text-sm leading-6 text-gray-900 font-bold">Materials&nbsp;<span className="text-red-500">*</span></label>
                    <input
                        className="form-control block w-full h-15 rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={materials}
                        onChange={(e) => {
                            setMaterials(e.target.value);
                        }}

                    ></input>
                </div>
                <div class="flex flex-col mt-4 w-1/2">
                    <button
                        className="rounded-md w-40 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleUpdate}
                    >Update Product</button>
                </div>
                {/* <div class="flex flex-col mt-4 w-1/2">
                    <button
                        className="rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleDelete}
                    >Delete Product</button>
                </div> */}
            </div>
        </div>
    )
}

export default AdminProductDetails
