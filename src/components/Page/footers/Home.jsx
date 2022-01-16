import "../Footer.scss";

const buttonsMain = () => {
  return (
    <>
      <button id="reserved"></button>
      <button id="home"></button>
      <button id="profile"></button>
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
