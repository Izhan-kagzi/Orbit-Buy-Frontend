import { Link } from "react-router-dom";
import { FiChevronRight, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { getImageUrl } from "../services/api";

const TAX_RATE = 0.05;
const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_CHARGE = 99;

const Cart = () => {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const shipping = cartTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const tax = cartTotal * TAX_RATE;
  const total = cartTotal + shipping + tax;

  return (
    <>
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[5px] text-brand-primary font-semibold">Shopping Cart</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-serif text-brand-dark">Your Cart</h1>
          <div className="mt-6 flex items-center justify-center gap-2 text-gray-500">
            <Link to="/" className="hover:text-brand-primary transition">Home</Link>
            <FiChevronRight />
            <span className="text-brand-primary font-semibold">Cart</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-24">
              <h2 className="text-4xl font-serif text-brand-dark">Your Cart is Empty</h2>
              <p className="mt-5 text-gray-500">Looks like you haven't added any products yet.</p>
              <Link to="/shop" className="inline-block mt-10 px-10 py-4 rounded-full bg-brand-primary hover:bg-brand-brown text-white font-semibold transition-all duration-300">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 p-8 border-b border-gray-200 last:border-b-0">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-36 h-36 rounded-2xl object-cover"
                      />

                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-serif text-brand-dark">{item.name}</h3>
                        <p className="text-xl font-bold text-brand-dark mt-4">₹{item.price}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-10 h-10 rounded-full border border-brand-tan flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition"
                        >
                          <FiMinus />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-10 h-10 rounded-full border border-brand-tan flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition"
                        >
                          <FiPlus />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={22} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-brand-tan bg-white text-brand-dark font-semibold hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-3xl border border-gray-200 p-8 sticky top-28 shadow-sm">
                  <h2 className="text-3xl font-serif text-brand-dark mb-8">Order Summary</h2>

                  <div className="space-y-5">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-500">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>

                    <div className="flex justify-between text-gray-500">
                      <span>GST (5%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex justify-between text-2xl font-bold text-brand-dark">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="w-full mt-8 flex items-center justify-center py-4 rounded-full bg-brand-primary hover:bg-brand-brown text-white font-semibold transition-all duration-300"
                  >
                    Proceed to Checkout
                  </Link>

                  <p className="text-center text-sm text-gray-400 mt-5">
                    You can apply a coupon code at checkout.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
