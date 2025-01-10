import { useEffect, useState } from "react"
import Api from "../Api"
import FormModalFunction from "./FormModalFunction"
import ModalViewFunction from "./ModalViewFunction"

    const FunctionList=()=>{
    const {http}=Api();
    const [DataFunction,setDataFunction]=useState([])
    const [modal,setModal]=useState(false)
    const [EditModalFunction,setEditModalFunction]=useState(Number)
    const [ViewModal,setViewModal]=useState(Number)
     const getAll=()=>{
        http.get('function/all').then((resp)=>{
          setDataFunction(resp.data)
        })
     }
     useEffect(()=>{
      getAll()
     },[])

     const handleEdit=(id)=>{
       setEditModalFunction(id)
     }

     const ViewModals=(id)=>{
        setViewModal(id);
     }
        const recoredPerPage=3;
        const [currentPage,setcurrentPage]=useState(1);
        const lastindex=currentPage*recoredPerPage;
        const firstindex=lastindex-recoredPerPage;
        const records=DataFunction.slice(firstindex,lastindex);
        const npage=Math.ceil(DataFunction.length/recoredPerPage);
        const numbers=[...Array(npage+1).keys()].slice(1);

const nextpage=()=>{
    if(currentPage!=npage){
        setcurrentPage(currentPage+1)
    }
}

const prevPage=()=>{
    if(currentPage!=1){
        setcurrentPage(currentPage-1)
    }
}

const ChangePage=(n)=>{
    setcurrentPage(n)

}
const [mot,setMot]=useState('');

     return(
        <div className="container py-5">
        {modal && <FormModalFunction HidModal={()=>setModal(false)}/>}
        {EditModalFunction!=0 && <FormModalFunction HidModal={()=>setEditModalFunction(false)} functionid={EditModalFunction}/>}
        {ViewModal!=0 && <ModalViewFunction HideModal={()=>setViewModal(!ViewModal)} idm={ViewModal}/>}


        



            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <button className="btn btn-primary btn-sm float-end" onClick={()=>setModal(true)} type="button">new</button>
                    <div className="table-responsive">
                        <input className="form-control" name="search" placeholder="enter key" onKeyUp={(e)=>setMot(e.target.value)}/>
                        <table className="table table-bordered table-hover table-striped table-sm mt-2">
                            <thead className="bg-red">
                                <tr>
                                    <th>ID</th>
                                    <th>Code</th>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>salary</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    DataFunction && DataFunction.length > 0 ?
                                    records.filter((e,d)=>{
                                        return mot.toLocaleLowerCase()==="" ? e.name:e.name.toLocaleLowerCase().includes(mot)
                
                                   }).map((a,b)=>
                                    <tr key={b}>
                                     <td className="bg-danger text-white">{a.id}</td>
                                     <td className="bg-primary text-white">{a.code}</td>
                                     <td>{a.name}</td>
                                     <td>{a.description}</td>
                                     <td>{a.salary}</td>
                                     <td>{a.status=="1" ? 'active':'Desactive'}</td>
                                     <td>
                                        <button type="button" 
                                        className="btn btn-sm text-info" 
                                        onClick={()=>ViewModals(a.id)}><i className="fas fa-info"></i></button>
                                        <button type="button" 
                                        className="btn btn-sm text-success" 
                                        onClick={()=>handleEdit(a.id)}><i className="fas fa-edit"></i></button>
                                        <button type="button" 
                                        className="btn btn-sm text-danger"><i className="fas fa-trash-alt"></i></button>

                                     </td>

                                     </tr>
                                    ):<tr><td>totoo</td></tr>
                                }
                            </tbody>
                        </table>

                        <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className={`page-link ${currentPage===1 ? 'disabled':''}`} onClick={prevPage} href="#">Previous</a></li>
                              {
                                numbers.map((a,b)=>
                                 <li className="page-item" key={b}><a className={`page-link ${currentPage==a ? 'active':''}`} onClick={()=>ChangePage(a)} href="#">{a}</a></li>

                                )
                              }                     
                            <li className="page-item"><a className={`page-link ${currentPage==numbers.length ? 'disabled':''}`}  href="#" onClick={nextpage}>Next</a></li>
                        </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </div>
     )
}
export default FunctionList