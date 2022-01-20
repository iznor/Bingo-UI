import "./Login.scss";

function Login() {
  console.log("LOGIN");
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
