import React from 'react'
import { useLoading } from '../../context/loading';
const LoginForm = ({ handleSubmit, userName, setUserName, password, setPassword }) => {
  const { loading } = useLoading();
  return (
    <>
    {loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-500">
    <div
      className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
    <div
      className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  </div>
)}

    <div>
        <div className="flex flex-col">
            <div class="flex flex-col mt-4 w-full">
                <label className="text-left text-lg"for="">User name<span class="required">*</span></label>
                <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                ></input>
            </div>
            <div class="flex flex-col mt-4 w-full">
                <label className="text-left text-lg"for="">Password<span class="required">*</span></label>
                <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300"
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <div class="flex flex-col mt-4 w-full">
                <button className="bg-black border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2"
                    onClick={()=>{
                        handleSubmit();
                    }}
                >
                    ĐĂNG NHẬP
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default LoginForm
