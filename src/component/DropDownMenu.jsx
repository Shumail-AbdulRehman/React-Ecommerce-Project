"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

export function DropDownMenu({ title, subcategories, category }) {
  const [open, setOpen] = React.useState(false)
  let closeTimeout = null

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    // small delay so it won’t flicker when moving mouse down
    closeTimeout = setTimeout(() => setOpen(false), 200)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-xl font-normal" >
            {title}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <DropdownMenuLabel className="text-lg font-normal">{title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {subcategories.map((subcat) => (
            <DropdownMenuItem asChild key={subcat} className="text-base">
              {category === "Collections" ? (
                <Link className="font-normal" to={`/${subcat.toLowerCase()}`}>{subcat}</Link>
              ) : (
                <Link className="font-normal" to={`/${category}/${subcat.toLowerCase()}`}>{subcat}</Link>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  )
}
