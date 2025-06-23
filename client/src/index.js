import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        product: new ProductStore(),
    }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>
);

