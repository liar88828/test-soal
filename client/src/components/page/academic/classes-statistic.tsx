import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Award, BookOpen, Calendar, GraduationCap, User2, Users } from "lucide-react";


export function ClassesStatisticAll() {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-sm font-medium">
						<Users className="h-4 w-4" />
						Total Students
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">1,245</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-sm font-medium">
						<BookOpen className="h-4 w-4" />
						Subjects
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">32</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-sm font-medium">
						<GraduationCap className="h-4 w-4" />
						Teachers
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">58</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-sm font-medium">
						<Calendar className="h-4 w-4" />
						Weekly Classes
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">120</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-sm font-medium">
						<Award className="h-4 w-4" />
						Achievements
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">14</p>
				</CardContent>
			</Card>
		</div>

	);
}

export const exampleClassesStatistic = {
	name: "7A",
	students: 32,
	subjects: 10,
	homeroomTeacher: "Mr. Fandy",
	weeklyLessons: 36,
	achievements: 3
}

type ClassDataType = {
	name: string
	students: number
	subjects: number
	homeroomTeacher: string
	weeklyLessons: number
	achievements: number
};

export function ClassStatisticCards({ classData }: { classData: ClassDataType }) {
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold">Statistics for Class { classData.name }</h2>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-sm font-medium">
							<Users className="h-4 w-4" />
							Students
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{ classData.students }</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-sm font-medium">
							<BookOpen className="h-4 w-4" />
							Subjects
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{ classData.subjects }</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-sm font-medium">
							<User2 className="h-4 w-4" />
							Homeroom Teacher
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-lg font-semibold">{ classData.homeroomTeacher }</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-sm font-medium">
							<Calendar className="h-4 w-4" />
							Weekly Lessons
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{ classData.weeklyLessons } JP</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-sm font-medium">
							<Award className="h-4 w-4" />
							Achievements
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{ classData.achievements }</p>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
