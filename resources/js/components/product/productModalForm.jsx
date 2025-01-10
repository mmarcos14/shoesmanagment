import { ModalBody ,Modal, ModalHeader} from "react-bootstrap";
import Api from "../Api"
import { useEffect, useState } from "react";

const ProductModalForm=({productId,HideModal})=>{
   const [sku,setsku]=useState("");
   const [name,setName]=useState("");
   const [price,setPrice]=useState("");
   const [description,setDescription]=useState("")
   const [photo,setPhoto]=useState("");
   const [category,setCategory]=useState("");
   const [sizes,setsize]=useState([{size:'',quantity:''}]);

       const ChangeSizeInput=(index,e)=>{
          const values=[...sizes];
          values[index][e.target.name]=e.target.value;
            setsize(values)
       }

       const AddMoreSize=()=>{
        const verify=[...sizes];
        verify.includes('oop')
        setsize([...sizes,{size:'',quantity:''}])
       }

       const RemoveSize=(index)=>{
        const values=[...sizes];
             // if(values.length > 1){
             values.splice(index,1);
             setsize(values)
        }
       


  const [Brand,setBrand]=useState([]);
   const {http}=Api(); 

   const [erreur,seterror]=useState({
    namep:'',descriptionp:'',pricep:'',categoryid:''
   })
    
   const getAll=()=>{
    http.get('category/all').then((resp)=>{
          setBrand(resp.data)
       
    })
   }
   
   const getsku=(id)=>{
        http.get(`category/edit/${id}`).then((resp)=>{
            setsku(resp.data.sku) 
        })
        console.log(sizes)
      
   }

   useEffect(()=>{
      getAll();
   },[])


   const save=(e)=>{
    e.preventDefault();
    var DataSneaker={sku,name,price,description,photo,sizes,category};
  
    http.post('product/store',DataSneaker,{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    }).then((resp)=>{

       
    })
   }
 
   return(
    <div className="container py-5">
        <div className="row shadow-sm bg-ligth ">
          <Modal show={true} className="border" size="">
            <ModalHeader>REGISTER SNEAKER<button className="btn btn-close" onClick={HideModal}></button></ModalHeader>
            <ModalBody>
               <form onSubmit={save}>
                <div  className="row">

                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input className="form-control" name="name" placeholder="enter category name"
                         onChange={(e)=>setName(e.target.value)}/>
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="description">description</label>
                        <textarea className="form-control" name="description" placeholder="enter category description"
                         onChange={(e)=>setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="pricep">price</label>
                        <input className="form-control" name="price" placeholder="enter product price"
                         onChange={(e)=>setPrice(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="photo">Photo</label>
                        <input className="form-control" name="photo" placeholder="enter product price"
                        type="file"
                         onChange={(e)=>setPhoto(e.target.files[0])}/>
                    </div>

                    <div className="container py-3">
                    <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                        {sizes.map((size,index)=>
                        <div className="input-group mt-2 col" key={index}>
                        <label className="input-group-text">size</label>
                        <input type="text" className="form-control bg-body w-25 input-group-text" onChange={(e)=>ChangeSizeInput(index,e)} 
                         name="size"  value={sizes.size} placeholder="enter hoes size" />
                        <label className="input-group-text" >quantity</label>
                        <input type="text" className="form-control w-25 input-group-text bg-body" 
                        name="quantity" onChange={(e)=>ChangeSizeInput(index,e)}  value={sizes.quantity}  placeholder="enter quantity size"/>
                        {sizes.length > 1 ?
                        <button className="btn text-danger btn-sm" type="button" onClick={()=>RemoveSize(index)}><i className="fas fa-trash"></i></button>
                        :''
                        }
                        </div>
                                          
                        )}
                        </div>
                    </div>

                    
                    <button className="btn btn-sm  btn-primary border" type="button" onClick={AddMoreSize}><i className="fas fa-plus">more size</i></button>
                       
                       <div className="form-group mt-2">

                        <select className="form-select" aria-label="Disableda select example" name="category" onChange={(e)=>{setCategory(e.target.value),getsku(e.target.value)}}>
                        <option defaultValue={'0'}d>Open this select menu</option>
                         {Brand.map((a,b)=>
                         <option key={b} value={a.id}>{a.cname}</option>
                        )}
                        </select>

                       </div>

                    <div className="form-group mt-2">
                        <button className="btn btn-primary btn-sm">save</button>
                    </div>

                </div>
               </form>
            </ModalBody>
          </Modal>\
        </div>
    </div>
   )
}
export default ProductModalForm