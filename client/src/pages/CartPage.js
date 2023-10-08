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
        <div className={styles.cartDiv1}>
          <div className="container">
            <div className="row">
              <div className={`col-md-7 ${styles.cartItemsContainer}`}>
                {cart?.map((p) => (
                  <div
                    className={`row card mb-3 ${styles.cartItem}`}
                    key={p._id}
                  >
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.substring(0, 30)}
                        </p>
                        <p className="card-text">Price: {p.price}</p>
                        <div className="quantity">
                          <button
                            className={`quantity-button btn btn-secondary ${styles.quantityButton}`}
                            onClick={() =>
                              updateItemQuantity(p._id, p.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span className={styles.quantityValue}>
                            {p.quantity}
                          </span>
                          <button
                            className={`quantity-button btn btn-secondary ${styles.quantityButton}`}
                            onClick={() =>
                              updateItemQuantity(p._id, p.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          className={`btn btn-danger mt-2 ${styles.removeItemButton}`}
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`col-md-5 ${styles.cartSummary}`}>
                <h2>Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
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
                        onInstance={(instance) => setInstance(instance)}
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
