import { useState } from "react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Filter } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox" // or your own simple input

export default function FilterSheet({ onFilter }) {
  const [openSection, setOpenSection] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState(null)

  const sizes = ["XS", "S", "M", "L", "XL", "2XL"]
  const prices = [
    { price: "Less than 1999", value: 1999 },
    { price: "Less than 2999", value: 2999 },
    { price: "Less than 5999", value: 5999 },
  ]

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  const handleSizeSelect = (size) => {
    const newValue = selectedSize === size ? null : size
    setSelectedSize(newValue)
    onFilter("size", newValue, "prices", selectedPrice)
  }

  const handlePriceSelect = (price) => {
    const newValue = selectedPrice === price ? null : price
    setSelectedPrice(newValue)
    onFilter("size", selectedSize, "prices", newValue)
  }

  const clearFilters = () => {
    setSelectedSize(null)
    setSelectedPrice(null)
    onFilter("size", null, "prices", null)
  }

  return (
    <Sheet>
      {/* 👉 Trigger button */}
      <SheetTrigger asChild>
        <Button className="px-6 py-3 text-base font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Filter Products</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-4">
          <div>
            <button
              className="flex items-center justify-between w-full text-left font-medium"
              onClick={() => toggleSection("sizes")}
            >
              <div className="flex items-center gap-2">
                {openSection === "sizes" ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Sizes
              </div>
            </button>

            {openSection === "sizes" && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                {sizes.map((size) => (
                  <Label
                    key={size}
                    htmlFor={`size-${size}`}
                    className={`flex items-center   p-2   transition-all 
                      ${selectedSize === size ? "border-black bg-gray-100" : "border-gray-300 "}`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    <Checkbox
                      id={`size-${size}`}
                      checked={selectedSize === size}
                      readOnly
                      className="h-5 w-5 cursor-pointer hover:bg-gray-50 mr-2"
                    />
                    <span className="text-base font-medium">{size}</span>
                  </Label>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              className="flex items-center justify-between w-full text-left font-medium"
              onClick={() => toggleSection("price")}
            >
              <div className="flex items-center gap-2">
                {openSection === "price" ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Price
              </div>
            </button>

            {openSection === "price" && (
              <div className="grid grid-cols-1 gap-3 mt-3">
                {prices.map((i) => (
                  <Label
                    key={i.value}
                    htmlFor={`price-${i.value}`}
                    className={`flex items-center   p-2   transition-all 
                      ${selectedPrice === i.value ? "border-black bg-gray-100" : "border-gray-300"}`}
                    onClick={() => handlePriceSelect(i.value)}
                  >
                    <Checkbox
                      id={`price-${i.value}`}
                      checked={selectedPrice === i.value}
                      readOnly
                      className="h-5 w-5 cursor-pointer hover:bg-gray-50 mr-2"
                    />
                    <span className="text-base font-medium">{i.price}</span>
                  </Label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
