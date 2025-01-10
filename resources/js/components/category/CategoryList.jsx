import { ModalBody ,Modal, ModalHeader} from "react-bootstrap";
import Api from "../Api"
import CategoryModalForm from "./CategoryModalForm";
import { useEffect, useState } from "react";

const CategoryList=()=>{
   const {http}=Api(); 
   const [DisplayFormCategory,setFormCategory]=useState(false|null);
  const [Brand,setBrand]=useState([]);
  
   const getAll=()=>{
    http.get('category/all').then((resp)=>{
          setBrand(resp.data)
       
    })
   }

   const Edit=(category)=>{
    setFormCategory(category)
   }

   useEffect(()=>{
    getAll();
   },[])

 
  const Delete=(id)=>{
    if(window.confirm("are you sure to delete this category ??")){
        http.get(`category/delete/${id}`).then((resp)=>{
           getAll();
         
      })
    }
  }

  const closeModal=()=>{
    setFormCategory(false)
  }
   return(
   <div className="container py-5">

                {DisplayFormCategory > 0 && (
                 <CategoryModalForm
                    category={DisplayFormCategory}
                    HideModal={closeModal}
                />
                 )} 

                 {DisplayFormCategory !=0 && (
                 <CategoryModalForm
                    category={DisplayFormCategory}
                    HideModal={closeModal}
                  />
                 )} 
  
    <div className="row bg-body table-responsive">
        <div className="display">
            <button className="btn btn-primary float-end" type='button' onClick={()=>setFormCategory(true)}>New Category</button>
        </div>
        <table className="table table-bordered table-striped mt-2">
            <thead>
                <tr>
                    <th  style={{backgroundColor:'darkorange'}}>ID</th>
                    <th  style={{backgroundColor:'darkorange'}}>sku</th>
                    <th  style={{backgroundColor:'darkorange'}}>Name</th>
                    <th  style={{backgroundColor:'darkorange'}}>Description</th>
                    <th  style={{backgroundColor:'darkorange'}} className="float-end">Action</th>
                </tr>
            </thead>
            <tbody className="shadow-sm bg-body">
                {Brand.map((row,index)=>
                <tr key={index}>
                    <td className="text-center">{row.id}</td>
                    <td className="text-center">{row.sku}</td>
                    <td className="text-center">{row.cname}</td>
                    <td className="text-center">{row.cdescription}</td>
                    <td className="display float-end d-flex">
                        <span className="btn text-info" title="View"><i className="fas fa-info-circle"></i></span>
                        <span className="btn text-success" title="Edit" onClick={()=>Edit(row)}><i className="fas fa-edit"></i></span>
                        <span className="btn text-danger" title="Delete" onClick={()=> Delete(row.id)}><i className="fas fa-trash"></i></span>

                    </td>

                </tr>
                )}
            </tbody>
        </table>
    </div>
   
   </div>
   )
}
export default CategoryList