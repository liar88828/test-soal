import { exampleScheduleData, StudentScheduleTable } from "@/components/page/schedule/student-schedule-table.tsx";

export default function StudentSchedulePage() {
	// const { user } = useLoaderData<typeof studentHomeLoader>()
	// const navigate = useNavigate()

	return (
		<div className="space-y-6 ">
			<div className="max-w-5xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold text-primary">Jadwal Pelajaran</h1>
			</div>
			<StudentScheduleTable schedule={ exampleScheduleData } />
		</div>
	)
}
