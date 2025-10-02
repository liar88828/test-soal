import { StudentScheduleTable } from "@/components/page/schedule/student-schedule-table.tsx";
import { ClassesScheduleCards } from "@/components/page/academic/components/classes-schedule-cards.tsx";

export default function StudentSchedulePage() {
	// const { user } = useLoaderData<typeof studentHomeLoader>()
	// const navigate = useNavigate()
	const data = {
		idClass: "234234"
	}
	return (
		<div className="space-y-6 ">
			<div className="max-w-5xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold text-primary">Jadwal Pelajaran</h1>
			</div>
			<ClassesScheduleCards idClass={ data.idClass } />
			<StudentScheduleTable idClass={ data.idClass } />
		</div>
	)
}
