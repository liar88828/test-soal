import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export type WeekClassType = {
	week: number
	date: string
	absent: number
	sick: number
	passes: number
}
// example dataset (15 weeks)
export const exampleWeeks: WeekClassType[] = Array.from({ length: 15 }, (_, i) => {
	const absent = Math.floor(Math.random() * 15) // random 0–14
	const sick = Math.floor(Math.random() * 12) // random 0–11
	const passes = 60 - ( absent + sick ) // assume total students = 60

	const startDate = new Date(2025, 0, 6) // start 6 Jan 2025 (Monday)
	const date = new Date(startDate)
	date.setDate(startDate.getDate() + i * 7)

	return {
		week: i + 1,
		date: date.toISOString().split("T")[0],
		absent,
		sick,
		passes,
	}
})

export function ClassAttendanceTable({ weekClass }: { weekClass: WeekClassType[] }) {
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
						{ weekClass.map((item) => (
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
