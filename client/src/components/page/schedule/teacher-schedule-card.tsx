import { Card, CardContent } from "@/components/ui/card.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import dayjs from "dayjs"
import { scheduleData } from "@/assets/example/scheduleData.ts";

export type Schedule = {
	id: number;
	day: string;
	time: string;
	subject: string;
	classTitle: string;
	totalStudent: number;
	present: number;
	absent: number;
	sick: number;
	permission: number;
	teacher: string;
	room: string;
};

export default function TeacherScheduleCard() {
	return (
		<div className="min-h-screen bg-muted ">
			<div className="max-w-4xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold text-primary">Jadwal Mengajar</h1>
				<p className="text-muted-foreground">
					Berikut adalah jadwal mengajar Anda minggu ini.
				</p>

				<div className="space-y-4">
					{ scheduleData.map((item, idx) => {
						// const isActive = useMemo(() => isNowInSchedule(item.day, item.time), [ item.day, item.time ])
						const isActive = isNowInSchedule(item.day, item.time)
						return (
							<Card key={ idx } className={ `hover:shadow-md transition-shadow border-2 ${ isActive ? "border-green-600 font-medium" : "border-muted-foreground" }` }>
								<CardContent className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
									{/* Left Section */ }
									<div className="space-y-1">
										<h2 className="text-xl font-semibold text-primary">{ item.subject }</h2>
										<p className={ `text-sm ` }>
											{ item.day }, { item.time }
										</p>
										<p className="text-sm text-gray-600">
											<span className="font-medium">Guru:</span> { item.teacher }
										</p>
										<p className="text-sm text-gray-600">
											<span className="font-medium">Ruangan:</span> { item.room }
										</p>
									</div>

									{/* Right Section */ }
									<div className="flex flex-col items-end gap-3">
										<Badge variant="secondary" className="text-sm px-3 py-1">
											{ item.classTitle }
										</Badge>

										{/* Attendance */ }
										<div className="flex flex-wrap gap-2 text-xs text-gray-700">
											<span>👥 { item.totalStudent } siswa</span>
											<span>✅ { item.present }</span>
											<span>❌ { item.absent }</span>
											<span>🤒 { item.sick }</span>
											<span>📄 { item.permission }</span>
										</div>

										{/* View Button */ }
										<Button asChild size="sm" className={ `flex items-center gap-1 ${ isActive ? "bg-green-600 font-medium" : "bg-muted-foreground" }` }>
											<Link to={ `/teacher/schedule/${ item.id }` }>
												<Eye className="h-4 w-4" />
												Lihat
											</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						)
					}) }
				</div>
			</div>
		</div>

	)
}

export function isNowInSchedule(day: string, time: string) {
	// time format: "07.00 - 08.30"
	const [ start, end ] = time.split(" - ")
	const now = dayjs()

	// match exampleSchedule day with today
	const daysMap: Record<string, number> = {
		"Senin": 1,
		"Selasa": 2,
		"Rabu": 3,
		"Kamis": 4,
		"Jumat": 5,
		"Sabtu": 6,
		"Minggu": 0,
	}
	if (now.day() !== daysMap[day]) return false

	const startTime = dayjs().hour(Number(start.split(".")[0])).minute(Number(start.split(".")[1]))
	const endTime = dayjs().hour(Number(end.split(".")[0])).minute(Number(end.split(".")[1]))

	return now.isAfter(startTime) && now.isBefore(endTime)
}
