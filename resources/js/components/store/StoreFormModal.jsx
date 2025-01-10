import { useEffect, useState } from "react"
import {Modal, ModalBody, ModalHeader } from "react-bootstrap"
import Api from "../Api"
import axios from "axios"
import { useParams } from "react-router-dom"



const StoreFormModal=({HidModal,storeid})=>{
    const {http}=Api();
    const [formData,setformData]=useState({
        sigle:"",
        name:"",
        description:"",
        status:false

    })
    const [verifystate,setveriystate]=useState(false)

    const [formErreur,setformErreur]=useState({
        sigle:"",
        name:"",
        description:"",
    })
    const Validation=()=>{
     const erreur={}
     if(!formData.sigle){
        formErreur.code="code is required"
     }
     if(!formData.name){
        formErreur.name="name is required"
     }

     if(!formData.description){
        formErreur.description="description is required"
     }
     setformErreur(erreur)
     return Object.keys(erreur).length ===0
    }
  
    const Submit=(e)=>{
        e.preventDefault();
        setLoader("on")
        http.post('/store/store',formData).then((resp)=>{
            if(resp.data.status==422){
                setformErreur({...formErreur,
                    sigle:resp.data.errors.sigle,
                    name:resp.data.errors.name,
                    description:resp.data.errors.description,  
                })
            }
            setLoader("off")

        })

    }

    useEffect(()=>{
        Edit();
    },[])

 

    const HandleInput=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const Edit=()=>{
        http.get(`store/edit/${storeid}`).then((resp)=>{
            setformData({...formData,sigle:resp.data.sigle,name:resp.data.name,description:resp.data.description, })
            setveriystate(true)
    })
      
    
    }

    const update=(e)=>{
        e.preventDefault();
        setLoader("on")
        http.post(`store/update/${storeid}`,formData).then((resp)=>{
            setLoader("off")
        })
        window.location.reload()


    }

    const [loader,setLoader]=useState("off")
    return(
        <div className="container py-5">
            <div className="row">
                <Modal show={true}  size="lg" >
                    <Modal.Header>NEW STORE<button className="btn btn-close" onClick={HidModal}></button> </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={storeid > 0 ? update : Submit}>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="code">CODE</label>
                                    <input className={`form-control ${formErreur.sigle ? 'is-invalid':''}`}
                                     value={formData.sigle} onChange={HandleInput} name="sigle" placeholder="enter function sigle" id="sigle"/>
                                     {formErreur?.sigle ? <span className="text-danger">{formErreur.sigle}</span>:''}

                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input 
                                     className={`form-control ${formErreur.name ? 'is-invalid':''}`}
                                     value={formData?.name} onChange={HandleInput} name="name" placeholder="enter function name" id="name"/>
                                     {formErreur.name ? <span className="text-danger">{formErreur.name}</span>:''}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea 
                                   className={`form-control ${formErreur.description ? 'is-invalid':''}`}
                                    value={formData?.description} onChange={HandleInput} 
                                    name="description" id="description" placeholder="enter function description"></textarea>
                                     {formErreur.description ? <span className="text-danger">{formErreur.description}</span>:''}

                                </div>
                                <div className="form-group">
                                    <input className="form-check-input" checked={formData.status ? true:false} onChange={HandleInput} type="checkbox"   />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Is AVAIBLE</label>

                                </div>
                                <div className="form-group mt-2">
                                    <button className="btn btn-secondary btn-sm " type="button" onClick={HidModal}>cancle</button>
                                    <button className="btn btn-primary btn-sm float-end" type="submit">{verifystate ? "update":"save"}</button>
                                    {loader=="on" ?
                                    <center>....processing....</center>:''
                                    }

                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
export default StoreFormModal