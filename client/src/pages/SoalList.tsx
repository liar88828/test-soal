import { useFetcher, useLoaderData, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SoalWithRelations } from "shared/dist/lib/validate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { ListEmpty } from "@/components/ListEmpty.tsx";
import { DrawerDialog } from "@/components/DrawerDialog.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";

export const SoalList = () => {
	const soal = useLoaderData() as SoalWithRelations;
	// console.log("soal", soal);
	return (
		<div className="p-6 space-y-6">
			<div className={ 'flex justify-between items-end' }>
				<div className="">
					<h1 className="text-2xl">{ soal.name }</h1>
					<p>Penulis: { soal.author }</p>
				</div>
				<DrawerDialog
					title="Tambah Soal"
					// description="Tambahkan Soal "
					triggerLabel="Tambah Soal"
					// footer={ <Button type="submit">Save changes</Button> }
				>
					<CreateQuestionForm />
				</DrawerDialog>
			</div>
			<Card>
				<CardHeader>
					<CardTitle></CardTitle>
				</CardHeader>
				<CardContent>

					<div className="space-y-6">
						{ soal.list.length === 0
							? <ListEmpty
								title={ 'Belum ada soal' }
								description={ 'Soal ini belum memiliki pertanyaan. Tambahkan pertanyaan baru untuk memulai.' }
							/>
							: soal.list.map((item, idx) => (
								<div key={ item.id } className="space-y-3">
									<div className="flex items-center gap-2">
										<Badge variant="secondary">#{ idx + 1 }</Badge>
										<p className="font-medium">{ item.question }</p>
									</div>
									<ul className="ml-6  space-y-1 text-muted-foreground">
										<li>A: { item.A }</li>
										<li>B: { item.B }</li>
										<li>C: { item.C }</li>
										<li>D: { item.D }</li>
										<li>E: { item.E }</li>
									</ul>
									<p>
										<strong className="text-emerald-600">Jawaban: { item.answer }</strong>
									</p>
									<Separator />
								</div>
							)) }
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export function CreateQuestionForm() {
	const fetcher = useFetcher();
	const busy = fetcher.state !== "idle";
	const { id } = useParams()
	console.log(fetcher.formAction)
	return (
		<fetcher.Form method="POST"
		              action={ `/soal/${ id }` }
		              className="space-y-6"
		>
			<input type="hidden" name={ 'soalId' } value={ id } />
			<div>
				<Label htmlFor="question">Pertanyaan</Label>
				<Textarea name="question" id="question" required />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<Label htmlFor="A">Pilihan A</Label>
					<Input name="A" id="A" required />
				</div>
				<div>
					<Label htmlFor="B">Pilihan B</Label>
					<Input name="B" id="B" required />
				</div>
				<div>
					<Label htmlFor="C">Pilihan C</Label>
					<Input name="C" id="C" required />
				</div>
				<div>
					<Label htmlFor="D">Pilihan D</Label>
					<Input name="D" id="D" required />
				</div>
				<div>
					<Label htmlFor="E">Pilihan E</Label>
					<Input name="E" id="E" required />
				</div>
			</div>

			<div>
				<Label htmlFor="answer">Jawaban yang benar (A–E)</Label>
				<Select name="answer" required>
					<SelectTrigger id="answer">
						<SelectValue placeholder="Pilih jawaban benar" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="A">A</SelectItem>
						<SelectItem value="B">B</SelectItem>
						<SelectItem value="C">C</SelectItem>
						<SelectItem value="D">D</SelectItem>
						<SelectItem value="E">E</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Separator />

			<Button type="submit" disabled={ busy }>
				{ busy ? "Menyimpan..." : "Simpan Pertanyaan" }
			</Button>
		</fetcher.Form>
	);
}
