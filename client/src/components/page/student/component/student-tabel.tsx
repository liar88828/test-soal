import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { SiswaType } from "@/interface/siswaType.tsx";


export function StudentTabel({ siswas }: { siswas: SiswaType[] }) {
	const [ search, setSearch ] = useState<string>("")

	return (
		<Card>
			<CardHeader>
				<Input
					type="text"
					placeholder="Cari nama siswa..."
					className="max-w-sm "
					onChange={ (e) => setSearch(e.target.value) }
				/>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>No</TableHead>
							<TableHead>Nama</TableHead>
							<TableHead>Jurusan</TableHead>
							<TableHead>Alamat</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ siswas
						.filter(item => item.namaLengkap.toLowerCase().includes(search.toLowerCase()))
						.map((student, index) => (
							<TableRow key={ student.nis }>
								<TableCell>{ index + 1 }</TableCell>
								<TableCell>{ student.namaLengkap }</TableCell>
								<TableCell>{ student.jurusan }</TableCell>
								<TableCell>{ student.alamat }</TableCell>
								<TableCell>
									<Button asChild variant={ "outline" }>
										<Link to={ `/student/${ student.nis }` }><Eye /></Link>
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
				</Table>
			</CardContent>
		</Card>

	);
}
