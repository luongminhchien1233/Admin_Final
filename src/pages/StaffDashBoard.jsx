import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth';
import axios from 'axios';
import StaffMenu from "./StaffMenu";
const StaffDashboard = () => {
  const [auth, setAuth] = useAuth();
  
  return (
    <div className="flex flex-row h-auto m-8 mx-24">
        <div class="basis-1/6 h-100% bg-slate-100">
            <StaffMenu />
        </div>
        <div class="basis-4/6 text-center m-4 flex flex-col">
            <h1 className="text-center w-full text-3xl">Welcome Staff</h1>
            <div className="mt-8">
            </div>
            
        </div>
    </div>
  )
}

export default StaffDashboard
