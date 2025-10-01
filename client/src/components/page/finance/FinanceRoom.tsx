import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { Badge } from "@/components/ui/badge.tsx"

const dummyRoomData = [
	{ id: 1, room: "Lab Komputer", cost: 300000, note: "Perawatan dan listrik" },
	{
		id: 2,
		room: "Ruang Kelas X-IPA-1",
		cost: 150000,
		note: "AC dan kebersihan",
	},
	{ id: 3, room: "Aula", cost: 500000, note: "Acara dan pemeliharaan" },
	{
		id: 4,
		room: "Perpustakaan",
		cost: 120000,
		note: "Penerangan dan internet",
	},
]

export default function FinanceRoom() {
	return (
		<div className=" space-y-6">
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
							{ dummyRoomData.map((r) => (
								<TableRow key={ r.id }>
									<TableCell>{ r.room }</TableCell>
									<TableCell>Rp{ r.cost.toLocaleString("id-ID") }</TableCell>
									<TableCell>{ r.note }</TableCell>
									<TableCell>
										<Badge
											variant={ r.cost > 200000 ? "destructive" : "outline" }
										>
											{ r.cost > 200000 ? "Tinggi" : "Normal" }
										</Badge>
									</TableCell>
								</TableRow>
							)) }
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
