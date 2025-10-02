import { exampleSchedule } from "@/assets/example/example-schedule.tsx";
import { ClassRow } from "@/interface/class-row.ts";

export type ClassType = {
	name: string
	students: number
}
export const exampleClass: ClassType[] = [
	{ name: "X IPA 1", students: 32 },
	{ name: "X IPA 2", students: 30 },
	{ name: "XI IPA 1", students: 29 },
	{ name: "XII IPA 2", students: 28 },
]
export const exampleGradeClass: ClassRow[] = [
	{ level: "SMP", titleName: "7", section: "A1", teacher: "Mr. Fandy", students: 30, room: "701", schedule: "Mon-Fri 08:00 - 14:00", list: exampleSchedule },
	{ level: "SMP", titleName: "7", section: "A2", teacher: "Ms. Silvia", students: 28, room: "702", schedule: "Mon-Fri 08:00 - 14:00" },
	{ level: "SMP", titleName: "7", section: "A3", teacher: "Mr. Azmi", students: 32, room: "703", schedule: "Mon-Fri 08:00 - 14:00" },
	{ level: "SMP", titleName: "7", section: "A4", teacher: "Ms. Anita", students: 27, room: "704", schedule: "Mon-Fri 08:00 - 14:00" },
	{ level: "SMP", titleName: "7", section: "A5", teacher: "Mr. Febrian", students: 29, room: "705", schedule: "Mon-Fri 08:00 - 14:00" },
	// Add more rows as needed
];

export const exampleClassAll: ClassType[] = [
	{ name: "X IPA 1", students: 32 },
	{ name: "X IPA 2", students: 30 },
	{ name: "X IPA 3", students: 31 },
	{ name: "X IPS 1", students: 33 },
	{ name: "X IPS 2", students: 29 },
	{ name: "XI IPA 1", students: 29 },
	{ name: "XI IPA 2", students: 30 },
	{ name: "XI IPA 3", students: 28 },
	{ name: "XI IPS 1", students: 31 },
	{ name: "XI IPS 2", students: 30 },
	{ name: "XII IPA 1", students: 27 },
	{ name: "XII IPA 2", students: 28 },
	{ name: "XII IPA 3", students: 29 },
	{ name: "XII IPS 1", students: 32 },
	{ name: "XII IPS 2", students: 30 },
]
