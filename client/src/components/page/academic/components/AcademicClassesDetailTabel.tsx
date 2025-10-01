import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { exampleSchedule, ScheduleItem } from "@/components/page/academic/components/classes-schedule-cards.tsx";

export type ClassRow = {
	level: string;
	className: string;
	section: string;
	teacher: string;
	students: number;
	room: string;
	schedule: string;
	list?: ScheduleItem[]
};

export const exampleClass: ClassRow[] = [
	{ level: "SMP", className: "7", section: "A1", teacher: "Mr. Fandy", students: 30, room: "701", schedule: "Mon-Fri 08:00 - 14:00", list: exampleSchedule },
	{ level: "SMP", className: "7", section: "A2", teacher: "Ms. Silvia", students: 28, room: "702", schedule: "Mon-Fri 08:00 - 14:00" },
	{ level: "SMP", className: "7", section: "A3", teacher: "Mr. Azmi", students: 32, room: "703", schedule: "Mon-Fri 08:00 - 14:00" },
	{ level: "SMP", className: "7", section: "A4", teacher: "Ms. Anita", students: 27, room: "704", schedule: "Mon-Fri 08:00 - 14:00" },
	{ level: "SMP", className: "7", section: "A5", teacher: "Mr. Febrian", students: 29, room: "705", schedule: "Mon-Fri 08:00 - 14:00" },
	// Add more rows as needed
];

// export const use

export function AcademicClassesDetailTabel({ classData }: { classData: ClassRow[] }) {
	// const data=useSWR()

	const handleEdit = (row: ClassRow) => {
		console.log("Edit", row);
		// open modal or navigate to edit page
	};

	const handleDelete = (row: ClassRow) => {
		console.log("Delete", row);
		// remove from data or call API
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Daftar Kelas</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Level</TableHead>
							<TableHead>Class</TableHead>
							<TableHead>Section</TableHead>
							<TableHead>Teacher</TableHead>
							<TableHead>Students</TableHead>
							<TableHead>Room</TableHead>
							<TableHead>Schedule</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ classData.map((row) => (
							<TableRow key={ `${ row.level }-${ row.className }-${ row.section }` }>
								<TableCell>{ row.level }</TableCell>
								<TableCell>{ row.className }</TableCell>
								<TableCell>{ row.section }</TableCell>
								<TableCell>{ row.teacher }</TableCell>
								<TableCell>{ row.students }</TableCell>
								<TableCell>{ row.room }</TableCell>
								<TableCell>{ row.schedule }</TableCell>
								<TableCell className="flex gap-2">
									<Button size="sm" variant="outline" onClick={ () => handleEdit(row) }>
										<Link to={ `/academic/classes/${ row.section }/schedule` }> <Eye /></Link>
									</Button>
									<Button size="sm" variant="outline" onClick={ () => handleEdit(row) }>
										Edit
									</Button>
									<Button size="sm" variant="destructive" onClick={ () => handleDelete(row) }>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
