import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth';
import axios from 'axios';
import { Modal } from "antd";
import UserForm from "../components/form/UserForm";

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState({});
    const [updateRole, setUpdateRole] = useState("");

    const getAllUsers = async() =>{
        try{
          const { data } = await axios.get("https://api-nhaxinh.onrender.com/api/user/all-users");
          setUsers(data?.data);
        }catch(error){
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(`https://api-nhaxinh.onrender.com/api/user/admin/update/${selected?._id}`, {
        role: updateRole
      });
      if (data?.status == "success") {
        setUpdateRole("");
        setVisible(false);
      } else {
        toast.error(data.message);
      }
      await getAllUsers();
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

    useEffect(()=>{
        getAllUsers();
    }, [])

  return (
    <div className="flex flex-row h-auto m-8 mx-24">
        <div class="basis-1/6 h-100% bg-slate-100">
            <AdminMenu />
        </div>
        <div class="basis-4/6 text-center m-4 flex flex-col">
            <h1 className="text-center w-full text-3xl">Admin User</h1>
            <div class="w-full mb-8 mt-12">
                <table class="table-fixed w-full">
                    <thead>
                        <tr>
                        <th class="text-2xl">UserName</th>
                        <th class="text-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((c) => (
                        <>
                        <tr>
                            <td key={c._id}>{c.username}</td>
                            <td>
                            <button className="bg-blue-500 border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4"
                                onClick={() => {
                                  setVisible(true);
                                  setUpdateRole(c.role);
                                  setSelected(c);
                                }}
                            >
                                Edit
                            </button>
                            <button className="bg-red-600 border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2"
                                onClick={() => {
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
              <UserForm
                    user={selected}
                    updateRole={updateRole}
                    setUpdateRole={setUpdateRole}
                    handleSubmit={handleSubmit}
              />
            </Modal>
        </div>
    </div>
  )
}

export default AdminUser
