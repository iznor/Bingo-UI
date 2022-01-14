import "./Page.scss";
import "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";

function Page() {
  return (
    <div className="page-wrap">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default Page;
