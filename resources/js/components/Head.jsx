import { Link } from "react-router-dom"
import Sidonie from "./category/Sidonie"
import { useEffect } from "react"
import Api from "./Api";
import { useState } from "react";
import EmployeeTimer from "./Employee/EmployeeTimer";
import Timer from "./Employee/Timer";

const Head=()=>{
  const [DateTime,setDateTime]=useState({start:'',end:'',duration:'',users:''})
  useEffect(()=>{
    getDateTime();
  },[DateTime])

  const getDateTime=()=>{
    axios.get('employee/work/time').then((resp)=>{
          setDateTime({...DateTime,start:resp.data.start,end:resp.data.end,duration:resp.data.duration,users:resp.data.users})
       
    })
   }
  
    return(
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:'orchid',color:'azure'}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">V.I.M</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {DateTime.users ? DateTime.users : 'Login'}
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" href="#" to='stores'>Store</Link></li>
            <li><Link className="dropdown-item" href="#" to='annex'>Annex Store</Link></li>
            <li><Link className="dropdown-item" href="#" to='function'>Functions</Link></li>
            <li><Link className="dropdown-item" href="#" to='employee'>Employee</Link></li>
            <li><Link className="dropdown-item" href="#" to='rangeemp'>Details employee and Function occupante</Link></li>
            <li><Link className="dropdown-item" href="#" to='category'>category shoes</Link></li>
            <li><Link className="dropdown-item" href="#" to='product'>SHOES</Link></li>
            <li><Link className="dropdown-item" href="#" to='product2'>Search SHOES</Link></li>


          
          </ul>
        </li>
     
      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {DateTime.users ? DateTime.users : 'Login'}
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
          </ul>
        </li>
   
      </ul>
   
    </div>
  </div>
</nav>


    )
}
export default Head