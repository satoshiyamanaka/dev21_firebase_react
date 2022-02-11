import "./App.css";
import React from "react";
import Feed from "./components/Feed";
import Login from "./components/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
//Routes をつけたら　まっしろになってる　↑


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <>

          <Route exact path="/" component={Feed} />
          <Route exact path="/login" component={Login} />

          {/*ログインできてればtrue=Feedが表示、ログインできていなければfalse=Loginが表示 */}

          {/* <Route path="/" element={<Feed />}></Route>
          <Route path="/login" element={<Login />}></Route> */}


        </>
      </BrowserRouter>
    </div>
  );
}
export default App;

