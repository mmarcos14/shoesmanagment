import { useState } from "react"

const Try=()=>{
    const [Options,setOptions]=useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [sizes,setSize]=useState([{'size':'','quantite':''}])

    const ChangeInput=(index,e)=>{
        const values=[...sizes];
        values[index][e.target.name]=e.target.value
        setSize(values)

    }

    const addSizeField = () => {
        setSize([...sizes, { size: '', quantity: '' }]);
       console.log(sizes)
      };

      const RemoveSize=(index)=>{
        const values=[...sizes];
        values.splice(index,1)
        setSize(values)
      }
 


    return(
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow-lg"> 
                 <form className="d-flexs shadow-sm">
                   {
                    sizes.map((size,index)=>
                        <div key={index}>
                           <div className="d-flex">
                           <input className="form-control mt-2" placeholder="size"
                           name="size"
                           onChange={(e)=>ChangeInput(index,e)}
                           value={sizes.size}
                            />
                             <input className="form-control mt-2" placeholder="quantity"
                               onChange={(e)=>ChangeInput(index,e)}
                           value={sizes.quantity}
                           name="quantity"

                            />
                           <button className="btn text-danger" onClick={()=>RemoveSize(index)}><i className="fas fa-trash"></i></button>

                           </div>

                        </div>
                    )
                   }
                   <div className="form-group">
                    <button className="btn btn-primary btn-sm mt-2" type="button" onClick={addSizeField}>add  size</button>
                   </div>
                 </form>
                </div>
            </div>
        </div>
    )
}
export default Try; 