import { Link, NavLink, Outlet, useLoaderData, useLocation, useNavigation, } from "react-router-dom"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Loader2, LogInIcon, LogOutIcon, } from "lucide-react"
import { Toaster } from "@/components/ui/sonner.tsx"
import { NavMenu, ProtectAppNavbar } from "@/components/page/root/ProtectAppNavbar.tsx";
import AppTransition from "@/components/page/root/AppTransition.tsx";
import { sessionLoader } from "@/action/auth.action.ts";
import { Button } from "@/components/ui/button.tsx";
import { mainSidebar } from "@/main-sidebar.tsx";


export function AppSidebar() {
	const location = useLocation();
	const currentPathname = location.pathname;
	// console.log(currentPathname);
	return (
		<Sidebar>
			<SidebarContent>
				{ mainSidebar.map((itemParent) => (
					<SidebarGroup key={ itemParent.title }>
						<SidebarGroupLabel>{ itemParent.title }</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{ itemParent.child.map((item, i) => (
									<SidebarMenuItem key={ item.title + i }>
										<SidebarMenuButton
											asChild
											isActive={ currentPathname === item.url }
										>
											<NavLink
												to={ item.url }
											>
												<item.icon />
												<span>{ item.title }</span>
											</NavLink>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)) }
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				)) }
			</SidebarContent>
		</Sidebar>
	)
}

export function ProtectLayout() {
	const session = useLoaderData<typeof sessionLoader>();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading"
	;
	return (
		<SidebarProvider open={ !!session }>
			<AppSidebar />
			<main className="w-full relative">
				<ProtectAppNavbar />

				{/* Loading overlay for route changes */ }
				{ isLoading && (
					<div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
						<Loader2 className="h-10 w-10 animate-spin text-primary" />
					</div>
				) }

				<div className="mx-auto flex flex-col ga min-h-screen p-6 bg-muted">
					<AppTransition>
						<Outlet />
					</AppTransition>
				</div>
			</main>
			<Toaster position="top-right" />
		</SidebarProvider>
	);
}

export function PublicLayout() {
	const session = useLoaderData<typeof sessionLoader>()
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";
	// console.log(session);
	// console.log(use(userContext))
	return (
		<main className="w-full relative">
			<nav className=" to inset-x-4 h-16 bg-background border border-b-2   mx-auto ">
				<div className="h-full flex items-center justify-between mx-auto px-4 max-w-screen-xl">
					<NavMenu className="hidden md:block" />
					<div className="flex items-center gap-3">
						<Button className="rounded-full" asChild>

							{ ( !session || !session.isValid ) ?
								<Link to={ "/auth/login" }>
									<LogInIcon /> Login
								</Link>
								: <Link to={ "/auth/logout" }>
									<LogOutIcon /> Logout
								</Link>
							}
						</Button>
					</div>
				</div>
			</nav>

			{/* Loading overlay for route changes */ }
			{ isLoading && (
				<div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
					<Loader2 className="h-10 w-10 animate-spin text-primary" />
				</div>
			) }

			<div className="mx-auto flex flex-col ga min-h-screen  bg-muted">
				<AppTransition>
					<Outlet />
				</AppTransition>
			</div>
		</main>
	);
}
