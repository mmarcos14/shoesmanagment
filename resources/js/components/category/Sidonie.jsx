import { useEffect, useRef, useState } from "react"
import { useAppContext } from "../Ambroise.jsX"

const Sidonie=({ambroise})=>{

    return(
       <div className="bg-danger text-white text-bold" style={{fontSize:'30px',padding:'12px'}}>{ambroise}</div>
    )
}
export default Sidonie