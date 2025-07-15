import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "client/src/components/ui/card";
import { RadioGroup, RadioGroupItem } from "client/src/components/ui/radio-group";
import { Button } from "client/src/components/ui/button";
import { Label } from "client/src/components/ui/label";
import { useFetcher, useLoaderData } from "react-router-dom";
import { LoaderProps } from "shared";
import { soalListAnswerAction, soalListLoader } from "@/action/soal.action";

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

export const SoalAnswerPage = () => {
	const fetcher = useFetcher<LoaderProps<typeof soalListAnswerAction>>()
	const data = useLoaderData<LoaderProps<typeof soalListLoader>>();

	const [answers, setAnswers] = useState<{ [key: number]: string }>({});
	const [submitted, setSubmitted] = useState(false);

	const handleSelect = (questionId: number, value: string) => {
		setAnswers({ ...answers, [questionId]: value });
	};

	const handleSubmit = async () => {
		await fetcher.submit(
			{
				data: JSON.stringify({
					student: {
						name: "Febrian Alif",
						email: "febrian@example.com",
					},
					answers: Object.entries(answers).map(([key, selected]) => ({
						soalItemId: Number(key),
						selected,
					})),
				}),
			},
			{ method: "post" }
		);
		setSubmitted(true);
	};

	return (
		<div className="max-w-2xl mx-auto py-10">
			<h1 className="text-2xl font-bold mb-6">{data.name}</h1>

			{data.list.map((q) => (
				<Card key={q.id} className="mb-6">
					<CardHeader>
						<CardTitle>Soal #{q.id}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="mb-4">{q.question}</p>
						<RadioGroup
							value={answers[q.id] || ""}
							onValueChange={(val: string) => handleSelect(q.id, val)}
							className="space-y-2"
						>
							{["A", "B", "C", "D", "E"].map((opt) => (
								<div key={opt} className="flex items-center space-x-2">
									<RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
									<Label htmlFor={`${q.id}-${opt}`}>
										{opt}. {q[opt as keyof Question]}
									</Label>
								</div>
							))}
						</RadioGroup>

						{submitted && (
							<p className={`mt-4 font-semibold ${answers[q.id] === q.answer ? "text-green-600" : "text-red-600"}`}>
								Jawaban kamu: {answers[q.id] || "Belum dijawab"} —{" "}
								{answers[q.id] === q.answer ? "Benar ✅" : `Salah ❌ (Jawaban benar: ${q.answer})`}
							</p>
						)}
					</CardContent>
				</Card>
			))}

			{!submitted ? (
				<Button onClick={handleSubmit} className="mt-4 w-full">
					Submit Jawaban
				</Button>
			) : (
				<p className="mt-4 text-center text-lg font-semibold text-blue-600">Terima kasih sudah menjawab!</p>
			)}
		</div>
	);
};
