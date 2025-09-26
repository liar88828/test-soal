import { SoalABCOptionalDefaultsSchema, SoalOptionalDefaultsSchema, SoalTextOptionalDefaultsSchema } from "shared/dist/lib/validate";
import { type ActionFunctionArgs, type LoaderFunctionArgs, redirect } from "react-router-dom";
import { z } from "zod";
import { SERVER_URL } from "@/lib/constants";
import { type  AnswerCheckData } from "@/pages/question/soalCheck";
import type { SoalAll, SoalDetail } from "shared";
import { toastError, toastSuccess } from "@/components/mini/toast";


export async function getSoalAll() {
	return fetch(`${ SERVER_URL }/soal`)
	.then((res) => res.json())
	.then((data) => data as SoalAll[])

}

export async function createSoalAction({ request }: ActionFunctionArgs) {
	// console.log('execute')
	try {
		const formData = await request.formData();
		const newSoal = {
			name: formData.get("name"),
			author: formData.get("author"),
			// description: formData.get("description") || "",
		}
		// Validate with Zod
		const result = SoalOptionalDefaultsSchema.safeParse(newSoal);
		if (!result.success) {
			const error = z.treeifyError(result.error)
			console.error(error);
			// Optionally return error data for form feedback
			return { error };
		}
		const res = await fetch(`${ SERVER_URL }/soal`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newSoal),
		});

		if (!res.ok) {
			return { error: "Gagal menyimpan soal" }
		}

		const created = await res.json();
		return redirect(`/soal/${ created.id }`);
	} catch (error) {
		console.error("Gagal membuat soal:", error);
		return { error: "Terjadi kesalahan saat menyimpan soal." };
	}
}

export async function soalListLoader({ params }: LoaderFunctionArgs) {
	const { id } = params
	return fetch(`${ SERVER_URL }/soal/${ id }`)
	.then((res) => res.json())
	.then((data) => data as SoalDetail)
}

export async function createSoalABCAction({ request, params }: ActionFunctionArgs) {
	// console.log('exeute abc')
	try {
		const formData = await request.formData()
		const questionId = Number(formData.get("questionItemId"))
		const payload = {
			question: formData.get("question"),
			soalId: Number(formData.get("soalId")),
			A: formData.get("A"),
			B: formData.get("B"),
			C: formData.get("C"),
			D: formData.get("D"),
			E: formData.get("E"),
			answer: formData.get("answer"),
		}//satisfies SoalItemOptionalDefaults
		// console.log(payload)
		const valid = SoalABCOptionalDefaultsSchema.safeParse(payload)
		if (!valid.success) {
			throw new Error(z.prettifyError(valid.error))
		}
		console.log(valid.data)

		let res: Response
		if (questionId) {
			res = await fetch(`${ SERVER_URL }/soal/${ params.id }/question-abc/${ questionId }`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(valid.data),
			})
		} else {
			res = await fetch(`${ SERVER_URL }/soal/${ params.id }/question-abc`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(valid.data),
			})

		}

		if (!res.ok) {
			throw new Error("Failed to save question")
		}
		toastSuccess('Success Create Data')
		return redirect(`/soal/${ params.id }`)
	} catch (e) {

		if (e instanceof Error) {
			toastError(e.message)
			return { error: e.message }
		}
		return { error: "Terjadi kesalahan saat menyimpan pertanyaan." }
	}
}

export async function createSoalTextAction({ request, params }: ActionFunctionArgs) {
	try {
		const formData = await request.formData()
		const questionId = Number(formData.get("questionItemId"))

		const payload = {
			question: formData.get("question"),
			text: formData.get("text"),
			answer: formData.get("answer"),
			soalId: Number(formData.get("soalId")),
		} // satisfies SoalTextOptionalDefaults

		const valid = SoalTextOptionalDefaultsSchema.safeParse(payload)
		if (!valid.success) {
			throw new Error(z.prettifyError(valid.error))
		}

		let res: Response
		if (questionId) {
			// Update existing soal text
			res = await fetch(`${ SERVER_URL }/soal/${ params.id }/question-text/${ questionId }`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(valid.data),
			})
		} else {
			// Create new soal text
			res = await fetch(`${ SERVER_URL }/soal/${ params.id }/question-text`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(valid.data),
			})
		}

		if (!res.ok) {
			return { error: "Failed to save question" }
		}
		toastSuccess('Success Create Data')
		return redirect(`/soal/${ params.id }`)
	} catch (e) {
		if (e instanceof Error) {
			toastError(e.message)
			return { error: e.message }
		}
		return { error: "Terjadi kesalahan saat menyimpan pertanyaan." }
	}
}

export async function soalListAnswer({ request, params }: ActionFunctionArgs) {
	const { id } = params;
	const form = await request.formData();
	const raw = form.get("data");

	if (!raw) {
		return new Response("Missing data", { status: 400 });
	}

	const { student, answers } = JSON.parse(raw as string);

	console.log(`Soal ID ${ id } - Student:`, student);
	console.log("Jawaban:", answers); // contoh: [{ soalItemId: 9, selected: "A" }]

	// Kirim ke Hono backend
	const res = await fetch(`${ SERVER_URL }/soal/${ id }/answer`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ student, answers }),
	});

	if (!res.ok) {
		const error = await res.json();
		console.error("Gagal kirim:", error);
	}
	console.log(await res.json());
	return null
}

// loaders/soalListCheckLoader.ts
export async function soalListCheckLoader({ params }: LoaderFunctionArgs): Promise<AnswerCheckData> {
	const soalId = params.id;
	// const studentId = params.studentId || 1; // bisa pakai session/authRouter nanti

	const res = await fetch(`${ SERVER_URL }/soal/${ soalId }/check`);
	const data = await res.json();

	if (!res.ok) {
		throw new Error("Gagal mengambil data review");
	}

// const data = await res.json();
	console.log(data)
	return data
}
