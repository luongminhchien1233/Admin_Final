import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import CouponCreateForm from "../components/form/CouponCreateForm";
import CouponEditForm from "../components/form/CouponEditForm";
import { toast } from 'react-toastify';
import { useLoading } from "../context/loading";
const AdminCoupon = () => {
    const [coupons, setCoupons] = useState([]);
    const {showLoading, hideLoading} = useLoading();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [editvisible, setEditVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [discount, setDiscount] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        getCoupons();
    }, []);
    
    const handleCreate = async () => {
        setVisible(false);
        getCoupons();
    }

    //delete category
  const handleDelete = async (pId) => {
    try {
      showLoading();
      const { data } = await axios.delete(
        `https://api-nhaxinh.onrender.com/api/coupon/${pId}`
      );
      hideLoading();
      await getCoupons();
    } catch (error) {
      hideLoading();
      toast.error(error.respone.data.message);
    }
  };

    //delete category
    const handleUpdate = async () => {
        try {
        showLoading();
        const { data } = await axios.put(
            `https://api-nhaxinh.onrender.com/api/coupon/${selected?._id}`,{
                name: name, quantity: quantity, discount: discount, expiry: startDate
            }
        );
        if(data?.status == "success"){
            setEditVisible(false);
            hideLoading();
            await getCoupons();
        }
        } catch (error) {
          hideLoading();
            toast.error(error.respone.data.message);
        }
    };

    const getCoupons= async () => {
        try {
            const { data } = await axios.get(
                "https://api-nhaxinh.onrender.com/api/coupon/all"
            );
            setCoupons(data?.data);
        } catch (error) {
          toast.error(error.response.data.message);
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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Coupons</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the coupons
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setVisible(true);
              setSelected(null);
            }}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Coupon
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-2 pr-3 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="py-3.5 pl-2 pr-3 text-left text-sm font-semibold text-gray-900">
                    Code
                  </th>
                  <th scope="col" className="py-3.5 pl-2 pr-3 text-left text-sm font-semibold text-gray-90">
                    Expiry Day
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Quantity
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Discount
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {coupons.map((p) => (
                  <tr key={p.name}>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black font-semibold">{p.name}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black">{p.code}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black">{formatDate(p.expiry)}</td>
                    <td className="whitespace-nowrap px-3 py-5 pl-8 text-sm text-red-400">{p.quantity}</td>
                    <td className="whitespace-nowrap px-3 py-5 pl-8 text-sm text-black">{p.discount}%</td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        onClick={() => {
                            setEditVisible(true);
                            setName(p.name);
                            setDiscount(p.discount);
                            setQuantity(p.quantity);
                            setStartDate(p.expiry);
                            setSelected(p);
                        }}
                        className="text-indigo-600 cursor-pointer hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        onClick={() => handleDelete(p?._id)}
                        className="text-red-600 cursor-pointer hover:text-red-900">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        visible={visible}
        >
        <CouponCreateForm
            handleSubmit={handleCreate}
        />
      </Modal>
      <Modal
        onCancel={() => setEditVisible(false)}
        footer={null}
        visible={editvisible}
        >
        <CouponEditForm
            handleSubmit={handleUpdate}
            name={name}
            setName={setName}
            quantity={quantity}
            setQuantity={setQuantity}
            discount={discount}
            setDiscount={setDiscount}
            startDate={startDate}
            setStartDate={setStartDate}
        />
      </Modal>
    </div>
  )
}

export default AdminCoupon
