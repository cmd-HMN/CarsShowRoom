import {
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ChakraProvider } from "@chakra-ui/react";
import UserLog from "./components/UserLog";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Blog from "./pages/Blogs";
import Shop from "./pages/Shop";
import ContactUs from "./pages/Contact-us";
import AdminSignIn from "./pages/AdminSignIn";
import AdminLog from "./components/AdminLog";
import AdminCarsForm from "./pages/AdminCarsForm";
import AdminEditCar from './pages/AdminEditForm';
import AdminProfile from "./pages/AdminProfile";
import AboutUs from "./pages/AboutUs";
import { useLoadingContext } from "./context/LoadingContext";
import LoadingScreen from "./components/Loading";
import SignOut from "./pages/SignOut";
import FavoritePage from "./pages/FavoritePage";
import ViewDetails from "./pages/ViewDetails";
import AdminBlog from "./pages/AdminBlog";
import BlogViewDetails from "./pages/BlogViewDetails";
import AdminCars from "./pages/AdminCars";
import AdminReports from "./pages/AdminReports";
import AdminSignOut from "./pages/AdminSignOut";


function App() {

  
  const {loading} = useLoadingContext()

  return (
    <ChakraProvider>
      {loading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
          <Route path="/sign-up" element={<Layout><SignUp /></Layout>} />
          <Route path="/blogs" element={<Layout><Blog /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
          <Route path="/admin/sign-in" element={<Layout><AdminSignIn /></Layout>} />
          <Route path="/view-details/:carId" element={<Layout><ViewDetails /></Layout>} />
          <Route path="/blogs/view-details/:blogId" element={<Layout><BlogViewDetails /></Layout>} />

          <Route element={<UserLog />}>
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/favorite" element={<Layout><FavoritePage /></Layout>} />
            <Route path="/sign-out" element={<Layout><SignOut /></Layout>} />
          </Route>

          <Route element={<AdminLog />}>
            <Route path="/admin/cars" element={<Layout><AdminCars /></Layout>} />
            <Route path="/admin/cars/form" element={<Layout><AdminCarsForm /></Layout>} />
            <Route path="/admin/blog" element={<Layout><AdminBlog /></Layout>} />
            <Route path="/admin/reports" element={<Layout><AdminReports /></Layout>} />
            <Route path="/admin/profile" element={<Layout><AdminProfile /></Layout>} />
            <Route path="/admin/cars/edit-form/:carId" element={<Layout><AdminEditCar /></Layout>} />
            <Route path="/admin/sign-out" element={<Layout><AdminSignOut /></Layout>} />
          </Route>

          <Route path="*" element={<Layout><Home /></Layout>} />

        </Routes>
    </ChakraProvider>
  )
}

export default App
