import { Card, CardContent } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

export type ScheduleStudent = {
	day: string
	time: string
	subject: string
	teacher: string
}

export const exampleScheduleData: ScheduleStudent[] = [
	{
		day: "Senin",
		time: "07:00 - 08:40",
		subject: "Matematika",
		teacher: "Bu Siti",
	},
	{
		day: "Senin",
		time: "09:00 - 10:40",
		subject: "Bahasa Indonesia",
		teacher: "Pak Joko",
	},
	{
		day: "Selasa",
		time: "07:00 - 08:40",
		subject: "Fisika",
		teacher: "Pak Andi",
	},
	{
		day: "Rabu",
		time: "09:00 - 10:40",
		subject: "Biologi",
		teacher: "Bu Rina",
	},
	{
		day: "Kamis",
		time: "10:00 - 11:40",
		subject: "Sejarah",
		teacher: "Pak Dedi",
	},
	{
		day: "Jumat",
		time: "07:00 - 08:40",
		subject: "Pendidikan Agama",
		teacher: "Bu Rahma",
	},
]

export function StudentScheduleTable({ schedule }: { schedule: ScheduleStudent[] }) {
	return (
		<Card>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Hari</TableHead>
							<TableHead>Jam</TableHead>
							<TableHead>Mata Pelajaran</TableHead>
							<TableHead>Guru</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ schedule.map((item, idx) => (
							<TableRow key={ idx }>
								<TableCell>{ item.day }</TableCell>
								<TableCell>{ item.time }</TableCell>
								<TableCell>{ item.subject }</TableCell>
								<TableCell>{ item.teacher }</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
