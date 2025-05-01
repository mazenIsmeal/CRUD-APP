import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Index from "./pages/Index";
import Details from "./pages/Details";
import ErrorPage from "./pages/ErrorPage";

const routers = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage /> ,
    children: [
      {path: 'add', element: <Add />},
      {path: ':id/edit', element: <Edit />},
      {index: true, element: <Index />},
      {path: ':id/details', element: <Details />, loader: ({params}) => {
        if(isNaN(params.id)) {
          throw new Response('Bad Request', {statusText: 'Please make to insert correct post ID', status: 400})
        }
      }}
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={routers}></RouterProvider>
  </React.StrictMode>
);
