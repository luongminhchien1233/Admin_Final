import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useAuth } from "../../context/auth";

const UserForm = ({ handleSubmit, user, updateRole, setUpdateRole }) => {
    const [auth, setAuth] = useAuth();
    const [users, setUsers] = useState([]);
    const handleFormSubmit = (e) => {
        handleSubmit();
      };
  return (
    <div>
        <div className="flex flex-col">
            <div class="flex flex-col mt-4 w-full">
                <label className="text-left text-lg mb-8"for="">Username: <span className="ml-4">{user.username}</span></label>
                <label className="text-left text-lg mb-8"for="">First Name: <span className="ml-4">{user.firstname}</span></label>
                <label className="text-left text-lg mb-8"for="">Last Name: <span className="ml-4">{user.lastname}</span></label>
                <label className="text-left text-lg mb-8"for="">Email: <span className="ml-4">{user.email}</span></label>
                <label className="text-left text-lg "for="">Phone: <span className="ml-4">{user.phoneNumber}</span></label>
            </div>
            <div class="flex flex-col mt-4 w-full">
                <label className="text-left my-4"for="district">Role&nbsp;<span class="required">*</span></label>
                <select id="district" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setUpdateRole(e.target.value)}
                    disabled={auth?.user?.role != "admin"}
                    value={updateRole}
                >
                    <option selected>Role of user</option>
                    <option key={"customer"} value={"customer"}>Customer</option>
                    <option key={"staff"} value={"staff"}>Staff</option>
                </select>
            </div>
            {(auth?.user?.role === "staff") ? (
                <>
                    
                </>
                ) : (auth?.user?.role === "admin") ? (
                <>
                    <div class="flex flex-col mt-4 w-32">
                        <button className="bg-black border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2"
                            onClick={(e)=>{
                                handleFormSubmit();
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </>
                ) : (
                <>
                    
                </>
            )}
        </div>
    </div>
  )
}

export default UserForm
