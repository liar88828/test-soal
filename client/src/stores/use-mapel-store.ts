import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MapelFormValues } from "@/components/page/schedule/academic-schedule-teachers.tsx";

export type MapelState = {
	mapels: Required<MapelFormValues>[];
	addMapel: (mapel: Required<MapelFormValues>) => void;
	updateMapel: (id: string, mapel: Partial<MapelFormValues>) => void;
	removeMapel: (id: string) => void;
	filterMapelByGrade: (idGrade: string) => Required<MapelFormValues>[];
};

export const useMapelStore = create<MapelState>()(
	persist(
		(set, get) => ( {
			mapels: [],
			filterMapelByGrade: (idGrade) => {
				const data = get().mapels;
				return data.filter(i => i.idGrade === idGrade);
			},
			addMapel: (mapel) =>
				set((state) => ( { mapels: [ ...state.mapels, mapel ] } )),
			updateMapel: (id, mapel) =>
				set((state) => ( {
					mapels: state.mapels.map((m) =>
						m.id === id ? { ...m, ...mapel } : m
					),
				} )),
			removeMapel: (id) =>
				set((state) => ( {
					mapels: state.mapels.filter((m) => m.id !== id),
				} )),
		} ),
		{
			name: "mapel-storage", // nama key di localStorage
		}
	)
);
