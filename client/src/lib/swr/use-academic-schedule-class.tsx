import useSWR from "swr";
import { exampleScheduleData } from "@/assets/example/example-schedule-data.tsx";

export const useAcademicScheduleClass = (idClass?: string) => {
	return useSWR(`/api/schedule/class/${ idClass }`, () => exampleScheduleData)
}
