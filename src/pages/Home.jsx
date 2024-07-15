import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth.jsx";
import { Modal } from "antd";
import LoginForm from "../components/form/LoginForm.jsx";
import {useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import Layout from "../components/form/Auth/Layout.jsx";


const Home = () => {
    const [auth, setAuth] = useAuth();
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
          const res = await axios.post("https://api-nhaxinh.onrender.com/api/user/loginUser", {
            username,
            password,
          });
          if (res && res.data.status == "success") {
            toast.success(res.data && res.data.message);
            setAuth({
              user: res.data.data,  
              token: res.data.data?.token,
            });
            console.log("Token" + res.data.data?.token);
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state ||"/");
            setVisible(false);
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
    const handleLogout = () => {
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
      };

    

    return (
        <Layout title={"Home"}>
            <div className="w-full h-screen bg-blue-300">
            <div>
                <h2 className="text-center text-5xl text-white p-8">Welcome to Manager Dash Board</h2>
                {!auth?.user ? (
                    <>
                        <div className="flex justify-center">
                            <button href="" className="bg-white p-4 text-2xl rounded-lg"  onClick={()=>{setVisible(true)}}>Đăng nhập </button>
                        </div>
                    </>
                    ) : (
                        <>
                            {/* <div className="flex justify-center mb-8">
                                <h1 className="text-2xl">Admin Name: test</h1>
                             </div> */}
                            <div className="flex justify-center">
                              {(auth?.user?.role === "staff") ? (
                                <>
                                  <button className="bg-white p-4 text-2xl rounded-lg" onClick={() => navigate(`/staff/home`)}>Staff DashBoard</button>
                                  <button className="bg-white p-4 text-2xl rounded-lg ml-8" onClick={handleLogout}>Logout</button>
                                </>
                              ) : (auth?.user?.role === "admin") ? (
                                <>
                                  <button className="bg-white p-4 text-2xl rounded-lg" onClick={() => navigate(`/dashboard/home`)}>Admin DashBoard</button>
                                  <button className="bg-white p-4 text-2xl rounded-lg ml-8" onClick={handleLogout}>Logout</button>
                                </>
                              ) : (
                                <>
                                  <p className="text-white text-4xl">You do not have permission</p>
                                  <button className="bg-white p-4 text-2xl rounded-lg ml-8" onClick={handleLogout}>Logout</button>
                                </>
                              )}
                                
                             </div>
                        </>
                      )}
            </div>
            <Modal
                onCancel={() => setVisible(false)}
                width={600} closable={false} footer={null}
                visible={visible}>
                <LoginForm
                    handleSubmit={handleSubmit}
                    userName={username}
                    setUserName={setUsername}
                    password={password}
                    setPassword={setPassword}
                />
            </Modal>
        </div>
        </Layout>
    );
};

export default Home;
