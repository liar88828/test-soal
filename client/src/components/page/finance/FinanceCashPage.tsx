import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { type  VariantCSS } from "@/components/page/finance/VariantCSS.tsx";
import { Badge } from "@/components/ui/badge.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Spinner } from "@/components/ui/spinner.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx"
import { formatDate } from "@/lib/format-date.tsx";
import { fetcher } from "@/lib/swr/config.ts";
import { type  FinanceCashFlow } from "shared/dist/lib/validate";
import useSWR from "swr";


export default function FinanceCashPage() {
	const financeCashFlow = useSWR<FinanceCashFlow[]>("/api/finance-cash-flow", fetcher)

	if (financeCashFlow.isLoading) return <Spinner />
	if (!financeCashFlow.data) return <EmptyComponent />

	const totalCash = financeCashFlow.data.reduce((sum, item) => {
		return item.type === "Masuk" ? sum + item.amount : sum - item.amount
	}, 0)

	return (
		<div className=" space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Arus Kas</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Tanggal</TableHead>
								<TableHead>Deskripsi</TableHead>
								<TableHead>Jenis</TableHead>
								<TableHead>Jumlah</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ financeCashFlow.data.map((cash) => (
								<TableRow key={ cash.id }>
									<TableCell>{ formatDate(cash.date) }</TableCell>
									<TableCell>{ cash.description }</TableCell>
									<TableCell>
										<Badge
											variant={
												( cash.type === "Masuk" ? "success" : "destructive" ) as VariantCSS
											}
										>
											{ cash.type }
										</Badge>
									</TableCell>
									<TableCell>Rp{ cash.amount.toLocaleString("id-ID") }</TableCell>
								</TableRow>
							)) }
						</TableBody>
					</Table>
					<div className="mt-4 text-right font-semibold text-lg">
						Total Kas: Rp{ totalCash.toLocaleString("id-ID") }
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
