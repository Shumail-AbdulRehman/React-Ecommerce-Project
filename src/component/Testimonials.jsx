import React from "react"

function Testimonials() {
  const testimonials = [
    {
      name: "Ayesha Khan",
      text: "Amazing quality and super fast delivery. Definitely my go-to store!",
    },
    {
      name: "Omar Ali",
      text: "Customer support was so helpful. The exchange process was easy and smooth.",
    },
    {
      name: "Sana Malik",
      text: "I love the product range here. Shopping has never been this fun!",
    },
  ]

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 via-white to-gray-100
 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-gray-700 italic">“{t.text}”</p>
              <h4 className="mt-4 font-semibold text-gray-900">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
