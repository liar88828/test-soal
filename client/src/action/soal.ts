import { SoalItemOptionalDefaultsSchema, SoalOptionalDefaultsSchema } from "shared/dist/lib/validate";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom";
import { z } from "zod";
import { SERVER_URL } from "@/router.tsx";
import { AnswerCheckData } from "@/pages/soalCheck.tsx";


export function getSoalAll() {
	return fetch(`${ SERVER_URL }/soal`)
	.then((res) => res.json())
	.then((data) => {
		console.log(data)
		return data
	})

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
	.then((data) => data)
}

export async function createSoalListAction({ request, params }: ActionFunctionArgs) {
	// console.log('exeute')
	try {
		const formData = await request.formData()
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
		const valid = SoalItemOptionalDefaultsSchema.safeParse(payload)
		if (!valid.success) {
			const error = z.prettifyError(valid.error)
			// console.log(error)
			return { error }
		}
		console.log(valid.data)
		const res = await fetch(`${ SERVER_URL }/soal/${ params.id }/question`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(valid.data),
		})

		if (!res.ok) {
			return { error: "Failed to save question" }
		}

		return redirect(`/soal/${ params.id }`)
	} catch {
		return { error: "Terjadi kesalahan saat menyimpan pertanyaan." }
	}
};

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
	// const studentId = params.studentId || 1; // bisa pakai session/auth nanti

	const res = await fetch(`${ SERVER_URL }/soal/${ soalId }/check`);
	const data = await res.json();

	if (!res.ok) {
		throw new Error("Gagal mengambil data review");
	}

// const data = await res.json();
	console.log(data)
	return data
}
