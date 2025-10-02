import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OptionFormValues } from "@/components/page/academic/components/academic-grade-teacher-2.tsx";

export type OptionState = {
	dataOptions: Required<OptionFormValues>[];
	addOption: (mapel: Required<OptionFormValues>) => void;
	updateOption: (id: string, option: Partial<OptionFormValues>) => void;
	removeOption: (id: string) => void;
	// getDataByGrade: (idGrade: string) => Required<OptionFormValues>[]
};

export const useOptionStore = create<OptionState>()(
	persist(
		(set, get) => ( {
			// getDataByGrade: (idGrade) => {
			// 	const data = get().dataOptions
			// 	return data.filter(i => i.idGrade === idGrade);
			// },
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
