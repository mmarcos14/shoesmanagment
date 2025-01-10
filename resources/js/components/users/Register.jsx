import { useState, useEffect } from "react";
import Api from "../Api";
import { useAppContext } from "../Ambroise.jsX";
import { useNavigate } from "react-router-dom";
import EmployeeTimer from "../Employee/EmployeeTimer";
import Head from "../Head";

const Register = () => {
    const { http } = Api();
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    // Handle input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Handle form submission
    const save = async (e) => {
        e.preventDefault();
        try {
            await http.post("user/login", user).then((response)=>{
               if(response.data.status==200){
                //console.log(response.data.user);
                window.location.href='product'
                //<EmployeeTimer startTime={response.data.satrt_time}/>
                
               }else if(response.data.status==402){
                alert("Invalid credentials")
               }
            })
          

        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    // Example side effect: Setting a global variable
  

    return (
        <div className="container py-5 display">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={save}>
                        <div className="row shadow-sm bg-body">
                            <div className="form-group">
                                <label htmlFor="username">User Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    onChange={handleInput}
                                    value={user.username}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    onChange={handleInput}
                                    value={user.password}
                                />
                            </div>

                            <div className="form-group display mt-2">
                                <button className="btn btn-sm btn-primary float-end">
                                    Create Account
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
