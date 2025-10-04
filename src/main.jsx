import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Intro from "./pages/Intro.jsx";
import SignUp from "./pages/SignUp.jsx";
import AppShell from "./App.jsx";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Intro /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/app/*", element: <AppShell /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
);
