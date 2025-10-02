import { ScheduleItem } from "@/interface/schedule-item.tsx";

export type ClassRow = {
	level: string;
	titleName: string;
	section: string;
	teacher: string;
	students: number;
	room: string;
	schedule: string;
	list?: ScheduleItem[]
};
