import React from "react"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import p1 from "../assets/Assets/product_20.png"

function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items)
  const totalCartItems = useSelector((state) => state.cart.totalQuantity)
  const totalPrice = useSelector((state) => state.cart.totalPrice)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const paymentMethod = watch("paymentMethod", "card")

  const onSubmit = (data) => {
    console.log("Checkout Data:", data)
    // send to backend here...
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 grid lg:grid-cols-3 gap-8">
      {/* LEFT → Checkout Form */}
      <div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-3">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                {...register("fullName", { required: "Full name is required" })}
                type="text"
                placeholder="Full Name"
                className={`w-full border rounded-lg p-3 ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">{errors.fullName.message}</span>
              )}

              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
                })}
                type="email"
                placeholder="Email Address"
                className={`w-full border rounded-lg p-3 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}

              <input
                {...register("phone", { required: "Phone number is required" })}
                type="tel"
                placeholder="Phone Number"
                className={`w-full border rounded-lg p-3 md:col-span-2 ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone.message}</span>
              )}
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h3 className="text-lg font-medium mb-3">Shipping Address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                {...register("street", { required: "Street address is required" })}
                type="text"
                placeholder="Street Address"
                className={`w-full border rounded-lg p-3 md:col-span-2 ${
                  errors.street ? "border-red-500" : ""
                }`}
              />
              {errors.street && (
                <span className="text-red-500 text-sm">{errors.street.message}</span>
              )}

              <input
                {...register("city", { required: "City is required" })}
                type="text"
                placeholder="City"
                className={`w-full border rounded-lg p-3 ${
                  errors.city ? "border-red-500" : ""
                }`}
              />
              {errors.city && (
                <span className="text-red-500 text-sm">{errors.city.message}</span>
              )}

              <input
                {...register("postalCode", { required: "Postal code is required" })}
                type="text"
                placeholder="Postal Code"
                className={`w-full border rounded-lg p-3 ${
                  errors.postalCode ? "border-red-500" : ""
                }`}
              />
              {errors.postalCode && (
                <span className="text-red-500 text-sm">{errors.postalCode.message}</span>
              )}

              {/* Country dropdown */}
              <select
                {...register("country", { required: "Country is required" })}
                className={`w-full border rounded-lg p-3 md:col-span-2 ${
                  errors.country ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Country</option>
                <option value="Pakistan">Pakistan</option>
                <option value="India">India</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="China">China</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
              </select>
              {errors.country && (
                <span className="text-red-500 text-sm">{errors.country.message}</span>
              )}
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="text-lg font-medium mb-3">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  {...register("paymentMethod", { required: true })}
                  type="radio"
                  value="card"
                  defaultChecked
                />
                <span>Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  {...register("paymentMethod", { required: true })}
                  type="radio"
                  value="cod"
                />
                <span>Cash on Delivery (COD)</span>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-4 space-y-3">
                <input
                  {...register("cardNumber", {
                    required: "Card number is required",
                    minLength: { value: 16, message: "Must be 16 digits" },
                  })}
                  type="text"
                  placeholder="Card Number"
                  className={`w-full border rounded-lg p-3 ${
                    errors.cardNumber ? "border-red-500" : ""
                  }`}
                />
                {errors.cardNumber && (
                  <span className="text-red-500 text-sm">{errors.cardNumber.message}</span>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <input
                    {...register("expiry", { required: "Expiry date is required" })}
                    type="text"
                    placeholder="MM/YY"
                    className={`w-full border rounded-lg p-3 ${
                      errors.expiry ? "border-red-500" : ""
                    }`}
                  />
                  <input
                    {...register("cvc", { required: "CVC is required" })}
                    type="text"
                    placeholder="CVC"
                    className={`w-full border rounded-lg p-3 ${
                      errors.cvc ? "border-red-500" : ""
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-800 transition-colors"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* RIGHT → Cart Summary */}
      <div className="bg-gray-50 shadow-md rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

        {(cartItems?.length ?? 0) > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 border-b pb-3 last:border-none">
                <img
                  src={p1}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded border"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Qty: {item.quantity}</span>
                    <span className="text-sm font-semibold">PKR {item.totalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">🛒 Cart is empty</div>
        )}

        {totalCartItems > 0 && (
          <div className="mt-6 border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Items ({totalCartItems})</span>
              <span>PKR {totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>PKR 200</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>PKR {totalPrice + 200}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage
