import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import RootLayout from "./pages/RootLayout";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
import store from "./state";

const Add = lazy(() => import('./pages/Add'));
const Edit = lazy(() => import('./pages/Edit'));
const Details = lazy(() => import('./pages/Details'));


const postPromosHandler = ({params}) => {
  if(isNaN(params.id)) {
    throw new Response('Bad Request', {statusText: 'Please make to insert correct post ID', status: 400})
  }
}

const routers = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage /> ,
    children: [
      {path: 'add', element: <Suspense fallback='Please Wait....'><Add /></Suspense>},
      {path: ':id/edit', element: <Suspense fallback='Please Wait....'><Edit /></Suspense>, loader:postPromosHandler},
      {index: true, element: <Index />},
      {path: ':id/details', element: <Suspense fallback='Please Wait....'><Details /></Suspense>, loader:postPromosHandler }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={routers}></RouterProvider>
  </Provider>
  
);
