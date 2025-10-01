import { ReportType } from "@/assets/example/exampleReports.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";


export function StudentReportTable({ reports }: { reports: ReportType[] }) {
	return (
		<Card>
			<CardContent className="p-4">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Mata Pelajaran</TableHead>
							<TableHead>Semester</TableHead>
							<TableHead className="text-right">Nilai</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ reports.map((item, idx) => (
							<TableRow key={ idx }>
								<TableCell>{ item.subject }</TableCell>
								<TableCell>{ item.semester }</TableCell>
								<TableCell className="text-right font-semibold">
									{ item.grade }
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
