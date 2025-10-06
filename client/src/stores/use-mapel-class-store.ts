import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type MapelFormValues } from "@/schema/mapel-form-schema.tsx";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { formatToHour } from "@/lib/format-to-hour.tsx";
import { useOptionGradePerClassStore } from "@/stores/use-option-grade-per-class-store.ts";

type CountSubject = {
	nameSubject: string;
	count: number;
	totalJP: number
};

type Grouped = {
	nameSubject: string;
	totalJP: number;
	totalCount: number;
};

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
	//
	filterMapelByGrade: (idGrade: string) => {
		subjectData: Required<MapelFormValues>[]
		group: Grouped[]
		count: CountSubject[]
		countTotalTeacher: number
		countTotalJP: number
		//
		totalJP: number
		totalMaxJP: number
		totalNeedJP: number
		totalSchedule: string
		//
		combinedData: {
			nameSubject: string
			count: number
			totalJP: number
			totalMaxJP: number
			totalNeedJP: number
		}[]

	}
	getSubjectByIdTeacher: (idTeacher: string) => {
		totalJP: number
		totalSchedule: string
		subjectData: Required<MapelFormValues>[]
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

			updateMapelForClass: (_idClass, mapel) => {
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

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			removeMapelForClass: (_idClass) => {
			},

			getSubjectByIdTeacher: (idTeacher) => {
				const subjects = get().mapels
				const filterMapel = subjects.filter(t => t.idTeacher === idTeacher)
				const totalJP = filterMapel.reduce((sum, item) => sum + item.jp, 0);
				const totalSchedule = formatToHour(totalJP * 45)
				return {
					subjectData: filterMapel,
					totalJP,
					totalSchedule
				}
			},

			filterMapelByGrade: (idGrade) => {
				// const { data: classes } = useAcademicClassesDetailTabel(idGrade)
				const { dataAvailableOnClass } = useOptionGradePerClassStore(state => state.getDataByGrade)(idGrade)

				const data = get().mapels;
				const filterMapel = data.filter(i => i.idGrade === idGrade)

				const group: Grouped[] = Object.values(
					filterMapel.reduce<Record<string, Grouped>>((acc, item) => {
						if (!acc[item.nameSubject]) {
							acc[item.nameSubject] = { nameSubject: item.nameSubject, totalJP: 0, totalCount: 0 };
						}
						acc[item.nameSubject].totalJP += item.jp;
						acc[item.nameSubject].totalCount += 1;
						return acc;
					}, {} as Record<string, Grouped>)
				);

				const countSubject: CountSubject[] = Object.values(
					filterMapel.reduce((acc, item) => {
						if (!acc[item.nameSubject]) {
							acc[item.nameSubject] = { nameSubject: item.nameSubject, count: 0, totalJP: 0 };
						}
						acc[item.nameSubject].count++;
						acc[item.nameSubject].totalJP += item.jp;
						return acc;
					}, {} as Record<string, CountSubject>)
				);
				const combinedData = countSubject.map((c) => {
					const found = dataAvailableOnClass.find(
						(d) => d.nameSubject === c.nameSubject
					);
					const totalMaxJP = found ? found.totalMaxJP : 0
					return {
						nameSubject: c.nameSubject,
						count: c.count,
						totalJP: c.totalJP,
						totalMaxJP,
						totalNeedJP: totalMaxJP - c.totalJP
					};
				});

				const totalJP = combinedData.reduce((sum, item) => sum + item.totalJP, 0)
				const totalSchedule = formatToHour(totalJP * 45)
				const countTotalTeacher = countSubject.reduce((sum, item) => sum + item.count, 0)
				const countTotalJP = countSubject.reduce((sum, item) => sum + item.totalJP, 0)
				const countTotalMaxJP = combinedData.reduce((sum, item) => sum + item.totalMaxJP, 0)
				const totalNeedJP = combinedData.reduce((sum, item) => sum + item.totalNeedJP, 0)

				return {
					subjectData: filterMapel,
					totalSchedule,
					group,
					count: countSubject,
					combinedData,
					totalJP,
					countTotalTeacher,
					countTotalJP,
					totalMaxJP: countTotalMaxJP,
					totalNeedJP
				}
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
