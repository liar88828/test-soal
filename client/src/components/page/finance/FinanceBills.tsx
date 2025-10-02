import { Badge } from "@/components/ui/badge.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { Button } from "@/components/ui/button.tsx"
import { VariantCSS } from "@/components/page/finance/VariantCSS.tsx";

const dummyBills = [
	{
		id: 1,
		name: "Ahmad Fauzi",
		kelas: "X IPA 1",
		bulan: "September",
		nominal: 200000,
		status: "Belum",
	},
	{
		id: 2,
		name: "Dina Mulyani",
		kelas: "X IPS 2",
		bulan: "September",
		nominal: 200000,
		status: "Lunas",
	},
	{
		id: 3,
		name: "Bayu Pratama",
		kelas: "XI IPA 3",
		bulan: "September",
		nominal: 200000,
		status: "Belum",
	},
]

export default function FinanceBills() {
	return (
		<div className=" space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Daftar Tagihan Bulanan</CardTitle>
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
								<TableHead>Aksi</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ dummyBills.map((bill) => (
								<TableRow key={ bill.id }>
									<TableCell>{ bill.name }</TableCell>
									<TableCell>{ bill.kelas }</TableCell>
									<TableCell>{ bill.bulan }</TableCell>
									<TableCell>
										Rp{ bill.nominal.toLocaleString("id-ID") }
									</TableCell>
									<TableCell>
										<Badge
											variant={
												( bill.status === "Lunas" ? "success" : "destructive" ) as VariantCSS
											}
										>
											{ bill.status }
										</Badge>
									</TableCell>
									<TableCell>
										{ bill.status === "Belum" ? (
											<Button
												size="sm"
												variant="outline"
											>
												Bayar
											</Button>
										) : (
											<Button
												size="sm"
												variant="ghost"
												disabled
											>
												Lunas
											</Button>
										) }
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
