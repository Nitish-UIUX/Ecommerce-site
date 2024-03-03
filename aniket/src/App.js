import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from "./component/Product/Search";
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import UserOptions from "./component/layout/Header/UserOptions";
import { is } from 'bluebird';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import OrderSucess from './component/Cart/OrderSucess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import NotFound from './component/layout/Loader/Not Found/NotFoud';



function App() {


    const { isAuthenticated, user } = useSelector(state => state.user);

    React.useEffect(() => {
        store.dispatch({ type: 'USER_LOGIN_SUCCESS' });
    }, []);



    //-------------------------end google font loader-----------------
    return (
        <Router>
            <Header />
            {isAuthenticated && <UserOptions user={user} />}
            <Switch>
                <Route path="/" exact component={Home} />
                {/* <Route path="/sad" component={Loader} /> */}
                <Route exact path="/product/:id" component={ProductDetails} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/products/:keyword" component={Products} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/about" component={About} />

                <ProtectedRoute exact path="/account" component={Profile} />

                <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
                <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
                <Route exact path="/password/forgot" component={ForgotPassword} />
                <Route exact path="/password/reset/:token" component={ResetPassword} />
                <Route exact path="/login" component={LoginSignUp} />
                <Route exact path="/cart" component={Cart} />
                <ProtectedRoute exact path="/shipping" component={Shipping} />

                <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
                <ProtectedRoute exact path="/process/payment" component={Payment} />
                <ProtectedRoute exact path="/sucess" component={OrderSucess} />
                <ProtectedRoute exact path="/orders" component={MyOrders} />
                <ProtectedRoute exact path="/orders/:id" component={OrderDetails} />
                <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
                <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
                <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
                <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />
                <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
                <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />

                <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList} />
                <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
                <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews} />
                <Route component={NotFound} />


            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
