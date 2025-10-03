import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { SubjectSchema } from "@/schema/subject-schema.ts";
import { getDuration } from "@/components/page/teacher/components/time-to-minutes.tsx";

type UseSubjectStore = {
	subjects: SubjectSchema[];
	addSubject: (data: Omit<SubjectSchema, "id">) => void;
	updateSubject: (id: string, data: Omit<SubjectSchema, "id">) => void;
	deleteSubject: (id: string) => void;
	setSubject: (subjects: SubjectSchema[]) => void;
	getSubjectByIdTeacher: (idTeacher: string) => {
		totalJP: number
		totalSchedule: string
		subjectData: SubjectSchema[]
	};
};

export const useSubjectStore_xxx = create<UseSubjectStore>()(
	persist(
		(set, get) => ( {
			subjects: [],
			getSubjectByIdTeacher: (idTeacher) => {
				const subjects = get().subjects
				const newSKS = subjects.filter(t => t.idTeacher === idTeacher)
				const totalSks = newSKS.reduce((sum, item) => sum + item.jp, 0);
				const totalMinutes = subjects.reduce(
					(sum, item) => sum + getDuration(item.startTime, item.endTime),
					0
				);
				const hours = Math.floor(totalMinutes / 60);
				const minutes = totalMinutes % 60;
				return {
					totalJP: totalSks,
					subjectData: newSKS,
					totalSchedule: `${ hours }h ${ minutes }m`
				}
			},
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
