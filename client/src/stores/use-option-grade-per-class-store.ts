import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formatToHour } from "@/components/page/academic/components/academic-grade-option.tsx";
import { OptionFormValues } from "@/schema/option-form-schema.tsx";

export type OptionState = {
	dataOptions: Required<OptionFormValues>[];
	addOption: (mapel: Required<OptionFormValues>) => void;
	updateOption: (id: string, option: Partial<OptionFormValues>) => void;
	removeOption: (id: string) => void;
	getDataByGrade: (idGrade: string) => {
		totalJP: number
		totalTime: string
		dataAvailableOnClass: Required<OptionFormValues>[]
	}
};

export const useOptionGradePerClassStore = create<OptionState>()(
	persist(
		(set, get) => ( {
			getDataByGrade: (idGrade) => {
				const data = get().dataOptions
				const dataAvailableOnClass = data.filter(i => i.idGrade === idGrade)
				const totalJP = dataAvailableOnClass.reduce((sum, item) => sum + item.jp, 0)
				return {
					totalJP,
					dataAvailableOnClass,
					totalTime: formatToHour(totalJP * 45),
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
