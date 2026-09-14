"use client"

import { IconCart, IconChart, IconCheck, IconDocument, IconHome, IconPackage, IconSettings } from "@/assets/icons"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar
} from "@/components/ui/sidebar"
import { cn } from "cn"
import { ChevronsUpDown } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const menus = [
    {
        isGroup: false,
        name: "Dashboard",
        url: "/",
        icon: <IconHome className="text-xs text-dark-active" />
    },
    {
        isGroup: false,
        name: "Purchase Requests",
        url: "/",
        icon: <IconDocument className="text-xs text-dark-active" />
    },
    {
        isGroup: false,
        name: "Purchase Orders",
        url: "/",
        icon: <IconCart className="text-xs text-dark-active" />
    },
    {
        isGroup: false,
        name: "Inventory",
        url: "/",
        icon: <IconPackage className="text-xs text-dark-active" />
    },

    {
        isGroup: true,
        name: "Operations",
        url: "/",
        icon: null,
        children: [
            {
                name: "Goods Receipt",
                url: "/",
                icon: <IconCheck className="text-xs text-dark-active" />
            },
            {
                name: "Reports",
                url: "/",
                icon: <IconChart className="text-xs text-dark-active" />
            }
        ]
    },
]

export function AppSidebar() {

    const { open } = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className={cn(open ? 'px-4 py-5' : 'px-2 py-5')}>
                <div className="flex items-center gap-2.5">
                    <div className="flex w-7.5 h-7.5 items-center justify-center rounded-full bg-[linear-gradient(145deg,#B1C3D9_0%,#043C86_100%)] text-xs font-bold text-white">
                        PF
                    </div>

                    <span className={cn('text-sm font-medium', !open && 'hidden')}>
                        ProcureFlow
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent className={cn(open ? 'px-4 py-5' : 'px-2 py-5')}>
                <SidebarMenu>
                    {menus.map((menu, idx) => (
                        menu.isGroup ? (
                            <SidebarGroup
                                key={idx}
                                className="px-0"
                            >
                                <SidebarGroupLabel className="text-fg-subtle">
                                    {menu.name}
                                </SidebarGroupLabel>

                                <SidebarMenu>
                                    {menu.children?.map((child, idy) => (
                                        <SidebarMenuItem key={idy}>
                                            <SidebarMenuButton className="text-fg-active hover:bg-sidebar-item-active hover:text-fg" render={<Link href={child.url} />}>
                                                {child.icon}
                                                <span >{child.name}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroup>
                        ) : (
                            <SidebarMenuItem key={idx}>
                                <SidebarMenuButton className="text-fg-active hover:bg-sidebar-item-active hover:text-fg" render={<Link href={menu.url} />}>
                                    {menu.icon}
                                    <span>{menu.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem >
                        <SidebarMenuButton className="text-fg-active hover:bg-sidebar-item-active hover:text-fg" render={<Link href={'/'} />}>
                            <IconSettings className="text-xs text-dark-active" />
                            <span>Setting</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={""} alt={"Alex Morgan"} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">Alex Morgan</span>
                                <span className="truncate text-xs">Procurement</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}