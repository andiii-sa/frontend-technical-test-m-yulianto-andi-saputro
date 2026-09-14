
import { CheckLine, ChevronDown, Menu, User2Icon } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"


const Navbar = () => {
    return (
        <nav className="flex sticky top-0 bg-white shrink-0 items-center gap-2 border-b p-2 md:p-4 lg:p-5.5">
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
                            User Account <ChevronDown />
                        </Button>} />
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User2Icon />
                                    User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CheckLine />
                                    Approver
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar