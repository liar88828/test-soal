import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { VariantCSS } from "@/components/page/finance/VariantCSS.tsx";

const dummySubjectFinance = [
	{
		id: 1,
		name: "Biologi",
		cost: 150000,
		description: "Biaya praktikum laboratorium",
	},
	{
		id: 2,
		name: "Kimia",
		cost: 175000,
		description: "Bahan kimia dan perlengkapan lab",
	},
	{
		id: 3,
		name: "Olahraga",
		cost: 100000,
		description: "Kegiatan lapangan & peralatan",
	},
	{
		id: 4,
		name: "Seni Budaya",
		cost: 75000,
		description: "Bahan prakarya & kunjungan",
	},
]

export default function FinanceSubjects() {
	return (
		<div className=" space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Keuangan Berdasarkan Mata Pelajaran</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Mata Pelajaran</TableHead>
								<TableHead>Biaya</TableHead>
								<TableHead>Keterangan</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ dummySubjectFinance.map((subject) => (
								<TableRow key={ subject.id }>
									<TableCell>{ subject.name }</TableCell>
									<TableCell>
										Rp{ subject.cost.toLocaleString("id-ID") }
									</TableCell>
									<TableCell>{ subject.description }</TableCell>
									<TableCell>
										<Badge
											variant={
												( subject.cost > 100000 ? "warning" : "success" ) as VariantCSS
											}
										>
											{ subject.cost > 100000 ? "Biaya Tinggi" : "Normal" }
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
