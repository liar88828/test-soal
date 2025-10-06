import useSWR from "swr";
import { exampleTeacherSubject } from "@/assets/example/example-teacher-subject.tsx";
import { type TeacherType } from "shared";
import { fetcher } from "@/lib/swr/config.ts";

export const useTeacherDetails = (id?: string) => {
	return useSWR<TeacherType>(`/api/teacher/${ id }`, fetcher)
}

export const useTeacherSubjects = (idTeacher?: string) => {
	return useSWR(!idTeacher ? null : `/api/teacher/subjects/${ idTeacher }`, () => exampleTeacherSubject)
}
