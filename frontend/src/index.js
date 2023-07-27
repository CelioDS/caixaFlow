import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";

// paginas
import Error from "./componentes/layout/Error";
import Configuracao from "./componentes/routes/Configuracao";
import Home from "./componentes/routes/Home";
import Relatorios from "./componentes/routes/Relatorios";

//1- configurando router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/Configuracao",
        element: <Configuracao />,
      },
      {
        path: "/Relatorios",
        element: <Relatorios />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
