import "./Login.scss";

function Login() {
  //AYHAM => implementation: what happens when user clicks "login"?
  return (
    <div className="index login">
      <form>
          <input name="email" type="text" placeholder="E-Mail"/>
          <input type="text" placeholder="Password"/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default Login;
