import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth';
import axios from 'axios';
import { Modal } from "antd";
import UserForm from "../components/form/UserForm";
import { useLoading } from "../context/loading";
import { toast } from "react-toastify";
const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState({});
    const [updateRole, setUpdateRole] = useState("");
    const {showLoading, hideLoading} = useLoading();


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
      showLoading();
      const { data } = await axios.put(`https://api-nhaxinh.onrender.com/api/user/admin/update/${selected?._id}`, {
        role: updateRole
      });
      if (data?.status == "success") {
        setUpdateRole("");
        setVisible(false);
      } else {
        toast.error(data.message);
      }
      hideLoading();
      await getAllUsers();
    } catch (error) {
      console.log(error);
      hideLoading();
      toast.error("somthing went wrong in input form");
    }
  };

    useEffect(()=>{
        getAllUsers();
    }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.username}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                            setVisible(true);
                            setUpdateRole(person.role);
                            setSelected(person);
                          }}
                        >
                          Edit<span className="sr-only"></span>
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
          <UserForm
                user={selected}
                updateRole={updateRole}
                setUpdateRole={setUpdateRole}
                handleSubmit={handleSubmit}
          />
        </Modal>
    </div>
  )
}

export default AdminUser
