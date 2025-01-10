import { ModalBody ,Modal, ModalHeader} from "react-bootstrap";
import Api from "../Api"
import ProductModalForm from "./productModalForm";
import { useEffect, useState } from "react";
import { useRef } from "react";
const ProductList=()=>{

const [DisplayFormProduct,setFormProduct]=useState(false|Number);
const inputRefs = useRef([]);
const {http}=Api();
const [Senaker,setSneaker]=useState("")
const [Brand,setBrand]=useState([]);

 
   useEffect(()=>{
    getAll();
   },[])

   const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      // Si la touche Enter est pressée et qu'il y a un champ suivant, on y met le focus
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

   const getSneaker=(sku)=>{
       if(sku >= 6){
    http.get(`product/all/${sku}`).then((resp)=>{
      setSneaker(resp.data)

    })
       
       }
     

   }

   const getsize=(sn)=>{
    
   }

   const getAll=()=>{
    http.get('category/all').then((resp)=>{
          setBrand(resp.data)
       
    })
   }

   const BRAND=()=>{
    return(
      <select className="form-select"  ref={(el) => (inputRefs.current[0] = el)}
      type="text"
      onKeyDown={(e) => handleKeyPress(e, 0)}>
        {
          Brand.map((row,index)=>
            <option value={row.id} key={index}>{row.cname}</option>
          )
        }
      </select>
    )
   }

   const cart=(sneaker)=>{

    http.get(`sneaker/size/${sneaker.sneaker_id}`).then((resp)=>{
      console.log(resp.data)
   
})
   }

   const Cataloguesneaker=()=>{
    return(
        <div className="container py-4">
          <div className="row bg-warning text-white">
            <div className="table-responsive border d-inline">
              <table className="table table-primary table-bordered">
                <thead>
                  <th>Size Avaible</th>
                  {Senaker.sizes?.map((a,b)=>
                   <th key={b} className="text-center border-2">{a.size}</th>
                  )}<br/>
                 
                </thead>
                <tbody>
                <th>Quantity Avaible</th>
                  {Senaker.sizes?.map((a,b)=>
                  <td key={b} className="text-center border-2">{a.quantity}<br/><button className="btn btn-info form-control border-2" onClick={()=>cart(a)}>Request</button></td>
                  )}
                  </tbody>
                
              </table>
            </div>
          </div>
        </div>
    )
   }
   return(
      <>
      <br/><br/>
        <div className="container py-5 bg-dark">
          {
            DisplayFormProduct!=0 && <ProductModalForm HideModal={()=>setFormProduct(false)}/>
          }
            <div className="row">
            <div className="col-md-12  shadow-sm bg-body border bg-info">
                <button className="btn btn-sm btn-primary float-end" onClick={()=>setFormProduct(true)}>new sneaker</button>

                  <div className="display d-flex mt-2">
                  <div className="form-group">
                  <select className="form-select" ref={(el) => (inputRefs.current[0] = el)}
                  type="text" onKeyDown={(e) => handleKeyPress(e, 0)} onChange={(e)=>getSneaker(e.target.value)}>
                    <option>...select..</option>
                    {
                      Brand.map((row,index)=>
                        <option value={row.sku} key={index}>{row.sku}:{row.cname}</option>
                      )
                    }
                  </select>
                  </div>
                  &nbsp;&nbsp;
                   <div className="form-group">
                   <input className="form-control" placeholder="key shoes"
                         ref={(el) => (inputRefs.current[1] = el)}
                         type="text"
                         onKeyDown={(e) => handleKeyPress(e, 1)}
                         onKeyUp={(e)=>getSneaker(e.target.value)}
                    />

                   </div>
                   &nbsp;&nbsp;
                    
                   <div className="form-group">
                   <select className="form-select"
                         ref={(el) => (inputRefs.current[2] = el)}
                         type="text"
                         onKeyDown={(e) => handleKeyPress(e, 2)}
                    >
                        <option value={7} >7</option>
                        <option value={7.5} >7.5</option>
                        <option value={8} >8</option>
                        <option value={8.5} >8.5</option>
                        <option value={9} >9</option>

                    </select>
                    
                   </div>
                   &nbsp;&nbsp;
                    <button className="btn btn-sm btn-primary">search</button>

                </div>

                <Cataloguesneaker/>
              
            </div>
            </div>

        </div>
      </>
   )
}
export default ProductList