import { Link, Outlet, useFetcher, useLoaderData } from "react-router-dom";
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
import { LoaderProps } from "shared";
import { layoutLoader, sessionLoader } from "@/action/auth.action";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";

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
		title: "Soal",
		url: "/soal",
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

const navItems = [
	{ label: "Home", to: "#" },
	{ label: "Blog", to: "#" },
	{ label: "About", to: "#" },
	{ label: "Contact Us", to: "#" },
];


export function Layout() {
	const { defaultOpen } = useLoaderData() as LoaderProps<typeof layoutLoader>

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<main className={'w-full'}>
				<Navbar04Page />
				<div className=" mx-auto flex flex-col gap-6  min-h-screen">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	)
}


export function AppSidebar() {

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}




export const NavMenu = (props: NavigationMenuProps) => (
	<NavigationMenu {...props}>
		<NavigationMenuList>
			{navItems.map((item, index) => (
				<NavigationMenuItem key={index}>
					<NavigationMenuLink asChild>
						<Link to={item.to}>{item.label}</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			))}
		</NavigationMenuList>
	</NavigationMenu>
);

export const Navbar04Page = () => {
	const { isLogin } = useLoaderData() as LoaderProps<typeof layoutLoader>
	const fetcher = useFetcher();
	console.log({ isLogin })

	return (
		<nav className=" top-6 inset-x-4 h-16 bg-background border border-b-2  max-w-screen-xl mx-auto ">
			<div className="h-full flex items-center justify-between mx-auto px-4">
				<div className="">

					{isLogin
						? <SidebarTrigger />
						: null
					}
				</div>
				{/* Desktop Menu */}
				<NavMenu className="hidden md:block" />

				<div className="flex items-center gap-3">
					{isLogin ?
						<div className="">

							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button className="rounded-full">
										<LogOut className="mr-2 size-4" />
										Logout
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Yakin ingin logout?</AlertDialogTitle>
										<AlertDialogDescription>
											Kamu akan keluar dari akun saat ini.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter className="flex gap-2">
										<AlertDialogCancel type="button">Batal</AlertDialogCancel>

										<fetcher.Form method="post" action="/logout">
											<AlertDialogAction asChild>
												<Button type="submit">Ya, Logout</Button>
											</AlertDialogAction>
										</fetcher.Form>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>

						:

						<Button
							variant="outline"
							className="hidden sm:inline-flex rounded-full"
							asChild
						>
							<Link to={'/login'}>
								Sign In
							</Link>
						</Button>
					}

					{/* Mobile Menu */}
					{/* <div className="md:hidden"> */}
					{/* <SheetDemo /> */}
					{/* ///  <NavigationSheet /> */}
					{/* </div> */}
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
						{navItems.map((item, index) => (
							<SheetClose asChild key={index}>
								<Link
									to={item.to}
									className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
								>
									{item.label}
								</Link>
							</SheetClose>
						))}
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
