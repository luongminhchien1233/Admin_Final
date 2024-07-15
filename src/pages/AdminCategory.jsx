import React from "react";
import Layout from '../components/form/Auth/Layout'
import AdminMenu from './AdminMenu'
import LoginForm from '../components/form/LoginForm'
import CategoryForm from '../components/form/CategoryForm'
import { useEffect, useState } from 'react'
import {toast} from "react-toastify";
import axios from "axios";
import { Modal } from "antd";
const AdminCategory = () => {
  const [rooms, setRooms] = useState([])
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updateRoomId, setUpadteRoomId] = useState("");
  const getAllRoom = async() =>{
    try{
      const { data } = await axios.get("https://api-nhaxinh.onrender.com/api/room/all");
      setRooms(data?.data);
    }catch(error){
      toast.error(error.response.data.message);
    }
  };
  //handle Form
  const handleSubmit = async () => {
    //e.preventDefault();
    try {
      const { data } = await axios.post("https://api-nhaxinh.onrender.com/api/category/create-cate", {
        nameCate: name, roomId: roomId,
      });
      if (data?.status == "success") {
        //toast.success(`${name} is created`);
        setName("");
        setRoomId("");
      } else {
        toast.error(data.message);
      }
      await getAllCategory();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Get All Room
  const getAllCategory= async() =>{
    try{
      const { data } = await axios.get("https://api-nhaxinh.onrender.com/api/category/all");
      setCategories(data.data);
    }catch(error){
      toast.error(error.response.data.message);
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://api-nhaxinh.onrender.com/api/category/${pId}`
      );
      if (data.status == 200) {
        //toast.success(`Category is deleted`);
      } else {
        //toast.error(data.message);
      }
      await getAllCategory();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //update category
  const handleUpdate = async (e) => {
    //e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://api-nhaxinh.onrender.com/api/category/${selected._id}`,
        { name: updatedName, roomId: updateRoomId }
      );
      if (data.status == "success") {
        //toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        await getAllCategory();
      } else {
        //toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  useEffect(()=>{
    getAllRoom();
    getAllCategory();
  }, [])
  return (
    // <div class="basis-4/6 text-center m-4">
    //     {/* <div class="w-full mb-12">
    //         <h1 className="text-3xl text-left">Category</h1>
    //         <CategoryForm
    //             handleSubmit={handleSubmit}
    //             value={name}
    //             setValue={setName}
    //             roomId={roomId}
    //             setRoomId={setRoomId}
    //             rooms={rooms}
    //         />
    //     </div> */}
      
    //     <div class="w-full mb-8">
    //         <table class="table-fixed w-full">
    //             <thead>
    //                 <tr>
    //                 <th>Name</th>
    //                 <th>Actions</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {categories?.map((c) => (
    //                 <>
    //                 <tr>
    //                     <td key={c._id}>{c.nameCate}</td>
    //                     <td>
    //                     <button className="bg-blue-500 border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4"
    //                         onClick={() => {
    //                           setVisible(true);
    //                           setUpdatedName(c.nameCate);
    //                           //setUpadteRoomId(c.roomId);
    //                           setSelected(c);
    //                         }}
    //                     >
    //                         Edit
    //                     </button>
    //                     <button className="bg-red-600 border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2"
    //                         onClick={() => {
    //                           handleDelete(c._id);
    //                         }}
    //                     >
    //                         Delete
    //                     </button>
    //                     </td>
    //                 </tr>
    //                 </>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    //     <Modal
    //       onCancel={() => setVisible(false)}
    //       footer={null}
    //       visible={visible}
    //     >
    //       <CategoryForm
    //         handleSubmit={handleUpdate}
    //         value={updatedName}
    //         setValue={setUpdatedName}
    //         roomId={updateRoomId}
    //         setRoomId={setUpadteRoomId}
    //         rooms={rooms}
    //       />
    //     </Modal>
    // </div>  
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Categories</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the cateogry.
            </p>
          </div>
          {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create New Category
            </button>
          </div> */}
        </div>
        <div class="w-1/2 mb-12">
             <CategoryForm
                 handleSubmit={handleSubmit}
                 value={name}
                 setValue={setName}
                 roomId={roomId}
                 setRoomId={setRoomId}
                 rooms={rooms}
             />
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-36">
                        Name
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {categories.map((category) => (
                      <tr key={category.nameCate}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-24">
                          {category.nameCate}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(category.nameCate);
                              setSelected(category);
                            }}
                          >
                            Edit<span className="sr-only"></span>
                          </button>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-red-600 hover:text-red-900"
                            onClick={() => {
                              handleDelete(category._id);
                            }}
                          >
                            Delete<span className="sr-only"></span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              handleSubmit={handleUpdate}
              value={updatedName}
              setValue={setUpdatedName}
              roomId={updateRoomId}
              setRoomId={setUpadteRoomId}
              rooms={rooms}
            />
          </Modal>
      </div>
  )
}

export default AdminCategory
