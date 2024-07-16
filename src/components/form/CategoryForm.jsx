import React from 'react'
import { toast } from 'react-toastify';
import { useLoading } from '../../context/loading';
const CategoryForm = ({ handleSubmit, value, setValue, roomId, setRoomId, rooms }) => {
  const { loading } = useLoading();
  const handleFormSubmit = (e) => {
    console.log("Form submit");

    const isRoomValid = rooms.some(room => room._id === roomId);
    if (!isRoomValid) {
      toast.error("Please select a valid room from the list.");
      return;
    }

    handleSubmit();
  };
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
                <label className="text-left text-lg"for="">Name<span class="required">*</span></label>
                <input className="form-control  w-full mr-16 mt-4 p-4 border-2 border-gray-300 rounded-lg"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></input>
            </div>
            <div class="flex flex-col  mt-4 w-full">
                <label className="text-left my-4"for="district">Room&nbsp;<span class="required">*</span></label>
                <select id="district" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setRoomId(e.target.value)} value={roomId}
                >
                    <option selected>Choose Room</option>
                    {rooms && rooms.map((room) => (
                        <option key={room._id} value={room._id}>{room.nameRoom}</option>
                    ))}
                </select>
            </div>
            <div class="flex flex-col mt-4 w-32">
                <button className="bg-black border border-black text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 rounded-lg"
                    onClick={(e)=>{
                        e.preventDefault();
                        handleFormSubmit();
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default CategoryForm
