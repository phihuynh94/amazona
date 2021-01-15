import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { myListOrder } from "../actions/orderAction";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function OrderHistoryScreen({ history }) {
  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = orderMyList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myListOrder());
  }, [dispatch]);

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? order.paidAt.substring(0, 10) : "Not paid"}
                </td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "Not delivered"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistoryScreen;
