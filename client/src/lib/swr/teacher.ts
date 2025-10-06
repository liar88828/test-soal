import { fetcher, fetcherMutation } from "@/lib/swr/config.ts";
import { type Teacher, TeacherOptionalDefaults } from "shared/dist/lib/validate";
import useSWR from "swr";

export const teacherGet = () => useSWR<Teacher[]>("/api/teacher", fetcher)
export const teacherUpdate = async (id: string, data: TeacherOptionalDefaults) => await fetcherMutation(`/api/teacher/${ id }`, "PUT", data)
export const teacherCreate = async (data: TeacherOptionalDefaults) => await fetcherMutation("/api/teacher", "POST", data)
