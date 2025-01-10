import { useEffect, useState } from "react"
import { ModalBody, ModalHeader,Modal, ModalDialog, ModalFooter } from "react-bootstrap"
import Api from "../Api"

const ModalViewFunction=({HideModal,idm})=>{
    const [formData,setformData]=useState({
        code:"",
        name:"",
        description:"",
        salary:"",
        status:true

    })
    const {http}=Api();
  useEffect(()=>{
    if(idm!=0){
        http.get(`function/edit/${idm}`).then((resp)=>{
            setformData({...formData,code:resp.data.code,name:resp.data.name,description:resp.data.description, salary:resp.data.salary,})
            setveriystate(true)
    })
    }
  },[])

    return(
        <div className="container py-5">
            <div className="row bg-info">
                <div className="col-md-10">
                <Modal show={true} size="lg">
                    <ModalHeader><button className="btn btn-close" onClick={HideModal}></button></ModalHeader>
                    <ModalBody>
                    <ol className="list-group list-group-numbered">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">code function:</div>
                    </div>
                    <span className="badge text-bg-primary rounded-pill">{formData.code}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">name function</div>
                    </div>
                    <span className="badge text-bg-primary rounded-pill">{formData.description}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Salary</div>
                    </div>
                    <span className="badge text-bg-primary rounded-pill">{formData.salary}</span>
                </li>
                </ol>
                    </ModalBody>
               <ModalFooter><button className="btn btn-warning btn-lg" onClick={HideModal}>close</button></ModalFooter>

                </Modal>

                </div>
            </div>
        </div>
    )
}
export default ModalViewFunction