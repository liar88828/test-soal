import useSWR from "swr";
import { exampleNilai } from "@/assets/example/example-nilai.tsx";
import { exampleReports } from "@/assets/example/exampleReports.ts";
import { exampleTableWeek } from "@/assets/example/example-table-week.tsx";
import { fetcher } from "@/lib/swr/config.ts";
import { Student } from "shared/dist/lib/validate";

export const useStudent = (idClass?: string) => {
	return useSWR<Student[]>(!idClass ? null : `/api/student/${ idClass }`, fetcher)
}

export const useStudentNilai = (idStudent?: string) => {
	return useSWR(!idStudent ? null : `/api/student/nilai/${ idStudent }`, () => exampleNilai)
}

export const useStudentReport = (idStudent: string) => {
	return useSWR(`/api/student/report/${ idStudent }`, () => exampleReports)
}

export const useRecapGradeWeek = (idStudent?: string) => {
	return useSWR(!idStudent ? null : `/api/student/recap/${ idStudent }`, () => exampleTableWeek)
}
