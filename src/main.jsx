import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./RTK/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster position="top-center" />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
