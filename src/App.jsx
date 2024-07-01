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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="home" element={<AdminDashboard />} />
          <Route path="category" element={<AdminCategory />} />
          <Route path="user" element={<AdminUser />} />
          <Route path="review" element={<AdminReview />} />
          <Route path="order" element={<AdminOrder />} />
          <Route path="order/:id" element={<AdminOrderDetail />} />
          <Route path="product" element={<AdminProducts />} />
          <Route path="create-product" element={<AdminCreateProduct />} />
          <Route path="product/product-info/:slug" element={<AdminProductDetails />} />
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
