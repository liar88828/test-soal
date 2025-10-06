import { OptionClassSchedule, OptionClassScheduleOptionalDefaults } from "shared/dist/lib/validate";
import { fetcher, fetcherMutation } from "@/lib/swr/config.ts";
import useSWR from "swr";

export const optionGet = (idGrade: string) => useSWR<OptionClassSchedule[]>(`/api/option/grade/${ idGrade }`, fetcher)
export const optionCreate = (idGrade: string, data: OptionClassScheduleOptionalDefaults) => fetcherMutation(`/api/option/grade/${ idGrade }`, "POST", data)
export const optionUpdate = (idGrade: string, idOption: string, data: OptionClassScheduleOptionalDefaults) => fetcherMutation(`/api/option/grade/${ idGrade }/${idOption}`, "PUT", data)
export const optionDelete = (idGrade: string, idOption: string) => fetcherMutation(`/api/option/grade/${ idGrade }/${idOption}`, "DELETE",)
