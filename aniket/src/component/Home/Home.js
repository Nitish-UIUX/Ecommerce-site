import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/MetaData.js';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';
import './Home.css';
import Product from "../Home/productCard.js";


// const product = {
//     name: 'Blue Tshirt',
//     images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//     price: "₹3000",
//     _id: "abhishek",

// }

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        state => state.products
    );

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);


    return (
        <Fragment>

            {loading ? (<Loader />
            ) : (
                <Fragment>
                    <MetaData title={'ECOMMERCE'} />
                    <div className='banner'>
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>
                    <div className="container" id="container">
                        {products &&
                            products.map((product) => (
                                <Product product={product} />
                            ))}



                        {/* <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} /> */}
                    </div>
                </Fragment>
            )
            }

        </Fragment>
    );
};

export default Home;