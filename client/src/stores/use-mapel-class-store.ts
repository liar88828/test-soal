import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MapelFormValues } from "@/schema/mapel-form-schema.tsx";
import { formatToHour } from "@/components/page/academic/components/academic-grade-option.tsx";
import { nanoid } from "nanoid";
import { toast } from "sonner";

export type MapelState = {
	mapels: Required<MapelFormValues>[];
	// Class
	addMapelForClass: (mapel: MapelFormValues) => void;
	updateMapelForClass: (idClass: string, mapel: MapelFormValues) => void;
	removeMapelForClass: (idClass: string) => void;
	//  Teacher
	addMapelForTeacher: (mapel: MapelFormValues) => void;
	updateMapelForTeacher: (idTeacher: string, mapel: MapelFormValues) => void;
	removeMapelForTeacher: (idTeacher: string) => void;
	filterMapelByGrade: (idGrade: string) => Required<MapelFormValues>[];
	getSubjectByIdTeacher: (idTeacher: string) => {
		totalJP: number
		totalSchedule: string
		subjectData: MapelFormValues[]
	};
};

export const useMapelClassStore = create<MapelState>()(
	persist(
		(set, get) => ( {
			mapels: [],
			addMapelForClass: (mapel) => {
				const totalTeacherJP = get().mapels
				.filter(t => t.idTeacher === mapel.idTeacher)
				.reduce((sum, item) => sum + item.jp, 0);
				const currentJP = mapel.jp + totalTeacherJP
				if (currentJP > 40) {
					toast.error("Nilai JP Guru telah maximum")
					return
				}

				// set((state) => ( {
				// 	mapels: [ ...state.mapels, { ...mapel, id: nanoid() } ]
				// } ))
			},

			updateMapelForClass: (idClass, mapel) => {
				const totalTeacherJP = get().mapels
				.filter(t => t.idTeacher === mapel.idTeacher)
				.reduce((sum, item) => sum + item.jp, 0);
				const currentJP = mapel.jp + totalTeacherJP
				if (currentJP > 40) {
					toast.error("Nilai JP Guru telah maximum")
					return
				}

				// set((state) => ( {
				// 	mapels: state.mapels.map((m) =>
				// 		m.id === id ? { ...m, ...mapel } : m
				// 	),
				// } ))
			},

			removeMapelForClass: (idClass) => {
			},

			getSubjectByIdTeacher: (idTeacher) => {
				const subjects = get().mapels
				const newSKS = subjects.filter(t => t.idTeacher === idTeacher)
				const totalSks = newSKS.reduce((sum, item) => sum + item.jp, 0);
				// const totalMinutes = subjects.reduce(
				// 	(sum, item) => sum + getDuration(item.startTime, item.endTime),
				// 	0
				// );
				// const hours = Math.floor(totalMinutes / 60);
				// const minutes = totalMinutes % 60;

				return {
					totalJP: totalSks,
					subjectData: newSKS,
					totalSchedule: formatToHour(totalSks * 45)
				}
			},

			filterMapelByGrade: (idGrade) => {
				const data = get().mapels;
				return data.filter(i => i.idGrade === idGrade);
			},

			addMapelForTeacher: (mapel) => {
				const totalTeacherJP = get().mapels
				.filter(t => t.idTeacher === mapel.idTeacher)
				.reduce((sum, item) => sum + item.jp, 0);
				const currentJP = mapel.jp + totalTeacherJP
				if (currentJP > 40) {
					toast.error("Nilai JP telah maximum")
					return
				}

				set((state) => ( {
					mapels: [ ...state.mapels, { ...mapel, id: nanoid() } ]
				} ))
			},

			updateMapelForTeacher: (id, mapel) => {
				const totalTeacherJP = get().mapels
				.filter(t => t.idTeacher === mapel.idTeacher)
				.reduce((sum, item) => sum + item.jp, 0);
				const currentJP = mapel.jp + totalTeacherJP
				if (currentJP > 40) {
					toast.error("Nilai JP telah maximum")
					return
				}

				set((state) => ( {
					mapels: state.mapels.map((m) =>
						m.id === id ? { ...m, ...mapel } : m
					),
				} ))
			},

			removeMapelForTeacher: (id) =>
				set((state) => ( {
					mapels: state.mapels.filter((m) => m.id !== id),
				} )),

		} ),
		{
			name: "mapel-storage", // nama key di localStorage
		}
	)
);
