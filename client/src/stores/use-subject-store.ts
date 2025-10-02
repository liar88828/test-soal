import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { SubjectSchema } from "@/schema/subject-schema.ts";

type UseSubjectStore = {
	subjects: SubjectSchema[];
	addSubject: (data: Omit<SubjectSchema, "id">) => void;
	updateSubject: (id: string, data: Omit<SubjectSchema, "id">) => void;
	deleteSubject: (id: string) => void;
	setSubject: (subjects: SubjectSchema[]) => void;
};

export const useSubjectStore = create<UseSubjectStore>()(
	persist(
		(set) => ( {
			subjects: [],
			setSubject: (subjects) => set({ subjects }),
			addSubject: (data) =>
				set((state) => ( {
					subjects: [ ...state.subjects, { ...data, id: nanoid() } ],
				} )),
			updateSubject: (id, data) =>
				set((state) => ( {
					subjects: state.subjects.map((s) =>
						s.id === id ? { ...s, ...data } : s
					),
				} )),
			deleteSubject: (id) =>
				set((state) => ( {
					subjects: state.subjects.filter((s) => s.id !== id),
				} )),
		} ),
		{
			name: "subject-storage", // key di localStorage
		}
	)
);
