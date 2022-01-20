import "../Footer.scss";

const buttonsMain = () => {
  return (
    <>
      <a href="/reservations"><button id="reserved"></button></a>
      <a href="/home"><button id="home"></button></a>
      <a href="/profile"><button id="profile"></button></a>
    </>
  );
};

function HomeFooter() {
  return (
    <footer>
      <div className="container">{buttonsMain()}</div>
    </footer>
  );
}
export default HomeFooter;
