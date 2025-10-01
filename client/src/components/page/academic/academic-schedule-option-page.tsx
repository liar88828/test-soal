import { AcademicScheduleOption, exampleMapelOptions } from "@/components/page/schedule/academic-schedule-option.tsx";

export default function AcademicScheduleOptionPage() {
	return (
		<div className="space-y-6">
			<AcademicScheduleOption mapelOptions={ exampleMapelOptions } />
		</div>
	);
}
