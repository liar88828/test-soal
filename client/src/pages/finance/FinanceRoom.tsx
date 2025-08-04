import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const dummyRoomData = [
	{ id: 1, room: 'Lab Komputer', cost: 300000, note: 'Perawatan dan listrik' },
	{
		id: 2,
		room: 'Ruang Kelas X-IPA-1',
		cost: 150000,
		note: 'AC dan kebersihan',
	},
	{ id: 3, room: 'Aula', cost: 500000, note: 'Acara dan pemeliharaan' },
	{
		id: 4,
		room: 'Perpustakaan',
		cost: 120000,
		note: 'Penerangan dan internet',
	},
]

export default function FinanceRoom() {
	return (
		<div className='p-6 space-y-6'>
			<Card>
				<CardHeader>
					<CardTitle>Biaya Ruangan Sekolah</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Ruangan</TableHead>
								<TableHead>Biaya</TableHead>
								<TableHead>Keterangan</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{dummyRoomData.map((r) => (
								<TableRow key={r.id}>
									<TableCell>{r.room}</TableCell>
									<TableCell>Rp{r.cost.toLocaleString('id-ID')}</TableCell>
									<TableCell>{r.note}</TableCell>
									<TableCell>
										<Badge
											variant={r.cost > 200000 ? 'destructive' : 'outline'}>
											{r.cost > 200000 ? 'Tinggi' : 'Normal'}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
