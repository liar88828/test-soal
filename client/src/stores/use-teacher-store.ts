// store/useTeacherStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Teacher, TeacherOptionalDefaults } from "shared/dist/lib/validate";

type TeacherState = {
	teachers: Teacher[];
	addTeacher: (teacher: Omit<TeacherOptionalDefaults, "id">) => void;
	updateTeacher: (id: string, teacher: Partial<TeacherOptionalDefaults>) => void;
	deleteTeacher: (id: string) => void;
	getTeacherById: (id: string) => TeacherOptionalDefaults | undefined;
};

export const useTeacherStore = create<TeacherState>()(
	persist(
		(set, get) => ( {
			teachers: [],
			getTeacherById: (id: string) => {
				const teachers = get().teachers
				return teachers.find(i => i.id === id)
			},
			addTeacher: (teacher) => {
				// set((state) => ( {
				// 	teachers: [ ...state.teachers, { id: nanoid(), ...teacher } ],
				// } ))
			},
			updateTeacher: (id, updated) => {
				// set((state) => ( {
				// 	teachers: state.teachers.map((t) =>
				// 		t.id === id ? { ...t, ...updated } : t
				// 	),
				// } ))
			},
			deleteTeacher: (id) =>
				set((state) => ( {
					teachers: state.teachers.filter((t) => t.id !== id),
				} )),
		} ),
		{ name: "useTeacherStore" })
);
