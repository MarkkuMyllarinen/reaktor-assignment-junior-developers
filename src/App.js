import './App.css';
import React from 'react';
import Navigator from "./components/Navigator"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Product from "./components/Product"


function App() {

  return (
    <div>
      <Router>
        <Navigator/>
        <Route exact path="/" component={_ => <Product name={"Jackets"}/>}/>
        <Route path="/jackets" component={_ => <Product name={"Jackets"}/>}/>
        <Route path="/shirts" component={_ => <Product name={"Shirts"}/>}/>
        <Route path="/accessories" component={_ => <Product name={"Accessories"}/>}/>
      </Router>
    </div>
  );
}

export default App;
