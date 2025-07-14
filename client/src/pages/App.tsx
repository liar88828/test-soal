import { Link, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Calendar, Home, LogOut, Search, Settings, UserIcon } from "lucide-react"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";

const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Profile",
		url: "/profile",
		icon: UserIcon,
	},
	{
		title: "Calendar",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
]

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{ items.map((item) => (
								<SidebarMenuItem key={ item.title }>
									<SidebarMenuButton asChild>
										<a href={ item.url }>
											<item.icon />
											<span>{ item.title }</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							)) }
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}

export function Layout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className={ 'w-full' }>
				<Navbar04Page />
				<div className=" mx-auto flex flex-col gap-6  min-h-screen">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	)
}

const navItems = [
	{ label: "Home", to: "#" },
	{ label: "Blog", to: "#" },
	{ label: "About", to: "#" },
	{ label: "Contact Us", to: "#" },
];

export const NavMenu = (props: NavigationMenuProps) => (
	<NavigationMenu { ...props }>
		<NavigationMenuList>
			{ navItems.map((item, index) => (
				<NavigationMenuItem key={ index }>
					<NavigationMenuLink asChild>
						<Link to={ item.to }>{ item.label }</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			)) }
		</NavigationMenuList>
	</NavigationMenu>
);

export const Navbar04Page = () => {
	return (
		<nav className=" top-6 inset-x-4 h-16 bg-background border border-b-2  max-w-screen-xl mx-auto ">
			<div className="h-full flex items-center justify-between mx-auto px-4">
				<SidebarTrigger />
				{/* Desktop Menu */ }
				<NavMenu className="hidden md:block" />

				<div className="flex items-center gap-3">
					{/*<Button*/ }
					{/*	variant="outline"*/ }
					{/*	className="hidden sm:inline-flex rounded-full"*/ }
					{/*>*/ }
					{/*	Sign In*/ }
					{/*</Button>*/ }
					<Button className="rounded-full">
						<LogOut /> Logout
					</Button>

					{/* Mobile Menu */ }
					<div className="md:hidden">
						<SheetDemo />
						{/*<NavigationSheet />*/ }
					</div>
				</div>
			</div>
		</nav>
	);
};

export function SheetDemo() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open</Button>
			</SheetTrigger>
			<SheetContent className="w-64 p-4 flex flex-col justify-between">
				<div>
					<SheetHeader>
						<SheetTitle>Navigation</SheetTitle>
						<SheetDescription>
							Select a page to navigate
						</SheetDescription>
					</SheetHeader>

					<nav className="mt-6 flex flex-col gap-3">
						{ navItems.map((item, index) => (
							<SheetClose asChild key={ index }>
								<Link
									to={ item.to }
									className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
								>
									{ item.label }
								</Link>
							</SheetClose>
						)) }
					</nav>
				</div>

				<SheetFooter className="mt-8">
					<SheetClose asChild>
						<Button variant="outline" className="w-full">
							Close
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
