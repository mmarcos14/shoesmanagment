import { useState } from "react"
import Api from "../Api";
import axios from "axios";

const AddImage=()=>{
    const [photo,setPhoto]=useState("");
    const [title,setTitle]=useState("");

    const {http}=Api
    const save=(e)=>{
        e.preventDefault();
        var f=new FormData();
        f.append('photo',photo);
        f.append('title',title);

        axios.post('product/store/image',f).then((response)=>{
        })
    }
    return(<div className="container py-5">
        <div className="row">
            <div className="col-md-6 offset-md-3 shadow-sm bg-body">
                <form onSubmit={save}>
                    <div className="row">
                    <div className="form-group">
                            <label htmlFor="promotion">Title</label>
                            <input className="form-control" type="text" name="title" onChange={(e)=>setTitle(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input className="form-control" type="file" name="photo" onChange={(e)=>setPhoto(e.target.files[0])}/>
                        </div>

                        <div className="form-group mt-2">
                            <button className="btn btn-info btn-sm float-end">save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default AddImage;