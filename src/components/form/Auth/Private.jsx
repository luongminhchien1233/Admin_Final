import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner"

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("https://api-nhaxinh.onrender.com/api/user/info-user");
      if (res.data.status == "success") {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}