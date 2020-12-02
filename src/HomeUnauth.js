import React, { useEffect, useState } from "react";

import "./HomeUnauth.css";

function HomeUnauth({ isLogged }) {
  const [jsx, setJSX] = useState("");

  let unauth = (
    <>
    <div className="container">
    <div id="intro">
      <h6>into</h6>
    </div>
    <div className="sub-container">
      <p id="banking">banking</p>
    </div>
    <div className="sub-container">
      <p id="business-management">business management</p>
    </div>
    <div className="sub-container">
      <p id="islamic">islamic</p>
    </div>
    </div>
     
    </>
  );

  let auth = (
    <div className="home container-fluid">
      <div className="row d-flex align-items-center">
        <div className="col-12">
          <div id="intro">
            <h6>You are not authorized</h6>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const chooseTemplate = () => {
      isLogged === false ? setJSX(unauth) : setJSX(auth);
    };
    chooseTemplate();
  }, []);

  return <div>{jsx}</div>;
}

export default HomeUnauth;
