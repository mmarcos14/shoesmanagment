import { useEffect, useState } from "react"
import { ModalBody,ModalHeader,Modal, ModalFooter } from "react-bootstrap"
import Api from "../Api"

const EmployeeFormModal=({CurrentEmployee,HideModal})=>{
    const {http}=Api();
    const [formData,setformData]=useState({
        employeeid:'',
        empcode:CurrentEmployee?.empcode ||"",
        name:CurrentEmployee?.name ||'',
        lastname:CurrentEmployee?.lastname ||'',
        birthday:CurrentEmployee?.birthday ||'',
        functions:CurrentEmployee?.function_id ||'',
        store:CurrentEmployee?.storeannex_id||'',
        zip:CurrentEmployee.address?.zip ||'',
        street:CurrentEmployee?.address?.street ||'',
        city:CurrentEmployee?.address?.city ||'',
        state:CurrentEmployee?.address?.state ||'',
        status:true,
    })
    const [DataFunction,setDataFunction]=useState([])

    const [formErreur,setformErreur]=useState({
        empcode:"",
        name:'',
        lastname:'',
        birthday:'',
        functions:'',
        annex:'',
        store:'',
        zip:'',
        street:'',
        city:'',
        state:'',
    })
    const [verifystate,setveriystate]=useState(false);
    const [DataAnnex,setDataAnnex]=useState([])

    const Submit=(e)=>{
        e.preventDefault();
        setLoader("on")
        http.post('/employee/store',formData).then((resp)=>{
            if(resp.data.status==422){
                setformErreur({...formErreur,
                    empcode:resp.data.errors.code,
                    name:resp.data.errors.name,
                    lastname:resp.data.errors.lastname,  
                    birthday:resp.data.errors.birthday,  
                    street:resp.data.errors.street,  
                    city:resp.data.errors.city,  
                    zip:resp.data.errors.zip, 
                    state:resp.data.errors.state,  

                    functions:resp.data.errors.functions,  
                    store:resp.data.errors.store,  


                })
            }else if(resp.data.status==200){
                setLoader("off")
            window.location.reload()
            }
         

        })

    }
    const HandleInput=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const getAll=()=>{
        http.get('function/all').then((resp)=>{
          setDataFunction(resp.data)
        })
     }
     const getLastEmployeeCode=()=>{
        http.get('employee/getLastCode').then((resp)=>{
          setformData({...formData,empcode:CurrentEmployee ? CurrentEmployee.empcode :resp.data})
          console.log(resp.data)
        })
     }



     const getAllAnnex=()=>{
        http.get('annex/all').then((resp)=>{
            setDataAnnex(resp.data)
        })
    }

     useEffect(()=>{
        getAll();
        getLastEmployeeCode();
        getAllAnnex();
     },[])

    

     const update=(e)=>{
        e.preventDefault();
        setLoader("on")
        http.post(`/employee/update/${CurrentEmployee.id}`,formData).then((resp)=>{
            if(resp.data.status==200){
            }
            setLoader("off")
            window.location.reload()

        })

    }

   
    const [loader,setLoader]=useState("off")

    const STORES = () => {
        return (
            <select defaultValue={formData.store ? formData.store:''} className="form-select" name="store" onChange={HandleInput}>
                <option>....select store name....</option>
              {
                DataAnnex && DataAnnex.length > 0 ?
                DataAnnex.map((x,y)=>
                <option key={y} value={x.id} >{x.name2}</option>
                ):''
                }
            </select>
        );
    };

    const FUNCTIONS = () => {
        return (
            <select defaultValue={formData.functions ? formData.functions:''} className="form-select" name="functions" onChange={HandleInput}>
                <option>....select function....</option>
              {
                DataFunction && DataFunction.length > 0 ?
                DataFunction.map((x,y)=>
                <option key={y} value={x.id} >{x.name}</option>
                ):''
                }
            </select>
        );
    };
    
    
    
 return(
    <div className="container py-5">
    <div className="row">
        <Modal show={true}  size="lg" className="border shadow-lg modal">
            <Modal.Header className="bg-danger text-white">NEW FUNCTION<button className="btn btn-close" onClick={HideModal}></button> </Modal.Header>
            <Modal.Body style={{backgroundColor:CurrentEmployee ? '#00FFFF' :''}}>
                <form onSubmit={CurrentEmployee ? update : Submit}>
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="code">CODE</label>
                            <input className={`form-control ${formErreur?.empcode ? 'is-invalid':''}`}
                            disabled={true}
                             value={formData?.empcode} onChange={HandleInput} name="empcode" placeholder="enter function code" id="code"/>
                             {formErreur.empcode ? <span className="text-danger">{formErreur.empcode}</span>:''}

                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="name">Name</label>
                            <input 
                             className={`form-control ${formErreur.name ? 'is-invalid':''}`}
                             value={formData?.name} onChange={HandleInput} name="name" placeholder="enter function name" id="name"/>
                             {formErreur.name ? <span className="text-danger">{formErreur.name}</span>:''}
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="lastname">Last Name</label>
                            <input 
                             className={`form-control ${formErreur.lastname ? 'is-invalid':''}`}
                             value={formData?.lastname} onChange={HandleInput} name="lastname" placeholder="enter function lastname" id="lastname"/>
                             {formErreur.lastname ? <span className="text-danger">{formErreur.lastname}</span>:''}
                        </div>

                        <div className="form-group col-6">
                            <label htmlFor="birthdy">Birthday</label>
                            <input type="date"
                             className={`form-control ${formErreur.birthday ? 'is-invalid':''}`}
                             value={formData?.birthday} onChange={HandleInput} name="birthday" placeholder="enter employee birthday" id="birthday"/>
                             {formErreur.birthday ? <span className="text-danger">{formErreur.birthday}</span>:''}
                        </div>



                        <div className="form-group col-6">
                            <label htmlFor="street">Street</label>
                            <input 
                             className={`form-control ${formErreur.street ? 'is-invalid':''}`}
                             value={formData?.street} onChange={HandleInput} name="street" placeholder="enter employee street" id="street"/>
                             {formErreur?.street ? <span className="text-danger">{formErreur.birthday}</span>:''}
                        </div>

                        <div className="form-group col-6">
                            <label htmlFor="city">city</label>
                            <input 
                             className={`form-control ${formErreur.city ? 'is-invalid':''}`}
                             value={formData?.city} onChange={HandleInput} name="city" placeholder="enter employee city" id="city"/>
                            {formErreur.city ? <span className="text-danger">{formErreur.city}</span>:''}

                        </div>

                        <div className="form-group col-6">
                            <label htmlFor="zip">zip</label>
                            <input 
                             className={`form-control ${formErreur.zip ? 'is-invalid':''}`}
                             value={formData?.zip} onChange={HandleInput} name="zip" placeholder="enter employee zip" id="zip"/>
                            {formErreur.zip ? <span className="text-danger">{formErreur.zip}</span>:''}

                        </div>

                        <div className="form-group col-6">
                            <label htmlFor="state">state</label>
                            <input 
                             className={`form-control ${formErreur?.state ? 'is-invalid':''}`}
                             value={formData?.state} onChange={HandleInput} name="state" placeholder="enter employee state" id="state"/>
                            {formErreur.state ? <span className="text-danger">{formErreur.state}</span>:''}

                        </div>
                
                        <div className="form-group col-6 mt-2 border-1" hidden>
                            <div className="form-check form-switch mt-2">
                            <input className="form-check-input" value={formData?.status} onChange={HandleInput} type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={formData.status} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Is AVAIBLE</label>
                            </div>

                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="function">Function Employee</label>
                          <FUNCTIONS/>
                        </div>

                        <div className="form-group col-6">
                            <label htmlFor="store"> Employee store</label>
                             <STORES/>
                        </div>

                        <div className="form-group mt-2">

                            <button className="btn btn-secondary btn-sm " type="button" onClick={HideModal}>cancle</button>
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
export default EmployeeFormModal