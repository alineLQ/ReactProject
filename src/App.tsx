import React from "react";
import "./App.css";
import MainLayout from "./layout";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import { renderRoutes } from "./router/utils";
import { mainRoutes } from "./router";
import AuthRequire from "./guard/AuthRequire";

function App() {
  return (
    <div className="App">
      {/* <Hello></Hello> */}
      <Routes>
        <Route path="/" element={<AuthRequire />}>
          {/* <Route path='/dashboard' element= {<Dashboard />} />
          <Route path='/course/category' element={<Category />} />
          <Route path='/course/articleList'  element={<ArticleList />} /> */}
          {renderRoutes(mainRoutes)}
        </Route>
        <Route path="login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
