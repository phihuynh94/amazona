import React from "react";

function CartScreen({ match, location }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

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
