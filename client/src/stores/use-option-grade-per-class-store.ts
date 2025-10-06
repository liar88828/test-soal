import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OptionFormValues } from "@/schema/option-form-schema.tsx";
import { useAcademicClassesDetailTabel } from "@/lib/swr/use-academic.ts";
import { formatToHour } from "@/lib/format-to-hour.tsx";

export type OptionState = {
	dataOptions: Required<OptionFormValues>[];
	addOption: (mapel: Required<OptionFormValues>) => void;
	updateOption: (id: string, option: Partial<OptionFormValues>) => void;
	removeOption: (id: string) => void;
	getDataByGrade: (idGrade: string) => {
		totalJP: number
		totalJPPerClass: number
		totalTime: string
		dataAvailableOnClass: Required<OptionFormValues & { totalMaxJP: number }>[]
	}
};

export const useOptionGradePerClassStore = create<OptionState>()(
	persist(
		(set, get) => ( {

			getDataByGrade: (idGrade) => {
				const { data: classes } = useAcademicClassesDetailTabel(idGrade)
				const data = get().dataOptions

				const totalClass = ( classes?.length ?? 1 )
				const dataAvailableOnClass = data
				.filter(i => i.idGrade === idGrade)
				.map(i => {
					return {
						...i, totalMaxJP: i.jp * totalClass
					}
				})
				const totalJP = dataAvailableOnClass.reduce((sum, item) => sum + item.jp, 0)
				const totalTime = formatToHour(totalJP * 45)

				return {
					totalTime,
					totalJP,
					totalJPPerClass: totalJP * totalClass,
					dataAvailableOnClass,
				}
			},

			dataOptions: [],

			addOption: (mapel) =>
				set((state) => ( { dataOptions: [ ...state.dataOptions, mapel ] } )),

			updateOption: (id, mapel) =>
				set((state) => ( {
					dataOptions: state.dataOptions.map((m) =>
						m.id === id ? { ...m, ...mapel } : m
					),
				} )),

			removeOption: (id) =>
				set((state) => ( {
					dataOptions: state.dataOptions.filter((m) => m.id !== id),
				} )),

		} ),
		{
			name: "option-storage", // nama key di localStorage
		}
	)
);
