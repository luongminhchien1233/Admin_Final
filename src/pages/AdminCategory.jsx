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
        console.log(error);
        toast.error("Something wwent wrong in getting catgeory");
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
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  // Get All Room
  const getAllCategory= async() =>{
    try{
      const { data } = await axios.get("https://api-nhaxinh.onrender.com/api/category/all");
      setCategories(data.data);
    }catch(error){
        console.log(error);
        toast.error("Something wwent wrong in getting catgeory");
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
      toast.error("Somtihing went wrong");
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
    <Layout title={"Admin Category"}>
        <div className="flex flex-row h-auto m-8 mx-24">
        <div class="basis-1/6 h-100% bg-slate-100">
            <AdminMenu />
        </div>
        <div class="basis-4/6 text-center m-4 flex flex-col">
            <div class="w-full mb-12">
                <h1 className="text-3xl text-left">Manage Category</h1>
                <CategoryForm
                    handleSubmit={handleSubmit}
                    value={name}
                    setValue={setName}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    rooms={rooms}
                />
            </div>
            <div class="w-full mb-8">
                <table class="table-fixed w-full">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((c) => (
                        <>
                        <tr>
                            <td key={c._id}>{c.nameCate}</td>
                            <td>
                            <button className="bg-blue-500 border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4"
                                onClick={() => {
                                  setVisible(true);
                                  setUpdatedName(c.nameCate);
                                  //setUpadteRoomId(c.roomId);
                                  setSelected(c);
                                }}
                            >
                                Edit
                            </button>
                            <button className="bg-red-600 border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2"
                                onClick={() => {
                                  handleDelete(c._id);
                                }}
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        </>
                        ))}
                    </tbody>
                </table>
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
    </div>
    </Layout>
  )
}

export default AdminCategory
