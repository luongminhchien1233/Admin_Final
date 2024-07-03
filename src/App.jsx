import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer, toast } from 'react-toastify';
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/form/Auth/Private";
import AdminCategory from "./pages/AdminCategory";
import AdminUser from "./pages/AdminUser";
import AdminOrder from "./pages/AdminOrder";
import AdminOrderDetail from "./pages/AdminOrderDetail";
import AdminProducts from "./pages/AdminProducts";
import AdminCreateProduct from "./pages/AdminCreateProduct";
import AdminProductDetails from "./pages/AdminProductDetails";
import AdminReview from "./pages/AdminReview";
import StaffDashboard from "./pages/StaffDashBoard";
import StaffUser from "./pages/StaffUser";
import StaffOrder from "./pages/StaffOrder";
import StaffOrderDetail from "./pages/StaffOrderDetail";
import NewDashboard from "./pages/NewDashboard";
import NewUser from "./pages/NewUser";
import NewCategory from "./pages/NewCategory";
import NewProduct from "./pages/NewProduct";
import NewCreateProduct from "./pages/NewCreateProduct";
import NewProductDetail from "./pages/NewProductDetail";
import NewOrder from "./pages/NewOrder";
import NewReview from "./pages/NewReview";
import NewOrderDetail from "./pages/NewOrderDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="home" element={<NewDashboard />} />
          <Route path="user" element={<NewUser />} />
          <Route path="category" element={<NewCategory />} />
          <Route path="review" element={<NewReview />} />
          <Route path="order" element={<NewOrder />} />
          <Route path="order/:id" element={<NewOrderDetail />} />
          <Route path="product" element={<NewProduct />} />
          <Route path="create-product" element={<NewCreateProduct />} />
          <Route path="product/product-info/:slug" element={<NewProductDetail />} />
        </Route>
        <Route path="/staff" element={<PrivateRoute />}>
          <Route path="home" element={<StaffDashboard />} />
          <Route path="user" element={<StaffUser />} />
          <Route path="order" element={<StaffOrder />} />
          <Route path="order/:id" element={<StaffOrderDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
