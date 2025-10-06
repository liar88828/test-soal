import useSWR from "swr";
import { Classes, ClassesOptionalDefaults } from "shared/dist/lib/validate";
import { fetcher, fetcherMutation } from "@/lib/swr/config.ts";


export enum LEVELGRADE {
	PAUD = "PAUD",
	TK = "TK",
	SD = "SD",
	SMP = "SMP",
	SMK = "SMK",
}


export type GradeGetSecedule = ( {
	Mapel: {
		id: string
		name: string
		jp: number
		idGrade: string
		idTeacher: string
		nameTeacher: string
	}[]
} & {
	id: string
	name: string
	level: LEVELGRADE
	grade: number | null
} )[]

export const gradeGet = (idGrade: string) => useSWR<Classes[]>(`/api/grade/${ idGrade }`, fetcher)
export const gradeGetSchedule = (idGrade: string) => useSWR<GradeGetSecedule>(`/api/grade/${ idGrade }/schedule`, fetcher)
export const gradeCreate = (idGrade: string, data: ClassesOptionalDefaults) => fetcherMutation(`/api/grade/${ idGrade }`, "POST", data)
export const gradeUpdate = (idGrade: string, idClass: string, data: ClassesOptionalDefaults) => fetcherMutation(`/api/grade/${ idGrade }/${ idClass }`, "PUT", data)
export const gradeDelete = (idClass: string,) => fetcherMutation(`/api/${ idClass }`, "DELETE")
