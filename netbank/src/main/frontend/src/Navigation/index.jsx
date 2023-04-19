import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Header } from "./Header";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Atm from "../pages/Atm";
import Register from "../pages/Register";
import Transaction from "../pages/Transaction";

const Navigation = () => {
    return(
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/atm" element={<Atm />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/Register" element={<Register />}/>
            <Route path="/transaction" element={<Transaction />}/>

        </Routes>
        </BrowserRouter>
    )
}
export default Navigation;