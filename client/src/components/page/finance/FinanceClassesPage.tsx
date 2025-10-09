import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { type VariantCSS } from "@/components/page/finance/VariantCSS.tsx";
import { Badge } from "@/components/ui/badge.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Spinner } from "@/components/ui/spinner.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { fetcher } from "@/lib/swr/config.ts";
import { type FinanceClass } from "shared";
import useSWR from "swr";


export default function FinanceClassesPage() {
	const financeClass = useSWR<FinanceClass[]>("/api/finance-bill-student/class", fetcher)


	if (financeClass.isLoading) return <Spinner />
	if (!financeClass.data) return <EmptyComponent />

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
							{ financeClass.data.map((cls) => (
								<TableRow key={ cls.className }>
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
