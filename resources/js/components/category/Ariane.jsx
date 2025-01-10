import { ModalBody ,Modal, ModalHeader} from "react-bootstrap";
import Api from "../Api"
import { useEffect, useState } from "react";

const Ariane=(props)=>{
   const {http}=Api(); 
    const [value,setValues]=useState({
        sku:"",
        cname:"",
        cdescription:''
       })

     
   const id="";
   const handleInput=(e)=>{
    e.persist()
    setValues({...value,[e.target.name]:e.target.value})
   }
   const [erreur,seterror]=useState({
   sku:"", cname:'',cdescription:''
   })

   const save=(e)=>{
    e.preventDefault();
    http.post('category/store',value).then((resp)=>{
        if(resp.data.status==402){
         seterror({...erreur,
             cname:resp.data.cname,
             cdescription:resp.data.cdescription
         })
        }
    })
   }

   const EditC=()=>{
    http.get(`category/edit/${categoryid}`,value).then((resp)=>{
         setValues({...value,
             cname:resp.data.cname,
             cdescription:resp.data.cdescription
         })
        
    })
   }

   const update=(e)=>{
    e.preventDefault();
    http.post(`category/update/${categoryid}`,value).then((resp)=>{
       DataAll() 
    })
   }
   useEffect(()=>{
    EditC();
   },[categoryid])
   return(
    <div className="container py-5">
        <div className="row shadow-sm bg-ligth col-md-6 offset-md-2">
          <Modal show={true}>
            <ModalHeader><button className="btn btn-close" onClick={HideModal}></button></ModalHeader>
            <ModalBody>
               <form onSubmit={categoryid > 0 ? update :save}>
                <div  className="row">
                <div className="form-group">
                        <label htmlFor="name">sku</label>
                        <input className={`form-control ${erreur.sku ? 'is-invalid':''}`} 
                        name="sku" placeholder="enter category name" onChange={handleInput} value={value?.sku}/>
                        {erreur.sku ? <span className="text-danger">{erreur.sku}</span>:''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input className={`form-control ${erreur.cname ? 'is-invalid':''}`} 
                        name="cname" placeholder="enter category name" onChange={handleInput} value={value?.cname}/>
                        {erreur.cname ? <span className="text-danger">{erreur.cname}</span>:''}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">description</label>
                        <textarea className={`form-control ${erreur.cdescription ? 'is-invalid':''}`} name="cdescription" placeholder="enter category description" onChange={handleInput} value={value?.cdescription}></textarea>
                        {erreur.cdescription ? <span className="text-danger">{erreur.cdescription}</span>:''}

                    </div>
                    <div className="form-group mt-2">
                        <button className="btn btn-primary btn-sm">save</button>
                    </div>
                </div>
               </form>
            </ModalBody>
          </Modal>
        </div>
    </div>
   )
}
export default Ariane