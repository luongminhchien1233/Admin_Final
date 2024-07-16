import React, { useRef } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { useLoading } from '../../context/loading';
const FileInput = ({productId, imgId, onUploadSuccess}) => {
    const { showLoading, hideLoading } = useLoading();
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const updateImage = async () =>{

    };

    const handleChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            //console.log(files[0].name); // In ra tên file đầu tiên
            const productData = new FormData();
            productData.append("images", files[0]); 
            productData.append('arrayId', JSON.stringify([imgId]));
            // Kiểm tra formData đã thêm file chưa
            console.log(imgId);
            for (let [key, value] of productData.entries()) {
                console.log(key, value);
            }
            showLoading();
            axios.post(
                `https://api-nhaxinh.onrender.com/api/product/updateImageProduct/${productId}`,
                productData
            ).then(response => {
                const data = response.data;
                if (data?.status === "success") {
                    onUploadSuccess();
                } else {
                    
                }
                hideLoading();
            });
        }
    };

    
    return (
        <>
            <button 
                onClick={() => handleClick()}
                className="top-0 absolute inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <FaEdit className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Edit
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleChange}
            />
        </>
    )
}

export default FileInput
