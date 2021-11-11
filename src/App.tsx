import './App.scss';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Main/Home/Home';
import Register from './components/Main/Auth/Register/Register';
import Login from './components/Main/Auth/Login/Login';
import Create from './components/Main/Decorate/Create/Create';
import Details from './components/Main/Details/Details';
import Cart from './components/Main/Cart/Cart';
import Checkout from './components/Main/Checkout/Checkout';
import Edit from './components/Main/Decorate/Edit/Edit';
import Filter from './components/Main/Filter/Filter';
import Start from './components/Main/Start/Start';


function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/movies-react-app" exact component={Start} />
                <Route path="/auth/register" exact component={Register} />
                <Route path="/auth/login" exact component={Login} />
                <Route path="/movies/create" exact component={Create} />
                <Route path="/movies/details/:movieId" exact component={Details} />
                <Route path="/movies/edit/:movieId" exact component={Edit} />
                <Route path="/filter" exact component={Filter} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/checkout" exact component={Checkout} />
            </Switch>
        </Router>
    );
}

export default App;
