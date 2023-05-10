import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import { Button } from "@gomycode/design-system";

function App() {

  const x:any={
    menuItems: [{label:"girfer"}, {label:"gi"}, {items: [ {label:"girfer"},{label:"gi"}], label:'test'}]
  }
  return (
    <div className="App">
    <NavBar  menuItems={x} />
    </div>
  );
}

export default App;
