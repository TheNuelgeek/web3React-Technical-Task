import React from "react";
import Header from "../header/header";
import Api from "../../Api/newApi";
import ThirdPageBtn from "../buttons/ThirdPageBtn";


function DashboardPage() {

  return (
    <div>
      <Header />
      <Api />
      <ThirdPageBtn />
    </div>
  );
}

export default DashboardPage;
