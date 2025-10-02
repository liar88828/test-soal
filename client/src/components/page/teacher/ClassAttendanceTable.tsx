import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { TableLoading } from "@/components/mini/TableComponent.tsx";
import { useClassAttendance } from "@/lib/swr/use-class.tsx";


export function ClassAttendanceTable(props: { idClass?: string }) {
	const { data: weekClass } = useClassAttendance(props.idClass)

	return (
		<Card>
			<CardHeader>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Week</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{
							!weekClass
								? <TableLoading spanCol={ 4 } />
								: weekClass.map((item) => (
									<TableRow key={ item.week }>
										<TableCell>{ item.week }</TableCell>
										<TableCell>{ item.date }</TableCell>
										<TableCell>
											Absent: { item.absent }, Sick: { item.sick }, Passes: { item.passes }
										</TableCell>
										<TableCell>
											<Button variant="outline" size="sm">
												<Link to={ "/teacher/classes/:id/input/:week" }>
													Detail
												</Link>
											</Button>
										</TableCell>
									</TableRow>
								)) }
					</TableBody>
				</Table>
			</CardContent>

		</Card>

	)
}
