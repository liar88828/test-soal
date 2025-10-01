import { Badge } from "@/components/ui/badge.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"

const dummyReports = [
	{
		id: 1,
		name: "Ahmad Fauzi",
		kelas: "X IPA 1",
		bulan: "Agustus",
		nominal: 200000,
		status: "Lunas",
	},
	{
		id: 2,
		name: "Dina Mulyani",
		kelas: "X IPS 2",
		bulan: "Agustus",
		nominal: 200000,
		status: "Belum",
	},
	{
		id: 3,
		name: "Bayu Pratama",
		kelas: "XI IPA 3",
		bulan: "Agustus",
		nominal: 200000,
		status: "Lunas",
	},
]

export default function FinanceReports() {
	const totalLunas = dummyReports
	.filter((r) => r.status === "Lunas")
	.reduce((sum, r) => sum + r.nominal, 0)

	const totalBelum = dummyReports
	.filter((r) => r.status === "Belum")
	.reduce((sum, r) => sum + r.nominal, 0)

	return (
		<div className=" space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Total Pemasukan</CardTitle>
					</CardHeader>
					<CardContent className="text-xl font-semibold text-green-600">
						Rp{ totalLunas.toLocaleString("id-ID") }
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Belum Dibayar</CardTitle>
					</CardHeader>
					<CardContent className="text-xl font-semibold text-red-600">
						Rp{ totalBelum.toLocaleString("id-ID") }
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Total Siswa</CardTitle>
					</CardHeader>
					<CardContent className="text-xl font-semibold">
						{ dummyReports.length }
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Detail Laporan</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Nama</TableHead>
								<TableHead>Kelas</TableHead>
								<TableHead>Bulan</TableHead>
								<TableHead>Nominal</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ dummyReports.map((r) => (
								<TableRow key={ r.id }>
									<TableCell>{ r.name }</TableCell>
									<TableCell>{ r.kelas }</TableCell>
									<TableCell>{ r.bulan }</TableCell>
									<TableCell>Rp{ r.nominal.toLocaleString("id-ID") }</TableCell>
									<TableCell>
										<Badge
											variant={
												r.status === "Lunas" ? "success" : "destructive"
											}
										>
											{ r.status }
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
