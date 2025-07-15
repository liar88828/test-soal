import { type ActionFunctionArgs, type LoaderFunctionArgs, redirect } from "react-router-dom";
import { Soal, SoalItemOptionalDefaultsSchema, SoalOptionalDefaultsSchema, SoalWithRelations } from "shared/dist/lib/validate";
import { type AnswerCheckData } from "client/src/pages/soalCheck";
import { z } from "zod";
import { SERVER_URL } from "@/lib/constants.ts";
import { getToken, getUser } from "./auth.action";


export async function getSoalAll() {

	const soals = await fetch(`${SERVER_URL}/soal`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			return data as (Soal & { _count: { list: number } })[]
		})
	const data = {
		soals,
		user: getUser()
	}
	console.log("SoalPage loaded with data:", data);

	return data

}

export async function createSoalAction({ request }: ActionFunctionArgs) {
	// console.log('execute')
	try {
		const formData = await request.formData();
		// Validate with Zod
		const result = SoalOptionalDefaultsSchema.safeParse({
			name: formData.get("name"),
			author: formData.get("author"),
			// description: formData.get("description") || "",
		});

		if (!result.success) {
			const error = z.treeifyError(result.error)
			// console.error(error);
			// Optionally return error data for form feedback
			return { error };
		}
		const res = await fetch(`${SERVER_URL}/soal`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(result.data),
		});

		if (!res.ok) {
			return { error: "Gagal menyimpan soal" }
		}

		const created = await res.json();
		return redirect(`/soal/${created.id}`);
	} catch (error) {
		console.error("Gagal membuat soal:", error);
		return { error: "Terjadi kesalahan saat menyimpan soal." };
	}
}


export async function soalListLoader({ params }: LoaderFunctionArgs) {
	const { id } = params
	return fetch(`${SERVER_URL}/soal/${id}`)
		.then((res) => res.json())
		.then((data) => data as Omit<SoalWithRelations, 'StudentSubjects'>)
}

export async function createSoalListAction({ request, params }: ActionFunctionArgs) {
	// console.log('exeute')
	try {
		const formData = await request.formData()


		const result = SoalItemOptionalDefaultsSchema.safeParse({
			question: formData.get("question"),
			soalId: Number(formData.get("soalId")),
			A: formData.get("A"),
			B: formData.get("B"),
			C: formData.get("C"),
			D: formData.get("D"),
			E: formData.get("E"),
			answer: formData.get("answer"),
		})
		if (!result.success) {
			const error = z.prettifyError(result.error)
			// console.log(error)
			return { error }
		}
		// console.log(valid.data)
		const res = await fetch(`${SERVER_URL}/soal/${params.id}/question`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(result.data),
		})

		if (!res.ok) {
			return { error: "Failed to save question" }
		}

		return redirect(`/soal/${params.id}`)
	} catch {
		return { error: "Terjadi kesalahan saat menyimpan pertanyaan." }
	}
}

export async function soalListAnswerAction({ request, params }: ActionFunctionArgs) {
	const { id } = params;
	const form = await request.formData();
	const raw = form.get("data");

	if (!raw) {
		return new Response("Missing data", { status: 400 });
	}

	const { student, answers } = JSON.parse(raw as string);

	console.log(`Soal ID ${id} - Student:`, student);
	console.log("Jawaban:", answers); // contoh: [{ soalItemId: 9, selected: "A" }]

	// Kirim ke Hono backend
	const res = await fetch(`${SERVER_URL}/soal/${id}/answer`, {
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

	const res = await fetch(`${SERVER_URL}/soal/${soalId}/check`);
	const data = await res.json();

	if (!res.ok) {
		throw new Error("Gagal mengambil data review");
	}

	// const data = await res.json();
	console.log(data)
	return data
}
