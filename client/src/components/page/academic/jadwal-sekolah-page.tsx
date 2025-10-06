import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { useParams } from "react-router-dom";
import { EmptyComponent } from "@/components/mini/empty-component.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { gradeGetSchedule } from "@/lib/swr/grade-swr.ts";
import { generatedScheduleShorted, LEVELGRADE } from "@/components/page/academic/gen-scedules.ts";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScheduleViewer from "@/components/page/academic/gen-jadwal-sekolah-page.tsx";

const getLevelColor = (level: LEVELGRADE) => {
	const colors = {
		PAUD: "bg-pink-100 text-pink-800",
		TK: "bg-purple-100 text-purple-800",
		SD: "bg-blue-100 text-blue-800",
		SMP: "bg-green-100 text-green-800",
		SMK: "bg-orange-100 text-orange-800",
	};
	return colors[level] || "bg-gray-100 text-gray-800";
};
const days = [ "Senin", "Selasa", "Rabu", "Kamis", "Jumat" ];

function JadwalSekolah(props: { idGrade: string }) {
	const schedules = gradeGetSchedule(props.idGrade)
	const scheduleGen = generatedScheduleShorted(schedules.data, 4, 8)

	if (schedules.isLoading) {
		return <Spinner />
	}

	if (!schedules.data) {
		return <EmptyComponent />
	}

	console.log(scheduleGen)
	return ( <div className={ "" }>
			{ scheduleGen.map((classSchedule) => (
				<Card key={ classSchedule.gradeId }>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle>{ classSchedule.gradeName }</CardTitle>
								<CardDescription>
									Tingkat { classSchedule.level } - Kelas { classSchedule.grade }
								</CardDescription>
							</div>
							<Badge className={ getLevelColor(classSchedule.level) }>
								{ classSchedule.level }
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-3  gap-4">
							{ days.map((day) => {
								const daySchedule = classSchedule.schedule.filter(s => s.day === day);
								return (
									<Card key={ day } className="bg-background/50">
										<CardHeader className="pb-3">
											<CardTitle className="text-lg">{ day }</CardTitle>
										</CardHeader>
										<CardContent className="space-y-2">
											{ daySchedule.length > 0 ? (
												daySchedule.map((slot, idx) => (
													<div
														key={ `${ slot.day }-${ slot.period }-${ idx }` }
														className="bg-background p-3 rounded-lg shadow-sm border "
													>
														<div className="flex items-center justify-between mb-1">
															<Badge variant="outline" className="text-xs">
																Jam { slot.period }
															</Badge>
														</div>
														<div className="font-semibold text-sm ">
															{ slot.mapelName }
														</div>
														<div className="text-xs  mt-1">
															{ slot.teacherName }
														</div>
													</div>
												))
											) : (
												<div className="text-center text-gray-400 text-sm py-4">
													Tidak ada jadwal
												</div>
											) }
										</CardContent>
									</Card>
								);
							}) }
						</div>
					</CardContent>
				</Card>
			)) }
		</div>
	)
}

export default function JadwalSekolahPage() {
	const param = useParams<{ id: string }>()
	// if (!param) {
	// 	redirect("/login")
	// }
	return (
		<div>
			<ScheduleViewer idGrade={ param.id } />
		</div>
	);
}
