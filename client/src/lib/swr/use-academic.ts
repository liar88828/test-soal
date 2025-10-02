import useSWR from "swr";
import { exampleGradeClass } from "@/assets/example/exampleClass.ts";
import { exampleClassesStatistic } from "@/assets/example/example-classes-statistic.ts";
import { ClassDataType } from "@/interface/class-data-type.ts";

export const useAcademicClassesDetailTabel = (id?: string) => {
	return useSWR(!id ? null : `/api/academic/classes/${ id }`, () => exampleGradeClass)

}

export const useAcademicClassStatistic = (id?: string) => {
	return useSWR<ClassDataType>(`/api/academic/class/statistic/${ id }`, () => exampleClassesStatistic)
}
