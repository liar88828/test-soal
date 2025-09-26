import { useFetcher, useLoaderData, useParams } from "react-router-dom";
import { LoaderProps } from "shared";
import { createSoalTextAction, soalListLoader } from "@/action/soal.ts";
import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { DrawerDialog } from "@/components/mini/DrawerDialog.tsx";
import { ListEmpty } from "@/components/mini/ListEmpty.tsx";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { EditIcon } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { type SoalText } from "shared/dist/lib/validate";


export function SoalTextComponent() {
	const soal = useLoaderData() as LoaderProps<typeof soalListLoader>
	const [ isSoalItem, setIsSoalItem ] = useState<SoalText | undefined>()
	const [ search, setSearch ] = useState<string>('')

	return (
		<div className="space-y-6">
			<div className="flex gap-2">
				<Input
					type="search"
					placeholder="Search Soal Text ..."
					onChange={ (e) => setSearch(e.target.value) }
				/>
				<DrawerDialog
					title="Tambah Soal Text"
					triggerLabel="Tambah Soal"
					isOpen={ !!isSoalItem }
					onOpen={ (value) => {
						if (!value) setIsSoalItem(undefined)
					} }
				>
					<CreateSoalTextComponent soalItem={ isSoalItem } />
				</DrawerDialog>
			</div>

			<div className="xl:grid-cols-2 grid gap-6">
				{ soal.SoalText.length === 0 ? (
					<ListEmpty
						title={ 'Belum ada soal' }
						description={ 'Soal ini belum memiliki pertanyaan. Tambahkan pertanyaan baru untuk memulai.' }
					/>
				) : (
					soal.SoalText
					.filter((item) => {
						const answer = item.answer.toLowerCase().includes(search.toLowerCase())
						const question = item.question.toLowerCase().includes(search.toLowerCase())
						const text = item.text.toLowerCase().includes(search.toLowerCase())
						return answer || question || text
					})
					.map((item, idx) => (
						<Card key={ item.id }>
							<CardHeader>
								<CardTitle>
									<Badge variant="secondary">#{ idx + 1 }</Badge>
								</CardTitle>
								<CardDescription className="font-medium">{ item.question }</CardDescription>
								<CardAction onClick={ () => setIsSoalItem(item) }>
									<EditIcon />
								</CardAction>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">{ item.text }</p>
							</CardContent>
							<CardFooter>
								<p>
									<strong className="text-emerald-600">Jawaban: { item.answer }</strong>
								</p>
							</CardFooter>
						</Card>
					))
				) }
			</div>
		</div>
	)
}

export function CreateSoalTextComponent({ soalItem }: { soalItem?: SoalText }) {
	const fetcher = useFetcher<typeof createSoalTextAction>()
	const busy = fetcher.state !== 'idle'
	const { id } = useParams()

	return (
		<fetcher.Form method="POST" action={ `/soal/${ id }/question-text` } className="space-y-6">
			<input type="hidden" name="soalId" value={ id } />
			<input type="hidden" name="questionItemId" value={ soalItem?.id } />

			<div>
				<Label htmlFor="question">Pertanyaan</Label>
				<Textarea
					name="question"
					id="question"
					required
					defaultValue={ soalItem?.question ?? '' }
				/>
			</div>

			<div>
				<Label htmlFor="text">Deskripsi / Materi Soal</Label>
				<Textarea
					name="text"
					id="text"
					required
					defaultValue={ soalItem?.text ?? '' }
				/>
			</div>

			<div>
				<Label htmlFor="answer">Jawaban</Label>
				<Textarea
					name="answer"
					id="answer"
					required
					defaultValue={ soalItem?.answer ?? '' }
				/>
			</div>

			<Separator />

			<Button type="submit" disabled={ busy } className="w-full">
				{ busy ? 'Menyimpan...' : 'Simpan Pertanyaan' }
			</Button>
		</fetcher.Form>
	)
}
