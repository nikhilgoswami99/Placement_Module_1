import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Details from './pages/details.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "details/:id",
    element: <Details></Details>
  }
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
