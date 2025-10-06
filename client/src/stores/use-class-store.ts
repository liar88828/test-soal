import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { TeacherFormValues } from "@/schema/teacher-form-values.tsx";

type ClassStore = {
	classes: TeacherFormValues[];
	setClasses: (data: TeacherFormValues[]) => void;
	addClass: (data: Omit<TeacherFormValues, "id">) => void;
	updateClass: (id: string, data: Partial<TeacherFormValues>) => void;
	deleteClass: (id: string) => void;
	getClassById: (id: string) => TeacherFormValues | undefined;
	getClassByIdGrade: (idGrade: string) => TeacherFormValues[] | undefined;
	clearClasses: () => void;
};

export const useClassStore = create<ClassStore>()(
	persist(
		(set, get) => ( {
			classes: [],

			setClasses: (data) => set({ classes: data }),

			addClass: (data) =>
				set((state) => ( {
					classes: [ ...state.classes, { id: nanoid(), ...data } ],
				} )),

			updateClass: (id, data) =>
				set((state) => ( {
					classes: state.classes.map((cls) =>
						cls.id === id ? { ...cls, ...data } : cls
					),
				} )),

			deleteClass: (id) =>
				set((state) => ( {
					classes: state.classes.filter((cls) => cls.id !== id),
				} )),

			getClassById: (id) => get().classes.find((cls) => cls.id === id),
			getClassByIdGrade: (idGrade) => get().classes.filter((cls) => cls.idGrade === idGrade),
			clearClasses: () => set({ classes: [] }),
		} ),
		{ name: "class-storage" }
	)
);
