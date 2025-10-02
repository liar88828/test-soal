// ScheduleType type
import useSWR from "swr";
import { exampleSchedule } from "@/assets/example/example-schedule.tsx";
import { exampleWeeks } from "@/assets/example/example-weeks.tsx";

export const useClassAttendance = (idClass?: string) => {
	return useSWR(!idClass ? null : `/class/attendances/${ idClass }`, () => exampleWeeks)
}

export const useClassSchedule = (idClass?: string) => {
	return useSWR(!idClass ? null : `/class/schedule/${ idClass }`, () => exampleSchedule, {})
}
