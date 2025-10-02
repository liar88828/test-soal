// store/useTeacherStore.ts
import { create } from "zustand";
import { nanoid } from "nanoid";
import { TeacherType } from "@/interface/teacher-type.ts";
import { persist } from "zustand/middleware";

type TeacherState = {
	teachers: TeacherType[];
	addTeacher: (teacher: Omit<TeacherType, "id">) => void;
	updateTeacher: (id: string, teacher: Partial<TeacherType>) => void;
	deleteTeacher: (id: string) => void;
};

export const useTeacherStore = create<TeacherState>()(
	persist(
		(set) => ( {
			teachers: [],
			addTeacher: (teacher) =>
				set((state) => ( {
					teachers: [ ...state.teachers, { id: nanoid(), ...teacher } ],
				} )),
			updateTeacher: (id, updated) =>
				set((state) => ( {
					teachers: state.teachers.map((t) =>
						t.id === id ? { ...t, ...updated } : t
					),
				} )),
			deleteTeacher: (id) =>
				set((state) => ( {
					teachers: state.teachers.filter((t) => t.id !== id),
				} )),
		} ), { name: "useTeacherStore" },)
);
