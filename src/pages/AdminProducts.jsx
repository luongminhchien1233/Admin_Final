import React, { useState, useEffect } from "react";
import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth';
import axios from 'axios';
import ProductItem from "../components/product/ProductItem";
import { useNavigate } from "react-router-dom";
const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const [code, setCode] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filteredProducts = products.filter(
      product => product.code.toLowerCase().includes(code.toLowerCase())
    );
    setResults(filteredProducts);
  };

  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://api-nhaxinh.onrender.com/api/product/admin/getAll"
      );
      setProducts(data?.data);
      setResults(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the product
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              navigate(`/dashboard/create-product`);
            }}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Product
          </button>
        </div>
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter product code"
          className="border p-2 mr-2"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Image
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Code
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-90">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Sale
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Quantity
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Enable
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {results.map((products) => (
                  <tr key={products.name}>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500"><img className="h-14 w-14" src={products.images[0].url} alt="" /></td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black font-semibold">{products.code}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black">{products.name}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black">{formatCurrency(products.price)}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-red-400">{products.sale}%</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-black">{products.quantity}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {products.enable == true ?
                        <>
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Enable
                          </span>
                        </> :
                        <>
                          <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Unable
                          </span>
                        </>}
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        onClick={() => navigate(`product-info/${products.slug}`)}
                        className="text-indigo-600 cursor-pointer hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    // <div className="w-full flex flex-row h-auto m-8 mt-0">
    //   <div class="w-full text-center m-4 flex flex-col">
    //         <div class="flex justify-start mb-8">
    //           <button className="bg-blue-500 p-8 text-[20px] px-6 py-2 uppercase text-white cursor-pointer mt-2 mx-4 rounded-lg"
    //               onClick={() => {
    //                 navigate(`/dashboard/create-product`);
    //               }}
    //           >Create New Product</button>
    //         </div>
    //       <div className="w-full md:flex md:flex-wrap md:justify-self-center mt-4">
    //           {products?.map((p, index) => (
    //               <>
    //                 <ProductItem product={p} images={p.images}/>
    //               </>
    //           ))}
    //       </div>
    //   </div>
    // </div>
  )
}

export default AdminProducts
