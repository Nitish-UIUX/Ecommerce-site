import React, { Fragment, useEffect, useState } from 'react';
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader.js'
import { useAlert } from 'react-alert';
import "./ProductDetails.css";
// import { set } from 'mongoose';
import MetaData from '../layout/MetaData.js';
import { addItemsToCart } from '../../actions/cartAction.js';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js';





const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const [imageLoading, setImageLoading] = useState(true);


    const { success, error: reviewError } = useSelector(
        (state) => state.newReview);



    const options = {
        // edit: false,
        // size: window.innerWidth < 600 ? 20 : 25,
        // isHalf: true,
        // activeColor: "tomato",
        // color: "rgba(20,20,20,0.1)",
        // value: product.ratings,

        size: "large",
        value : product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    //-------------increase and decrease quantity----------------

    // --------------use state ----------------
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {

        if (quantity >= product.stock) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        const qty = quantity - 1;
        if (qty <= 0) return;
        setQuantity(qty);

    }


    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added to Cart");
    }


    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", id);
        dispatch(newReview(formData));
        setOpen(false);
    };



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted  Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert , reviewError, success]);

    const handleImageLoad = () => {
        setImageLoading(false);
    };



    return (
        <Fragment>
            {loading ? <Loader />
                : (
                    <Fragment>
                        <MetaData title={`${product.name} -- ECOMMERCE`} />
                        <div className='ProductDetails'>
                            <div>
                                <Carousel>
                                    {product.images &&
                                        product.images.map((item, i) => (
                                            <img
                                                className="CarouselImage"
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} Slide`}
                                                onLoad={handleImageLoad}
                                                style={{ display: imageLoading ? 'none' : 'block' }}
                                            />
                                        ))}
                                </Carousel>
                            </div>
                            <div>
                                <div className='detailsBlock-1'>
                                    <h2>{product.name}</h2>
                                    <p>Product # P{product._id}</p>
                                </div>
                                <div className='detailsBlock-2'>
                                    <Rating {...options} value={product.ratings} />
                                    <span>{product.numOfReviews} Reviews</span>
                                </div>
                                <div className='detailsBlock-3'>
                                    <h1>{`₹${product.price}`}</h1>
                                    <div className='detailsBlock-3-1'>
                                        <div className='detailsBlock-3-1-1'>
                                            <button onClick={decreaseQuantity}>-</button>
                                            {/* <input value="1" type="number" /> */}
                                            <input readOnly type="number" value={quantity} />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>{" "}
                                        {product.stock > 0 ? (
                                            <button onClick={addToCartHandler}>Add To Cart</button>
                                        ) : (
                                            <button disabled>add To Cart</button>
                                        )}
                                    </div>
                                    <p>
                                        Status:{" "}
                                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                            {product.stock < 1 ? "OutOfStock" : "InStock"}
                                        </b>
                                    </p>
                                </div>
                                <div className='detailsBlock-4'>
                                    Description: <p>{product.description}</p>
                                </div>
                                <button onClick={submitReviewToggle} className="submitReview">Submit Reviews</button>
                            </div>
                        </div>

                        <h3 className='reviewsHeading'>REVIEWS</h3>

                        <Dialog
                            aria-labelledby="simple-dialog-title"
                            open={open}
                            onClose={submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="submitDialog">
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />

                                <textarea
                                    className="submitDialogTextArea"
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color='secondary'>
                                    Cancel
                                </Button>
                                <Button onClick={reviewSubmitHandler} color='primary' >
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>



                        {product.reviews && product.reviews[0] ? (
                            <div className="reviews">
                                {product.reviews &&
                                    product.reviews.map((review) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))}
                            </div>
                        ) : (
                            <p className="noReviews">No Reviews Yet</p>
                        )}
                    </Fragment>
                )
            }
        </Fragment>
    );

};

export default ProductDetails;
