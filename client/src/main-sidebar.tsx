import {
	Book,
	Calendar,
	CalendarCheck2Icon,
	DollarSign,
	FileText,
	FolderKanban,
	Home,
	Megaphone,
	SchoolIcon,
	Settings,
	Shield,
	SquareChartGantt,
	UserIcon,
	Users,
	UsersIcon,
	Warehouse
} from "lucide-react";

export const mainSidebar = [
	{
		title: "AnnouncementType",
		child: [
			{
				title: "pengumuman",
				url: "/announcement",
				icon: Megaphone,
			}
		]
	},
	{
		title: "Academic",
		child: [
			{
				title: "Class",
				url: "/academic/classes",
				icon: SchoolIcon,
			},
			// {
			// 	title: "schedule",
			// 	url: "/academic",
			// 	icon: LayoutDashboardIcon,
			// },
			{
				title: "Schedule",
				url: "/academic/schedule",
				icon: CalendarCheck2Icon,
			},
			{
				title: "guru",
				url: "/academic/teacher",
				icon: UsersIcon,
			},
			// {
			// 	title: 'guru',
			// 	url: '/academic/teacher/:id',
			// 	icon: UserIcon,
			// },
		]
	},
	{
		title: "Siswa",
		child: [
			{
				title: "Beranda",
				url: "/student",
				icon: Home,
			},
			{
				title: "Profile",
				url: "/student/profile",
				icon: UserIcon,
			},
			// {
			// 	title: "Jadwal",
			// 	url: "/student/schedule",
			// 	icon: Calendar,
			// },
			// {
			// 	title: "Rapot",
			// 	url: "/student/report",
			// 	icon: FileText,
			// },
			// {
			// 	title: 'Settings',
			// 	url: '/student/settings',
			// 	icon: Settings,
			// },
		],
	},
	//
	{
		title: "Guru",
		child: [
			{
				title: "Beranda",
				url: "/teacher",
				icon: Home,
			},
			{
				title: "Pengumuman",
				url: "/teacher/announcements",
				icon: Calendar,
			},
			{
				title: "Management Kelas",
				url: "/teacher/classes",
				icon: FolderKanban,
			},
			// {
			// 	title: 'Penilaian',
			// 	url: '/teacher/grades',
			// 	icon: Book,
			// },

			{
				title: "Jadwal Mengajar",
				url: "/teacher/schedule",
				icon: Calendar,
			},
			// {
			// 	title: "Data Siswa",
			// 	url: "/teacher/student",
			// 	icon: Users,
			// },
			{
				title: "Absensi Guru",
				url: "/teacher/absence",
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
		title: "Keuangan",
		child: [
			{
				title: "Beranda",
				url: "/finance",
				icon: Home,
			},
			{
				title: "Pembayaran",
				url: "/finance/payments",
				icon: DollarSign,
			},
			{
				title: "Laporan Keuangan",
				url: "/finance/report",
				icon: FileText,
			},
			{
				title: "Tagihan",
				url: "/finance/bills",
				icon: DollarSign,
			},

			{
				title: "Arus Kas",
				url: "/finance/cashflow",
				icon: Users,
			},
			{
				title: "Data Kelas",
				url: "/finance/classes",
				icon: FolderKanban,
			},
			{
				title: "Data Matkul",
				url: "/finance/subjects",
				icon: Book,
			},
			{
				title: "Biaya Ruangan",
				url: "/finance/room",
				icon: Warehouse,
			},
			{
				title: "Settings",
				url: "/finance/settings",
				icon: Settings,
			},
		],
	},
	//
	{
		title: "Karyawan",
		child: [
			{
				title: "Beranda",
				url: "/karyawan",
				icon: Home,
			},
			{
				title: "Absensi",
				url: "/karyawan/absensi",
				icon: Calendar,
			},
			{
				title: "Data Karyawan",
				url: "/karyawan/data",
				icon: Users,
			},
			{
				title: "Settings",
				url: "/karyawan/settings",
				icon: Settings,
			},
		],
	},
	//
	{
		title: "Keamanan",
		child: [
			{
				title: "Beranda",
				url: "/keamanan",
				icon: Home,
			},
			{
				title: "Log Aktivitas",
				url: "/keamanan/log",
				icon: Shield,
			},
			{
				title: "Pengaturan Akses",
				url: "/keamanan/akses",
				icon: Settings,
			},
		],
	},
	//
]
