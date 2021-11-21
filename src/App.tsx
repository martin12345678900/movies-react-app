import './App.css';
import React, { createContext, useState } from 'react';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Create from './components/Decorate/Create';
import Details from './components/Details/Details';
import Cart from './components/Cart/Cart';
import Edit from './components/Decorate/Edit';
import { MovieArticle } from './components/Details/types';


function App() {
    const [searchParam, setSearchParam] = useState("");

    return (
        <Router>
            <Header setSearchParam={setSearchParam} />
            <Switch>
                <Route path="/" exact>
                    <Home searchParam={searchParam} />
                </Route>
                <Route path="/auth/register" exact>
                    <Register />
                </Route>
                <Route path="/auth/login" exact>
                    <Login />
                </Route>
                <Route path="/movies/create" exact>
                    <Create />
                </Route>
                <Route path="/movies/details/:movieId" exact>
                    <Details />
                </Route>
                <Route path="/movies/edit/:movieId" exact>
                    <Edit />
                </Route>
                <Route path="/cart" exact>
                    <Cart />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
