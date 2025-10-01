import { Link, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { LogIn, LogOut } from "lucide-react";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu.tsx";
import { sessionLoader } from "@/action/auth.action.ts";

export const ProtectAppNavbar = () => {
	const session = useLoaderData<typeof sessionLoader>()
	const fetcher = useFetcher()
	const navigate = useNavigate()
	// console.log(session)
	return (
		<nav className=" to inset-x-4 h-16 bg-background border border-b-2   mx-auto ">
			<div className="h-full flex items-center justify-between mx-auto px-4 max-w-screen-xl">
				{/*{ isValid ? <SidebarTrigger /> : null }*/ }

				{/* Desktop Menu */ }
				<NavMenu className="hidden md:block" />

				<div className="flex items-center gap-3">
					{/*<Button*/ }
					{/*	variant="outline"*/ }
					{/*	classTitle="hidden sm:inline-flex rounded-full"*/ }
					{/*>*/ }
					{/*	Sign In*/ }
					{/*</Button>*/ }
					<Button
						className="rounded-full"
						onClick={ () => {
							if (session.isValid) {
								fetcher.submit({}, { method: "post", action: "/auth/logout" })
							} else {
								console.log("redirect to login")
								navigate("/auth/login")
							}
						} }
					>
						{ session.isValid ? (
							<><LogOut /> Logout</>
						) : (
							<><LogIn /> Login</>
						) }
					</Button>

				</div>
			</div>
		</nav>
	)
}

const navItems = [
	{ label: "Beranda", to: "#" },
	{ label: "Blog", to: "#" },
	{ label: "About", to: "#" },
	{ label: "Contact Us", to: "#" },
]

export const NavMenu = (props: NavigationMenuProps) => (
	<NavigationMenu { ...props }>
		<NavigationMenuList>
			{ navItems.map((item, index) => (
				<NavigationMenuItem key={ index }>
					<NavigationMenuLink asChild>
						<Link
							to={ item.to }
							// viewTransition
						>{ item.label }</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
			)) }
		</NavigationMenuList>
	</NavigationMenu>
)
