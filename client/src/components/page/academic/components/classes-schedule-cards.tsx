import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { useClassSchedule } from "@/lib/swr/use-class.tsx";
import { ScheduleItem } from "@/interface/schedule-item.tsx";


export function ClassesScheduleCards(props: { idClass: string }) {
	const { data: schedule } = useClassSchedule(props.idClass);

	if (!schedule) {
		return null
	}
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
