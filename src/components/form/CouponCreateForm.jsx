import React  from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const CouponCreateForm = ({ handleSubmit }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleCreate = async () => {
    const formattedDate = startDate.toISOString().split('T')[0];
    console.log(formattedDate);
    try {
      const { data } = await axios.post("https://api-nhaxinh.onrender.com/api/coupon/create", {
        name: name, quantity: quantity, discount: discount, expiry: startDate
      });
      if (data?.status == "success") {
        setName("");
        setQuantity("");
        setDiscount("");
        handleSubmit();
      } else {
        toast.error(data.message);
      }
      await getAllCategory();
    } catch (error) {
      //toast.error(error.response.data.message);
    }
  };

  
  return (
    <div>
        <div className="flex flex-col">
            <div class="flex flex-col mt-4 w-full">
                <label className="text-left text-lg"for="">Name<span class="required">*</span></label>
                <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300 rounded-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
            </div>
            <div class="flex flex-col mt-4 w-full">
                <label className="text-left text-lg"for="">Quantity<span class="required">*</span></label>
                <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300 rounded-lg"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                ></input>
            </div>
            <div class="flex flex-col mt-4 w-full">
                <label className="text-left text-lg"for="">Discount(%)<span class="required">*</span></label>
                <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300 rounded-lg"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                ></input>
            </div>
            <div class="flex flex-col mt-4 w-full">
                <label className="text-left text-lg"for="">Expiry Day<span class="required">*</span></label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div class="flex flex-col mt-4 w-32">
                <button className="bg-black border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 rounded-lg"
                    onClick={(e)=>{
                        e.preventDefault();
                        handleCreate();
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
  )
}

export default CouponCreateForm
