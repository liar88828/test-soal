import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gradeGetSchedule } from "@/lib/swr/grade-swr.ts";


// Types
enum LEVELGRADE {
	PAUD = "PAUD",
	TK = "TK",
	SD = "SD",
	SMP = "SMP",
	SMK = "SMK",
}


type Mapel = {
	id: string;
	name: string;
	jp: number;
	idGrade: string;
	idTeacher: string;
	nameTeacher: string;
};

type Grade = {
	id: string;
	name: string;
	level: LEVELGRADE;
	grade: number | null;
	Mapel: Mapel[];
};

type ScheduleSlot = {
	day: string;
	period: number;
	mapelId: string;
	mapelName: string;
	teacherId: string;
	teacherName: string;
	gradeId: string;
};

type ClassSchedule = {
	gradeId: string;
	gradeName: string;
	level: LEVELGRADE;
	grade: number | null;
	schedule: ScheduleSlot[];
};

// Schedule Generator Function
function generatedScheduleShorted(
	classesData: Grade[],
	maxJPPerDay: number = 8,
	maxJPPerMapel: number = 2
): ClassSchedule[] {
	if (!classesData || classesData.length === 0) {
		return [];
	}

	const days = [ "Senin", "Selasa", "Rabu", "Kamis", "Jumat" ];
	const schedules: ClassSchedule[] = [];

	for (const grade of classesData) {
		const schedule: ScheduleSlot[] = [];
		const sortedMapel = [ ...grade.Mapel ].sort((a, b) => b.jp - a.jp);
		const remainingJP = new Map<string, number>();

		sortedMapel.forEach(mapel => {
			remainingJP.set(mapel.id, mapel.jp);
		});

		let dayIndex = 0;
		let period = 1;

		while (Array.from(remainingJP.values()).some(jp => jp > 0)) {
			const currentDay = days[dayIndex % days.length];
			let jpUsedToday = 0;

			for (const mapel of sortedMapel) {
				const remaining = remainingJP.get(mapel.id) || 0;

				if (remaining > 0 && jpUsedToday < maxJPPerDay) {
					const jpToSchedule = Math.min(
						remaining,
						maxJPPerMapel,
						maxJPPerDay - jpUsedToday
					);

					for (let i = 0; i < jpToSchedule; i++) {
						schedule.push({
							day: currentDay,
							period: period++,
							mapelId: mapel.id,
							mapelName: mapel.name,
							teacherId: mapel.idTeacher,
							teacherName: mapel.nameTeacher,
							gradeId: grade.id
						});
						jpUsedToday++;
					}

					remainingJP.set(mapel.id, remaining - jpToSchedule);
				}

				if (jpUsedToday >= maxJPPerDay) {
					break;
				}
			}

			dayIndex++;
			period = 1;

			if (dayIndex > days.length * 10) {
				break;
			}
		}

		schedules.push({
			gradeId: grade.id,
			gradeName: grade.name,
			level: grade.level,
			grade: grade.grade,
			schedule: schedule
		});
	}

	return schedules;
}

// Sample Data
const sampleData: Grade[] = [
	{
		id: "grade-1",
		name: "Kelas 7A",
		level: LEVELGRADE.SMP,
		grade: 7,
		Mapel: [
			{ id: "m1", name: "Matematika", jp: 5, idGrade: "grade-1", idTeacher: "t1", nameTeacher: "Pak Budi" },
			{ id: "m2", name: "Bahasa Indonesia", jp: 4, idGrade: "grade-1", idTeacher: "t2", nameTeacher: "Bu Ani" },
			{ id: "m3", name: "IPA", jp: 4, idGrade: "grade-1", idTeacher: "t3", nameTeacher: "Pak Candra" },
			{ id: "m4", name: "IPS", jp: 3, idGrade: "grade-1", idTeacher: "t4", nameTeacher: "Bu Dewi" },
			{ id: "m5", name: "Bahasa Inggris", jp: 3, idGrade: "grade-1", idTeacher: "t5", nameTeacher: "Pak Eko" },
			{ id: "m6", name: "Seni Budaya", jp: 2, idGrade: "grade-1", idTeacher: "t6", nameTeacher: "Bu Fitri" },
			{ id: "m7", name: "Penjas", jp: 3, idGrade: "grade-1", idTeacher: "t7", nameTeacher: "Pak Galih" },
		]
	},
	{
		id: "grade-2",
		name: "Kelas 7B",
		level: LEVELGRADE.SMP,
		grade: 7,
		Mapel: [
			{ id: "m8", name: "Matematika", jp: 5, idGrade: "grade-2", idTeacher: "t1", nameTeacher: "Pak Budi" },
			{ id: "m9", name: "Bahasa Indonesia", jp: 4, idGrade: "grade-2", idTeacher: "t2", nameTeacher: "Bu Ani" },
			{ id: "m10", name: "IPA", jp: 4, idGrade: "grade-2", idTeacher: "t8", nameTeacher: "Bu Hana" },
			{ id: "m11", name: "IPS", jp: 3, idGrade: "grade-2", idTeacher: "t4", nameTeacher: "Bu Dewi" },
			{ id: "m12", name: "Bahasa Inggris", jp: 3, idGrade: "grade-2", idTeacher: "t9", nameTeacher: "Bu Ira" },
		]
	}
];

const ScheduleViewer = (props: { idGrade?: string }) => {
	const schedulesTest = gradeGetSchedule(props.idGrade)
	const [ schedules ] = useState<ClassSchedule[]>(() =>
		generatedScheduleShorted(sampleData, 2, 8)
	);

	const days = [ "Senin", "Selasa", "Rabu", "Kamis", "Jumat" ];

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

	return (
		<div className="w-full max-w-6xl mx-auto p-6 space-y-6">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-bold text-gray-900">Jadwal Pelajaran</h1>
				<p className="text-gray-600">Sistem Penjadwalan Otomatis</p>
			</div>

			<Tabs defaultValue={ schedules[0]?.gradeId } className="w-full">
				<TabsList className="grid w-full" style={ { gridTemplateColumns: `repeat(${ schedules.length }, 1fr)` } }>
					{ schedules.map((classSchedule) => (
						<TabsTrigger key={ classSchedule.gradeId } value={ classSchedule.gradeId }>
							{ classSchedule.gradeName }
						</TabsTrigger>
					)) }
				</TabsList>

				{ schedules.map((classSchedule) => (
					<TabsContent key={ classSchedule.gradeId } value={ classSchedule.gradeId } className="space-y-4">
						<Card>
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
								<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
									{ days.map((day) => {
										const daySchedule = classSchedule.schedule.filter(s => s.day === day);
										return (
											<Card key={ day } className="bg-gray-50">
												<CardHeader className="pb-3">
													<CardTitle className="text-lg">{ day }</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													{ daySchedule.length > 0 ? (
														daySchedule.map((slot, idx) => (
															<div
																key={ `${ slot.day }-${ slot.period }-${ idx }` }
																className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
															>
																<div className="flex items-center justify-between mb-1">
																	<Badge variant="outline" className="text-xs">
																		Jam { slot.period }
																	</Badge>
																</div>
																<div className="font-semibold text-sm text-gray-900">
																	{ slot.mapelName }
																</div>
																<div className="text-xs text-gray-600 mt-1">
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

						{/* Subject Summary */ }
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Ringkasan Mata Pelajaran</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
									{ sampleData
									.find(g => g.id === classSchedule.gradeId)
									?.Mapel.map((mapel) => {
										const scheduledCount = classSchedule.schedule.filter(
											s => s.mapelId === mapel.id
										).length;
										return (
											<div
												key={ mapel.id }
												className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
											>
												<div>
													<div className="font-medium text-sm">{ mapel.name }</div>
													<div className="text-xs text-gray-600">{ mapel.nameTeacher }</div>
												</div>
												<Badge variant="secondary">
													{ scheduledCount }/{ mapel.jp } JP
												</Badge>
											</div>
										);
									}) }
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				)) }
			</Tabs>
		</div>
	);
};

export default ScheduleViewer;
