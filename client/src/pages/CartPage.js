import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./css/CartPage.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const updateItemQuantity = (pid, quantity) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item._id === pid) {
          return { ...item, quantity };
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.cartPage}>
        <div className="row">
          <div className="col-md-12">
            <h1 className={`text-center ${styles.pageHeader}`}>
              {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}`}
            </h1>
            <p className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.user ? "" : "please login to checkout !"
                  }`
                : "Your Cart Is Empty"}
            </p>
          </div>
        </div>

        <div class="small-container cart-page">
          <table className="table-w">
            <thead>
              <tr>
                <th className="th-1">Product Image</th>
                <th className="th-1">Product Name</th>
                <th className="th-1">Price</th>
                <th className="th-1">Quantity</th>
                <th className="th-1">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item) => (
                <tr key={item._id}>
                  <td className="td-1">
                    <div className="cart-info-1">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id} `}
                        alt={item.name}
                        className="cart-img"
                      />
                      <p6
                        className="danger12"
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove
                      </p6>
                      <div></div>
                    </div>
                  </td>

                  <td>
                    <p5>{item.name}</p5>
                  </td>
                  <td>
                    <p5>Price: {item.price}</p5>
                  </td>
                  <td>
                    <button
                      className={`quantity-button btn btn-secondary ${styles.quantityButton}`}
                      onClick={() =>
                        updateItemQuantity(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span1 className={styles.quantityValue}>
                      {item.quantity}
                    </span1>
                    <button
                      className={`quantity-button btn btn-secondary ${styles.quantityButton}`}
                      onClick={() =>
                        updateItemQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td className="td-1">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bottom-d">
        {/* <p>Total | Checkout | Payment</p> */}
        <hr />
        <h4>Total: {totalPrice()} </h4>
        {auth?.user?.address ? (
          <>
            <div className="mb-3">
              <h4>Current Address</h4>
              <h5>{auth?.user?.address}</h5>
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            </div>
          </>
        ) : (
          <div className="mb-3">
            {auth?.token ? (
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            ) : (
              <button
                className="btn btn-outline-warning"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Please Login to checkout
              </button>
            )}
          </div>
        )}
        <div className="mt-2">
          {clientToken && auth?.token && cart?.length && (
            <>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(inst) => setInstance(inst)}
              />
              <button
                className={`btn btn-primary ${styles.paymentButton}`}
                onClick={handlePayment}
                disabled={loading || !instance || !auth?.user?.address}
              >
                {loading ? "Processing ...." : "Make Payment"}
              </button>
            </>
          )}
        </div>
      </div>
      <div className="div122"></div>
    </Layout>
  );
};

export default CartPage;
