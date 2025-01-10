import { useEffect, useState } from "react"
import EmployeeFormModal from "./EmployeFormModal"
import Api from "../Api"
import EmployeViewModal from "./EmployeViewModal"

const RangeEmployee=()=>{
    const {http}=Api();
    const [Employee,setEmployee]=useState([])
    const [currentPage,setCurrentPage]=useState(1);
    const recordPerPage=8;
    const lastIndex=currentPage*recordPerPage;
    const firstInde=lastIndex-recordPerPage;
    const records=Employee.slice(firstInde,lastIndex);
    const npage=Math.ceil(Employee.length/recordPerPage);
    const numbers=[...Array(npage+1).keys()].slice(1);
    const [search,setsearch]=useState("")
    const nextPage=()=>{
     
        if(nextPage!=npage){
            setCurrentPage(currentPage+1)
        }
         }

    const changePage = (n) => {
        setCurrentPage(n)
    }

    const prevpage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }

    }

    const getEmployee=()=>{
      http.get("employee/range").then((resp)=>{
        console.log(resp.data.Datas)
        setEmployee(resp.data.Datas)
      }).catch((error)=>console.log(error))
    }

    useEffect(()=>{
    getEmployee();
    },[])

    const [modal,setModal]=useState(false);
    const closeModal=()=>{setModal(false)}
    const [CurrentEmployees,setCurrentEmployee]=useState(false|null);


    const Delete=(id)=>{
        if(window.confirm("are you sure to delete ???")){
          http.get(`employee/delete/${id}`).then((resp)=>{
              if(resp.data.status==200){
                window.location.reload()
              }
          })
        }
  
       }

       const Edit=(CurrentEmployee)=>{
          setCurrentEmployee(CurrentEmployee)
          console.log(CurrentEmployee)
       }

    return(
        <div className="container py-5">
            {
                modal && <EmployeeFormModal HideModal={closeModal} CurrentEmployee={CurrentEmployees}/>

            }
            {
                CurrentEmployees!=0 && <EmployeeFormModal HideModal={()=>setCurrentEmployee(false)} CurrentEmployee={CurrentEmployees}/>

            }
            <div className="row">
                <div className="container py-2 border">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                              <div className="d-flex">
                              <input className="form-control" placeholder="enter search key" type="search" onKeyUp={(e)=>setsearch(e.target.value)}/>
                              <button className="btn btn-sm btn-success float-end" onClick={()=>setModal(true)}><i className="fas fa-plus">new</i></button>
                              </div>

                                <table className="table table-hover table-striped table-bordered table-sm mt-2">
                                    <thead>
                                        <tr>
                                            
                                            <th>Function</th>
                                            <th>Salary</th>
                                            <th>Store</th>
                                            <th>Total Employee</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{fontFamily:'unset',backgroundColor:"green",fontSize:"12px"}}>
                                       {

                                        Employee.map((item,index)=>
                                            <tr key={index}>
                                                <td>{item.function.name}</td>
                                                <td className="text-center">${item.function.salary}.00</td>
                                                <td className="text-center">{item.store.name2}</td>
                                                <td className="text-center">{item.employee_count}</td>
                                                <td className="text-center">
                                                    <button className="btn text-info btn-sm"><i className="fas fa-eye"></i></button>
                                                    <button className="btn text-success btn-sm" onClick={()=>Edit(item)} type="hidden"><i className="fas fa-edit"></i></button>
                                                    <button className="btn text-danger btn-sm"><i className="fas fa-trash-alt"></i></button>
                                                    
                                                </td>


                                            </tr>
                                        )
                                       }
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                <li className="page-item"><a className={`page-link ${currentPage > 1 ? 'active':'disabled'}`} href="#" onClick={prevpage}>prevent</a></li>

                                   {
                                   numbers.map((x,y)=>{
                                   return(
                                    <li className="page-item" key={y}><a className={`page-link ${x==currentPage ? 'active':''}`} href="#" onClick={()=>changePage(x)}>{x}</a></li>
                                    
                                   )
                                   })
                                   }
                                    <li className="page-item"><a className={`page-link ${currentPage < numbers.length ? 'active':'disabled'}`} href="#" onClick={nextPage}>Next</a></li>
                                </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RangeEmployee