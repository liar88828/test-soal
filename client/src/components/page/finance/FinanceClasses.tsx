import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { VariantCSS } from "@/components/page/finance/VariantCSS.tsx";

const dummyFinanceClass = [
	{ id: 1, className: "X IPA 1", studentCount: 32, totalPaid: 12000000 },
	{ id: 2, className: "X IPA 2", studentCount: 30, totalPaid: 11000000 },
	{ id: 3, className: "XI IPS 1", studentCount: 28, totalPaid: 9500000 },
	{ id: 4, className: "XII IPA 1", studentCount: 29, totalPaid: 14500000 },
]

export default function FinanceClasses() {
	return (
		<div className=" space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Keuangan per Kelas</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Kelas</TableHead>
								<TableHead>Jumlah Siswa</TableHead>
								<TableHead>Total Pembayaran</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ dummyFinanceClass.map((cls) => (
								<TableRow key={ cls.id }>
									<TableCell>{ cls.className }</TableCell>
									<TableCell>{ cls.studentCount }</TableCell>
									<TableCell>
										Rp{ cls.totalPaid.toLocaleString("id-ID") }
									</TableCell>
									<TableCell>
										<Badge
											variant={
												( cls.totalPaid >= 10000000 ? "success" : "destructive" ) as VariantCSS
											}
										>
											{ cls.totalPaid >= 10000000 ? "Lancar" : "Tertunggak" }
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
