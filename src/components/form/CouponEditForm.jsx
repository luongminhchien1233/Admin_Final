import React  from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const CouponEditForm = ({ handleSubmit, name, setName, quantity, setQuantity, discount, setDiscount, startDate, setStartDate }) => {
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
                <button className="bg-black rounded-lg border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 rounded-lg"
                    onClick={(e)=>{
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    Edit
                </button>
            </div>
        </div>
    </div>
  )
}

export default CouponEditForm
