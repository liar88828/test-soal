import { fetcher, fetcherMutation } from "@/lib/swr/config.ts";
import { type Teacher, TeacherOptionalDefaults } from "shared/dist/lib/validate";
import useSWR from "swr";

export const teacherGet = () => useSWR<Teacher[]>("/api/teacher", fetcher)
export const teacherGetGradeID = (idGrade: string) => useSWR<Teacher[]>(`/api/teacher/grade/${ idGrade }`, fetcher)

export const teacherGetNotByIDClass = (idClass: string) => useSWR<Teacher[]>(`/api/teacher/not-class/${ idClass }`, fetcher)
export const teacherGetID = (idTeacher: string) => useSWR<Teacher>(`/api/teacher/${ idTeacher }`, fetcher)

export const teacherUpdate = async (id: string, data: TeacherOptionalDefaults) => await fetcherMutation(`/api/teacher/${ id }`, "PUT", data)
export const teacherCreate = async (data: TeacherOptionalDefaults) => await fetcherMutation("/api/teacher", "POST", data)
export const teacherDelete = async (idTeacher: string) => await fetcherMutation(`/api/teacher/${ idTeacher }`, "DELETE")

// export const teacherGetGradeID = (idGrade:string) => {
// 	const mapels = mapelGetByGradeID(idGrade)
// 	const clssses = classGet(idGrade)
//
// 	const teacher=useSWR<Teacher>(`/api/teacher/grade/${ idGrade }`, fetcher)
//
// 	const combinedData = mapels.data?.map((c) => {
// 		const found = clssses.data?.find(
// 			(d) => d.nameTeacher === c.idTeacher
// 		);
// 		const totalMaxJP = found ? found. : 0
// 		return {
// 			nameSubject: c.nameSubject,
// 			count: c.count,
// 			totalJP: c.totalJP,
// 			totalMaxJP,
// 			totalNeedJP: totalMaxJP - c.totalJP
// 		};
// 	});
// 	return {teacher, combinedData};
// }
