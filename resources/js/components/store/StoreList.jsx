import axios from "axios"
import { useEffect, useState } from "react"
import Api from "../Api"
import StoreFormModal from "./StoreFormModal"

const StoreList=()=>{
    const {http}=Api();
    const [DataStore,setDataStore]=useState([])
    const [modal,setModal]=useState(false)
    const [EditModalFunction,setEditModalFunction]=useState(Number)

     const getAll=()=>{
        http.get('store/all').then((resp)=>{
          setDataStore(resp.data)
        })
     }
     useEffect(()=>{
      getAll()
     },[])

     const handleEdit=(id)=>{
       setEditModalFunction(id)
     }

     
     const Delete=(id)=>{
       if(window.confirm("are you sure to delete ????")){
        http.get(`store/delete/${id}`).then((resp)=>{
            getAll()
  
            })
       }
     }



     return(
        <div className="container py-5">
        {modal && <StoreFormModal HidModal={()=>setModal(false)}/>}

        {EditModalFunction > 0 && <StoreFormModal HidModal={()=>setEditModalFunction(false)} storeid={EditModalFunction}/>}


            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <button className="btn btn-primary btn-sm float-end" onClick={()=>setModal(true)} type="button">new</button>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped table-sm">
                            <thead >
                                <tr style={{backgroundColor:'red'}}>
                                    <th>ID</th>
                                    <th>Code</th>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    DataStore && DataStore.length > 0 ?
                                     DataStore.map((a,b)=>
                                    <tr key={b}>
                                     <td>{a.id}</td>
                                     <td>{a.sigle}</td>
                                     <td>{a.name}</td>
                                     <td>{a.description}</td>
                                     <td>{a.status=="1" ? 'active':'Desactive'}</td>
                                     <td>
                                        <button type="button" className="btn btn-sm text-info"><i className="fas fa-info"></i></button>
                                        <button type="button" className="btn btn-sm text-success" onClick={()=>handleEdit(a.id)}><i className="fas fa-edit"></i></button>
                                        <button type="button" className="btn btn-sm text-danger" onClick={()=>Delete(a.id)}><i className="fas fa-trash"></i></button>

                                     </td>

                                     </tr>
                                    ):<tr><td>totoo</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
     )
}



export default StoreList;