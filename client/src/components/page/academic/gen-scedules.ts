export enum LEVELGRADE {
	PAUD = "PAUD",
	TK = "TK",
	SD = "SD",
	SMP = "SMP",
	SMK = "SMK",
}


export type GradeGetSchedule = (
	{
		id: string
		name: string
		level: LEVELGRADE
		grade: number | null
		Mapel: {
			id: string
			name: string
			jp: number
			idGrade: string
			idTeacher: string
			nameTeacher: string
		}[]
	} )[]

export type ScheduleSlot = {
	day: string
	period: number
	mapelId: string
	mapelName: string
	teacherId: string
	teacherName: string
	gradeId: string
}

export type ClassSchedule = {
	gradeId: string
	gradeName: string
	level: LEVELGRADE
	grade: number | null
	schedule: ScheduleSlot[]
}

export function generatedScheduleShorted(
	classesData?: GradeGetSchedule,
	maxJPPerMapel: number = 2,
	maxJPPerDay: number = 8,
): ClassSchedule[] {
	if (!classesData || classesData.length === 0) {
		return []
	}

	const days = [ "Senin", "Selasa", "Rabu", "Kamis", "Jumat" ]
	const schedules: ClassSchedule[] = []

	for (const grade of classesData) {
		const schedule: ScheduleSlot[] = []

		// Sort subjects by JP (descending) for better distribution
		const sortedMapel = [ ...grade.Mapel ].sort((a, b) => b.jp - a.jp)

		// Track remaining JP for each subject
		const remainingJP = new Map<string, number>()
		sortedMapel.forEach(mapel => {
			remainingJP.set(mapel.id, mapel.jp)
		})

		let dayIndex = 0
		let period = 1

		// Distribute subjects across days
		while (Array.from(remainingJP.values()).some(jp => jp > 0)) {
			const currentDay = days[dayIndex % days.length]
			let jpUsedToday = 0

			// Try to schedule subjects for current day
			for (const mapel of sortedMapel) {
				const remaining = remainingJP.get(mapel.id) || 0

				if (remaining > 0 && jpUsedToday < maxJPPerDay) {
					// Calculate how many periods we can schedule for this subject today
					const jpToSchedule = Math.min(
						remaining,
						maxJPPerMapel,
						maxJPPerDay - jpUsedToday
					)

					// Add periods for this subject
					for (let i = 0; i < jpToSchedule; i++) {
						schedule.push({
							day: currentDay,
							period: period++,
							mapelId: mapel.id,
							mapelName: mapel.name,
							teacherId: mapel.idTeacher,
							teacherName: mapel.nameTeacher,
							gradeId: grade.id
						})
						jpUsedToday++
					}

					// Update remaining JP
					remainingJP.set(mapel.id, remaining - jpToSchedule)
				}

				// Check if we've reached max JP for the day
				if (jpUsedToday >= maxJPPerDay) {
					break
				}
			}

			// Move to next day
			dayIndex++
			period = 1

			// Safety check to prevent infinite loop
			if (dayIndex > days.length * 10) {
				console.warn(`Could not schedule all subjects for grade ${ grade.name }`)
				break
			}
		}

		schedules.push({
			gradeId: grade.id,
			gradeName: grade.name,
			level: grade.level,
			grade: grade.grade,
			schedule: schedule
		})
	}

	return schedules
}

// Helper function to format schedule for display
export function formatSchedule(classSchedule: ClassSchedule): string {
	const days = [ "Senin", "Selasa", "Rabu", "Kamis", "Jumat" ]
	let output = `\n=== Jadwal ${ classSchedule.gradeName } ===\n`

	for (const day of days) {
		const daySchedule = classSchedule.schedule.filter(s => s.day === day)
		if (daySchedule.length > 0) {
			output += `\n${ day }:\n`
			daySchedule.forEach(slot => {
				output += `  Jam ke-${ slot.period }: ${ slot.mapelName } (${ slot.teacherName })\n`
			})
		}
	}

	return output
}

// Example usage:
/*
const sampleData: GradeGetSchedule = [
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
        ]
    }
]

const schedules = generatedScheduleShorted(sampleData, 8, 2)
schedules.forEach(s => console.log(formatSchedule(s)))
*/
