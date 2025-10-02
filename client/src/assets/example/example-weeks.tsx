// example dataset (15 weeks)

import { WeekClassType } from "@/interface/week-class-type.tsx";

export const exampleWeeks: WeekClassType[] = Array.from({ length: 15 }, (_, i) => {
	const absent = Math.floor(Math.random() * 15) // random 0–14
	const sick = Math.floor(Math.random() * 12) // random 0–11
	const passes = 60 - ( absent + sick ) // assume total students = 60

	const startDate = new Date(2025, 0, 6) // start 6 Jan 2025 (Monday)
	const date = new Date(startDate)
	date.setDate(startDate.getDate() + i * 7)

	return {
		week: i + 1,
		date: date.toISOString().split("T")[0],
		absent,
		sick,
		passes,
	}
})
