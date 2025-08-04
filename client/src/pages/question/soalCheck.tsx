// components/AnswerCheck.tsx
import { useLoaderData } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "client/src/components/ui/card.tsx";
import { Badge } from "client/src/components/ui/badge.tsx";

type Question = {
	id: number;
	question: string;
	A: string;
	B: string;
	C: string;
	D: string;
	E: string;
	answer: string;
};

type Answered = {
	soalItemId: number;
	selected: string;
};

export type AnswerCheckData = {
	list: Question[];
	answers: Answered[];
}
type Variant = "default" | 'secondary' |   'destructive' | 'outline'

export function AnswerCheck() {
	const { answers, list } = useLoaderData() as AnswerCheckData

	const getAnswerByItemId = (id: number) => answers.find((a) => a.soalItemId === id);

	const correctCount = list.reduce((acc, q) => {
		const studentAnswer = getAnswerByItemId(q.id)?.selected;
		return acc + ( studentAnswer === q.answer ? 1 : 0 );
	}, 0);
	return (
		<div className="max-w-2xl mx-auto py-10">
			<h1 className="text-2xl font-bold mb-6">Hasil Jawaban</h1>

			<p className="mb-6 text-lg font-medium text-gray-600">
				Skor: { correctCount } / { list.length }
			</p>

			{ list.map((q) => {
				const studentAnswer = getAnswerByItemId(q.id);
				const isCorrect = studentAnswer?.selected === q.answer;

				return (
					<Card key={ q.id } className="mb-4">
						<CardHeader>
							<CardTitle>Soal #{ q.id }</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="mb-3">{ q.question }</p>

							{ [ "A", "B", "C", "D", "E" ].map((opt) => {
								const label = q[opt as keyof Question];
								const isSelected = studentAnswer?.selected === opt;
								const isAnswer = q.answer === opt;
								const variant:Variant = isSelected ? ( isCorrect ? "default" : "destructive" ) : "outline"

								return (
									<div key={ opt } className="mb-1 flex items-center gap-2">
										<Badge
											variant={ variant }
											className={ isAnswer ? "border border-green-600" : "" }
										>
											{ opt }. { label }
										</Badge>
										{ isAnswer && <span className="text-green-600 text-sm">(Jawaban Benar)</span> }
										{ isSelected && !isCorrect &&
											<span className="text-red-600 text-sm">(Jawaban Anda)</span> }
									</div>
								);
							}) }
						</CardContent>
					</Card>
				);
			}) }
		</div>
	);
}
