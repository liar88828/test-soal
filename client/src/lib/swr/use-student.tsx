import useSWR from "swr";
import { exampleSiswaList } from "@/assets/example/siswaList.ts";
import { exampleNilai } from "@/assets/example/example-nilai.tsx";
import { exampleReports } from "@/assets/example/exampleReports.ts";
import { exampleTableWeek } from "@/assets/example/example-table-week.tsx";

export const useStudent = (idClass?: string) => {
	return useSWR(!idClass ? null : `/api/student/${ idClass }`, () => exampleSiswaList)
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
