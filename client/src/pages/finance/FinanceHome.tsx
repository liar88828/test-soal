import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, CreditCard, Receipt, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'

const financeMenus = [
	{
		title: 'Pembayaran Siswa',
		description: 'Kelola pembayaran uang sekolah siswa',
		icon: <DollarSign className='w-6 h-6 text-green-500' />,
		link: '/finance/payments',
	},
	{
		title: 'Laporan Keuangan',
		description: 'Lihat pemasukan dan pengeluaran',
		icon: <Receipt className='w-6 h-6 text-blue-500' />,
		link: '/finance/reports',
	},
	{
		title: 'Tagihan & Piutang',
		description: 'Pantau tagihan siswa dan status piutang',
		icon: <CreditCard className='w-6 h-6 text-yellow-500' />,
		link: '/finance/bills',
	},
	{
		title: 'Saldo & Kas Sekolah',
		description: 'Kelola kas dan saldo rekening sekolah',
		icon: <Wallet className='w-6 h-6 text-purple-500' />,
		link: '/finance/cash',
	},
]

export default function FinanceHome() {
	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-6'>Administrasi Keuangan</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{financeMenus.map((menu, index) => (
					<Link
						to={menu.link}
						key={index}>
						<Card className='hover:shadow-lg transition-shadow'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-lg font-semibold'>
									{menu.title}
								</CardTitle>
								{menu.icon}
							</CardHeader>
							<CardContent>
								<p className='text-sm text-muted-foreground'>
									{menu.description}
								</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	)
}
