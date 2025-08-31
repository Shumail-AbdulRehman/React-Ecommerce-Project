import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Link } from "react-router-dom"
import p1 from "../assets/Assets/p1_product_i1.png"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import { useEffect, useState } from "react"
import { increaseQuantity, decreaseQuantity, removeItem } from "../store/cartSlice"
import { useSelector, useDispatch } from "react-redux"
import userService from "../appwrite/services"

export default function CartSheet({ open, setOpen }) {
  const dispatch = useDispatch()
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = typeof open !== "undefined" && typeof setOpen === "function"

  const safeOpen = isControlled ? open : internalOpen
  const safeSetOpen = isControlled ? setOpen : setInternalOpen

  const cartItems = useSelector((state) => state.cart.items)
  const totalCartItems = useSelector((state) => state.cart.totalQuantity)
  const totalPrice = useSelector((state) => state.cart.totalPrice)

  const increment = (itemId,color,sizes) => dispatch(increaseQuantity({id:itemId,color,sizes}))
const decrement = (itemId, color, sizes) => 
  dispatch(decreaseQuantity({ id: itemId, color, sizes }));
  const remove = (itemId,color,sizes) => dispatch(removeItem({id:itemId,color,sizes}))

  useEffect(() => {
    console.log("cartItems are :", cartItems)
    console.log("color:",cartItems.map((i)=>
    (i.size)))
  }, [cartItems])

  return (
    <Sheet open={safeOpen} onOpenChange={safeSetOpen}>
      <SheetTrigger asChild>
        <button className="relative">
          <ShoppingCart size={25} className="text-white cursor-pointer hover:text-orange-400  " />
          {(cartItems?.length ?? 0) > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full">
              {totalCartItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-[400px] flex flex-col">
        {/* Header */}
        <SheetHeader className="border-b pb-2">
          <SheetTitle className="text-xl font-bold">Shopping Cart</SheetTitle>
          <SheetDescription className="text-gray-500">
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
          {(cartItems?.length ?? 0) > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b pb-3 last:border-none"
              >
                {/* Product Image */}
                {/* item.image? item.image:p1 */}
                <img
                  src={userService.getFileView(item.image) }
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded border"
                />

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <button onClick={() => remove(item.id,item.color,item.sizes)}>
                      <X size={16} className="text-gray-400 hover:text-red-500" />
                      remove
                    </button>
                  </div>

                  {/* Color + Size tags */}
                  <div className="flex gap-2 mt-1 text-xs text-gray-500">
                    {item.color && (
                      <span className="px-2 py-0.5 bg-gray-100 border rounded">
                        {item.color}
                      </span>
                    )}
                    {item.sizes && (
                      <span className="px-2 py-0.5 bg-gray-100 border rounded">
                        {item.sizes}
                      </span>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => decrement(item.id,item.color,item.sizes)}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="text-sm">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => increment(item.id,item.color,item.sizes)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    <div className="text-sm font-semibold">
                      PKR {item.totalPrice}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">🛒 Cart is empty</div>
          )}
        </div>

        {/* Footer */}
        <SheetFooter className="border-t p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>PKR {totalPrice}</span>
          </div>
          <Link to="/checkout">          <Button className="w-full">Checkout</Button>
</Link>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
