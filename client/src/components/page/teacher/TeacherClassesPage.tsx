import { exampleClass, exampleClassAll } from "@/assets/example/exampleClass.ts";
import { TeacherClasses } from "@/components/page/teacher/components/TeacherClasses.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TeacherClassesPage() {
	return (
		<div className=" space-y-6">
			<div className="space-y-3">
				<h1 className="text-3xl font-bold text-primary"> Kelas Yang Di Ajar</h1>
				<p className="text-muted-foreground">Berikut adalah daftar kelas yang Anda ampu</p>
			</div>
			<Tabs defaultValue="class-teach">
				<TabsList>
					<TabsTrigger value="class-teach">Kelas Ajar</TabsTrigger>
					<TabsTrigger value="class-find">Semua Kelas</TabsTrigger>
				</TabsList>
				<TabsContent value="class-teach">
					<TeacherClasses classes={ exampleClass } />
				</TabsContent>
				<TabsContent value="class-find">
					<TeacherClasses classes={ exampleClassAll } />
				</TabsContent>
			</Tabs>
		</div>
	)
}
