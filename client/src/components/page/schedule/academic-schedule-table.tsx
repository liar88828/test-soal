import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Schedule } from "@/assets/example-schedules.tsx";


export function AcademicScheduleTable({ schedules }: { schedules: Schedule[] }) {

	return (
		<Card>
			<CardHeader>
				xxxx
			</CardHeader>
			<CardContent>
				<Table>
					<TableCaption>Weekly schedule for Class A1 & A2</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[40px]">No</TableHead>
							<TableHead>Day</TableHead>
							<TableHead>Time</TableHead>
							<TableHead>Class</TableHead>
							<TableHead>Subject</TableHead>
							<TableHead>Teacher</TableHead>
							<TableHead>Room</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ schedules.map((item, index) => (
							<TableRow key={ item.id }>
								<TableCell>{ index + 1 }</TableCell>
								<TableCell>{ item.day }</TableCell>
								<TableCell>{ item.time }</TableCell>
								<TableCell>{ item.class }</TableCell>
								<TableCell>{ item.subject }</TableCell>
								<TableCell>{ item.teacher }</TableCell>
								<TableCell>{ item.room }</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>

			</CardContent>

		</Card>
	);
}
