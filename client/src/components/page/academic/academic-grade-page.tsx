import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import useSWR from "swr";
import { Spinner } from "@/components/ui/spinner.tsx";
import { fetcher } from "@/lib/swr/config.ts";
import { Grade } from "shared/dist/lib/validate";
import { EmptyComponent } from "@/components/mini/empty-component.tsx";


export function AcademicGradeTable() {
	const grade = useSWR<Grade[]>("/api/grade", fetcher)
	if (grade.isLoading ) {
		return <Spinner />
	}
	if (!grade.data) {
		return <EmptyComponent />
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>Daftar Semua Kelas</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableCaption>Daftar Kelas Akademik</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px] text-center">ID</TableHead>
							<TableHead className="text-center">Nama Kelas</TableHead>
							<TableHead className="text-center">Jenjang</TableHead>
							<TableHead className="text-center">Tingkat</TableHead>
							<TableHead className="text-center">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ grade.data.map((cls) => (
							<TableRow key={ cls.id }>
								<TableCell className="font-medium text-center">{ cls.id }</TableCell>
								<TableCell className="text-center">{ cls.name }</TableCell>
								<TableCell className="text-center">{ cls.level }</TableCell>
								<TableCell className="text-center">{ cls.grade ?? "-" }</TableCell>
								<TableCell className="text-center">
									<Button asChild variant={ "outline" }>
										<Link to={ `/academic/classes/${ cls.id }` }>
											<Eye />
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
		</Card> )
}

export default function AcademicGradePage() {
	return (
		<div className={ "space-y-6" }>
			<AcademicGradeTable />
		</div>
	);
}
