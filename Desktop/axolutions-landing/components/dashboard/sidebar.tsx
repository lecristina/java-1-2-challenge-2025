"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FolderKanban, FileText } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Projetos",
      icon: FolderKanban,
      href: "/dashboard/projects",
      active: pathname.includes("/dashboard/projects"),
    },
    {
      label: "Blog",
      icon: FileText,
      href: "/dashboard/blog",
      active: pathname.includes("/dashboard/blog"),
    },
  ]

  return (
    <div className="h-screen w-64 border-r bg-background">
      <div className="flex h-14 items-center px-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="font-bold text-xl bg-gradient-to-r from-[#9200cf] to-[#6a00cf] text-transparent bg-clip-text">
            AXOLUTIONS
          </div>
        </Link>
      </div>
      <div className="px-3 py-4">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
                route.active ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <route.icon className="h-5 w-5 mr-2" />
              <span>{route.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
