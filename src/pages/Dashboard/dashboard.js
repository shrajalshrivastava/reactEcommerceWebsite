import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory } from './../../Redux/Orders/orders.actions';
import OrderHistory from './../../components/OrderHistory/orderHistory';
import './dashboard.scss';

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data
});

const Dashboard = props => {
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);

  useEffect(() => {
    dispatch(
      getUserOrderHistory(currentUser.id)
    );

  }, []);

  return (
    <div>
      <h1>
        My Orders
      </h1>

      <OrderHistory orders={orderHistory} />
    </div>
  );
};

export default Dashboard;
