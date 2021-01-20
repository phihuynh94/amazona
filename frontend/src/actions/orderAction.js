import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });

  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};

export const myListOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MY_LIST_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get("/api/orders/my", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_MY_LIST_FAIL, payload: message });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    await axios.delete(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};
