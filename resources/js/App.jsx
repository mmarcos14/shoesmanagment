import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import React, { useState } from 'react';
import Head from "./components/Head";
import FunctionList from './components/Functions/FunctionList';
import EmployeeList from './components/Employee/EmployeeList';
import StoreList from './components/store/StoreList';
import AnnexList from './components/Annex/AnnexList';
import Timer from './components/Employee/Timer';
import CategoryList from './components/category/CategoryList';
import Try from './components/product/Try';
import SneakerForm from './components/Snecker/SneakerForm';
import ProductList from './components/product/ProductList';
import Sidonie from './components/category/Sidonie';
import Register from './components/users/Register';
import { AppProvider } from './components/Ambroise.jsX';
import CatalogueProduct from './components/product/Catalogue';
import AddImage from './components/product/AddImage';
import Slider from './components/product/Slider';
import { useEffect } from 'react';
import axios from 'axios';
import RangeEmployee from './components/Employee/RangeEmployee';
import ListProduct2 from './components/product/ListProduct2';
const App=()=>{

 return(
    <div>
    <AppProvider>
      <BrowserRouter>
      <Head/>

      <Routes basename='/use'>
      <Route path='/' element={<CatalogueProduct/>}></Route>
        <Route path='/function' element={<FunctionList/>}></Route>
        <Route path='/employee' element={<EmployeeList/>}></Route>
        <Route path='/rangeemp' element={<RangeEmployee/>}></Route>
        <Route path='/stores' element={<StoreList/>}></Route>
        <Route path='/annex' element={<AnnexList/>}></Route>
        <Route path='/t' element={<Timer/>}></Route>
        <Route path='/category' element={<CategoryList/>}></Route>
        <Route path='/product' element={<ProductList/>}></Route>
        <Route path='/product2' element={<ListProduct2/>}></Route>
        <Route path='/tt' element={<Try/>}></Route>
        <Route path='/s' element={<SneakerForm/>}></Route>
        <Route path='/time' element={<Sidonie/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/image' element={<AddImage/>}></Route>

      </Routes>
      
      </BrowserRouter>
      </AppProvider>
    </div>  
   )
}
export default App
ReactDOM.createRoot(document.getElementById('root')).render(<App/>)
