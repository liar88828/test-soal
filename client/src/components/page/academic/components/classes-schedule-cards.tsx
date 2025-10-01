import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

// Schedule type
export type ScheduleItem = {
	day: string;
	subject: string;
	teacher: string;
	time: string;
	room: string;
}

// Example exampleSchedule data
export const exampleSchedule: ScheduleItem[] = [
	{ day: "Monday", subject: "Math", teacher: "Mr. Fandy", time: "08:00 - 09:30", room: "701" },
	{ day: "Monday", subject: "Science", teacher: "Ms. Silvia", time: "09:30 - 11:00", room: "701" },
	{ day: "Tuesday", subject: "English", teacher: "Ms. Anita", time: "08:00 - 09:30", room: "701" },
	{ day: "Tuesday", subject: "History", teacher: "Mr. Azmi", time: "09:30 - 11:00", room: "701" },
	{ day: "Wednesday", subject: "Math", teacher: "Mr. Fandy", time: "08:00 - 09:30", room: "701" },
	{ day: "Wednesday", subject: "Science", teacher: "Ms. Silvia", time: "09:30 - 11:00", room: "701" },
	{ day: "Thursday", subject: "English", teacher: "Ms. Anita", time: "08:00 - 09:30", room: "701" },
	{ day: "Thursday", subject: "History", teacher: "Mr. Azmi", time: "09:30 - 11:00", room: "701" },
	{ day: "Friday", subject: "Math", teacher: "Mr. Fandy", time: "08:00 - 09:30", room: "701" },
	{ day: "Friday", subject: "Science", teacher: "Ms. Silvia", time: "09:30 - 11:00", room: "701" },
];

export function ClassesScheduleCards({ schedule }: { schedule: ScheduleItem[] }) {
	// Group exampleSchedule by day
	const scheduleByDay = schedule.reduce<Record<string, ScheduleItem[]>>((acc, curr) => {
		if (!acc[curr.day]) acc[curr.day] = [];
		acc[curr.day].push(curr);
		return acc;
	}, {});

	return (
		<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{ Object.entries(scheduleByDay).map(([ day, items ]) => (
				<Card key={ day }>
					<CardHeader>
						<CardTitle className={ "text-xl" }>{ day }</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						{ items.map((item, index) => (
							<div key={ index }>
								<p>
									<strong>Subject:</strong> { item.subject }
								</p>
								<p>
									<strong>Teacher:</strong> { item.teacher }
								</p>
								<p>
									<strong>Time:</strong> { item.time }
								</p>
								<p>
									<strong>Room:</strong> { item.room }
								</p>
							</div>
						)) }
					</CardContent>
				</Card>
			)) }
		</div>
	);
}
