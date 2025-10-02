import { Card, CardContent } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { TableLoading } from "@/components/mini/TableComponent.tsx";

import { useStudentReport } from "@/lib/swr/use-student.tsx";


export function StudentReportTable(props: { idStudent: string }) {
	const { data: reports } = useStudentReport(props.idStudent,)

	return (
		<Card>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Mata Pelajaran</TableHead>
							<TableHead>Semester</TableHead>
							<TableHead className="text-right">Nilai</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{
							!reports ? <TableLoading spanCol={ 3 } /> :
								reports.map((item, idx) => (
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
