import { useEffect, useState } from "react";
import Api from "../Api"
import Slider from "./Slider";
const CatalogueProduct=()=>{
const {http}=Api();
const [sneaker,setSneaker]=useState([]);

useEffect(()=>{
    getSneaker();
},[]);

const getSneaker=()=>{
    http.get(`product/catalogue`).then((resp)=>{
        setSneaker(resp.data)
        console.log(resp.data)
      });     
}

return(
    <div className="container py-5">
        <div className="row">
               <Slider/>
        </div>
    </div>
)
 
}

export default CatalogueProduct;