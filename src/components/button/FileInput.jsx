import React, { useRef } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
const FileInput = ({productId, imgId, onUploadSuccess}) => {
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
            axios.post(
                `https://api-nhaxinh.onrender.com/api/product/updateImageProduct/${productId}`,
                productData
            ).then(response => {
                const data = response.data;
                if (data?.status === "success") {
                    onUploadSuccess();
                } else {
                    
                }
            });
        }
    };

    
    return (
        <div>
            <button 
                onClick={() => handleClick()}
                className="absolute top-0 right-100 bg-yellow-600 text-white rounded-full px-4 py-2"
            >
                Edit
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleChange}
            />
        </div>
    )
}

export default FileInput
