import { AcademicScheduleTable, exampleSchedules } from "@/components/page/schedule/academic-schedule-table.tsx";


export function AcademicSchedulePage() {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold mb-4">Academic Schedule</h1>
			<AcademicScheduleTable schedules={ exampleSchedules } />
		</div>
	)
}
