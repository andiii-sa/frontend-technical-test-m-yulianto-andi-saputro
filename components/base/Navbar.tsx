"use client"

import { listUsers } from "@/constants"
import { useGeneralStore } from "@/providers"
import { User } from "@/types"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"


const Navbar = () => {
    const { user, setUser } = useGeneralStore((s) => (s))

    return (
        <nav className="flex sticky top-0 z-20 bg-white shrink-0 items-center gap-2 border-b p-2 md:p-4 lg:p-5.5">
            <div className="flex w-full items-center gap-1 lg:gap-2">
                <SidebarTrigger icon={<Menu />} className="" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-auto"
                />
                <h1 className="text-base font-medium">Dashboard</h1>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline">
                            <span className="hidden sm:block">Login as : {user?.name}</span> <span>({user?.role})</span> <ChevronDown />
                        </Button>} />
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                {
                                    listUsers.map((item, idx) => (
                                        <DropdownMenuItem key={idx} onClick={() => setUser(item as User)} >
                                            {item.name} - {item.role}
                                        </DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar