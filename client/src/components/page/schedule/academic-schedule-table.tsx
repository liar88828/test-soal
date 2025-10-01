import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

type Schedule = {
	id: string
	class: "A1" | "A2"
	subject: string
	teacher: string
	day: string
	time: string
	room: string,
	list?: []
}
export const exampleSchedules: Schedule[] = [
	// Monday
	{ id: "1", class: "A1", subject: "Math", teacher: "Mr. Fandy", day: "Monday", time: "08:00 - 09:30", room: "101", list: [] },
	{ id: "2", class: "A1", subject: "Science", teacher: "Ms. Silvia", day: "Monday", time: "09:30 - 11:00", room: "102" },
	{ id: "3", class: "A1", subject: "English", teacher: "Mr. Azmi", day: "Monday", time: "11:00 - 12:30", room: "103" },

	{ id: "4", class: "A2", subject: "Math", teacher: "Mr. Fandy", day: "Monday", time: "08:00 - 09:30", room: "201" },
	{ id: "5", class: "A2", subject: "History", teacher: "Ms. Sevia", day: "Monday", time: "09:30 - 11:00", room: "202" },
	{ id: "6", class: "A2", subject: "Biology", teacher: "Ms. Anita", day: "Monday", time: "11:00 - 12:30", room: "203" },

	// Tuesday
	{ id: "7", class: "A1", subject: "Chemistry", teacher: "Mr. Febrian", day: "Tuesday", time: "08:00 - 09:30", room: "101" },
	{ id: "8", class: "A1", subject: "History", teacher: "Ms. Sevia", day: "Tuesday", time: "09:30 - 11:00", room: "102" },
	{ id: "9", class: "A1", subject: "Biology", teacher: "Ms. Anita", day: "Tuesday", time: "11:00 - 12:30", room: "103" },

	{ id: "10", class: "A2", subject: "English", teacher: "Mr. Azmi", day: "Tuesday", time: "08:00 - 09:30", room: "201" },
	{ id: "11", class: "A2", subject: "Chemistry", teacher: "Mr. Febrian", day: "Tuesday", time: "09:30 - 11:00", room: "202" },
	{ id: "12", class: "A2", subject: "Economics", teacher: "Ms. Inayah", day: "Tuesday", time: "11:00 - 12:30", room: "203" },

	// Wednesday
	{ id: "13", class: "A1", subject: "Economics", teacher: "Ms. Inayah", day: "Wednesday", time: "08:00 - 09:30", room: "101" },
	{ id: "14", class: "A1", subject: "Physics", teacher: "Mr. Vadila", day: "Wednesday", time: "09:30 - 11:00", room: "102" },
	{ id: "15", class: "A1", subject: "Computer", teacher: "Mr. Devinta", day: "Wednesday", time: "11:00 - 12:30", room: "103" },

	{ id: "16", class: "A2", subject: "Math", teacher: "Mr. Fandy", day: "Wednesday", time: "08:00 - 09:30", room: "201" },
	{ id: "17", class: "A2", subject: "English", teacher: "Mr. Azmi", day: "Wednesday", time: "09:30 - 11:00", room: "202" },
	{ id: "18", class: "A2", subject: "Science", teacher: "Ms. Silvia", day: "Wednesday", time: "11:00 - 12:30", room: "203" },

	// Thursday
	{ id: "19", class: "A1", subject: "Computer", teacher: "Mr. Devinta", day: "Thursday", time: "08:00 - 09:30", room: "101" },
	{ id: "20", class: "A1", subject: "Chemistry", teacher: "Mr. Febrian", day: "Thursday", time: "09:30 - 11:00", room: "102" },
	{ id: "21", class: "A1", subject: "Math", teacher: "Mr. Fandy", day: "Thursday", time: "11:00 - 12:30", room: "103" },

	{ id: "22", class: "A2", subject: "Biology", teacher: "Ms. Anita", day: "Thursday", time: "08:00 - 09:30", room: "201" },
	{ id: "23", class: "A2", subject: "Economics", teacher: "Ms. Inayah", day: "Thursday", time: "09:30 - 11:00", room: "202" },
	{ id: "24", class: "A2", subject: "History", teacher: "Ms. Sevia", day: "Thursday", time: "11:00 - 12:30", room: "203" },

	// Friday
	{ id: "25", class: "A1", subject: "English", teacher: "Mr. Azmi", day: "Friday", time: "08:00 - 09:30", room: "101" },
	{ id: "26", class: "A1", subject: "Physics", teacher: "Mr. Vadila", day: "Friday", time: "09:30 - 11:00", room: "102" },
	{ id: "27", class: "A1", subject: "Science", teacher: "Ms. Silvia", day: "Friday", time: "11:00 - 12:30", room: "103" },

	{ id: "28", class: "A2", subject: "Computer", teacher: "Mr. Devinta", day: "Friday", time: "08:00 - 09:30", room: "201" },
	{ id: "29", class: "A2", subject: "Chemistry", teacher: "Mr. Febrian", day: "Friday", time: "09:30 - 11:00", room: "202" },
	{ id: "30", class: "A2", subject: "Math", teacher: "Mr. Fandy", day: "Friday", time: "11:00 - 12:30", room: "203" },
]

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
