import { Link, Outlet, useFetcher, useLoaderData, useNavigate, } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.tsx'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from '@/components/ui/sidebar'

import { Book, Calendar, DollarSign, FileText, FolderKanban, Home, LogIn, LogOut, Settings, Shield, SquareChartGantt, UserIcon, Users, Warehouse, } from 'lucide-react'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, } from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from '@/components/ui/sheet'
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu'
import { appLoader } from '@/action/auth.action'
import { Toaster } from '@/components/ui/sonner'

const items = [
	{
		title: 'Siswa',
		child: [
			{
				title: 'Beranda',
				url: '/student',
				icon: Home,
			},
			{
				title: 'Profile',
				url: '/student/profile',
				icon: UserIcon,
			},
			{
				title: 'Jadwal',
				url: '/student/schedule',
				icon: Calendar,
			},
			{
				title: 'Rapot',
				url: '/student/report',
				icon: FileText,
			},
			// {
			// 	title: 'Settings',
			// 	url: '/student/settings',
			// 	icon: Settings,
			// },
		],
	},
	//
	{
		title: 'Guru',
		child: [
			{
				title: 'Beranda',
				url: '/teacher',
				icon: Home,
			},
			{
				title: 'Management Kelas',
				url: '/teacher/classes',
				icon: FolderKanban,
			},
			{
				title: 'Penilaian',
				url: '/teacher/grades',
				icon: Book,
			},
			{
				title: 'Pengumuman',
				url: '/teacher/announcements',
				icon: Calendar,
			},

			{
				title: 'Jadwal Mengajar',
				url: '/teacher/schedule',
				icon: Calendar,
			},
			{
				title: 'Data Siswa',
				url: '/teacher/student',
				icon: Users,
			},
			{
				title: 'Absensi Guru',
				url: '/teacher/absence',
				icon: SquareChartGantt,
			},
			// {
			// 	title: 'Absensi Guru',
			// 	url: '/teacher/soal',
			// 	icon: SquareChartGantt,
			// },

			// {
			// 	title: 'Settings',
			// 	url: '/teacher/settings',
			// 	icon: Settings,
			// },
		],
	},
	// ---------
	{
		title: 'Keuangan',
		child: [
			{
				title: 'Beranda',
				url: '/finance',
				icon: Home,
			},
			{
				title: 'Pembayaran',
				url: '/finance/payments',
				icon: DollarSign,
			},
			{
				title: 'Laporan Keuangan',
				url: '/finance/report',
				icon: FileText,
			},
			{
				title: 'Tagihan',
				url: '/finance/bills',
				icon: DollarSign,
			},

			{
				title: 'Arus Kas',
				url: '/finance/cashflow',
				icon: Users,
			},
			{
				title: 'Data Kelas',
				url: '/finance/classes',
				icon: FolderKanban,
			},
			{
				title: 'Data Matkul',
				url: '/finance/subjects',
				icon: Book,
			},
			{
				title: 'Biaya Ruangan',
				url: '/finance/room',
				icon: Warehouse,
			},
			{
				title: 'Settings',
				url: '/finance/settings',
				icon: Settings,
			},
		],
	},
	//
	{
		title: 'Karyawan',
		child: [
			{
				title: 'Beranda',
				url: '/karyawan',
				icon: Home,
			},
			{
				title: 'Absensi',
				url: '/karyawan/absensi',
				icon: Calendar,
			},
			{
				title: 'Data Karyawan',
				url: '/karyawan/data',
				icon: Users,
			},
			{
				title: 'Settings',
				url: '/karyawan/settings',
				icon: Settings,
			},
		],
	},

	//
	{
		title: 'Keamanan',
		child: [
			{
				title: 'Beranda',
				url: '/keamanan',
				icon: Home,
			},
			{
				title: 'Log Aktivitas',
				url: '/keamanan/log',
				icon: Shield,
			},
			{
				title: 'Pengaturan Akses',
				url: '/keamanan/akses',
				icon: Settings,
			},
		],
	},
	//
]

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				{ items.map((itemParent) => (
					<SidebarGroup key={ itemParent.title }>
						<SidebarGroupLabel>{ itemParent.title }</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{ itemParent.child.map((item) => (
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
				)) }
			</SidebarContent>
		</Sidebar>
	)
}

const navItems = [
	{ label: 'Beranda', to: '#' },
	{ label: 'Blog', to: '#' },
	{ label: 'About', to: '#' },
	{ label: 'Contact Us', to: '#' },
]

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
)

export const NavbarPage = () => {
	const { isValid } = useLoaderData<typeof appLoader>()
	const fetcher = useFetcher()
	const navigate = useNavigate()
	return (
		<nav className=' top-6 inset-x-4 h-16 bg-background border border-b-2   mx-auto '>
			<div className='h-full flex items-center justify-between mx-auto px-4 max-w-screen-xl'>
				{ isValid ? <SidebarTrigger /> : null }

				{/* Desktop Menu */ }
				<NavMenu className='hidden md:block' />

				<div className='flex items-center gap-3'>
					{/*<Button*/ }
					{/*	variant="outline"*/ }
					{/*	className="hidden sm:inline-flex rounded-full"*/ }
					{/*>*/ }
					{/*	Sign In*/ }
					{/*</Button>*/ }
					<Button
						className='rounded-full'
						onClick={ () => {
							if (isValid) {
								fetcher.submit({}, { method: 'post', action: '/auth/logout' })
							} else {
								console.log('redirect to login')
								navigate('/auth/login')
							}
						} }
					>
						{ isValid ? (
							<>
								{ ' ' }
								<LogOut /> Logout
							</>
						) : (
							<>
								{ ' ' }
								<LogIn /> Login{ ' ' }
							</>
						) }
					</Button>

					{/* Mobile Menu */ }
					<div className='md:hidden'>
						<SheetDemo />
						{/*<NavigationSheet />*/ }
					</div>
				</div>
			</div>
		</nav>
	)
}

export function SheetDemo() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>Open</Button>
			</SheetTrigger>
			<SheetContent className='w-64 p-4 flex flex-col justify-between'>
				<div>
					<SheetHeader>
						<SheetTitle>Navigation</SheetTitle>
						<SheetDescription>Select a page to navigate</SheetDescription>
					</SheetHeader>

					<nav className='mt-6 flex flex-col gap-3'>
						{ navItems.map((item, index) => (
							<SheetClose
								asChild
								key={ index }
							>
								<Link
									to={ item.to }
									className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
								>
									{ item.label }
								</Link>
							</SheetClose>
						)) }
					</nav>
				</div>

				<SheetFooter className='mt-8'>
					<SheetClose asChild>
						<Button
							variant='outline'
							className='w-full'
						>
							Close
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default function AppLayout() {
	const { isValid } = useLoaderData<typeof appLoader>()
	return (
		<SidebarProvider open={ isValid ? undefined : false }>
			<AppSidebar />
			<main className={ 'w-full' }>
				<NavbarPage />
				<div className=' mx-auto flex flex-col gap-6  min-h-screen'>
					<Outlet />
				</div>
			</main>
			<Toaster
				position={ 'top-right' }
			/>
		</SidebarProvider>
	)
}
