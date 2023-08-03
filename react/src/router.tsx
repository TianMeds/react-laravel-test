import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx"
import Dashboard from "./pages/Dashboard.tsx";
import Inbox from "./pages/Inbox.tsx";
import Scholarship from "./pages/Scholarship.tsx";
import Application from "./pages/Application.tsx";
import NotFound from "./pages/Notfound.tsx";
import DefaultLayout from "./components/DefaultLayout.tsx";
import GuestLayout from "./components/GuestLayout.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },   
            {
                path: '/inbox',
                element: <Inbox/>
            },
            {
                path: '/scholarship',
                element: <Scholarship/>
            },
            {
                path: '/application',
                element: <Application/>
            },

        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },
])

export default router;