import useSWR from "swr";
import { Classes, ClassesOptionalDefaults } from "shared/dist/lib/validate";
import { fetcher, fetcherMutation } from "@/lib/swr/config.ts";

export const classGet = (idGrade: string) => useSWR<Classes[]>(`/api/class/grade/${ idGrade }`, fetcher)
export const classCreate = (idGrade: string, data: ClassesOptionalDefaults) => fetcherMutation(`/api/class/grade/${ idGrade }`, "POST", data)
export const classUpdate = (idGrade: string, idClass: string, data: ClassesOptionalDefaults) => fetcherMutation(`/api/class/grade/${ idGrade }/${ idClass }`, "PUT", data)
