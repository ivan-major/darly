import React, { useState, useEffect } from "react";
import { api } from "./api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
// import { Form } from "./components/Form";
import { TablePersonal } from "./components/TablePersonal";
import Person from "./components/types";

const App = () => {
    return (
        <div className="App">
            <TablePersonal />
        </div>
    );
};

export default App;
