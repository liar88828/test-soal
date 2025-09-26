import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'

const dummyCashFlow = [
	{
		id: 1,
		type: 'Masuk',
		description: 'SPP Bulan September',
		amount: 500000,
		date: '2025-09-01',
	},
	{
		id: 2,
		type: 'Keluar',
		description: 'Pembelian Buku',
		amount: 200000,
		date: '2025-09-02',
	},
	{
		id: 3,
		type: 'Masuk',
		description: 'Donasi Alumni',
		amount: 1000000,
		date: '2025-09-05',
	},
	{
		id: 4,
		type: 'Keluar',
		description: 'Perbaikan AC',
		amount: 350000,
		date: '2025-09-08',
	},
]

export default function FinanceCash() {
	const totalCash = dummyCashFlow.reduce((sum, item) => {
		return item.type === 'Masuk' ? sum + item.amount : sum - item.amount
	}, 0)

	return (
		<div className='p-6 space-y-6'>
			<Card>
				<CardHeader>
					<CardTitle>Arus Kas</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Tanggal</TableHead>
								<TableHead>Deskripsi</TableHead>
								<TableHead>Jenis</TableHead>
								<TableHead>Jumlah</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{dummyCashFlow.map((cash) => (
								<TableRow key={cash.id}>
									<TableCell>{cash.date}</TableCell>
									<TableCell>{cash.description}</TableCell>
									<TableCell>
										<Badge
											variant={
												cash.type === 'Masuk' ? 'success' : 'destructive'
											}>
											{cash.type}
										</Badge>
									</TableCell>
									<TableCell>Rp{cash.amount.toLocaleString('id-ID')}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className='mt-4 text-right font-semibold text-lg'>
						Total Kas: Rp{totalCash.toLocaleString('id-ID')}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
