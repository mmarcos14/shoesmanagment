import { ModalBody ,Modal, ModalHeader} from "react-bootstrap";
import Api from "../Api"
import ProductModalForm from "./productModalForm";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
const ListProduct2=()=>{
    const RefInput=useRef(null);
     const inputRefs = useRef([]); // Tableau de références pour les champs de saisie
     const [sku,setSku]=useState("")
     const [size,setSize]=useState("");
     const [sneaker,setSneaker]=useState("");
     const [btn,setBtn]=useState(false);

  // Fonction pour gérer la touche Entrée

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Empêcher le comportement par défaut (soumission du formulaire)

      // Trouver l'index du champ actif
      const activeIndex = inputRefs.current.findIndex((ref) => ref === document.activeElement);

      // Passer au champ suivant (si disponible)
      if (activeIndex !== -1 && activeIndex < inputRefs.current.length - 1) {
        inputRefs.current[activeIndex + 1]?.focus();
      }
      
      else {
        inputRefs.current[0]?.focus();
      }
    }
  };




  // Ajouter un écouteur global pour la touche Entrée
  useEffect(() => {
 
        if(sku && size!=0){
           alert(sku)
        }
     
   
    window.addEventListener("keydown", handleKeyDown);
    // Nettoyage de l'écouteur lors du démontage
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  
  }, [sku,size]);

 




   return(
    <div className="container py-5">
        <div className="row">
           <div className="col-md-12 bg-body">
            <form className="border d-flex">
                    <div className="form-group">
                        <label htmlFor="sku">SKU</label>
                        <input type="text" className="form-control"
                          ref={(el) => (inputRefs.current[0] = el)} 
                          onChange={(e)=>setSku(e.target.value)}
                          
                        />
                    </div>
                    &nbsp;
                    &nbsp;
                    &nbsp;


                    <div className="form-group">
                        <label htmlFor="size">size</label>
                        <select className="form-select" 
                        aria-label="Default select example" ref={(el) => (inputRefs.current[1] = el)}
                        onChange={(e)=>setSize(e.target.value)}
                         >
                            <option value={0}>...select size..</option>
                            <option value={5}>5</option>
                            <option value={5.5}>5.5</option>
                            <option value={6}>6</option>
                            <option value={6.5}>6.5</option>
                            <option value={7}>7</option>
                            <option value={7.5}>7.5</option>
                            <option value={8}>8</option>
                            <option value={8.5}>8.5</option>
                            <option value={9}>9</option>
                            <option value={9.5}>9.5</option>
                            <option value={10}>10</option>
                            <option value={10.5}>10.5</option>
                            <option value={11}>11</option>
                            <option value={11.5}>11.5</option>
                            <option value={12}>12</option>
                            <option value={12.5}>12.5</option>
                        </select>
                    </div>

                  {
                    btn ?   <div className="form-group">
                    <label htmlFor="sku"></label>
                    <button type="btn" className="btn btn-primary"
                    ref={(el) => (inputRefs.current[3] = el)}
                    onKeyDown={()=>go()}
                    >search</button>
                      
                  
                </div>:''
                  }
                    &nbsp;
                    &nbsp;
                    &nbsp; &nbsp;
                    &nbsp;
                    &nbsp;
                    {sneaker.name}
            </form>
            &nbsp;
            &nbsp;
            &nbsp;
           </div>
        </div>
    </div>
   )
}
export default ListProduct2