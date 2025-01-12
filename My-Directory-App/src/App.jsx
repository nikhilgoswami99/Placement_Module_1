import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './containers/Layout';
import Database from './components/database/database';


function App() {

  let router = createBrowserRouter( [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "database",
          element: <Database />
        }
      ]
    }
  ]);

  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
