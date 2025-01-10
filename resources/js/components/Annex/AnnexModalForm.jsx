import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Api from "../Api";

const AnnexModalForm = ({annex,HideModal}) => {
     const [STORE, setSTORE] = useState([])
    const { http } = Api();
    const [values, setValues] = useState({
         storenumber:annex?.annexnumber ||'',
         store:annex?.store_id ||'',
         name:annex?.name2 || '',
         description:annex?.description ||'',
         status: 1, 
         image: '',
         city: annex?.city ||'',
         zip: annex?.zip ||'',
         street: annex?.street ||'',
         state: annex?.state ||'', 
         phone:annex?.phone ||''
    })

    const [Errors, setErrors] = useState({
        storenumber:'',
        name: '',
        description: '',
        status: 1, 
        image: '',
        city: '',
        zip: '',
        street: '',
        state: '', 
        store_id: '',
        phone: ''
   })

 

    const HandleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        operatios()
        getLastFunctionCode()
    }, [])

    const operatios = () => {
        http.get('/store/all').then((resp) => {
            setSTORE(resp.data)
        })

    }

    const save = (e) => {
        e.preventDefault();
        if(values.store=="selected"){
            alert('SELECT STORE NAME')
        }
        http.post("annex/store", values).then((response) => {
        if(response.data.status==422){
        setErrors({...values,
         storenumber:'',
         name: response.data.errors.name,
         description: response.data.errors.description,
         city: response.data.errors.city,
         zip: response.data.errors.city,
         street: response.data.errors.street,
         state: response.data.errors.state, 
         store_id: response.data.errors.store_id,
         phone: response.data.errors.phone  
            })
           }else {
            window.location.reload();

           }
        })
    }

    const update = (e) => {
        e.preventDefault();
        http.post(`annex/update/${annex.id}`, values).then((response) => {
          if(response.data.status==200){
         window.location.reload();
          }
        })
    }

    const getLastFunctionCode=()=>{
        http.get('annex/getlastcode').then((resp)=>{
            setValues({...values,
                storenumber:annex?.annexnumber ? annex?.annexnumber :resp.data
            })
        })
    }

    const OptionsStores=()=>{
        return(
            <select className="form-select" name="store" onChange={HandleInput}>
                <option value="selected">...selected....</option>
       

                {
                    STORE.map((x,y)=>
                        <option value={x.id} key={y}>{x.name}</option>
                    )
                }
            </select>
        )
    }

    return (
        <div className="container py-5">
            <div className="row">
            <Modal show={true} size="lg" className="modal">
                    <ModalHeader style={{backgroundColor:"#00FFFF",color:"#A52A2A"}}>CREATE NEW ANNEX STORE<button className="btn btn-close" onClick={HideModal}></button></ModalHeader>
                    <ModalBody>
                        <form onSubmit={annex?.id ? update : save}>
                            <div className="row">
                                <div className="form-group mt-2 col-6">
                                    <label>Store's number</label>
                                    <input className="form-control" name="store_number" disabled="disabled" onChange={HandleInput} value={values.storenumber} />
                                </div>

                                <div className="form-group mt-2 col-6">
                                    <label>Store's name</label>
                                    <input 
                                    className={`form-control ${Errors.name ? 'is-invalid':''}`}
                                     name="name" onChange={HandleInput} value={values.name} />
                                     {Errors.name ? <span className="text-danger">{Errors.name}</span>:''}
                                </div>

                                <div className="form-group mt-2 col-6">
                                    <label>store's decription</label>
                                    <textarea 
                                    className={`form-control ${Errors.description ? 'is-invalid':''}`}
                                    name="description" onChange={HandleInput} value={values.description}></textarea>
                                      {Errors.description ? <span className="text-danger">{Errors.description}</span>:''}
                                </div>

                                <div className="form-group mt-2 col-6">
                                    <label>Store's phone number</label>
                                    <input 
                                      className={`form-control ${Errors.phone ? 'is-invalid':''}`}
                                    name="phone" onChange={HandleInput} value={values.phone} />
                                      {Errors.phone ? <span className="text-danger">{Errors.phone}</span>:''}
                                </div>
                                <div className="form-group mt-2 col-6">
                                    <label>Code Zip</label>
                                    <input 
                                 className={`form-control ${Errors.zip ? 'is-invalid':''}`}
                                     name="zip" onChange={HandleInput} value={values.zip} />
                                       {Errors.zip ? <span className="text-danger">{Errors.zip}</span>:''}
                                </div>
                                <div className="form-group mt-2 col-6">
                                    <label>street</label>
                                    <input 
                                     className={`form-control ${Errors.street ? 'is-invalid':''}`}
                                     name="street" onChange={HandleInput} value={values.street} />
                                       {Errors.street ? <span className="text-danger">{Errors.street}</span>:''}
                                </div>

                                <div className="form-group mt-2 col-6">
                                    <label>city</label>
                                    <input 
                                    className={`form-control ${Errors.city ? 'is-invalid':''}`}
                                    name="city" onChange={HandleInput} value={values.city} />
                                      {Errors.city ? <span className="text-danger">{Errors.city}</span>:''}
                                </div>



                                <div className="form-group mt-2 col-6">
                                    <label>State's name</label>
                                    <input 
                                    className={`form-control ${Errors.state ? 'is-invalid':''}`}
                                    name="state" onChange={HandleInput} value={values.state} />
                                      {Errors.state ? <span className="text-danger">{Errors.state}</span>:''}
                                </div>

                                <div className="form-group mt-2 col-6">
                                    <label>store main's name</label>
                                    <select className="form-select" name="store" onChange={HandleInput}>
                                        <option value="selected">...selected....</option>
                            

                                        {
                                            STORE.map((x,y)=>
                                                <option value={x.id} key={y}>{x.name}</option>
                                            )
                                        }
                                    </select>
                                    {Errors.store_id ? <span className="text-danger">{Errors.store_id}</span>:''}

                                </div>

                              <ModalFooter className="mt-3 bg-secondary">
                              <div className="form-group mt-2">
                              <button type="submit" className="btn btn-info btn-sm float-end">{annex?.name2 ? 'update':'save'}</button>

                                <button type="button" className="btn btn-danger btn-sm float-end" onClick={HideModal}>cancel</button>
                                </div>
                              </ModalFooter>

                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}
export default AnnexModalForm;