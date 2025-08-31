"use client"

import * as React from "react"
import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export function NavigationMenuComp({ title, subcategories, category }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[16px]  text-white bg-black">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 w-56">
              {subcategories.map((subcat) => (
                <li key={subcat}>
                  <NavigationMenuLink asChild>
                    {category === "Collections" ? (
                      <Link
                        to={`/${subcat.toLowerCase()}`}
                        className="block rounded-md px-3 py-2 text-[16px] font-normal  text-base"
                      >
                        {subcat}
                      </Link>
                    ) : (
                      <Link
                        to={`/${category}/${subcat.toLowerCase()}`}
                        className="block text-[16px] font-normal rounded-md px-3 py-2 hover:bg-gray-100 text-base"
                      >
                        {subcat}
                      </Link>
                    )}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
