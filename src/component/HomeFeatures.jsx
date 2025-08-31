import React from "react"
import { Headset, RefreshCcw, Globe } from "lucide-react"

function HomeFeatures() {
  const features = [
    {
      icon: <Headset className="w-10 h-10 text-black" />,
      title: "Customer Support",
      desc: "Our dedicated support team is always here to help you with your queries.",
    },
    {
      icon: <RefreshCcw className="w-10 h-10 text-black" />,
      title: "Easy Exchange",
      desc: "Hassle-free returns and exchanges to give you peace of mind.",
    },
    {
      icon: <Globe className="w-10 h-10 text-black" />,
      title: "Worldwide Delivery",
      desc: "We deliver across the globe with reliable and fast shipping.",
    },
  ]

  return (
    <div className="w-full  bg-gradient-to-r from-yellow-50 via-white to-pink-50
 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            {/* Icon */}
            <div className="mb-4">{feature.icon}</div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-2">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeFeatures
