import { create } from "zustand";
import { nanoid } from "nanoid";
import { SubjectSchema } from "@/components/page/academic/components/subject-schema";

type SubjectStore = {
	subjects: SubjectSchema[];
	addSubject: (data: Omit<SubjectSchema, "id">) => void;
	updateSubject: (id: string, data: Omit<SubjectSchema, "id">) => void;
	deleteSubject: (id: string) => void;
	setSubject: (subjects: SubjectSchema[]) => void;
};

export const useSubjectStore = create<SubjectStore>((set) => ( {
	subjects: [],
	setSubject: (subjects) => set({ subjects }),
	addSubject: (data) =>
		set((state) => ( {
			subjects: [ ...state.subjects, { ...data, id: nanoid() } ],
		} )),
	updateSubject: (id, data) =>
		set((state) => ( {
			subjects: state.subjects.map((s) => ( s.id === id ? { ...s, ...data } : s )),
		} )),
	deleteSubject: (id) =>
		set((state) => ( {
			subjects: state.subjects.filter((s) => s.id !== id),
		} )),
} ));
