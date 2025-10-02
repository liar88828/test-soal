import useSWR from "swr";
import { exampleTeacher, TeacherType } from "@/interface/teacher-type.ts";
import { exampleTeacherSubject } from "@/assets/example/example-teacher-subject.tsx";
import { SubjectSchema } from "@/schema/subject-schema.ts";

export const useTeacherDetails = (id?: string) => {
	return useSWR<TeacherType>(`/api/teacher/${ id }`, () => exampleTeacher)
}

export const useTeacherSubjects = (idTeacher?: string) => {
	return useSWR<SubjectSchema>(!idTeacher ? null : `/api/teacher/subjects/${ idTeacher }`, () => exampleTeacherSubject)
}
