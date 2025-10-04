import { AcademicScheduleOption, } from "@/components/page/schedule/academic-schedule-option.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import JadwalSekolahPage from "@/components/page/academic/jadwal-sekolah-page.tsx";

export default function AcademicScheduleOptionPage() {
	return (
		<div className="space-y-6">
			<Tabs defaultValue="Option">
				<TabsList>
					<TabsTrigger value="Option">Option</TabsTrigger>
					<TabsTrigger value="Schedule">Schedule xxx</TabsTrigger>
					{/*<TabsTrigger value="Schedule-2">Schedule-2</TabsTrigger>*/ }
				</TabsList>
				<TabsContent value="Option"><AcademicScheduleOption /></TabsContent>
				<TabsContent value="Schedule"><JadwalSekolahPage /></TabsContent>
				{/*<TabsContent value="Schedule-2"><JadwalSekolah /></TabsContent>*/ }
			</Tabs>
		</div>
	);
}
