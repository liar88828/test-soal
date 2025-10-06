import useSWR from "swr";
import { exampleClassesStatistic } from "@/assets/example/example-classes-statistic.ts";
import { ClassDataType } from "@/interface/class-data-type.ts";
import { useEffect } from "react";
import { useClassStore } from "@/stores/use-class-store.ts";

export const useAcademicClassesDetailTabel = (idGrade?: string) => {
	const { setClasses } = useClassStore();
	const { data, error, isLoading, mutate } = useSWR(
		idGrade ? `/api/academic/classes/${ idGrade }` : null,
		() => []
	);

	// Sync SWR data into Zustand when available
	useEffect(() => {
		if (data && data.length !== 0) setClasses(data);
	}, [ data, setClasses ]);

	return { data, error, isLoading, mutate };
};

export const useAcademicClassStatistic = (id?: string) => {
	return useSWR<ClassDataType>(`/api/academic/class/statistic/${ id }`, () => exampleClassesStatistic)
}
