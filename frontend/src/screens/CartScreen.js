import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { addToCart } from "../actions/cartAction";

function CartScreen({ match, location }) {
  const dispatch = useDispatch();

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>
        Add to cart: {productId} {qty}
      </p>
    </div>
  );
}

export default CartScreen;
