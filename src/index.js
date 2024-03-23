import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { Toaster, toast } from 'sonner';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
        <Toaster position='top-center'  richColors />
    </BrowserRouter>
  </React.StrictMode> 
);
