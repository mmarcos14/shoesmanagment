import { useEffect, useState } from "react"
import {Modal, ModalBody, ModalHeader } from "react-bootstrap"
import Api from "../Api"
import { useParams } from "react-router-dom"



const FormModalFunction=({HidModal,functionid})=>{
    const {http}=Api();
    const [formData,setformData]=useState({
        code:"",
        name:"",
        description:"",
        salary:"",
        status:true

    })
    const [verifystate,setveriystate]=useState(false)

    const [formErreur,setformErreur]=useState({
        code:"",
        name:"",
        description:"",
        salary:''
    })
    const Validation=()=>{
     const erreur={}
     if(!formData.code){
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
        http.post('/function/store',formData).then((resp)=>{
            if(resp.data.status==422){
                setformErreur({...formErreur,
                    code:resp.data.errors.code,
                    name:resp.data.errors.name,
                    description:resp.data.errors.description,  
                })
            }
            setLoader("off")
            window.location.reload()

        })

    }

    useEffect(()=>{
        getLastFunctionCode();
        Edit();
    },[])

    const getLastFunctionCode=()=>{
        http.get('function/getlastcode').then((resp)=>{
            setformData({...formData,
                code:resp.data
            })
        })
    }

    const HandleInput=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const Edit=()=>{
      if(functionid){
        http.get(`function/edit/${functionid}`).then((resp)=>{
            setformData({...formData,code:resp.data.code,name:resp.data.name,description:resp.data.description, salary:resp.data.salary,})
            setveriystate(true)
    })
      }
    
    }

    const update=(e)=>{
        e.preventDefault();
        setLoader("on")
        http.post(`/function/update/${functionid}`,formData).then((resp)=>{
            setLoader("off")
        })
        window.location.reload()


    }

    const [loader,setLoader]=useState("off")
    return(
        <div className="container py-5">
            <div className="row">
                <Modal show={true}  size="lg" >
                    <Modal.Header>NEW FUNCTION<button className="btn btn-close" onClick={HidModal}></button> </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={verifystate ? update:Submit}>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="code">CODE</label>
                                    <input className={`form-control ${formErreur.code ? 'is-invalid':''}`}
                                     value={formData.code} onChange={HandleInput} name="code" placeholder="enter function code" id="code"/>
                                     {formErreur.code ? <span className="text-danger">{formErreur.code}</span>:''}

                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input 
                                     className={`form-control ${formErreur.name ? 'is-invalid':''}`}
                                     value={formData.name} onChange={HandleInput} name="name" placeholder="enter function name" id="name"/>
                                     {formErreur.name ? <span className="text-danger">{formErreur.name}</span>:''}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea 
                                   className={`form-control ${formErreur.description ? 'is-invalid':''}`}
                                    value={formData.description} onChange={HandleInput} 
                                    name="description" id="description" placeholder="enter function description"></textarea>
                                     {formErreur.description ? <span className="text-danger">{formErreur.description}</span>:''}

                                </div>
                                <div className="form-group">
                                    <label htmlFor="salary">salary</label>
                                    <input 
                                     className={`form-control ${formErreur.salary ? 'is-invalid':''}`}
                                     value={formData.salary} onChange={HandleInput} name="salary" placeholder="enter function name" id="name"/>
                                     {formErreur.salary ? <span className="text-danger">{formErreur.salary}</span>:''}
                                </div>
                                <div className="form-group">
                                    <div className="form-check form-switch">
                                    <input className="form-check-input" value={formData.code} onChange={HandleInput} type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={formData.status} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Is AVAIBLE</label>
                                    </div>

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
export default FormModalFunction