import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { type VariantCSS } from "@/components/page/finance/VariantCSS.tsx";
import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Spinner } from "@/components/ui/spinner.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { fetcher } from "@/lib/swr/config.ts";
import { type FinanceBillStudent } from "shared/dist/lib/validate";
import useSWR from "swr";


export default function FinanceBillsPage() {
	const financeBillStudent = useSWR<FinanceBillStudent[]>("/api/finance-bill-student", fetcher)


	if (financeBillStudent.isLoading) return <Spinner />
	if (!financeBillStudent.data) return <EmptyComponent />


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
							{ financeBillStudent.data.map((bill) => (
								<TableRow key={ bill.id }>
									<TableCell>{ bill.name }</TableCell>
									<TableCell>{ bill.kelas }</TableCell>
									<TableCell>{ bill.bulan }</TableCell>
									<TableCell>Rp{ bill.nominal.toLocaleString("id-ID") }</TableCell>
									<TableCell>
										<Badge
											variant={
												( bill.status === "LUNAS" ? "success" : "destructive" ) as VariantCSS
											}
										>
											{ bill.status }
										</Badge>
									</TableCell>
									<TableCell>
										{ bill.status === "BELUM" ? (
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
