import { Card, CardContent } from "@/components/ui/card.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Input } from "@/components/ui/input.tsx"
import { statusColor } from "@/components/page/absence/teacher-absence-page.tsx"

const absences = [
	{ name: "Aulia Rahma", nis: "220301", date: "2025-08-01", status: "Hadir" },
	{ name: "Rizky Hidayat", nis: "220302", date: "2025-08-01", status: "Izin" },
	{ name: "Salsabila N", nis: "220303", date: "2025-08-01", status: "Sakit" },
	{ name: "Bagus Saputra", nis: "220304", date: "2025-08-01", status: "Alpha" },
]

export default function MatkulYangApsen() {
	return (
		<div className="min-h-screen bg-muted ">
			<div className="max-w-5xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold text-primary">Kehadiran Siswa</h1>
				<p className="text-muted-foreground">
					Pantau kehadiran siswa hari ini.
				</p>

				<Input
					placeholder="Cari berdasarkan nama atau NIS..."
					className="max-w-md"
				/>

				<Card>
					<CardContent className="p-4">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Tanggal</TableHead>
									<TableHead>Nama</TableHead>
									<TableHead>NIS</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{ absences.map((absent, idx) => (
									<TableRow key={ idx }>
										<TableCell>{ absent.date }</TableCell>
										<TableCell>{ absent.name }</TableCell>
										<TableCell>{ absent.nis }</TableCell>
										<TableCell>
											<Badge className={ statusColor(absent.status) }>
												{ absent.status }
											</Badge>
										</TableCell>
									</TableRow>
								)) }
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
