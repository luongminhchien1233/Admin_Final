import React from 'react'

const LoginForm = ({ handleSubmit, userName, setUserName, password, setPassword }) => {
  return (
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
  )
}

export default LoginForm
