import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { VariantCSS } from "@/components/page/finance/VariantCSS.tsx";

const dummyPayments = [
	{
		id: 1,
		name: "Ahmad Fauzi",
		kelas: "X IPA 1",
		bulan: "Agustus",
		nominal: "Rp200.000",
		status: "Lunas",
	},
	{
		id: 2,
		name: "Dina Mulyani",
		kelas: "X IPS 2",
		bulan: "Agustus",
		nominal: "Rp200.000",
		status: "Belum",
	},
	{
		id: 3,
		name: "Bayu Pratama",
		kelas: "XI IPA 3",
		bulan: "Agustus",
		nominal: "Rp200.000",
		status: "Lunas",
	},
]

export default function FinancePayments() {
	return (
		<div className="">
			<Card>
				<CardHeader>
					<CardTitle>Pembayaran Siswa</CardTitle>
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
							{ dummyPayments.map((payment) => (
								<TableRow key={ payment.id }>
									<TableCell>{ payment.name }</TableCell>
									<TableCell>{ payment.kelas }</TableCell>
									<TableCell>{ payment.bulan }</TableCell>
									<TableCell>{ payment.nominal }</TableCell>
									<TableCell>
										<Badge
											variant={
												( payment.status === "Lunas" ? "success" : "destructive" ) as VariantCSS
											}
										>
											{ payment.status }
										</Badge>
									</TableCell>
									<TableCell>
										<Button
											size="sm"
											variant="outline"
										>
											Detail
										</Button>
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
