import React, { useEffect } from 'react';
import Sidebar from "./Sidebar.js";
import './Dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction';
import { getAllOrders } from '../../actions/orderAction.js';

const Dashboard = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);
    const { orders } = useSelector(state => state.allOrders);

    let outOfStock = 0;
    products.forEach(item => {
        if (item.Stock === 0) {
            outOfStock += 1;
        }
    });
    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());

    }, [dispatch]);

    const lineState = {
        labels: ['Intial Amount', 'Amout Earned'],
        datasets: [
            {
                label: 'TOTAL AMOUNT',
                fill: false,
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72,49"],
                data: [0, 4000],
            },

        ],
    };

    const doughnutState = {
        labels: ["Out of stock", "InStock"],
        datasets: [
            {

                backgroundColor: ["green"],
                hoverBackgroundColor: ["rgb(197,72,49"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };
    return (
        <div className='dashboard'>
            <Sidebar />

            <div className='dashboardContainer'>
                <Typography component="h1" >Dashboard</Typography>

                <div className='dashboardSummary'>
                    <div>
                        <p>
                            Total Amount <br /> <span>$4567</span>

                        </p>
                    </div>
                    <div className='dashboardSummaryBox2'>
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>4567</p>
                        </Link>
                    </div>
                </div>

                <div className='lineChart'>
                    <Line data={lineState} />
                </div>
                <div className='doughnutChart'>
                    <Doughnut data={doughnutState} />
                </div>


            </div>
        </div>

    );
};

export default Dashboard