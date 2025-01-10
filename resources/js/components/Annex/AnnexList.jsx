import Api from "../Api"
import EmployeeTimer from "../Employee/EmployeeTimer";
import AnnexModalForm from "./AnnexModalForm"
import { useEffect, useState } from "react"

const AnnexList=()=>{
    const {http}=Api();
    const [modal,setModal]=useState(false)
    const [DataAnnex,setDataAnnex]=useState([]);
    //pagination
    const [currentPage,setCurrentPage]=useState(1);
    const DataPerPage=8;
    const lastIndex=currentPage*DataPerPage;
    const firstIndex=lastIndex-DataPerPage;
    const records=DataAnnex.slice(firstIndex,lastIndex)
    const npage=Math.ceil(DataAnnex.length/DataPerPage);
    const numbers=[...Array(npage+1).keys()].slice(1)

    function ChangePage(n){
        setCurrentPage(n)
    }
    
const nextpage=()=>{
    if(currentPage!=npage){
        setCurrentPage(currentPage+1)
    }
}

const prevPage=()=>{
    if(currentPage!=1){
        setCurrentPage(currentPage-1)
    }
}

  const getAllAnnex=()=>{
    http.get('annex/all').then((resp)=>{
        setDataAnnex(resp.data)
    })
}

const [annex,setAnnex]=useState(null);

useEffect(()=>{
    getAllAnnex();
},[])

const Delete=(id)=>{
    http.get(`annex/delete/${id}`).then((resp)=>{
    getAllAnnex();

        //window.location.reload();
    }) 
}

const EditAnnex=(annex)=>{
  setAnnex(annex)
}

const Pagination=()=>{
    return(
        <nav aria-label="Page navigation example">
        <ul className="pagination">
            <li className="page-item"><a className={`page-link ${currentPage===1 ? 'disabled':''}`} href="#" onClick={prevPage}>Previous</a></li>
               {
                numbers.map((x)=>
                <li className={`page-item ${x==currentPage ? 'active' :''}`} key={x}><a className="page-link" href="#" onClick={()=>ChangePage(x)}>{x}</a></li>

                )
               }       
            <li className={`${currentPage ==numbers.length ? 'disabled':''}`}><a className="page-link" href="#" onClick={nextpage}>Next</a></li>
        </ul>
        </nav>

    )
}
    return(
        <div className="container py-5">
        {modal && <AnnexModalForm HideModal={()=>setModal(false)}/>}
            {annex  && <AnnexModalForm HideModal={()=>setAnnex(false)} annex={annex}/>}

            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-primary btn-sm float-end" onClick={()=>setModal(true)} type="button">new</button>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-striped table-sm">
                            <thead style={{backgroundColor:'red'}}>
                                <tr >
                                    <th>Company</th>
                                    <th>store number</th>
                                    <th>store annex name</th>
                                    <th>street</th>
                                    <th>city</th>
                                    <th>zip</th>
                                    <th>state</th>
                                    <th>phnone</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    DataAnnex && DataAnnex.length > 0 ?
                                    records.map((a,b)=>
                                    <tr key={b}>
                                     <td>{a.store.sigle}</td>
                                     <td>{a.annexnumber}</td>
                                     <td>{a.name2}</td>
                                     <td>{a.street}</td>
                                     <td>{a.city}</td>
                                     <td>{a.zip}</td>
                                     <td>{a.state}</td>
                                     <td>{a.phone}</td>
                                     <td>
                                        <button type="button" className="btn btn-sm text-dark"><i className="fas fa-eye"></i></button>
                                        <button type="button" className="btn btn-sm text-success" onClick={()=>EditAnnex(a)}><i className="fas fa-edit"></i></button>
                                        <button type="button" className="btn btn-sm text-danger" onClick={()=>Delete(a.id)}><i className="fas fa-trash-alt"></i></button>

                                     </td>

                                     </tr>
                                    ):<tr><td>totoo</td></tr>
                                }
                            </tbody>
                        </table>
                        <Pagination/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnnexList