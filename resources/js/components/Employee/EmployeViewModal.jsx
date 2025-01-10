import { Modal, ModalBody, ModalHeader } from "react-bootstrap"
import { useState,useEffect } from "react"
import Api from "../Api"
const EmployeViewModal=({employeeid,HideModal})=>{
   const {http}=Api(); 
    const [formData,setformData]=useState({
        employeeid:'',
        empcode:"",
        name:'',
        lastname:'',
        birthday:'',
        functions:'',
        store:'',
        zip:'',
        street:'',
        city:'',
        state:'',
        status:true,
    })
    const Edit=()=>{
        if(employeeid!=0){
         http.get(`employee/edit/${employeeid}`).then((resp)=>{
           console.log(resp.data.employee)
           if(resp.data.status==200){
             setformData({...formData,
                   employeeid:resp.data.employee.id,
                     empcode:resp.data.employee.empcode,
                     name:resp.data.employee.name,
                     lastname:resp.data.employee.lastname,  
                     birthday:resp.data.employee.birthday,  
                     street:resp.data.employee.street,  
                     city:resp.data.employee.city,  
                     zip:resp.data.employee.zip, 
                     state:resp.data.employee.state,  
                     functions:resp.data.employee.function_id,  
                     store:resp.data.employee.storeannex_id,   
             })
             console.log(resp.data.employee)
           }
         }).catch((error)=>console.log(error))
        }
      }
      useEffect(()=>{
        Edit();
      },[])
    return(
        <div className="container">
            <div className="row">
                <Modal show={true} size="lg">
                    <ModalHeader>
                        <div style={{backgroundColor:'aqua'}}>{formData?.lastname} " &&" {formData?.name}</div>
                        <button className="btn btn-close" onClick={HideModal}></button>
                        </ModalHeader>
                    <ModalBody>
                    <div className="container text-center ">
                    <div className="row align-items-center">
                        <div className="col" style={{borderRight:"4px solid #ccc"}}>
                        Persoal information

                            <ol className="list-group list-group-numbereds">
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Name</div>
                                {formData?.name}
                                </div>
                                <span className="badge text-bg-primary rounded-pill">14</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Lastname</div>
                                {formData?.lastname}
                                </div>
                                <span className="badge text-bg-primary rounded-pill">14</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Birthday</div>
                                {formData?.birthday}
                                </div>
                                <span className="badge text-bg-primary rounded-pill">14</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Lastname</div>
                                {formData?.lastname}
                                </div>
                                <span className="badge text-bg-primary rounded-pill">14</span>
                            </li>
                          
                            </ol>
                          </div>
                        <div className="col">
                          Adresse

                          <ol className="list-group list-group-numbereds">
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">Street</div>
                                {formData?.street}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">city</div>
                                {formData?.city}
                                </div>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">zip</div>
                                {formData?.zip}
                                </div>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">state</div>
                                {formData?.state}
                                </div>
                            </li>
                          
                            </ol>
                        </div>
                     
                    </div>
                    </div>

                    </ModalBody>
                </Modal>
            </div>
        </div>
    )

}
export default EmployeViewModal