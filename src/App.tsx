import React from 'react';
import './App.css';
import Header from "./component/header/Header";
import Routes from "./component/router/Routes";

function App() {
  return (
      <div className="App">
        <Header/>
        <Routes/>
      </div>
  );
}

export default App;
