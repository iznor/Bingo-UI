import "./Login.scss";
import React , {useState} from 'react';
import axios from "axios"
import { get } from "mongoose";
import { set } from "date-fns/esm";

function Login({Login_to_our_project , error}) {
  //AYHAM => implementation: what happens when user clicks "login"?
  const [details , setDetails] = useState({email : "" , password : "" })
  const [NotDefinde , setNotDefinde] = useState({email : "" , password : "" })

    const submitHandler = async (e) => {
    e.preventDefault();
    const datab = await axios({
      method:'Post',
      url : "http://localhost:8080/api/users/login",
      data:{"email":details.email,"password":details.password}
    })
    const data = JSON.stringify(datab.data);
    const obj = JSON.parse(data);
    if(obj.email == details.email && obj.password == details.password){
      Login_to_our_project(details);
    }
    else{
      Login_to_our_project(NotDefinde);
    }
  }
  return (
    <div className="index login">
      <form onSubmit={submitHandler}>
          <input name="email" type="text" placeholder="E-Mail"  onChange={e => setDetails({...details , email : e.target.value})} value={details.email} />
          <input  name="Password" type="text" placeholder="Password" onChange={e => setDetails({...details , password : e.target.value})} value={details.password}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
