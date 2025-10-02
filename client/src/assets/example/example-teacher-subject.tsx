export type TeacherSubject = {
	id: string
	className: string
	subjectName: string
	day: string
	startTime: string
	endTime: string
	jp: number
}

export const exampleTeacherSubject = [
	{
		id: "1",
		className: "A2 Class 1",
		subjectName: "Math",
		day: "Mon",
		startTime: "08:00",
		endTime: "10:00",
		jp: 4,
	},
	{
		id: "2",
		className: "A2 Class 2",
		subjectName: "Math",
		day: "Tue",
		startTime: "09:00",
		endTime: "11:00",
		jp: 4,
	},
	{
		id: "3",
		className: "A2 Class 3",
		subjectName: "Math",
		day: "Wed",
		startTime: "10:00",
		endTime: "12:00",
		jp: 4,
	},

]
