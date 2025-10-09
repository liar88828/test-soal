import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { type VariantCSS } from "@/components/page/finance/VariantCSS.tsx";
import { Badge } from "@/components/ui/badge.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Spinner } from "@/components/ui/spinner.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { fetcher } from "@/lib/swr/config.ts";
import { type FinanceBillStudent } from "shared/dist/lib/validate";
import useSWR from "swr";


export default function FinanceReportsPage() {

	const financeBillStudent = useSWR<FinanceBillStudent[]>("/api/finance-bill-student", fetcher)
	if (financeBillStudent.isLoading) return <Spinner />
	if (!financeBillStudent.data) return <EmptyComponent />

	const totalLunas = financeBillStudent.data
	.filter((r) => r.status === "LUNAS")
	.reduce((sum, r) => sum + r.nominal, 0)

	const totalBelum = financeBillStudent.data
	.filter((r) => r.status === "BELUM")
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
						{ financeBillStudent.data.length }
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
							{ financeBillStudent.data.map((r) => (
								<TableRow key={ r.id }>
									<TableCell>{ r.name }</TableCell>
									<TableCell>{ r.kelas }</TableCell>
									<TableCell>{ r.bulan }</TableCell>
									<TableCell>Rp{ r.nominal.toLocaleString("id-ID") }</TableCell>
									<TableCell>
										<Badge
											variant={
												( r.status === "LUNAS" ? "success" : "destructive" ) as VariantCSS
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
