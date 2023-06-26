import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import Root from './routes/Root';
import RegistroHorario from './routes/RegistroHorario';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ index: true, element: <Navigate to="/login" replace /> },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path:"registrar",
        element: <RegistroHorario/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
