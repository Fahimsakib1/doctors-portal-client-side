import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import ManageDoctors from "../../pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../../pages/Dashboard/Payment/Payment";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from '../PrivateRoute/PrivateRoute';



const routes = createBrowserRouter ([
    
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

            {
                path: '/login',
                element: <Login></Login>
            }, 

            {
                path: '/appointment',
                element: <Appointment></Appointment>
            },

            {
                path: '/signup',
                element: <Signup></Signup>
            },
        ]
    },



    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },

            {
                path: '/dashboard/users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },

            {
                path: '/dashboard/addDoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },

            {
                path: '/dashboard/manageDoctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },

            {
                path: '/dashboard/payment/:id',
                loader: ({params}) => fetch(`http://localhost:5000/bookings/${params.id}`),
                element: <AdminRoute><Payment></Payment></AdminRoute>
            }
        ]
    }

])

export default routes