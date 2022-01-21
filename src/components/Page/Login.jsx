import "./Login.scss";
import React , {useState} from 'react';


function Login({Login_to_our_project , error}) {
  //AYHAM => implementation: what happens when user clicks "login"?
  const [details , setDetails] = useState({email : "" , password : "" })

  const submitHandler = e => {
    e.preventDefault();
    console.log(details);
    Login_to_our_project(details);
  
  }
  return (
    <div className="index login">
      <form onSubmit={submitHandler}>
          <input name="email" type="text" placeholder="E-Mail"  onChange={e => setDetails({...details , email : e.target.value})} value={details.email} />
          <input  name="Password" type="text" placeholder="Password" onChange={e => setDetails({...details , password : e.target.value})} value={details.Password}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
