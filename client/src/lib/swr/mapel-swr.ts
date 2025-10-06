import { fetcher, fetcherMutation } from "@/lib/swr/config.ts";
import { Mapel, MapelOptionalDefaults } from "shared/dist/lib/validate";
import useSWR from "swr";
import { type  CountData } from "shared";

export const mapelGetByTeacherID = (idTeacher: string) => useSWR<Mapel[]>(`/api/mapel/teacher/${ idTeacher }`, fetcher)
export const mapelGetByGradeID = (idGrade: string) => useSWR<Mapel[]>(`/api/mapel/grade/${ idGrade }`, fetcher)
export const mapelGetCountByGradeID = (idGrade: string) => {
	const response = useSWR<CountData[]>(`/api/mapel/count/${ idGrade }`, fetcher)
	// if (!response.data) {
	// 	response.data = []
	// }
	const countTotalTeacher = response.data?.reduce((sum, item) => sum + item.count, 0)
	const countTotalJP = response.data?.reduce((sum, item) => sum + item.totalJP, 0)
	const countTotalMaxJP = response.data?.reduce((sum, item) => sum + item.totalMaxJP, 0)
	const countTotalNeedJP = response.data?.reduce((sum, item) => sum + item.totalNeedJP, 0)

	return {
		...response,
		countTotalTeacher,
		countTotalJP,
		countTotalMaxJP,
		countTotalNeedJP,
	}
}

export const mapelUpdate = async (idMapel: string, data: MapelOptionalDefaults) => await fetcherMutation(`/api/mapel/${ idMapel }`, "PUT", data)
export const mapelCreate = async (data: MapelOptionalDefaults) => await fetcherMutation(`/api/mapel`, "POST", data)
export const mapelDelete = async (idMapel: string) => await fetcherMutation(`/api/mapel/${ idMapel }`, "DELETE")
